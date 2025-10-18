import AppError from "../components/error";
import InputField from "../components/input-field";
import { ApiErrorResponse, ApiResponse, AuthSuccessResponse } from "../types/interfaces";

class Login {
    public err: HTMLElement | null;
    error: string = '';
    responseData: AuthSuccessResponse | {} = {};
    
    constructor() {
        this.err = document.getElementById('appError');
        this.setupSubmitButton()
    }

    private setupSubmitButton(): void {
        const submitBtn = document.querySelector('button-secondary') as HTMLElement;
        const button = submitBtn?.querySelector('button');
        if (!button) return;

        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';

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

    private isFormValid(): boolean {
        const inputs = document.querySelectorAll('input-field');

        for (const input of Array.from(inputs)) {
            const value = (input as InputField).getValue();
            if (!value || value.trim() === '') return false;
        }

        return true;
    }

    private checkFormValidity(): void {
        const button = document.querySelector('button-secondary button') as HTMLButtonElement | null;
        if (!button) return;

        const isValid = this.isFormValid();
        button.disabled = !isValid;
        button.style.opacity = isValid ? '1' : '0.5';
        button.style.cursor = isValid ? 'pointer' : 'not-allowed';
    }

    private validateForm(): boolean {
        let isValid = true;

        const inputs = document.querySelectorAll('input-field');
        inputs.forEach(input => {
            if (!(input as InputField).isValid()) isValid = false;
        });

        return isValid;
    }

    private async submit() {
        if (!this.validateForm()) return;

        const form = document.querySelector(".form-field")!;
        const inputs = form.querySelectorAll("input-field");

        const data: Record<string, string | number> = {};

        inputs.forEach(input => {
            const field = input as InputField;
            data[field.getAttribute('name') || ''] = field.getValue();
        });

        console.log('Submitting data:', data);

        try {
            const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/login', {
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

document.addEventListener('DOMContentLoaded', () => new Login());
