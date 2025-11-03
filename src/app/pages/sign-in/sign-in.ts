import { Component, signal, WritableSignal } from '@angular/core';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast-service';

@Component({
  selector: 'app-sign-in',
  imports: [ButtonSecondary, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  loginForm: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.loginForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.minLength(3),
        this.loginValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordValidator
      ]]
    });
  }

  private loginValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.length < 3) {
      return { minlength: { message: 'Login must be at least 3 characters' } };
    }

    if (!/^[a-zA-Z]/.test(value)) {
      return { startsWithLetter: { message: 'Login must start with a letter' } };
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
      return { onlyLetters: { message: 'Only English letters are allowed' } };
    }

    return null;
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.length < 6) {
      return { minlength: { message: 'Password must be at least 6 characters' } };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialChar: { message: 'Password must contain at least 1 special character' } };
    }

    return null;
  }

  getLoginError(): string {
    const control = this.loginForm.get('login');

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (control.errors['minlength']) {
      return control.errors['minlength'].message || 'Login must be at least 3 characters';
    }

    if (control.errors['startsWithLetter']) {
      return control.errors['startsWithLetter'].message;
    }

    if (control.errors['onlyLetters']) {
      return control.errors['onlyLetters'].message;
    }

    return '';
  }

  getPasswordError(): string {
    const control = this.loginForm.get('password');
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (control.errors['minlength']) {
      return control.errors['minlength'].message || 'Password must be at least 6 characters';
    }

    if (control.errors['specialChar']) {
      return control.errors['specialChar'].message;
    }

    return '';
  }

  hasError(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  async onSubmit(): Promise<void> {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    try {
      const formData = this.loginForm.value;
      
      const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.data) {
        localStorage.setItem('access_token', result.data.access_token);
        localStorage.setItem('userData', JSON.stringify(result.data.user));
        this.toastService.success('Login successful!')
        this.router.navigate(['/']);
      } else {
        this.toastService.error('Login or password incorrect!')
      }
    } catch (error) {
      console.error('Login error:', error);
      this.toastService.error('An error occurred. Please try again')
    } finally {
      this.isLoading.set(false);
    }
  }
}
