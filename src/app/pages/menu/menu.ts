import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TabButton } from "../../components/tab-button/tab-button";
import { MenuCard } from "../../components/menu-card/menu-card";
import { Category } from '../../shared/types/enums';
import { ProductService } from '../../services/product';
import { tap } from 'rxjs';
import { ApiResponse, IProduct } from '../../shared/types/interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDialog } from '../../components/product-dialog/product-dialog';

@Component({
  selector: 'app-menu',
  imports: [TabButton, MenuCard],
  providers: [DialogService],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  loading: WritableSignal<boolean> = signal(false);
  products: WritableSignal<IProduct[]> = signal([]);
  productsFiltered: WritableSignal<IProduct[]> = signal([]);
  ref!: DynamicDialogRef<ProductDialog> | null;

  constructor(
    private productService: ProductService,
    private dialogService: DialogService
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

  openDialog(id: number) {
    this.ref = this.dialogService.open(ProductDialog, {
      // width: '70%',
      modal:true,
      data: {
        id
      }
    });

    this.ref?.onClose.subscribe((result: boolean) => {
      console.log('yopildi');
    });
  }

  protected readonly Category = Category;
}
