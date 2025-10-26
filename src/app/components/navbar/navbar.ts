import { Component, computed, effect, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartItem } from '../../types/interfaces';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isBurgerOpen = signal(false);
  cartCount = signal(0);

  // Computed values
  cartItems = computed(() => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  });

  constructor(private router: Router) {
    // Cart listener setup
    this.setupCartListener();

    // Initial cart count
    this.updateCartCount();

    // Window resize effect
    effect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', () => {
          if (window.innerWidth > 768 && this.isBurgerOpen()) {
            this.closeBurgerMenu();
          }
        });
      }
    });
  }

  private setupCartListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', (e: Event) => {
        const customEvent = e as CustomEvent<CartItem[]>;
        const count = customEvent.detail?.length ?? this.getCartCount();
        this.cartCount.set(count);
      });
    }
  }

  private updateCartCount(): void {
    this.cartCount.set(this.getCartCount());
  }

  private getCartCount(): number {
    if (typeof localStorage === 'undefined') return 0;
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart).length : 0;
  }

  toggleBurgerMenu(): void {
    if (this.isBurgerOpen()) {
      this.closeBurgerMenu();
    } else {
      this.openBurgerMenu();
    }
  }

  openBurgerMenu(): void {
    this.isBurgerOpen.set(true);
  }

  closeBurgerMenu(): void {
    this.isBurgerOpen.set(false);
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    this.closeBurgerMenu();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

}
