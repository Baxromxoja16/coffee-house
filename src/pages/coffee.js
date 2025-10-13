class MenuPage {
    constructor() {
        this.products = [];
        this.categories = {
            coffee: [],
            tea: [],
            dessert: []
        };
        this.currentCategory = 'coffee';
        this.displayLimit = 4;
        this.isLoadMoreVisible = false;
        
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
            const response = await fetch('../products.json');
            this.products = await response.json();
            console.log(this.products)
        } catch (error) {
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
    
    getImagePath(category, index) {
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

        return `../images/dessert-img/${categoryMap[category]}-${newIdx}.${categoryMap[category] === 'coffee' ? 'jpg' : 'png'}`;
    }
    
    createProductCard(product) {
        const card = document.createElement('coffee-card');
        
        const img = document.createElement('img');
        img.slot = 'image';
        img.src = this.getImagePath(product.category, product.index);
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
        
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(price);
        
        return card;
    }
    
    setupCategoryButtons() {
        const tabButtons = document.querySelectorAll('tab-button');
        
        tabButtons.forEach((button, index) => {
            const categories = ['coffee', 'tea', 'dessert'];
            const category = categories[index];
            
            // Birinchi tugma active
            if (index === 0) {
                button.setAttribute('active', 'true');
            }
            
            button.addEventListener('click', () => {
                // Barcha tugmalardan active ni olib tashlash
                tabButtons.forEach(btn => btn.removeAttribute('active'));
                
                // Bosilgan tugmaga active qo'shish
                button.setAttribute('active', 'true');
                
                // Kategoriyani o'zgartirish
                this.currentCategory = category;
                this.displayProducts();
            });
        });
    }
    
    setupResponsive() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.updateDisplayLimit();
                this.displayProducts();
            }, 250);
        });
        
        // Dastlabki limit ni sozlash
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
        
        if (!cardsContent || !productsToShow) return;
        
        // Containerni tozalash
        cardsContent.innerHTML = '';
        
        // Mahsulotlarni ko'rsatish
        const itemsToDisplay = productsToShow.slice(0, this.displayLimit);
        
        itemsToDisplay.forEach(product => {
            const card = this.createProductCard(product);
            cardsContent.appendChild(card);
        });
        
        // Load More tugmasini boshqarish
        this.handleLoadMoreButton(productsToShow.length);
    }
    
    handleLoadMoreButton(totalProducts) {
        const container = document.querySelector('.cards .container');
        let loadMoreBtn = document.querySelector('.load-more-btn');
        
        // Load More kerakmi?
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
        
        const btn = btnContainer.querySelector('button');
        btn.addEventListener('click', () => {
            this.loadMoreProducts();
        });
        
        return btnContainer;
    }
    
    loadMoreProducts() {
        const cardsContent = document.querySelector('.cards-content');
        const productsToShow = this.categories[this.currentCategory];
        
        if (!cardsContent) return;
        
        // Qolgan mahsulotlarni qo'shish
        const remainingProducts = productsToShow.slice(this.displayLimit);
        
        remainingProducts.forEach(product => {
            const card = this.createProductCard(product);
            cardsContent.appendChild(card);
        });
        
        // Load More tugmasini yashirish
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        
        this.isLoadMoreVisible = false;
    }
}

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    const menuPage = new MenuPage();
    
    // Global o'zgaruvchiga saqlash
    window.menuPageInstance = menuPage;
});