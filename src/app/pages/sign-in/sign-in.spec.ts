import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from './sign-in';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { ToastService } from '../../shared/services/toast-service';
import 'zone.js/testing';

describe('SignIn Component', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Create spy objects
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [SignIn, ReactiveFormsModule, ButtonSecondary],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    fixture.detectChanges();
  });

  // ===================================
  // 1. Component Initialization Tests
  // ===================================
  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize loginForm with empty fields', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.get('login')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });

    it('should initialize isLoading signal as false', () => {
      expect(component.isLoading()).toBe(false);
    });

    it('should have required validators on login field', () => {
      const loginControl = component.loginForm.get('login');
      expect(loginControl?.hasError('required')).toBe(true);
    });

    it('should have required validators on password field', () => {
      const passwordControl = component.loginForm.get('password');
      expect(passwordControl?.hasError('required')).toBe(true);
    });
  });

  // ===================================
  // 2. Login Field Validation Tests
  // ===================================
  describe('Login Field Validation', () => {
    it('should invalidate empty login', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('');
      expect(loginControl?.hasError('required')).toBe(true);
    });

    it('should invalidate login shorter than 3 characters', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('ab');
      expect(loginControl?.hasError('minlength')).toBe(true);
    });

    it('should invalidate login starting with number', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('123abc');
      expect(loginControl?.hasError('startsWithLetter')).toBe(true);
    });

    it('should invalidate login with special characters', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('abc@123');
      expect(loginControl?.hasError('onlyLetters')).toBe(true);
    });

    it('should invalidate login with numbers', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('abc123');
      expect(loginControl?.hasError('onlyLetters')).toBe(true);
    });

    it('should validate correct login (only letters, 3+ chars)', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('testuser');
      expect(loginControl?.valid).toBe(true);
    });

    it('should validate login with uppercase letters', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('TestUser');
      expect(loginControl?.valid).toBe(true);
    });

    it('should validate login with exactly 3 characters', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('abc');
      expect(loginControl?.valid).toBe(true);
    });
  });

  // ===================================
  // 3. Password Field Validation Tests
  // ===================================
  describe('Password Field Validation', () => {
    it('should invalidate empty password', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('');
      expect(passwordControl?.hasError('required')).toBe(true);
    });

    it('should invalidate password shorter than 6 characters', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('abc12');
      expect(passwordControl?.hasError('minlength')).toBe(true);
    });

    it('should invalidate password without special character', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('abc12345');
      expect(passwordControl?.hasError('specialChar')).toBe(true);
    });

    it('should validate password with special character !', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('test123!');
      expect(passwordControl?.valid).toBe(true);
    });

    it('should validate password with special character @', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('test123@');
      expect(passwordControl?.valid).toBe(true);
    });

    it('should validate password with multiple special characters', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('test!@#123');
      expect(passwordControl?.valid).toBe(true);
    });

    it('should validate password with exactly 6 characters including special char', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('abc12!');
      expect(passwordControl?.valid).toBe(true);
    });
  });

  // ===================================
  // 4. Error Message Tests
  // ===================================
  describe('Error Messages', () => {
    it('should return empty string for untouched login field', () => {
      expect(component.getLoginError()).toBe('');
    });

    it('should return "This field is required" for empty touched login', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.markAsTouched();
      expect(component.getLoginError()).toBe('This field is required');
    });

    it('should return minlength error message for short login', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('ab');
      loginControl?.markAsTouched();
      expect(component.getLoginError()).toContain('at least 3 characters');
    });

    it('should return error for login not starting with letter', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('123abc');
      loginControl?.markAsTouched();
      expect(component.getLoginError()).toBe('Login must start with a letter');
    });

    it('should return error for login with non-letter characters', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('abc123');
      loginControl?.markAsTouched();
      expect(component.getLoginError()).toBe('Only English letters are allowed');
    });

    it('should return empty string for valid login', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('testuser');
      loginControl?.markAsTouched();
      expect(component.getLoginError()).toBe('');
    });

    it('should return "This field is required" for empty touched password', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.markAsTouched();
      expect(component.getPasswordError()).toBe('This field is required');
    });

    it('should return minlength error for short password', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('abc12');
      passwordControl?.markAsTouched();
      expect(component.getPasswordError()).toContain('at least 6 characters');
    });

    it('should return special character error for password without special char', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('abc12345');
      passwordControl?.markAsTouched();
      expect(component.getPasswordError()).toBe('Password must contain at least 1 special character');
    });
  });

  // ===================================
  // 5. hasError Method Tests
  // ===================================
  describe('hasError Method', () => {
    it('should return false for untouched valid field', () => {
      component.loginForm.get('login')?.setValue('testuser');
      expect(component.hasError('login')).toBe(false);
    });

    it('should return false for untouched invalid field', () => {
      component.loginForm.get('login')?.setValue('');
      expect(component.hasError('login')).toBe(false);
    });

    it('should return true for touched invalid field', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('');
      loginControl?.markAsTouched();
      expect(component.hasError('login')).toBe(true);
    });

    it('should return false for touched valid field', () => {
      const loginControl = component.loginForm.get('login');
      loginControl?.setValue('testuser');
      loginControl?.markAsTouched();
      expect(component.hasError('login')).toBe(false);
    });
  });

  // ===================================
  // 6. Form Submission Tests
  // ===================================
  describe('Form Submission', () => {
    it('should not submit if form is invalid', async () => {
      component.loginForm.get('login')?.setValue('');
      component.loginForm.get('password')?.setValue('');

      await component.onSubmit();

      expect(component.isLoading()).toBe(false);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when submitting invalid form', async () => {
      await component.onSubmit();

      expect(component.loginForm.get('login')?.touched).toBe(true);
      expect(component.loginForm.get('password')?.touched).toBe(true);
    });

    it('should set isLoading to true during submission', async () => {
      component.loginForm.get('login')?.setValue('testuser');
      component.loginForm.get('password')?.setValue('test123!');

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ data: { access_token: 'token', user: {} } }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }))
      );

      const submitPromise = component.onSubmit();
      expect(component.isLoading()).toBe(true);

      await submitPromise;
    });

    it('should call fetch with correct URL and method', async () => {
      component.loginForm.get('login')?.setValue('testuser');
      component.loginForm.get('password')?.setValue('test123!');

      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ data: { access_token: 'token', user: {} } }), {
          status: 200
        }))
      );

      await component.onSubmit();

      expect(fetchSpy).toHaveBeenCalledWith(
        'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/login',
        jasmine.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });

    it('should send correct form data in request body', async () => {
      component.loginForm.get('login')?.setValue('testuser');
      component.loginForm.get('password')?.setValue('test123!');

      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ data: { access_token: 'token', user: {} } }), {
          status: 200
        }))
      );

      await component.onSubmit();

      const callArgs = fetchSpy.calls.mostRecent().args[1];
      const bodyData = JSON.parse(callArgs?.body as string);

      expect(bodyData).toEqual({
        login: 'testuser',
        password: 'test123!'
      });
    });
  });

  // ===================================
  // 7. Successful Login Tests
  // ===================================
  describe('Successful Login', () => {
    beforeEach(() => {
      component.loginForm.get('login')?.setValue('testuser');
      component.loginForm.get('password')?.setValue('test123!');
    });

    it('should store access_token in localStorage on success', async () => {
      spyOn(localStorage, 'setItem');
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({
          data: {
            access_token: 'test-token-123',
            user: { id: 1, name: 'Test User' }
          }
        }), { status: 200 }))
      );

      await component.onSubmit();

      expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'test-token-123');
    });

    it('should store userData in localStorage on success', async () => {
      spyOn(localStorage, 'setItem');
      const userData = { id: 1, name: 'Test User' };

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({
          data: {
            access_token: 'test-token-123',
            user: userData
          }
        }), { status: 200 }))
      );

      await component.onSubmit();

      expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify(userData));
    });

    it('should show success toast message', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({
          data: {
            access_token: 'test-token-123',
            user: {}
          }
        }), { status: 200 }))
      );

      await component.onSubmit();

      expect(toastService.success).toHaveBeenCalledWith('Login successful!');
    });

    it('should navigate to home page on success', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({
          data: {
            access_token: 'test-token-123',
            user: {}
          }
        }), { status: 200 }))
      );

      await component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should set isLoading to false after success', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({
          data: {
            access_token: 'test-token-123',
            user: {}
          }
        }), { status: 200 }))
      );

      await component.onSubmit();

      expect(component.isLoading()).toBe(false);
    });
  });

  // ===================================
  // 8. Failed Login Tests
  // ===================================
  describe('Failed Login', () => {
    beforeEach(() => {
      component.loginForm.get('login')?.setValue('testuser');
      component.loginForm.get('password')?.setValue('test123!');
    });

    it('should show error toast for invalid credentials (401)', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401
        }))
      );

      await component.onSubmit();

      expect(toastService.error).toHaveBeenCalledWith('Login or password incorrect!');
    });

    it('should not navigate on failed login', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401
        }))
      );

      await component.onSubmit();

      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not store data in localStorage on failed login', async () => {
      spyOn(localStorage, 'setItem');
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401
        }))
      );

      await component.onSubmit();

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should set isLoading to false after failure', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401
        }))
      );

      await component.onSubmit();

      expect(component.isLoading()).toBe(false);
    });
  });

  // ===================================
  // 9. Network Error Tests
  // ===================================
  describe('Network Errors', () => {
    beforeEach(() => {
      component.loginForm.get('login')?.setValue('testuser');
      component.loginForm.get('password')?.setValue('test123!');
    });

    it('should handle network error gracefully', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Network error'))
      );

      await component.onSubmit();

      expect(toastService.error).toHaveBeenCalledWith('An error occurred. Please try again');
    });

    it('should set isLoading to false after network error', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Network error'))
      );

      await component.onSubmit();

      expect(component.isLoading()).toBe(false);
    });

    it('should log error to console', async () => {
      spyOn(console, 'error');
      const error = new Error('Network error');

      spyOn(window, 'fetch').and.returnValue(Promise.reject(error));

      await component.onSubmit();

      expect(console.error).toHaveBeenCalledWith('Login error:', error);
    });
  });

  // ===================================
  // 10. UI Integration Tests
  // ===================================
  describe('UI Integration', () => {
    it('should render login and password input fields', () => {
      const compiled = fixture.nativeElement;
      const loginInput = compiled.querySelector('#login');
      const passwordInput = compiled.querySelector('#password');

      expect(loginInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
    });

    it('should show error icon when field has error', () => {
      component.loginForm.get('login')?.setValue('');
      component.loginForm.get('login')?.markAsTouched();
      fixture.detectChanges();

      const errorIcon = fixture.nativeElement.querySelector('.error-icon.show');
      expect(errorIcon).toBeTruthy();
    });

    it('should apply error class to input when field has error', () => {
      component.loginForm.get('login')?.setValue('');
      component.loginForm.get('login')?.markAsTouched();
      fixture.detectChanges();

      const loginInput = fixture.nativeElement.querySelector('#login');
      expect(loginInput.classList.contains('error')).toBe(true);
    });

    it('should display error message below input', () => {
      component.loginForm.get('login')?.setValue('');
      component.loginForm.get('login')?.markAsTouched();
      fixture.detectChanges();

      const errorMessage = fixture.nativeElement.querySelector('.error-message.show');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain('This field is required');
    });
  });
});