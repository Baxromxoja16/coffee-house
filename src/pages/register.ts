class Register {
    
} 

document.addEventListener('DOMContentLoaded', () => {
    const sliderElement = document.querySelector<HTMLElement>('#slider');
    if (sliderElement) {
      const carousel = new Register();
      (window as Window & { carouselInstance?: Register }).carouselInstance = carousel;
    }
  });