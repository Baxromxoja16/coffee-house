import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast-service';
import { Toast } from '../../types/interfaces';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.html',
  styleUrls: ['./toast-container.css']
})
export class ToastContainer {
  toasts!: Signal<Toast[]>;

  visibleToasts = computed(() => this.toasts().slice(0, 5));

  constructor(private toastService: ToastService) {
    this.toasts = this.toastService.toasts;
  }

  close(id: number) {
    this.toastService.remove(id);
  }

  icon(type: string) {
    if (type === 'success') return '✓';
    if (type === 'error') return '✕';
    return '!';
  }
}
