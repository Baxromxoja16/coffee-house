import { Component, signal, WritableSignal } from '@angular/core';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PaymentMethodEnum } from '../../shared/types/enums';
import { Router } from '@angular/router';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { ToastService } from '../../shared/services/toast-service';

@Component({
  selector: 'app-register',
  imports: [ButtonSecondary, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  cities: string[] = ["New York", "Los Angeles", "Chicago"];
  streets: {[key: string]: string[]} = {
    'New York': ['5th Avenue', 'Broadway', 'Wall Street', 'Park Avenue', 'Madison Avenue', 'Lexington Avenue', '3rd Avenue', '2nd Avenue', '1st Avenue', 'Amsterdam Avenue'],
    'Los Angeles': ['Sunset Boulevard', 'Hollywood Boulevard', 'Rodeo Drive', 'Melrose Avenue', 'Venice Boulevard', 'Santa Monica Boulevard', 'Wilshire Boulevard', 'La Brea Avenue', 'Fairfax Avenue', 'Beverly Boulevard'],
    'Chicago': ['Michigan Avenue', 'State Street', 'Lake Shore Drive', 'Clark Street', 'Division Street', 'Ashland Avenue', 'Western Avenue', 'Halsted Street', 'Broadway', 'Lincoln Avenue']
  };

  form: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.form = this.fb.group({
      login: ['', [
        Validators.required,
        CustomValidators.login()
      ]],
      password: ['', [
        Validators.required,
        CustomValidators.password()
      ]],
      confirmPassword: ['', [
        Validators.required,
        CustomValidators.password()
      ]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', [
        Validators.required,
        CustomValidators.houseNumber()
      ]],
      paymentMethod: ['', Validators.required],
    }, {
      validators: CustomValidators.passwordMatch()
    });

    // City change listener
    this.form.get('city')?.valueChanges.subscribe(() => {
      this.form.get('street')?.setValue('');
    });

    this.form.valueChanges.subscribe((data) => {
      console.log(data);
    })
  }

  // Error handling methods
  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    // Required
    if (control.errors['required']) {
      return 'This field is required';
    }

    // Custom validators
    if (control.errors['minlength']) {
      return control.errors['minlength'].message;
    }

    if (control.errors['startsWithLetter']) {
      return control.errors['startsWithLetter'].message;
    }

    if (control.errors['onlyLetters']) {
      return control.errors['onlyLetters'].message;
    }

    if (control.errors['specialChar']) {
      return control.errors['specialChar'].message;
    }

    if (control.errors['passwordMismatch']) {
      return control.errors['passwordMismatch'].message;
    }

    if (control.errors['invalidHouseNumber']) {
      return control.errors['invalidHouseNumber'].message;
    }

    if (control.errors['notANumber']) {
      return control.errors['notANumber'].message;
    }

    return '';
  }

  hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  getStreets(): string[] {
    const city = this.form.get('city')?.value;
    return city ? this.streets[city] || [] : [];
  }

  async onSubmit(): Promise<void> {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);

    try {
      const formData = {
        login: this.form.value.login,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
        city: this.form.value.city,
        street: this.form.value.street,
        houseNumber: parseInt(this.form.value.houseNumber),
        paymentMethod: this.form.value.paymentMethod
      };

      const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.data) {
        localStorage.setItem('access_token', result.data.access_token);
        localStorage.setItem('userData', JSON.stringify(result.data.user));
        this.toastService.success('Registration successful!')
        this.router.navigate(['/']);
      } else {
        this.toastService.error('Registration failed. Please try again')
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.toastService.error('An error occurred. Please try again.')
    } finally {
      this.isLoading.set(false)
    }
  }
}
