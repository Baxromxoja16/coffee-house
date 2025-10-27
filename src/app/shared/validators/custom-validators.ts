import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    /**
     * Login validator
     * - Minimum 3 characters
     * - Must start with a letter
     * - Only English letters allowed
     */
    static login(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null; // Let required validator handle empty
            }

            if (value.length < 3) {
                return {
                    minlength: {
                        message: 'Login must be at least 3 characters',
                        requiredLength: 3,
                        actualLength: value.length
                    }
                };
            }

            if (!/^[a-zA-Z]/.test(value)) {
                return {
                    startsWithLetter: {
                        message: 'Login must start with a letter'
                    }
                };
            }

            if (!/^[a-zA-Z]+$/.test(value)) {
                return {
                    onlyLetters: {
                        message: 'Only English letters are allowed'
                    }
                };
            }

            return null;
        };
    }

    /**
     * Password validator
     * - Minimum 6 characters
     * - Must contain at least 1 special character
     */
    static password(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            if (value.length < 6) {
                return {
                    minlength: {
                        message: 'Password must be at least 6 characters',
                        requiredLength: 6,
                        actualLength: value.length
                    }
                };
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                return {
                    specialChar: {
                        message: 'Password must contain at least 1 special character'
                    }
                };
            }

            return null;
        };
    }

    /**
     * Password match validator (form-level)
     * Checks if password and confirmPassword fields match
     */
    static passwordMatch(passwordField: string = 'password', confirmPasswordField: string = 'confirmPassword'): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get(passwordField)?.value;
            const confirmPassword = control.get(confirmPasswordField)?.value;

            if (!password || !confirmPassword) {
                return null;
            }

            if (password !== confirmPassword) {
                // Set error on confirmPassword field
                const confirmControl = control.get(confirmPasswordField);
                confirmControl?.setErrors({
                    passwordMismatch: {
                        message: 'Passwords do not match'
                    }
                });
                return { passwordMismatch: true };
            } else {
                // Clear error if passwords match
                const confirmControl = control.get(confirmPasswordField);
                if (confirmControl?.hasError('passwordMismatch')) {
                    confirmControl.setErrors(null);
                }
            }

            return null;
        };
    }

    /**
     * House number validator
     * - Must be a number
     * - Must be greater than 1
     */
    static houseNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            const num = parseInt(value, 10);

            if (isNaN(num)) {
                return {
                    notANumber: {
                        message: 'House number must be a valid number'
                    }
                };
            }

            if (num <= 1) {
                return {
                    invalidHouseNumber: {
                        message: 'House number must be greater than 1',
                        min: 2,
                        actual: num
                    }
                };
            }

            return null;
        };
    }
}