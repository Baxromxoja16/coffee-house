import AppError from "../shared/error";
import { Categories,  Category,  IProduct } from "../types/interfaces";
import '@components/tab-button/index.ts'
import '@components/button-secondary/index.ts'
import '@components/button-primary/index.ts'
import '@components/button-app-store/index.ts'
import '@components/button-carousel/index.ts'
import '@components/button-social/index.ts'
import '@components/button-burger/index.ts'
import '@components/contact-link/index.ts'
import '@components/menu-link/index.ts'
import '@components/slider-card/index.ts'
import '@components/coffee-card/index.ts'
import '@components/navbar/index.ts'
import '@components/footer/index.ts'
import '@components/popup/index.ts'

class MenuPage {
    products: IProduct[] = [];
    categories: Categories;
    currentCategory: Category;
    displayLimit: number;
    isLoadMoreVisible: boolean;
    err: HTMLElement | null;
    loader: boolean = false;

    constructor() {
        this.products = [];
        this.categories = {
            coffee: [],
            tea: [],
            dessert: []
        };
        this.currentCategory = Category.Coffee;
        this.displayLimit = 4;
        this.isLoadMoreVisible = false;
        this.err = document.getElementById('appError');
        
        this.init();
    }
    
    async init() {
        await this.loadProducts();
        this.organizeByCategory();
        this.setupCategoryButtons();
        this.setupResponsive();
        this.displayProducts();
    }
    
    async loadProducts() {
        try {
            this.loader = true;
            const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products');
            const data = await response.json();

            if(data.error) {
                this.loader = false;
                (this.err as AppError)?.show('Something went wrong. Please, refresh the page');
                return;
            };

            this.products = data.data;
            this.loader = false;

        } catch (error) {
            this.loader = false;
            (this.err as AppError)?.show('Something went wrong. Please, refresh the page');
            console.error('Error loading products:', error);
        }
    }
    
    organizeByCategory() {
        this.products.forEach((product, index) => {
            const category = product.category;
            if (this.categories[category]) {
                this.categories[category].push({
                    ...product,
                    index: index + 1
                });
            }
        });
    }
    
    getImagePath(category: Category, index: number) {
        const categoryMap = {
            'coffee': 'coffee',
            'tea': 'tea',
            'dessert': 'dessert'
        };
        
        let newIdx = index;
        if(categoryMap[category] === 'dessert') {
            newIdx = newIdx - 12;
        } else if(categoryMap[category] === 'tea') {
            newIdx = newIdx - 8
        }

        return `/images/dessert-img/${categoryMap[category]}-${newIdx}.${categoryMap[category] === 'coffee' ? 'jpg' : 'png'}`;
    }
    
    createProductCard(product: IProduct) {
        const card = document.createElement('coffee-card');
        
        const img = document.createElement('img');
        img.slot = 'image';
        img.src = this.getImagePath(product.category, product.index as number);
        img.alt = product.name;
        
        const title = document.createElement('h2');
        title.slot = 'content-title';
        title.className = 'title';
        title.textContent = product.name;
        
        const text = document.createElement('p');
        text.slot = 'content-text';
        text.className = 'text';
        text.textContent = product.description;
        
        const price = document.createElement('span');
        price.slot = 'content-price';
        price.className = 'price';
        price.textContent = `$${product.price}`;

        if(localStorage.getItem('access_token')) {
            const discountPrice = document.createElement('span');
            discountPrice.slot = 'content-discountPrice';
            discountPrice.className = 'content-discountPrice';
            discountPrice.textContent = `$${product.discountPrice}`;
            card.appendChild(discountPrice);
        }
        
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(price);
        
        return card;
    }
    
    setupCategoryButtons() {
        const tabButtons = document.querySelectorAll('tab-button');
        
        tabButtons.forEach((button, index) => {
            const categories = [Category.Coffee, Category.Tea, Category.Dessert];
            const category = categories[index];
            
            if (index === 0) {
                button.children[1].classList.add('active')
            }
            
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => {btn.removeAttribute('active'); btn.children[1].classList.remove('active')});
                button.children[1].classList.add('active')

                this.currentCategory = category;
                this.displayProducts();
            });
        });
    }
    
    setupResponsive() {
        let resizeTimer: NodeJS.Timeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.updateDisplayLimit();
                this.displayProducts();
            }, 250);
        });
        
        this.updateDisplayLimit();
    }
    
    updateDisplayLimit() {
        if (window.innerWidth <= 768) {
            this.displayLimit = 4;
        } else {
            this.displayLimit = 8;
        }
    }
    
    displayProducts() {
        const cardsContent = document.querySelector('.cards-content');
        const productsToShow = this.categories[this.currentCategory];
        console.log(productsToShow);
        
        if (!cardsContent || !productsToShow) return;
        
        cardsContent.innerHTML = '';
        
        const itemsToDisplay = productsToShow.slice(0, this.displayLimit);
        
        itemsToDisplay.forEach(product => {
            const card = this.createProductCard(product);
            this.addListener(card, product.id || 1)
            cardsContent.appendChild(card);
        });
        
        this.handleLoadMoreButton(productsToShow.length);
    }

    addListener(card: HTMLElement, productId: number) {
        card.addEventListener('click', () => {
            const popup = document.createElement('popup-modal');
            popup.setAttribute('productId', productId.toString());

            (document.querySelector('body') as HTMLElement).appendChild(popup);
        })
    }
    
    handleLoadMoreButton(totalProducts: number) {
        const container = document.querySelector('.cards .container') as HTMLElement;
        let loadMoreBtn = document.querySelector('.load-more-btn') as HTMLElement;
        
        const needsLoadMore = window.innerWidth <= 768 && 
                              totalProducts > this.displayLimit && 
                              this.displayLimit === 4;
        
        if (needsLoadMore) {
            if (!loadMoreBtn) {
                loadMoreBtn = this.createLoadMoreButton();
                container.appendChild(loadMoreBtn);
            }
            loadMoreBtn.style.display = 'flex';
            this.isLoadMoreVisible = true;
        } else {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
            this.isLoadMoreVisible = false;
        }
    }
    
    createLoadMoreButton() {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'load-more-btn';
        btnContainer.innerHTML = `
            <button class="load-more">
                <span>Load More</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="#403F3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
        
        const btn = btnContainer.querySelector('button') as HTMLElement;
        btn.addEventListener('click', () => {
            this.loadMoreProducts();
        });
        
        return btnContainer;
    }
    
    loadMoreProducts() {
        const cardsContent = document.querySelector('.cards-content') as HTMLElement;
        const productsToShow = this.categories[this.currentCategory];
        
        if (!cardsContent) return;
        
        const remainingProducts = productsToShow.slice(this.displayLimit);
        
        remainingProducts.forEach(product => {
            const card = this.createProductCard(product);
            cardsContent.appendChild(card);
        });
        
        const loadMoreBtn = document.querySelector('.load-more-btn') as HTMLElement;
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        this.isLoadMoreVisible = false;
    }

    showLoader() {
        this.loader = true;
        document.querySelector('.loader')?.classList.add('show');
    }
    
    hideLoader() {
        this.loader = false;
        (document.querySelector('.loader') as HTMLElement).classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuPage = new MenuPage();
    
    (window as Window as { menuPageInstance?: MenuPage }).menuPageInstance = menuPage;
});