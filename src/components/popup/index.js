class Popup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.productData = null;
        this.selectedSize = 's';
        this.selectedAdditives = [];
        this.isLoading = false;
        this.open(1)
    }
  
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .overlay {
                width: 100%;
                height: 100%;
                background: var(--backdrop);
                position: fixed;
                top: 0;
                left: 0;
                z-index: 3;
                display: none;
            }

            .overlay.show {
                display: block;
            }

            .loader {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 5;
                display: none;
            }

            .loader.show {
                display: block;
            }

            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--boder-ligtht);
                border-top: 4px solid var(--accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .modal {
                max-width: 800px;
                border-radius: 40px;
                position: fixed;
                top: 50%;
                left: 50%;
                z-index: 4;
                transform: translate(-50%, -50%);
                background: var(--body);
                display: none;
                gap: 20px;
            }

            .modal.show {
                display: flex;
            }

            .modal .close-icon {
                position: absolute;
                top: -38px;
                right: 0px;
                cursor: pointer;
                z-index: 5;
                background: transparent;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
                border: 1px solid var(--boder-ligtht);
            }

            .modal .close-icon:hover {
                
            }

            .modal .close-icon:hover svg path {
                stroke: var(--light);
            }

            .modal .modal-img {
                width: 19.5em;
                height: 19.5em;
                position: relative;
                margin: 0 auto;
                overflow: hidden;
                top: 12px;
                left: 14px;
                border-radius: 36px;
            }
            
            .modal .modal-img img {
                padding: 15px;
                border-radius: 63px;
                position: absolute;
                left: -35px;
                width: 123%;
                top: -33px;
            }
            
            .modal .modal-info {
                max-width: 438px;
                padding: 16px;
            }
            
            .modal .modal-info .modal-title {
                font-size: 24px;
                line-height: 125%;
                color: var(--dark);
                margin-bottom: 12px;
            }

            .modal .modal-info .modal-description {
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                color: var(--dark);
                margin-bottom: 20px;
            }

            .modal .modal-info .modal-size .size-label,
            .modal .modal-info .modal-additives .size-label {
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                color: var(--dark);
            }
            
            .modal .modal-info .modal-additives .size-item,
            .modal .modal-info .modal-size .size-item {
                margin-top: 8px;
                margin-bottom: 20px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                position: relative;
            }

            .tooltip {
                position: absolute;
                bottom: calc(100% + 8px);
                left: 50%;
                transform: translateX(-50%);
                background: var(--dark);
                color: var(--light);
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 10;
            }

            .tooltip.show {
                opacity: 1;
            }

            .tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 6px solid transparent;
                border-top-color: var(--dark);
            }

            .modal .modal-info .total {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-family: Inter;
                font-weight: 600;
                font-size: 24px;
                line-height: 125%;
                color: var(--dark);
                margin-bottom: 20px;
            }
            
            .modal .modal-info .modal-alert {
                font-family: Inter;
                font-size: 10px;
                line-height: 140%;
                vertical-align: middle;
                color: var(--dark);
                display: flex;
                gap: 12px;
                margin-bottom: 20px;
                border-top: 1px solid var(--boder-ligtht);
                padding: 12px 0;
            }
            .modal .modal-info .modal-alert .alert-text {
                margin: 0;
            }
            
            .modal .modal-info .modal-buttons {
                display: flex;
                gap: 8px;
            }

            .modal .modal-info .modal-buttons button-secondary {
                flex: 1;
            }

            .modal .modal-info .modal-buttons button-secondary button {
                width: 100% !important;
            }

            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #ff4444;
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: none;
                animation: slideDown 0.3s ease;
            }

            .notification.show {
                display: block;
            }

            @keyframes slideDown {
                from {
                    transform: translateX(-50%) translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }

            @media (max-width: 768px) {
                .modal {
                    flex-direction: column;
                    max-width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .modal .modal-img {
                    width: 100%;
                    height: 300px;
                }
            }
        </style>

        <div>
            <div class="notification"></div>
            <div class="overlay show"></div>
            <div class="loader show">
                <div class="loader-spinner"></div>
            </div>
            <div class="modal">
                <div class="close-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12M4 4L12 12" stroke="#c1b6ad" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="modal-img">
                    <img src="" alt="product">
                </div>
                <div class="modal-info">
                    <h2 class="modal-title"></h2>
                    <p class="modal-description"></p>
                    <div class="modal-size">
                        <span class="size-label">Size</span>
                        <div class="size-item"></div>
                    </div>
                    <div class="modal-additives">
                        <span class="size-label">Additives</span>
                        <div class="size-item"></div>
                    </div>

                    <div class="total">
                        <p class="total-label">Total:</p>
                        <p class="total-price">$0.00</p>
                    </div>

                    <div class="modal-alert">
                        <span class="icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_268_12877)">
                                <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>                        
                        </span>
                        <p class="alert-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                    </div>

                    <div class="modal-buttons">
                        <button-secondary class="add-to-cart" text="Add to Cart"></button-secondary>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    setupEventListeners() {
        const overlay = this.shadowRoot.querySelector('.overlay');
        const modal = this.shadowRoot.querySelector('.modal');
        const closeIcon = this.shadowRoot.querySelector('.close-icon');
        
        // Close button
        closeIcon.addEventListener('click', () => this.close());
        
        // Overlay click
        overlay.addEventListener('click', () => this.close());
        
        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.close();
            }
        });

        // Add to Cart button
        const addToCartBtn = this.shadowRoot.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            this.addToCart();
        });

    }

    async open(productId) {
        this.showLoader();
        
        try {
            // Simulate API call
            const product = await this.fetchProduct(productId);
            this.productData = product;
            this.populateModal();
            this.hideLoader();
            this.showModal();
        } catch (error) {
            this.hideLoader();
            this.showError('Something went wrong. Please, try again');
            console.error('Error fetching product:', error);
        }
    }

    async fetchProduct(productId) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await fetch('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/' + productId);
                    const result = await response.json();
                    const product = result?.data;
                    
                    console.log(product);
                    
                    if (product) {
                        resolve({
                            ...product,
                            image: this.getImagePath(product.category, product.id)
                        });
                    } else {
                        reject(new Error('Product not found'));
                    }
                } catch (error) {
                    reject(error);
                }
            }, 0);
        });
    }
    
    getImagePath(category, index) {
        return `../images/dessert-img/${category}-${index}.jpg`;
    }
    
    populateModal() {
        if (!this.productData) return;
    
        const img = this.shadowRoot.querySelector('.modal-img img');
        const title = this.shadowRoot.querySelector('.modal-title');
        const description = this.shadowRoot.querySelector('.modal-description');
        const sizeContainer = this.shadowRoot.querySelector('.modal-size .size-item');
        const additivesContainer = this.shadowRoot.querySelector('.modal-additives .size-item');
    
        // Set basic info
        img.src = this.productData.image;
        img.alt = this.productData.name;
        title.textContent = this.productData.name;
        description.textContent = this.productData.description;
    
        // Clear containers
        sizeContainer.innerHTML = '';
        additivesContainer.innerHTML = '';
    
        // Add sizes
        Object.entries(this.productData.sizes).forEach(([key, sizeData], index) => {
            const btn = document.createElement('tab-button');
            btn.setAttribute('text', sizeData.size);
            btn.setAttribute('icon', key.toUpperCase());
            btn.setAttribute('data-size', key);
            btn.setAttribute('data-price', sizeData.price);
            btn.setAttribute('data-discount-price', sizeData.discountPrice || sizeData.price);
            
            if (index === 0) {
                btn.setAttribute('active', 'true');
                this.selectedSize = key;
            }
    
            // Tooltip
            btn.addEventListener('mouseenter', (e) => {
                const price = sizeData.price;
                const discountPrice = sizeData.discountPrice;
                
                let tooltipText = '';
                if (discountPrice && discountPrice !== price) {
                    tooltipText = `<span style="text-decoration: line-through;">$${price}</span> $${discountPrice}`;
                } else {
                    tooltipText = `$${price}`;
                }
                
                this.showTooltip(e.target, tooltipText);
            });
    
            btn.addEventListener('mouseleave', (e) => {
                this.hideTooltip(e.target);
            });
    
            btn.addEventListener('click', () => {
                sizeContainer.querySelectorAll('tab-button').forEach(b => b.removeAttribute('active'));
                this.activeButton(sizeContainer)
                btn.setAttribute('active', 'true');
                this.selectedSize = key;
                this.updateTotal();
            });
    
            sizeContainer.appendChild(btn);
        });
    
        // Add additives
        this.productData.additives.forEach((additive, index) => {
            const btn = document.createElement('tab-button');
            btn.setAttribute('text', additive.name);
            btn.setAttribute('icon', (index + 1).toString());
            btn.setAttribute('data-additive', additive.name);
            btn.setAttribute('data-price', additive.price);
            btn.setAttribute('data-discount-price', additive.discountPrice || additive.price);
    
            // Tooltip
            btn.addEventListener('mouseenter', (e) => {
                const price = additive.price;
                const discountPrice = additive.discountPrice;
                
                let tooltipText = '';
                if (discountPrice && discountPrice !== price) {
                    tooltipText = `<span style="text-decoration: line-through;">$${price}</span> $${discountPrice}`;
                } else {
                    tooltipText = `+$${price}`;
                }
                
                this.showTooltip(e.target, tooltipText);
            });
    
            btn.addEventListener('mouseleave', (e) => {
                this.hideTooltip(e.target);
            });
    
            btn.addEventListener('click', () => {
                const container = additivesContainer.querySelectorAll('tab-button')
                const isActive = btn.hasAttribute('active');
                if (isActive) {
                    btn.removeAttribute('active');
                    this.selectedAdditives = this.selectedAdditives.filter(a => a !== additive.name);
                } else {
                    btn.setAttribute('active', 'true');
                    this.selectedAdditives.push(additive.name);
                }
                this.updateTotal();
            });
    
            additivesContainer.appendChild(btn);
            this.activeButton(additivesContainer)
        });
        
        this.updateTotal();
    }
    
    showTooltip(element, htmlContent) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip show';
        tooltip.innerHTML = htmlContent;
        element.style.position = 'relative';
        element.appendChild(tooltip);
    }
    
    hideTooltip(element) {
        const tooltip = element.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    updateTotal() {
        if (!this.productData) return;
    
        let total = 0;
    
        // Get selected size price
        const selectedSizeData = this.productData.sizes[this.selectedSize];
        if (selectedSizeData) {
            const sizePrice = parseFloat(selectedSizeData.discountPrice || selectedSizeData.price);
            total += sizePrice;
        }
    

        this.selectedAdditives.forEach(additiveName => {
            const additive = this.productData.additives.find(a => a.name === additiveName);
            if (additive) {
                const additivePrice = parseFloat(additive.discountPrice || additive.price);
                total += additivePrice;
            }
        });
    
        const totalElement = this.shadowRoot.querySelector('.total-price');
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    showLoader() {
        this.isLoading = true;
        this.shadowRoot.querySelector('.overlay')?.classList.add('show');
        this.shadowRoot.querySelector('.loader')?.classList.add('show');
    }

    hideLoader() {
        this.isLoading = false;
        this.shadowRoot.querySelector('.loader').classList.remove('show');
    }

    showModal() {
        this.shadowRoot.querySelector('.modal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    showError(message) {
        const notification = this.shadowRoot.querySelector('.notification');
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    addToCart() {
        // Cart logic here
        const cartItem = {
            product: this.productData,
            size: this.selectedSize,
            additives: this.selectedAdditives,
            total: this.shadowRoot.querySelector('.total-price').textContent
        };

        console.log('Added to cart:', cartItem);
        
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('product-added', {
            detail: cartItem,
            bubbles: true,
            composed: true
        }));

        this.close();
    }

    close() {
        this.shadowRoot.querySelector('.overlay').classList.remove('show');
        this.shadowRoot.querySelector('.modal').classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset selections
        this.selectedSize = 's';
        this.selectedAdditives = [];
    }

    activeButton(container) {
        const tabButtons = container.querySelectorAll('tab-button');
        console.log(tabButtons);
        tabButtons.forEach((button, index) => {
            if (index === 0) {
                button.setAttribute('active', 'true');
            }
            
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => {btn.removeAttribute('active'); btn.children[1].classList.remove('active')});
                button.children[1].classList.add('active')

                button.setAttribute('active', 'true');
            });
        });
    }
}

customElements.define('popup-modal', Popup);