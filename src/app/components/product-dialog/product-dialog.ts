import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonSecondary } from "../button-secondary/button-secondary";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../services/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProductDetail } from '../../shared/types/interfaces';
import { tap } from 'rxjs';
import { TabButton } from "../tab-button/tab-button";
import { SizesMap } from "../../shared/types/interfaces";
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-product-dialog',
  imports: [ButtonSecondary, TabButton, TooltipModule],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.css',
})
export class ProductDialog implements OnInit {
  loading: WritableSignal<boolean> = signal(false);
  product: WritableSignal<IProductDetail> = signal({} as IProductDetail);
  
  constructor(
    private ref: DynamicDialogRef,
    private productService: ProductService,
    private destroyRef: DestroyRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getProduct(this.dynamicDialogConfig.data?.id)
  }

  getProduct(id: number) {
    this.loading.set(true);
    this.productService.getProduct(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((product) => {
        if(product.error) {
          this.ref?.close({result: true})
        }
        this.product.set(product.data || ({} as IProductDetail));
        this.loading.set(false);
      })
    ).subscribe()
  }

  getObjectKeys(object: SizesMap | undefined): (keyof SizesMap)[] {
    if (!object) return [];
    return Object.keys(object ?? {}) as (keyof SizesMap)[]
  }

  formatTooltipContent(price: string, discountPrice?: string): string {
    if (true && discountPrice && discountPrice !== price) { // islogin true ni o'rgniga
      return `<span style="text-decoration: line-through; opacity: 0.7; margin-right: 8px;">$${price}</span><span style="color: #B0907A; font-weight: 600;">$${discountPrice}</span>`;
    }
    return `$${price}`;
  }


  closeDialog(params: 'close' | 'add' = 'close') {
    if(params === 'add') {
      // show alert message and add to cart; and return
      this.ref?.close({result: true})
    }

    this.ref?.close({result: true})
  }
}
