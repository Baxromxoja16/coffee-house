import InputField from "../components/input-field";
import DropdownField from "../components/dropdown-field";
import { ApiErrorResponse, ApiResponse, AuthSuccessResponse } from "../types/interfaces";
import AppError from "../shared/error";

import '@components/tab-button/index.ts';
import '@components/button-secondary/index.ts';
import '@components/button-primary/index.ts';
import '@components/button-app-store/index.ts';
import '@components/button-carousel/index.ts';
import '@components/button-social/index.ts';
import '@components/button-burger/index.ts';
import '@components/contact-link/index.ts';
import '@components/menu-link/index.ts';
import '@components/slider-card/index.ts';
import '@components/coffee-card/index.ts';
import '@components/navbar/index.ts';
import '@components/footer/index.ts';
import '@components/popup/index.ts';
import '@components/input-field/index.ts';
import '@components/dropdown-field/index.ts';
import '@shared/error/index.ts';

interface CityStreets {
    [key: string]: string[];
}

class Register {
    public err: HTMLElement | null;
    error: string = '';
    responseData: AuthSuccessResponse | {} = {};

    private cityStreets: CityStreets = {
        'New York': ['5th Avenue', 'Broadway', 'Wall Street', 'Park Avenue', 'Madison Avenue', 'Lexington Avenue', '3rd Avenue', '2nd Avenue', '1st Avenue', 'Amsterdam Avenue'],
        'Los Angeles': ['Sunset Boulevard', 'Hollywood Boulevard', 'Rodeo Drive', 'Melrose Avenue', 'Venice Boulevard', 'Santa Monica Boulevard', 'Wilshire Boulevard', 'La Brea Avenue', 'Fairfax Avenue', 'Beverly Boulevard'],
        'Chicago': ['Michigan Avenue', 'State Street', 'Lake Shore Drive', 'Clark Street', 'Division Street', 'Ashland Avenue', 'Western Avenue', 'Halsted Street', 'Broadway', 'Lincoln Avenue']
    };

    constructor() {
        this.err = document.getElementById('appError');
        this.setupForm();
        this.setupSubmitButton();
    }

    private setupForm(): void {
        const cityField = document.querySelector('dropdown-field[name="city"]') as DropdownField | null;
        const streetField = document.querySelector('dropdown-field[name="street"]') as DropdownField | null;

        if (cityField) {
            const cityDropdown = this.createDropdown('city', 'City', Object.keys(this.cityStreets)) as HTMLElement;
            cityField.replaceWith(cityDropdown);

            cityDropdown.addEventListener('value-changed', (e: Event) => {
                console.log(e);
                const ev = e as CustomEvent<{ value: string }>;
                const city = ev.detail.value;
                this.updateStreetDropdown(city);
            });
        }

        // street dropdown
        if (streetField) {
            const streetDropdown = this.createDropdown('street', 'Street', [], true);
            streetField.replaceWith(streetDropdown);
        }

        // Payment method event
        this.setupPaymentMethod();
    }

    private createDropdown(name: string, label: string, options: string[], disabled = false): DropdownField {
        const dropdown = document.createElement('dropdown-field') as DropdownField;
        dropdown.setAttribute('name', name);
        dropdown.setAttribute('label', label);
        if (disabled) dropdown.setAttribute('disabled', '');
        dropdown.setOptions(options);
        return dropdown;
    }

    private updateStreetDropdown(city: string): void {
        const streetDropdown = document.querySelector('dropdown-field[name="street"]') as DropdownField | null;
        if (!streetDropdown) return;

        if (!city) {
            streetDropdown.setAttribute('disabled', '');
            streetDropdown.setOptions([]);
        } else {
            streetDropdown.removeAttribute('disabled');
            streetDropdown.setOptions(this.cityStreets[city] || []);
        }
    }

    private setupPaymentMethod(): void {
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => this.checkFormValidity());
        });
    }

    private setupSubmitButton(): void {
        const submitBtn = document.querySelector('button-secondary') as HTMLElement;
        const button = submitBtn?.querySelector('button');
        if (!button) return;

        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';

        // field-changed (input-field va dropdown-field dan)
        document.addEventListener('field-changed', () => {
            this.checkFormValidity();
        });

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submit();
            }
        });
    }

    private checkFormValidity(): void {
        const button = document.querySelector('button-secondary button') as HTMLButtonElement | null;
        if (!button) return;

        const isValid = this.isFormValid();
        button.disabled = !isValid;
        button.style.opacity = isValid ? '1' : '0.5';
        button.style.cursor = isValid ? 'pointer' : 'not-allowed';
    }

    private isFormValid(): boolean {
        const inputs = document.querySelectorAll('input-field');
        const dropdowns = document.querySelectorAll('dropdown-field');
        const radioChecked = document.querySelector('input[type="radio"]:checked');

        for (const input of Array.from(inputs)) {
            const value = (input as InputField).getValue();
            if (!value || value.trim() === '') return false;
        }

        for (const dropdown of Array.from(dropdowns)) {
            const value = (dropdown as DropdownField).getValue();
            if (!value || value.trim() === '') return false;
        }

        if (!radioChecked) return false;
        return true;
    }

    private validateForm(): boolean {
        let isValid = true;

        const inputs = document.querySelectorAll('input-field');
        inputs.forEach(input => {
            if (!(input as InputField).isValid()) isValid = false;
        });

        const dropdowns = document.querySelectorAll('dropdown-field');
        dropdowns.forEach(dropdown => {
            if (!(dropdown as DropdownField).isValid()) isValid = false;
        });

        const radios = document.querySelector('input[type="radio"]:checked');
        if (!radios) {
            isValid = false;
            const radioContainer = document.querySelector('.radio-container');
            if (radioContainer && !radioContainer.querySelector('.payment-error')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'payment-error';
                errorMsg.style.cssText = 'font-size: 12px; color: #ff4444; margin-top: 4px; display: block;';
                errorMsg.textContent = 'Please select a payment method';
                radioContainer.appendChild(errorMsg);
            }
        }

        return isValid;
    }

    private async submit() {
        if (!this.validateForm()) return;

        const form = document.querySelector(".form-field")!;
        const inputs = form.querySelectorAll("input-field");
        const dropdowns = document.querySelectorAll("dropdown-field");
        const paymentMethod = document.querySelector('input[type="radio"]:checked') as HTMLInputElement | null;

        const data: Record<string, string | number> = {};

        inputs.forEach(input => {
            const field = input as InputField;
            data[field.getAttribute('name') || ''] = field.getValue();
        });

        dropdowns.forEach(dropdown => {
            const field = dropdown as DropdownField;
            data[field.getAttribute('name') || ''] = field.getValue();
        });

        if (paymentMethod) {
            data.paymentMethod = paymentMethod.value;
        }

        data.houseNumber = +data.houseNumber

        console.log('Submitting data:', data);

        try {
            const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/register', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const responseData: ApiErrorResponse | ApiResponse<AuthSuccessResponse> = await response.json();
            console.log(responseData);

            if ('error' in responseData && responseData.error) {
                this.error = responseData.error;
                (this.err as AppError)?.show(responseData.error);
                return;
            }

            if (response.status >= 400) {
                this.responseData = responseData;
                console.log(this.responseData);
            } else {
                window.location.href = "index.html";
                alert((responseData as ApiResponse<AuthSuccessResponse>).message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new Register());
