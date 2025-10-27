// src/app/toast/toast.service.ts
import { Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Toast, ToastType } from '../types/interfaces';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts: Signal<Toast[]> = this._toasts;

  private idCounter = 0;
  private DEFAULT = 3000;

  private setToasts(next: Toast[]) {
    this._toasts.set(next);
  }

  private pushToast(toast: Toast) {
    this.setToasts([toast, ...this._toasts()]);
    if (toast.duration > 0) {
      const timer = window.setTimeout(() => {
        this.remove(toast.id);
      }, toast.duration);
    }
  }

  show(message: string, type: ToastType = 'success', durationMs?: number) {
    const id = ++this.idCounter;
    const toast: Toast = {
      id,
      type,
      message,
      duration: durationMs ?? this.DEFAULT,
      createdAt: Date.now()
    };
    this.pushToast(toast);
    return id;
  }

  success(message: string, durationMs?: number) {
    return this.show(message, 'success', durationMs);
  }

  error(message: string, durationMs?: number) {
    return this.show(message, 'error', durationMs);
  }

  warning(message: string, durationMs?: number) {
    return this.show(message, 'warning', durationMs);
  }

  remove(id: number) {
    this.setToasts(this._toasts().filter(t => t.id !== id));
  }

  clear() {
    this.setToasts([]);
  }
}
