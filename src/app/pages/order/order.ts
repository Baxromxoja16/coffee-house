import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonSecondary } from '../../components/button-secondary/button-secondary';
import { ToastService } from '../../shared/services/toast-service';
import { Router } from '@angular/router';
import { CartItem, Order } from '../../shared/types/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [ButtonSecondary, DatePipe],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Orders implements OnInit {
  orders: WritableSignal<Order[]> = signal([]);
  selectedOrder: WritableSignal<Order | null> = signal(null);

  private toast = inject(ToastService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadOrders();

    // optional: listen to orders-updated event to refresh
    window.addEventListener('orders-updated', () => this.loadOrders());
  }

  loadOrders() {
    try {
      const raw = localStorage.getItem('order_history') || '[]';
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        this.orders.set(parsed);
      } else {
        this.orders.set([]);
      }
    } catch {
      this.orders.set([]);
    }
  }

  // open detail
  openDetail(order: Order) {
    this.selectedOrder.set(order);
  }

  closeDetail() {
    this.selectedOrder.set(null);
  }

  // reorder: append order.items to cart (avoid duplicates by id)
  reorder(order: Order | null) {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      const cart = JSON.parse(raw) as CartItem[] | null;
      const currentCart = Array.isArray(cart) ? cart : [];

      const existingIds = new Set(currentCart.map(i => i.id));
      order?.items.forEach(item => {
        if (!existingIds.has(item.id)) {
          currentCart.push(item);
          existingIds.add(item.id);
        }
      });

      localStorage.setItem('cart', JSON.stringify(currentCart));
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: currentCart }));
      this.toast.success('Order items added to cart');
      this.closeDetail();
      // optionally navigate to cart
      this.router.navigate(['/cart']);
    } catch (err) {
      console.error(err);
      this.toast.success('Failed to reorder items');
    }
  }

  // format date helper
  formatDate(iso?: string) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }
}