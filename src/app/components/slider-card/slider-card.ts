import { Component, input } from '@angular/core';

@Component({
  selector: 'app-slider-card',
  imports: [],
  templateUrl: './slider-card.html',
  styleUrl: './slider-card.css',
})
export class SliderCard {
  productData = input<{img: string, name: string, description: string, price: string}>();
}
