import '../shared/error/index'
import AppError from '../shared/error';
import AppSuccess from '../shared/succes';

interface FavoriteProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
  image?: string;
}

interface ApiResponse {
  data: FavoriteProduct[];
  error?: string;
  isTestError?: boolean;
  timestamp?: Date
}

class CarouselSlider {
  private slider: HTMLElement;
  private sliderItems: HTMLElement;
  private slides: HTMLElement[] = [];
  private pagination: HTMLElement[];
  private prevButton: HTMLElement | null;
  private nextButton: HTMLElement | null;
  public err: HTMLElement | null;

  private currentIndex = 0;
  private autoPlayInterval = 6000;
  private autoPlayTimer: ReturnType<typeof setTimeout> | null = null;
  private progressTimer: ReturnType<typeof setInterval> | null = null;
  private isPaused = false;
  private progressWidth = 0;
  private progressStep = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  public loader: boolean = false;

  constructor(sliderElement: HTMLElement) {
    this.slider = sliderElement;
    this.err = document.getElementById('appError');

    const items = this.slider.querySelector('.slider-items');

    if (!items || !(items instanceof HTMLElement)) {
      throw new Error('Slider: .slider-items element not found');
    }
    this.sliderItems = items;

    this.pagination = Array.from(this.slider.querySelectorAll('.slider-pagination span')) as HTMLElement[];
    this.prevButton = this.slider.querySelector('.slider-buttons button-carousel:first-child');
    this.nextButton = this.slider.querySelector('.slider-buttons button-carousel:last-child');

    this.progressStep = 100 / (this.autoPlayInterval / 50);

    this.init();
  }

  private async init(): Promise<void> {
    await this.loadFavorites();
    this.slides = Array.from(this.sliderItems.querySelectorAll('slider-card')) as HTMLElement[];
    this.setupSlides();
    this.setMaximumHeight(this.slides)
    this.setupEventListeners();
    this.showSlide(this.currentIndex);
    this.startAutoPlay();
  }

  private async loadFavorites(): Promise<void> {
    try {
      this.loader = true;
      const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites');
      const result: ApiResponse = await response.json();
      if (result.error) {
        (this.err as AppError)?.show('Something went wrong. Please, refresh the page');
        return;
      };
      const products = result.data;
      this.loader = false;

      this.sliderItems.innerHTML = '';
      products.forEach((product, index) => {
        const card = this.createSliderCard(product, index + 1);
        this.sliderItems.appendChild(card);
      });

      // Update pagination dots count
      const paginationContainer = this.slider.querySelector('.slider-pagination');
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
        products.forEach((_, index) => {
          const span = document.createElement('span');
          if (index === 0) span.classList.add('active');
          paginationContainer.appendChild(span);
        });
        this.pagination = Array.from(paginationContainer.querySelectorAll('span')) as HTMLElement[];
      }

    } catch (error) {
      this.loader = false;
      console.error('Error loading favorites:', error);
    }
  }

  private createSliderCard(product: FavoriteProduct, imageIndex: number): HTMLElement {
    const card = document.createElement('slider-card');

    const img = document.createElement('img');
    img.slot = 'image';
    img.src = `./images/coffee-img/coffee-slider-${imageIndex}.png`;
    img.alt = product.name;

    const title = document.createElement('h2');
    title.slot = 'content-title';
    title.className = 'title';
    title.textContent = product.name;

    const text = document.createElement('p');
    text.slot = 'content-text';
    text.className = 'text';
    text.textContent = product.description;

    const priceSpan = document.createElement('span');
    priceSpan.slot = 'content-price';
    priceSpan.className = 'price';

    if (product.discountPrice) {
      priceSpan.innerHTML = `<span style="text-decoration: line-through; opacity: 0.6; margin-right: 8px;">$${product.price}</span>$${product.discountPrice}`;
    } else {
      priceSpan.textContent = `$${product.price}`;
    }

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(priceSpan);

    return card;
  }

  private setupSlides(): void {
    this.slides.forEach((slide, index) => {
      if (index === 0) {
        slide.style.display = 'block';
        slide.style.opacity = '1';
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
    });
  }

  private setupEventListeners(): void {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.nextSlide());
    }

    this.pagination.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    this.sliderItems.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.sliderItems.addEventListener('mouseleave', () => this.resumeAutoPlay());

    this.sliderItems.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        const touch = e.changedTouches?.[0];
        if (touch) this.touchStartX = touch.screenX;
        this.pauseAutoPlay();
      },
      { passive: true }
    );

    this.sliderItems.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        const touch = e.changedTouches?.[0];
        if (touch) this.touchEndX = touch.screenX;
        this.handleSwipe();
        this.resumeAutoPlay();
      },
      { passive: true }
    );

    [this.prevButton, this.nextButton].forEach((btn) => {
      if (!btn) return;
      btn.addEventListener('mouseenter', () => this.pauseAutoPlay());
      btn.addEventListener('mouseleave', () => this.resumeAutoPlay());
    });
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  private showSlide(index: number, direction: 'next' | 'prev' = 'next'): void {
    if (index < 0 || index >= this.slides.length) return;

    const currentSlide = this.slides[this.currentIndex];
    const nextSlide = this.slides[index];

    this.animateTransition(currentSlide, nextSlide, direction);

    if (this.pagination[this.currentIndex]) {
      this.pagination[this.currentIndex].classList.remove('active');
    }
    if (this.pagination[index]) {
      this.pagination[index].classList.add('active');
    }

    this.currentIndex = index;
    this.resetProgress();
  }

  showLoader() {
    this.loader = true;
    document.querySelector('.loader')?.classList.add('show');
  }

  hideLoader() {
    this.loader = false;
    (document.querySelector('.loader') as HTMLElement).classList.remove('show');
  }

  private animateTransition(currentSlide: HTMLElement, nextSlide: HTMLElement, direction: 'next' | 'prev'): void {
    const isNext = direction === 'next';

    // Container ni prepare qilish
    this.sliderItems.style.position = 'relative';
    this.sliderItems.style.overflow = 'hidden';

    // Current slide height ni saqlash
    const currentHeight = currentSlide.offsetHeight;
    this.sliderItems.style.minHeight = `${currentHeight}px`;

    // Current slide ni prepare qilish
    currentSlide.style.position = 'absolute';
    currentSlide.style.top = '0';
    currentSlide.style.left = '0';
    currentSlide.style.width = '100%';
    currentSlide.style.transform = 'translateX(0)';
    currentSlide.style.opacity = '1';
    currentSlide.style.transition = 'none';
    currentSlide.style.zIndex = '1';

    // Next slide ni prepare qilish
    nextSlide.style.display = 'block';
    nextSlide.style.position = 'absolute';
    nextSlide.style.top = '0';
    nextSlide.style.left = '0';
    nextSlide.style.width = '100%';
    nextSlide.style.transform = isNext ? 'translateX(100%)' : 'translateX(-100%)';
    nextSlide.style.opacity = '1';
    nextSlide.style.transition = 'none';
    nextSlide.style.zIndex = '2';

    // Force reflow
    void nextSlide.offsetHeight;

    // Transition qo'shish
    currentSlide.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    nextSlide.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    // Animatsiyani boshlash
    requestAnimationFrame(() => {
      currentSlide.style.transform = isNext ? 'translateX(-100%)' : 'translateX(100%)';
      currentSlide.style.opacity = '0';

      nextSlide.style.transform = 'translateX(0)';
      nextSlide.style.opacity = '1';
    });

    // Cleanup after animation
    window.setTimeout(() => {
      // Current slide ni yashirish
      currentSlide.style.display = 'none';
      currentSlide.style.position = 'static';
      currentSlide.style.transform = '';
      currentSlide.style.opacity = '';
      currentSlide.style.transition = '';
      currentSlide.style.zIndex = '';
      currentSlide.style.width = '';

      // Next slide ni normalize qilish
      nextSlide.style.position = 'static';
      nextSlide.style.transform = '';
      nextSlide.style.transition = '';
      nextSlide.style.zIndex = '';
      nextSlide.style.width = '';

      // Height ni yangilash
      const newHeight = nextSlide.offsetHeight;
      this.sliderItems.style.minHeight = `${newHeight}px`;

      // Overflow ni tiklash
      setTimeout(() => {
        this.sliderItems.style.overflow = 'visible';
      }, 50);
    }, 600); // 600ms - transition duration
  }

  private async setMaximumHeight(cards: HTMLElement[]): Promise<void> {
    // Barcha cardlarni ko'rsatib height ni o'lchash
    let maxHeight = 0;

    cards.forEach(card => {
      card.style.display = 'block';
      card.style.position = 'static';
      // card.style.visibility = 'hidden';
      // card.style.opacity = '0';
      const height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // Maximum height ni set qilish
    this.sliderItems.style.height = `${maxHeight}px`;

    // Birinchi carddan tashqari hammasini yashirish
    cards.forEach((card, index) => {
      card.style.visibility = 'visible';
      card.style.opacity = '1';
      if (index === 0) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  private nextSlide(): void {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex, 'next');
  }

  private prevSlide(): void {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex, 'prev');
  }

  private goToSlide(index: number): void {
    if (index !== this.currentIndex) {
      const direction = index > this.currentIndex ? 'next' : 'prev';
      this.showSlide(index, direction);
    }
  }

  private startAutoPlay(): void {
    this.autoPlayTimer = window.setTimeout(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
      this.startAutoPlay();
    }, this.autoPlayInterval);

    this.startProgress();
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    this.stopProgress();
  }

  private pauseAutoPlay(): void {
    this.isPaused = true;
    this.stopProgress();
  }

  private resumeAutoPlay(): void {
    this.isPaused = false;
    this.startProgress();
  }

  private startProgress(): void {
    this.stopProgress();

    this.progressTimer = window.setInterval(() => {
      if (!this.isPaused) {
        this.progressWidth += this.progressStep;

        if (this.progressWidth >= 100) {
          this.progressWidth = 100;
        }

        this.updateProgressBar();
      }
    }, 50);
  }

  private stopProgress(): void {
    if (this.progressTimer !== null) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  private resetProgress(): void {
    this.progressWidth = 0;
    this.updateProgressBar();
  }

  private updateProgressBar(): void {
    this.pagination.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.style.background = `linear-gradient(to right, var(--boder-dark) ${this.progressWidth}%, var(--boder-ligtht) ${this.progressWidth}%)`;
      } else {
        dot.style.background = 'var(--boder-ligtht)';
      }
    });
  }

  public destroy(): void {
    this.stopAutoPlay();
    this.stopProgress();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderElement = document.querySelector<HTMLElement>('#slider');
  if (sliderElement) {
    const carousel = new CarouselSlider(sliderElement);
    (window as Window & { carouselInstance?: CarouselSlider }).carouselInstance = carousel;
  }

  const message = localStorage.getItem('toastMessage');
  if (message) {
    const toast = document.getElementById('appSuccess') as AppSuccess;
    toast.show(message);
    localStorage.removeItem('toastMessage');
  }
});
