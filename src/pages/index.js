class CarouselSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.sliderItems = this.slider.querySelector('.slider-items');
        this.slides = Array.from(this.sliderItems.querySelectorAll('slider-card'));
        this.pagination = Array.from(this.slider.querySelectorAll('.slider-pagination span'));
        this.prevButton = this.slider.querySelector('.slider-buttons button-carousel:first-child');
        this.nextButton = this.slider.querySelector('.slider-buttons button-carousel:last-child');
        
        this.currentIndex = 0;
        this.autoPlayInterval = 6000; 
        this.autoPlayTimer = null;
        this.progressTimer = null;
        this.isPaused = false;
        this.progressWidth = 0;
        this.progressStep = 100 / (this.autoPlayInterval / 50); 
        
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.setupSlides();
        this.setupEventListeners();
        this.showSlide(this.currentIndex);
        this.startAutoPlay();
    }
    
    setupSlides() {
        
        this.slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
            slide.style.opacity = index === 0 ? '1' : '0';
        });
    }
    
    setupEventListeners() {
        
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        
        this.pagination.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        
        this.sliderItems.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.sliderItems.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        
        this.sliderItems.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoPlay();
        }, { passive: true });
        
        this.sliderItems.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
            this.resumeAutoPlay();
        }, { passive: true });
        
        
        [this.prevButton, this.nextButton].forEach(btn => {
            btn.addEventListener('mouseenter', () => this.pauseAutoPlay());
            btn.addEventListener('mouseleave', () => this.resumeAutoPlay());
        });
    }
    
    handleSwipe() {
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
    
    showSlide(index, direction = 'next') {
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];
        
        
        this.animateTransition(currentSlide, nextSlide, direction);
        
        
        this.pagination[this.currentIndex].classList.remove('active');
        this.pagination[index].classList.add('active');
        
        this.currentIndex = index;
        this.resetProgress();
    }
    
    animateTransition(currentSlide, nextSlide, direction) {
        const isNext = direction === 'next';
        
        
        const currentHeight = currentSlide.offsetHeight;
        this.sliderItems.style.height = currentHeight + 'px';
        this.sliderItems.style.position = 'relative';
        
        
        nextSlide.style.display = 'block';
        nextSlide.style.position = 'absolute';
        nextSlide.style.top = '0';
        nextSlide.style.left = '0';
        nextSlide.style.right = '0';
        nextSlide.style.transform = isNext ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlide.style.opacity = '1';
        nextSlide.style.transition = 'none';
        
        
        currentSlide.style.position = 'absolute';
        currentSlide.style.top = '0';
        currentSlide.style.left = '0';
        currentSlide.style.right = '0';
        currentSlide.style.transform = 'translateX(0)';
        currentSlide.style.opacity = '1';
        
        
        nextSlide.offsetHeight;
        
        
        nextSlide.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        currentSlide.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        
        
        requestAnimationFrame(() => {
            currentSlide.style.opacity = '0';
            currentSlide.style.transform = isNext ? 'translateX(-100%)' : 'translateX(100%)';
            
            nextSlide.style.transform = 'translateX(0)';
            nextSlide.style.opacity = '1';
        });
        
        
        setTimeout(() => {
            
            currentSlide.style.display = 'none';
            currentSlide.style.position = '';
            currentSlide.style.transform = '';
            currentSlide.style.opacity = '';
            currentSlide.style.left = '';
            currentSlide.style.right = '';
            currentSlide.style.top = '';
            currentSlide.style.transition = '';
            
            
            nextSlide.style.position = '';
            nextSlide.style.transform = '';
            nextSlide.style.transition = '';
            nextSlide.style.left = '';
            nextSlide.style.right = '';
            nextSlide.style.top = '';
            nextSlide.style.opacity = '';
            
            
            const newHeight = nextSlide.offsetHeight;
            this.sliderItems.style.height = newHeight + 'px';
        }, 500);
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex, 'next');
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex, 'prev');
    }
    
    goToSlide(index) {
        if (index !== this.currentIndex) {
            const direction = index > this.currentIndex ? 'next' : 'prev';
            this.showSlide(index, direction);
        }
    }
    
    startAutoPlay() {
        this.autoPlayTimer = setTimeout(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
            this.startAutoPlay();
        }, this.autoPlayInterval);
        
        this.startProgress();
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        this.stopProgress();
    }
    
    pauseAutoPlay() {
        this.isPaused = true;
        this.stopProgress();
    }
    
    resumeAutoPlay() {
        this.isPaused = false;
        this.startProgress();
    }
    
    startProgress() {
        this.stopProgress();
        
        this.progressTimer = setInterval(() => {
            if (!this.isPaused) {
                this.progressWidth += this.progressStep;
                
                if (this.progressWidth >= 100) {
                    this.progressWidth = 100;
                }
                
                this.updateProgressBar();
            }
        }, 50);
    }
    
    stopProgress() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }
    
    resetProgress() {
        this.progressWidth = 0;
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        this.pagination.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.style.background = `linear-gradient(to right, var(--boder-dark) ${this.progressWidth}%, var(--boder-ligtht) ${this.progressWidth}%)`;
            } else {
                dot.style.background = 'var(--boder-ligtht)';
            }
        });
    }
    
    destroy() {
        this.stopAutoPlay();
        this.stopProgress();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sliderElement = document.querySelector('#slider');
    if (sliderElement) {
        const carousel = new CarouselSlider(sliderElement);
        
        
        window.carouselInstance = carousel;
    }
});