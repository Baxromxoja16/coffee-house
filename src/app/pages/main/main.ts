import {
  Component,
  DestroyRef,
  OnInit,
  signal,
  WritableSignal,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  effect
} from '@angular/core';
import { ButtonCarousel } from "../../components/button-carousel/button-carousel";
import { ButtonAppStore } from "../../components/button-app-store/button-app-store";
import { ProductService } from '../../services/product'
import { IProduct } from '../../shared/types/interfaces';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SliderCard } from "../../components/slider-card/slider-card";
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ButtonSecondary } from "../../components/button-secondary/button-secondary";
import { ButtonPrimary } from "../../components/button-primary/button-primary";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonCarousel, ButtonAppStore, SliderCard, CarouselModule, ButtonSecondary, ButtonPrimary],
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class Main implements OnInit, AfterViewInit, OnDestroy {
  favorite: WritableSignal<IProduct[]> = signal([]);
  loading: WritableSignal<boolean> = signal(false);

  // Owl Carousel options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 5000,
    navText: ['', ''],
    nav: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    autoplaySpeed: 600,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };


  constructor(
    private productService: ProductService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  getFavorites() {
    this.loading.set(true);
    this.productService.getFavorite()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => {
          this.favorite.set(data.data || []);
          this.loading.set(false);
        })
      )
      .subscribe();
  }

    // Get image path
    getImagePath(index: number): string {
      return `images/coffee-img/coffee-slider-${index + 1}.png`;
    }
  
    // Format price with discount
    formatPrice(item: IProduct): string {
      if (item.discountPrice && item.discountPrice !== item.price) {
        return `<span style="text-decoration: line-through; opacity: 0.6; margin-right: 8px;">$${item.price}</span> $${item.discountPrice}`;
      }
      return `$${item.price}`;
    }
  
}
