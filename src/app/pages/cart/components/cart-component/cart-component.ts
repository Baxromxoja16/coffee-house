import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CartItem } from '../../../../shared/types/interfaces';

@Component({
  selector: 'app-cart-component',
  imports: [],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent {
  product: InputSignal<CartItem> = input({} as CartItem);
  deletedProduct: OutputEmitterRef<CartItem> = output();
  openDialogEmitter: OutputEmitterRef<CartItem> = output();

  removeItem(event: MouseEvent) {
    event.stopPropagation();
    this.deletedProduct.emit(this.product());
  }

  openDialog(event: MouseEvent) {
    event.stopPropagation();
    this.openDialogEmitter.emit(this.product());
  }
}
