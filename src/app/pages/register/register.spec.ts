import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from './register';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { ToastService } from '../../shared/services/toast-service';

describe('Register Component', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [Register, ReactiveFormsModule, ButtonSecondary],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    fixture.detectChanges();
  });

  // 1. Component initialization
  it('should create the component with empty form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.form.get('login')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  // 2. Form validation - all fields required
  it('should invalidate form when all fields are empty', () => {
    expect(component.form.valid).toBe(false);
    expect(component.form.get('login')?.hasError('required')).toBe(true);
    expect(component.form.get('password')?.hasError('required')).toBe(true);
    expect(component.form.get('confirmPassword')?.hasError('required')).toBe(true);
    expect(component.form.get('city')?.hasError('required')).toBe(true);
    expect(component.form.get('street')?.hasError('required')).toBe(true);
    expect(component.form.get('houseNumber')?.hasError('required')).toBe(true);
    expect(component.form.get('paymentMethod')?.hasError('required')).toBe(true);
  });

  // 3. Password match validation
  it('should invalidate form when passwords do not match', () => {
    component.form.patchValue({
      login: 'testuser',
      password: 'test123!',
      confirmPassword: 'test456!',
      city: 'New York',
      street: '5th Avenue',
      houseNumber: '123',
      paymentMethod: 'cash'
    });

    expect(component.form.hasError('passwordMismatch')).toBe(true);
  });

  // 4. Valid form submission
  it('should validate form when all fields are correctly filled', () => {
    component.form.patchValue({
      login: 'testuser',
      password: 'test123!',
      confirmPassword: 'test123!',
      city: 'New York',
      street: '5th Avenue',
      houseNumber: '123',
      paymentMethod: 'cash'
    });

    expect(component.form.valid).toBe(true);
  });

  // 5. City change should reset street
  it('should reset street field when city changes', () => {
    component.form.patchValue({
      city: 'New York',
      street: '5th Avenue'
    });

    expect(component.form.get('street')?.value).toBe('5th Avenue');

    component.form.patchValue({ city: 'Los Angeles' });

    expect(component.form.get('street')?.value).toBe('');
  });

  // 6. getStreets method returns correct streets for selected city
  it('should return correct streets for selected city', () => {
    component.form.patchValue({ city: 'New York' });
    const streets = component.getStreets();

    expect(streets.length).toBeGreaterThan(0);
    expect(streets).toContain('5th Avenue');
    expect(streets).toContain('Broadway');
  });

  // 7. Successful registration
  it('should handle successful registration', async () => {
    component.form.patchValue({
      login: 'testuser',
      password: 'test123!',
      confirmPassword: 'test123!',
      city: 'New York',
      street: '5th Avenue',
      houseNumber: '123',
      paymentMethod: 'cash'
    });

    spyOn(localStorage, 'setItem');
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify({
        data: {
          access_token: 'test-token',
          user: { id: 1, login: 'testuser' }
        }
      }), { status: 200 }))
    );

    await component.onSubmit();

    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'test-token');
    expect(toastService.success).toHaveBeenCalledWith('Registration successful!');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // 8. Failed registration
  it('should handle failed registration', async () => {
    component.form.patchValue({
      login: 'testuser',
      password: 'test123!',
      confirmPassword: 'test123!',
      city: 'New York',
      street: '5th Avenue',
      houseNumber: '123',
      paymentMethod: 'cash'
    });

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 400
      }))
    );

    await component.onSubmit();

    expect(toastService.error).toHaveBeenCalledWith('Registration failed. Please try again');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // 9. Network error handling
  it('should handle network errors gracefully', async () => {
    component.form.patchValue({
      login: 'testuser',
      password: 'test123!',
      confirmPassword: 'test123!',
      city: 'New York',
      street: '5th Avenue',
      houseNumber: '123',
      paymentMethod: 'cash'
    });

    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Network error')));

    await component.onSubmit();

    expect(toastService.error).toHaveBeenCalledWith('An error occurred. Please try again.');
    expect(component.isLoading()).toBe(false);
  });

  // 10. Form submission with invalid data should not submit
  it('should not submit form when validation fails', async () => {
    component.form.patchValue({
      login: 'ab', // too short
      password: 'test', // no special char
      confirmPassword: 'test',
      city: '',
      street: '',
      houseNumber: '',
      paymentMethod: ''
    });

    const fetchSpy = spyOn(window, 'fetch');

    await component.onSubmit();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(component.form.get('login')?.touched).toBe(true);
    expect(component.form.get('password')?.touched).toBe(true);
  });
});