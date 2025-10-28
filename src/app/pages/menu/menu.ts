import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TabButton } from "../../components/tab-button/tab-button";
import { MenuCard } from "../../components/menu-card/menu-card";
import { Category } from '../../shared/types/enums';
import { ProductService } from '../../services/product';
import { tap } from 'rxjs';
import { ApiResponse, IProduct } from '../../shared/types/interfaces';

@Component({
  selector: 'app-menu',
  imports: [TabButton, MenuCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  loading: WritableSignal<boolean> = signal(false);
  products: WritableSignal<IProduct[]> = signal([]);
  productsFiltered: WritableSignal<IProduct[]> = signal([]);

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.loading.set(true);
    this.productService.getProducts()
    .pipe(
      tap((products: ApiResponse) => {
        this.products.set(products.data || []);
        this.filter();
        this.loading.set(false);
      })
    ).subscribe()
  }

  filter(params: Category = Category.Coffee) {
    const filtered = this.products().filter((product) => product.category === params);
    this.productsFiltered.set(filtered)
  }

  protected readonly Category = Category;
}
