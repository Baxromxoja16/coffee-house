import { Component, computed, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItem, User } from '../../shared/types/interfaces';
import { UpperCasePipe } from '@angular/common';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { RouterLink } from "@angular/router";
import { ToastService } from '../../shared/services/toast-service';
import { ProductService } from '../../services/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [UpperCasePipe, ButtonSecondary, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  products: WritableSignal<CartItem[]> = signal([]);
  user: WritableSignal<User> = signal({} as User);

  totalProducts = computed(() => {
    const result = { price: 0, discountPrice: 0 };

    if (this.products().length <= 0) return result;

    this.products().forEach((value) => {
      result.price += +value.totalPrice.price
      result.discountPrice += +value.totalPrice.discountPrice
    })
    return result;
  });

  constructor(
    private toastService: ToastService,
    private productService: ProductService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.setUser()
    this.products.set(this.getProducts());
    this.totalProducts()
  }

  getProducts(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  setUser(): void {
    this.user.set(JSON.parse(localStorage.getItem('userData') || '{}'));
  }

  isAuth(): boolean {
    return !!localStorage.getItem('access_token');
  }

  confirm() {
    const orderData = {
      items: this.products().map(item => ({
        productId: item.id,
        size: item.currentSize.size,
        additives: [item.currentAdditive.name],
        quantity: 1
      })),
      totalPrice: this.totalProducts().discountPrice || this.totalProducts().price
    };

    this.productService.confirm(orderData)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((data) => {
        if(data.error) return;
        console.log(data);
        this.toastService.success('Thank you for your order! Our manager will contact you shortly.');
      })
    ).subscribe()
  }

  get getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
