import { Component, computed, DestroyRef, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonSecondary } from "../button-secondary/button-secondary";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../services/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Additive, CartItem, IProduct, IProductDetail, SizeEntry } from '../../shared/types/interfaces';
import { tap } from 'rxjs';
import { TabButton } from "../tab-button/tab-button";
import { SizesMap } from "../../shared/types/interfaces";
import { TooltipModule } from 'primeng/tooltip';
import { ToastService } from '../../shared/services/toast-service';
import { Category } from '../../shared/types/enums';

@Component({
  selector: 'app-product-dialog',
  imports: [ButtonSecondary, TabButton, TooltipModule],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.css',
})
export class ProductDialog implements OnInit {
  loading: WritableSignal<boolean> = signal(false);
  image = signal('')
  product: WritableSignal<IProductDetail> = signal({} as IProductDetail);
  currentSize: WritableSignal<SizeEntry> = signal({price:'0', size: '', discountPrice: undefined});
  currentAdditive: WritableSignal<Additive> = signal({price:'0', name: '', discountPrice: undefined});
  totalPrice = computed(() => {
    const size = this.currentSize();
    const additive = this.currentAdditive();
  
    // Original prices (without discount)
    const sizeOriginalPrice = +(size.price || 0);
    const additiveOriginalPrice = +(additive.price || 0);
    
    // Discounted prices (if discount exists, use it, otherwise use original)
    const sizeDiscountedPrice = size.discountPrice ? +size.discountPrice : sizeOriginalPrice;
    const additiveDiscountedPrice = additive.discountPrice ? +additive.discountPrice : additiveOriginalPrice;
  
    // Totals
    const totalOriginal = sizeOriginalPrice + additiveOriginalPrice;
    const totalDiscounted = sizeDiscountedPrice + additiveDiscountedPrice;
  
    const hasDiscount = totalOriginal !== totalDiscounted;
  
    return {
      price: totalOriginal.toFixed(2),
      discountPrice: totalDiscounted.toFixed(2),
      hasDiscount: hasDiscount
    };
  });

  constructor(
    private ref: DynamicDialogRef,
    private productService: ProductService,
    private destroyRef: DestroyRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private toastService: ToastService,
  ) {
    effect(() => {
      this.image.set(this.getImagePath(this.product()?.category, this.product()?.id))
    })
  }

  ngOnInit(): void {
    this.getProduct(this.dynamicDialogConfig.data?.id)
  }

  addToCart() {
    const productsFromCart: IProductDetail[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const productDetails: CartItem = {
      id: this.product().id,
      name: this.product().name,
      category: this.product().category,
      image: this.image(),
      description: this.product().description,
      totalPrice: this.totalPrice(),
      currentAdditive: this.currentAdditive(),
      currentSize: this.currentSize(),
    }

    const filtered = productsFromCart.filter((item) => item.id !== this.product().id);

    localStorage.setItem('cart', JSON.stringify([...filtered, productDetails]));

    this.toastService.success('Product add to cart!');
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: productDetails }));
    this.closeDialog('add');
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

  chooseSize(size: SizeEntry | undefined) {
    this.currentSize.set(size as SizeEntry);
  }

  chooseAdditive(additive: Additive | undefined) {
    this.currentAdditive.set(additive as Additive);
  }


  closeDialog(params: 'close' | 'add' = 'close') {
    if(params === 'add') {
      // show alert message and add to cart; and return
      this.ref?.close({result: true})
    }

    this.ref?.close({result: true})
  }

  getImagePath(category: Category = Category.Coffee, index: number = 0) {
    let newIdx = index;
    if(category === 'dessert') {
        newIdx = newIdx - 16;
    } else if(category === 'tea') {
        newIdx = newIdx - 8
    }
    return `/images/dessert-img/${category}-${newIdx}.${category === 'coffee' ? 'jpg' : 'png'}`;
}
}
