import { Component, effect, input, signal } from '@angular/core';
import { IProduct } from '../../shared/types/interfaces';
import { Category } from '../../shared/types/enums';

@Component({
  selector: 'app-menu-card',
  imports: [],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css',
})
export class MenuCard {
  product = input<IProduct>();
  image = signal('')

  constructor() {
    effect(() => {
      this.image.set(this.getImagePath(this.product()?.category, this.product()?.id))
    })
  }

  getImagePath(category: Category = Category.Coffee, index: number = 0) {
    let newIdx = index;
    if(category === 'dessert') {
        newIdx = newIdx - 16;
    } else if(category === 'tea') {
        newIdx = newIdx - 8
    }
    return `images/dessert-img/${category}-${newIdx}.${category === 'coffee' ? 'jpg' : 'png'}`;
}
}
