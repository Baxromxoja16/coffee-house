import { Component, computed, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItem, User } from '../../shared/types/interfaces';
import { UpperCasePipe } from '@angular/common';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { Router, RouterLink } from "@angular/router";
import { ToastService } from '../../shared/services/toast-service';
import { ProductService } from '../../services/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDialog } from '../../components/product-dialog/product-dialog';
import { CartComponent } from "./components/cart-component/cart-component";

@Component({
  selector: 'app-cart',
  imports: [UpperCasePipe, ButtonSecondary, RouterLink, CartComponent],
  providers: [DialogService],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  products: WritableSignal<CartItem[]> = signal([]);
  user: WritableSignal<User> = signal({} as User);
  ref!: DynamicDialogRef<ProductDialog> | null;

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
    private destroyRef: DestroyRef,
    private dialogService: DialogService,
    private router: Router,
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

  openDialog(product: CartItem) {
    // console.log(product, 'opeeeen');
    this.ref = this.dialogService.open(ProductDialog, {
      // width: '70%',
      modal:true,
      data: {
        id: product.id
      }
    });

    this.ref?.onClose.subscribe(() => {
      this.products.set(this.getProducts());
    })
  }

  removeItem(product: CartItem) {
    const newProduct = this.products().filter((item: CartItem) => product.id !== item.id);

    this.products.set(newProduct);

    localStorage.setItem('cart', JSON.stringify(this.products()));

    this.toastService.success(product.name + ' deleted successfully');

    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  confirm() {
    const orderData = {
      items: this.products().map(item => ({
        productId: item.id,
        size: item.currentSize?.size,
        additives: item.currentAdditive ? [item.currentAdditive.name] : [],
        quantity: 1
      })),
      totalPrice: this.totalProducts().discountPrice || this.totalProducts().price
    };

    this.productService.confirm(orderData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => {
          if (data?.error) return;
          this.toastService.success('Thank you for your order! Our manager will contact you shortly.');
          this.orderHistory();
        })
      ).subscribe();
  }

  orderHistory() {
    const cart = this.getProducts();
    if (!cart || cart.length === 0) {
      this.toastService.success('Cart is empty');
      return;
    }

    // build order object
    const orderId = `order_${Date.now()}`;
    const createdAt = new Date().toISOString();
    const status: 'pending' = 'pending';
    const itemsSnapshot = structuredClone(cart);

    const totals = this.computeTotals(itemsSnapshot);

    const order = {
      id: orderId,
      createdAt,
      status,
      items: itemsSnapshot,
      totals
    };

    // save to localStorage order_history
    try {
      const raw = localStorage.getItem('order_history');
      let arr: any[] = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) arr = parsed;
      }
      // add new order at beginning (reverse-chronological)
      arr.unshift(order);
      localStorage.setItem('order_history', JSON.stringify(arr));
    } catch (err) {
      this.toastService.success('Failed to save order locally');
      return;
    }

    // clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    this.products.set([]);

    window.dispatchEvent(new CustomEvent('cart-updated', { detail: null }));

    this.toastService.success('Thank you for your order! Our manager will contact you shortly :)');
  }

  private computeTotals(items: CartItem[]) {
    let subtotal = 0;
    let discountTotal = 0;
    let shipping = 0; // default, change if you have shipping logic

    items.forEach(i => {
      const p = parseFloat(String(i.totalPrice?.price ?? '0')) || 0;
      const d = parseFloat(String(i.totalPrice?.discountPrice ?? i.totalPrice?.price ?? '0')) || 0;
      subtotal += p;
      discountTotal += d;
    });

    const total = (discountTotal && discountTotal !== 0) ? discountTotal : subtotal;
    return {
      subtotal,
      discountTotal,
      shipping,
      total
    };
  }

  get getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
