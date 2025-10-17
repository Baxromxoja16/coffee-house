class InputField extends HTMLElement {
    shadow: ShadowRoot;
    name: string | null = null;
    private validationRules: { [key: string]: (value: string) => { isValid: boolean; message: string } } = {
        login: (value: string) => {
            if (value.length < 3) {
                return { isValid: false, message: 'Login must be at least 3 characters' };
            }
            if (!/^[a-zA-Z]/.test(value)) {
                return { isValid: false, message: 'Login must start with a letter' };
            }
            if (!/^[a-zA-Z]+$/.test(value)) {
                return { isValid: false, message: 'Only English letters are allowed' };
            }
            return { isValid: true, message: '' };
        },
        password: (value: string) => {
            if (value.length < 6) {
                return { isValid: false, message: 'Password must be at least 6 characters' };
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                return { isValid: false, message: 'Password must contain at least 1 special character' };
            }
            return { isValid: true, message: '' };
        },
        confirmPassword: (value: string) => {
            const passwordField = document.querySelector('input-field[name="password"]') as InputField;
            const password = passwordField?.getValue() || '';
            if (value !== password) {
                return { isValid: false, message: 'Passwords do not match' };
            }
            if (value.length < 6) {
                return { isValid: false, message: 'Password must be at least 6 characters' };
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                return { isValid: false, message: 'Password must contain at least 1 special character' };
            }
            return { isValid: true, message: '' };
        },
        houseNumber: (value: string) => {
            const num = parseInt(value);
            if (isNaN(num) || num <= 1) {
                return { isValid: false, message: 'House number must be greater than 1' };
            }
            return { isValid: true, message: '' };
        }
    };

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const label = this.getAttribute('label');
        const type = this.getAttribute('type');
        const name = this.getAttribute('name');
        this.name = name || null;

        this.shadow.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Inter', sans-serif;
                font-weight: 600;
                line-height: 150%;
                letter-spacing: 0%;
            }

            .input-field {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .input-field label {
                font-family: Inter;
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                color: var(--dark);
            }

            .input-wrapper {
                position: relative;
            }

            .input-field input {
                display: block;
                width: 100%;
                padding: 12px 16px;
                border-radius: 12px;
                border: 1px solid var(--boder-ligtht);
                color: var(--dark);
                font-weight: 400;
                font-size: 16px;
                background: transparent;
                transition: border-color 0.3s ease;
            }

            .input-field input.error {
                border-color: #ff4444;
                padding-right: 40px;
            }

            .input-field input:focus {
                outline: none;
                border-color: var(--accent);
            }   

            .input-field input::placeholder {
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                color: var(--placeholder);
            }

            .error-icon {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                display: none;
            }

            .error-icon.show {
                display: block;
            }

            .error-message {
                font-size: 12px;
                color: #ff4444;
                font-weight: 400;
                margin-top: 4px;
                display: none;
            }

            .error-message.show {
                display: block;
            }
        
        </style>
        <div class="input-field">
            <label for="${label || 'Input'}">${label || 'Input'}</label>
            <div class="input-wrapper">
                <input type="${type || 'text'}" id="${label || 'Input'}" name="${name}" placeholder="Placeholder" />
                <span class="error-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#ff4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>
            <span class="error-message"></span>
        </div>
        `;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const input = this.shadow.querySelector('input');
        if (!input) return;

        input.addEventListener('blur', () => this.validate());
        input.addEventListener('focus', () => this.clearValidation());
        input.addEventListener('input', () => {
            // Real-time validation trigger for form
            this.dispatchEvent(new CustomEvent('field-changed', {
                bubbles: true,
                composed: true
            }));
        });
    }

    public validate(): boolean {
        if (!this.name || !this.validationRules[this.name]) {
            // No validation rule for this field, check if empty
            return this.validateRequired();
        }

        const input = this.shadow.querySelector('input') as HTMLInputElement;
        const value = input.value.trim();

        // Check required first
        if (!value) {
            this.showError('This field is required');
            return false;
        }

        const result = this.validationRules[this.name](value);

        if (!result.isValid) {
            this.showError(result.message);
            return false;
        }

        this.clearValidation();
        return true;
    }

    private validateRequired(): boolean {
        const input = this.shadow.querySelector('input') as HTMLInputElement;
        const value = input.value.trim();

        if (!value) {
            this.showError('This field is required');
            return false;
        }

        this.clearValidation();
        return true;
    }

    private showError(message: string): void {
        const input = this.shadow.querySelector('input');
        const errorIcon = this.shadow.querySelector('.error-icon');
        const errorMessage = this.shadow.querySelector('.error-message');

        input?.classList.add('error');
        errorIcon?.classList.add('show');

        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
        }
    }

    private clearValidation(): void {
        const input = this.shadow.querySelector('input');
        const errorIcon = this.shadow.querySelector('.error-icon');
        const errorMessage = this.shadow.querySelector('.error-message');

        input?.classList.remove('error');
        errorIcon?.classList.remove('show');
        errorMessage?.classList.remove('show');
    }

    get value(): { [key: string]: string | null } {
        return { [this.name || '']: (this.shadow.querySelector('input') as HTMLInputElement).value || null };
    }

    public getValue(): string {
        return (this.shadow.querySelector('input') as HTMLInputElement)?.value || '';
    }

    public isValid(): boolean {
        return this.validate();
    }
}

customElements.define('input-field', InputField);

export default InputField;