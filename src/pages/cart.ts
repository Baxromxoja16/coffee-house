import AppError from "../shared/error";
import AppSuccess from "../shared/succes";
import { CartItem, User } from "../types/interfaces";

import '@components/button-secondary/index'
import '@components/button-primary/index'
import '@components/button-social/index'
import '@components/button-burger/index'
import '@components/contact-link/index'
import '@components/menu-link/index'
import '@components/navbar/index'
import '@components/footer/index'
import '@shared/error/index'
import '@shared/succes/index'

class Cart {
    private cart: CartItem[] = [];
    private user: User | null = null;
    private isLoading: boolean = false;
    public success: HTMLElement | null

    constructor() {
        this.init();
        this.success = document.getElementById('appSuccess');
    }

    private async init(): Promise<void> {
        this.loadCart();
        this.checkAuth();
        this.renderCart();
        this.setupEventListeners();
    }

    private loadCart(): void {
        const cartString = localStorage.getItem('cart');
        if (cartString) {
            try {
                this.cart = JSON.parse(cartString);
            } catch (error) {
                console.error('Error parsing cart:', error);
                this.cart = [];
            }
        }
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        // Trigger cart update event for navbar
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: this.cart }));
    }

    private async checkAuth(): Promise<void> {
        const token = localStorage.getItem('access_token');
        if (token) {
            const userString = localStorage.getItem('userData');
            if (userString) {
                try {
                    this.user = JSON.parse(userString);
                } catch (error) {
                    console.error('Error parsing user:', error);
                }
            }
        }
    }

    private renderCart(): void {
        const cartContent = document.querySelector('.cart-content') as HTMLElement;
        const totalPriceSection = document.querySelector('.total-price') as HTMLElement;
        const buttonSection = document.querySelector('.button') as HTMLButtonElement;

        if (!cartContent || !totalPriceSection || !buttonSection) return;

        // Clear content
        cartContent.innerHTML = '';

        if (this.cart.length === 0) {
            if (localStorage.getItem('access_token')) {
                cartContent.innerHTML = `
                    <div class="total-price">
                        <p class="total-title">
                            Total:
                            <span class="all-price">
                                <span class="price-discount">$0.00</span>
                                <span class="price">$0.00</span>
                            </span>
                        </p>
                        <p class="total-title adress">
                            Address:
                            <span class="all-price">
                                <span class="price">${this.user?.city}, ${this.user?.street}, ${this.user?.houseNumber}</span>
                            </span>
                        </p>
                        <p class="total-title pay-by">
                            Pay by:
                            <span class="all-price">
                                <span class="price">${this.user?.paymentMethod}</span>
                            </span>
                        </p>
                    </div>
                `;
            } else {
                cartContent.innerHTML = `
                    <div class="total-price">
                        <p class="total-title">
                            Total:
                            <span class="all-price">
                                <span class="price">$0.00</span>
                            </span>
                        </p>
                    </div>
                `;
            }
            totalPriceSection.style.display = 'none';
            this.renderButtons();
            return;
        }

        // Render cart items
        this.cart.forEach((item, index) => {
            const cartItemHTML = this.createCartItemHTML(item, index);
            cartContent.innerHTML += cartItemHTML;
        });

        // Setup delete buttons
        this.setupDeleteButtons();

        // Render totals
        this.renderTotals();

        // Render buttons
        this.renderButtons();

        totalPriceSection.style.display = 'block';
    }

    private createCartItemHTML(item: CartItem, index: number): string {
        console.log(item);
        return `
            <div class="cart" data-index="${index}">
                <div class="cart-left">
                    <span class="trash" data-index="${index}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <div class="cart-info">
                        <div class="image">
                            <img src="${`/images/dessert-img/${item.category}-${item.id}.jpg`}" alt="${item.name}" width="100%">
                        </div>
                        <div class="info-text">
                            <h3 class="info-title">${item.name}</h3>
                            <p class="info-description">${item.description}</p>
                        </div>
                    </div>
                </div>
                <div class="cart-right">
                    ${item.totalDiscountPrice ? `<div class="price-discount">$${item.totalPrice}</div>` : ''}
                    <div class="price">$${item.totalDiscountPrice || item.totalPrice}</div>
                </div>
            </div>
        `;
    }

    private setupDeleteButtons(): void {
        const deleteButtons = document.querySelectorAll('.trash');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
                this.removeItem(index);
            });
        });
    }

    private removeItem(index: number): void {
        this.cart.splice(index, 1);
        this.saveCart();
        this.renderCart();
    }

    private renderTotals(): void {
        const totalPriceSection = document.querySelector('.total-price');
        if (!totalPriceSection) return;

        const { total, totalDiscount } = this.calculateTotals();
        const hasDiscount = totalDiscount !== total;

        let html = `
            <p class="total-title">
                Total:
                <span class="all-price">
                    ${hasDiscount ? `<span class="price-discount">$${total}</span>` : ''}
                    <span class="price">$${hasDiscount ? totalDiscount : total}</span>
                </span>
            </p>
        `;

        if (this.user) {
            html += `
                <p class="total-title adress">
                    Address:
                    <span class="all-price">
                        <span class="price">${this.user.city}, ${this.user.street}, ${this.user.houseNumber}</span>
                    </span>
                </p>
                <p class="total-title pay-by">
                    Pay by:
                    <span class="all-price">
                        <span class="price">${this.user.paymentMethod === 'cash' ? 'Cash' : 'Card'}</span>
                    </span>
                </p>
            `;
        }

        totalPriceSection.innerHTML = html;
    }

    private calculateTotals(): { total: string; totalDiscount: string } {
        let total = 0;
        let totalDiscount = 0;

        this.cart.forEach(item => {
            total += parseFloat(item.totalPrice);
            totalDiscount += parseFloat(item.totalDiscountPrice || item.totalPrice);
        });

        return {
            total: total.toFixed(2),
            totalDiscount: totalDiscount.toFixed(2)
        };
    }

    private renderButtons(): void {
        const buttonSection = document.querySelector('.button');
        if (!buttonSection) return;

        if (!this.user && this.cart.length > 0) {
            buttonSection.innerHTML = `
                <button-secondary text="Sign In" id="signin-btn"></button-secondary>
                <button-secondary text="Registration" id="register-btn"></button-secondary>
            `;

            this.setupAuthButtons();
        } else if (this.user && this.cart.length > 0) {
            buttonSection.innerHTML = `
                <button-secondary text="Confirm Order" id="confirm-btn"></button-secondary>
            `;

            this.setupConfirmButton();
        } else {
            buttonSection.innerHTML = '';
        }
    }

    private setupAuthButtons(): void {
        const signinBtn = document.getElementById('signin-btn');
        const registerBtn = document.getElementById('register-btn');
        const button = signinBtn?.querySelector('button') as HTMLButtonElement;

        button.disabled = true;
        button.style.opacity =  '1';
        button.style.cursor = 'pointer';

        console.log(signinBtn?.querySelector('button')?.attributes);
        

        signinBtn?.addEventListener('click', () => {
            window.location.href = '/pages/login/index';
        });

        registerBtn?.addEventListener('click', () => {
            window.location.href = '/pages/register/index';
        });
    }

    private setupConfirmButton(): void {
        const confirmBtn = document.getElementById('confirm-btn');
        confirmBtn?.addEventListener('click', () => {
            this.confirmOrder();
        });
    }

    private async confirmOrder(): Promise<void> {
        if (this.isLoading) return;

        this.showLoader();

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                this.showError('Please sign in to place an order');
                return;
            }

            const orderData = {
                items: this.cart.map(item => ({
                    productId: item.id,
                    size: item.size,
                    additives: item.additives,
                    quantity: 1
                })),
                totalPrice: +this.calculateTotals().totalDiscount || +this.calculateTotals().total
            };

            const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/orders/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            if (response.status >= 400) {
                this.showError('Something went wrong. Please, try again');
                return;
            }

            // Success
            this.clearCart();
            this.showSuccess('Thank you for your order! Our manager will contact you shortly.');

            // Redirect after 3 seconds
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);

        } catch (error) {
            console.error('Error confirming order:', error);
            this.showError('Something went wrong. Please, try again');
        } finally {
            this.hideLoader();
        }
    }

    private clearCart(): void {
        this.cart = [];
        localStorage.removeItem('cart');
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
        this.renderCart();
    }

    private showLoader(): void {
        this.isLoading = true;
        const confirmBtn = document.getElementById('confirm-btn');
        const button = confirmBtn?.querySelector('button');
        if (button) {
            button.disabled = true;
            button.textContent = 'Processing...';
            button.style.opacity = '0.6';
        }
    }

    private hideLoader(): void {
        this.isLoading = false;
        const confirmBtn = document.getElementById('confirm-btn');
        const button = confirmBtn?.querySelector('button');
        if (button) {
            button.disabled = false;
            button.textContent = 'Confirm Order';
            button.style.opacity = '1';
        }
    }

    private showError(message: string): void {
        const errorElement = document.getElementById('appError');
        if (errorElement && 'show' in errorElement) {
            (errorElement as AppError).show(message);
        } else {
            alert(message);
        }
    }

    private showSuccess(message: string): void {
        (this.success as AppSuccess).show(message);
    }

    private setupEventListeners(): void {
        // Listen for cart updates from other pages
        window.addEventListener('cart-updated', () => {
            this.loadCart();
            this.renderCart();
        });

        // Listen for auth changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'access_token' || e.key === 'user') {
                this.checkAuth();
                this.renderButtons();
                this.renderTotals();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Cart();
});