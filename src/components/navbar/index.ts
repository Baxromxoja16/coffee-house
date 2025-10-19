import { IProduct } from "../../types/interfaces";

class Navbar extends HTMLElement {
    private shadow: ShadowRoot;

    isBurgerOpen: boolean = false;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        window.addEventListener('cart-updated', this.onCartUpdated);
    }

    async connectedCallback() {
        const location = window.location.href;
        const globalStyles = await fetch('/global.css').then(r => r.text());

        this.shadow.innerHTML = `
        <style>
            
            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 20px 0;
            }
            
            nav .image,
            nav .image img {
                height: 60px;
            }

            nav .nav-menu {
                display: flex;
                align-items: center;
                gap: 40px;
                list-style: none;
            }

            nav .nav-menu .nav-item {
                line-height: 150%;
                position: relative;
            }
            nav .nav-menu .nav-item::after {
                content: "";
                display: block;
                height: 2px;
                width: 100%;
                background: var(--dark);
                opacity: 0;

                transition: opacity 0.3s ease-in-out;
            }

            nav .nav-menu .nav-item:hover::after {
                opacity: 1;
            }
            nav .nav-menu .nav-item a {
                letter-spacing: 0;
                line-height: 150%;
                font-size: 16px;
                font-weight: 600;
                color: var(--dark);
                text-decoration: none;
            }

            button-burger {
                display: none;
            }

            @media (max-width: 768px) {
                menu-link,
                nav .nav-menu {
                    display: none;
                }

                button-burger {
                    display: block;
                }
            }
            
            /* Burger Menu Styles */
            .burger-menu {
                position: fixed;
                top: 100px;
                right: -100%;
                width: 100%;
                height: calc(100vh - 100px);
                background: var(--light);
                z-index: 1000;
                transition: right 0.4s ease-in-out;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 100px;
            }

            .burger-menu ul {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 60px;

            }

            .burger-menu.open {
                right: 0;
            }

            .burger-menu .burger-nav-item {
                list-style: none;
            }

            .burger-menu .burger-nav-item a {
                font-size: 32px;
                font-weight: 600;
                color: var(--dark);
                text-decoration: none;
                transition: color 0.3s ease;
            }

            .burger-menu .burger-nav-item a:hover {
                color: var(--accent);
            }

            .menu-buttons {
                display: flex;
                gap: 32px;
            }

            .menu-buttons .cart-button {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--dark);
                font-size: 16px;
                font-weight: 600;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            @media (max-width: 768px) {
                nav menu-link,
                nav .nav-menu {
                    display: none;
                }



                button-burger,
                .burger-menu menu-link {
                    display: block;
                }
            }

            @media (min-width: 769px) {
                .burger-menu {
                    display: none !important;
                }
            }
            ${globalStyles}

        </style>
        <div class="container">
            <nav>
                <a href="/" class="image">
                    <img src="${location.includes('index.html') ? './images/logo.png' : '../images/logo.png'}" alt="png"/>
                </a>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="#slider">Favorite coffee</a></li>
                    <li class="nav-item"><a href="#friends">About</a></li>
                    <li class="nav-item"><a href="#download">Mobile app</a></li>
                    <li class="nav-item"><a href="#footer">Contact us</a></li>
                </ul>
                
                <div class="menu-buttons">
                    <div class="cart-button">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0942 8.36255L17.1455 15.1959C17.3319 16.4074 16.3945 17.5 15.1688 17.5H4.83122C3.60545 17.5 2.66809 16.4074 2.85448 15.1959L3.90576 8.36255C4.05586 7.38689 4.89536 6.66667 5.88251 6.66667H14.1175C15.1046 6.66667 15.9441 7.38689 16.0942 8.36255Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.6663 4.16667C11.6663 3.24619 10.9201 2.5 9.99967 2.5C9.0792 2.5 8.33301 3.24619 8.33301 4.16667" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>${this.getCartCount()}</span>
                    </div>
                    <menu-link>
                        <svg width="20" height="20" slot="icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.166 9.76667V11.6667C14.166 14.8883 11.5543 17.5 8.33268 17.5C5.11102 17.5 2.49935 14.8883 2.49935 11.6667V9.76667C2.49935 9.4353 2.76798 9.16667 3.09935 9.16667H13.566C13.8974 9.16667 14.166 9.4353 14.166 9.76667Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.99935 7.49996C9.99935 6.66663 10.5946 5.83329 11.7851 5.83329C13.1 5.83329 14.166 4.7673 14.166 3.45234V2.91663" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.66732 7.5V7.08333C6.66732 5.70262 7.78661 4.58333 9.16732 4.58333C10.0878 4.58333 10.834 3.83714 10.834 2.91667V2.5" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.334 9.16663H15.4173C16.5679 9.16663 17.5007 10.0994 17.5007 11.25C17.5007 12.4006 16.5679 13.3333 15.4173 13.3333H14.1673" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                
                        <span slot="text">
                            Menu
                        </span>
                    </menu-link>
                </div>
                    <button-burger>
                        <svg slot="burger" width="18" height="10" viewBox="0 0 18 10" fill="none">
                            <path d="M1 1H17" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M1 9H17" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <svg slot="close" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1.34375 1.34314L12.6575 12.6568" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M1.34375 12.6568L12.6575 1.34314" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button-burger>
            </nav>
        </div>

        <div class="burger-menu">
            <ul>
                <li class="burger-nav-item"><a href="#slider">Favorite coffee</a></li>
                <li class="burger-nav-item"><a href="#friends">About</a></li>
                <li class="burger-nav-item"><a href="#download">Mobile app</a></li>
                <li class="burger-nav-item"><a href="#footer">Contact us</a></li>
            </ul>

            <menu-link>
                <svg width="20" height="20" slot="icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.166 9.76667V11.6667C14.166 14.8883 11.5543 17.5 8.33268 17.5C5.11102 17.5 2.49935 14.8883 2.49935 11.6667V9.76667C2.49935 9.4353 2.76798 9.16667 3.09935 9.16667H13.566C13.8974 9.16667 14.166 9.4353 14.166 9.76667Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.99935 7.49996C9.99935 6.66663 10.5946 5.83329 11.7851 5.83329C13.1 5.83329 14.166 4.7673 14.166 3.45234V2.91663" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66732 7.5V7.08333C6.66732 5.70262 7.78661 4.58333 9.16732 4.58333C10.0878 4.58333 10.834 3.83714 10.834 2.91667V2.5" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.334 9.16663H15.4173C16.5679 9.16663 17.5007 10.0994 17.5007 11.25C17.5007 12.4006 16.5679 13.3333 15.4173 13.3333H14.1673" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        
                <span slot="text" class="text">
                    Menu
                </span>
            </menu-link>
        </div>

        `;

        this.setupBurgerMenu();
    }

    private onCartUpdated = (e: Event) => {
        const ev = e as CustomEvent<IProduct[]>;
        const count = ev.detail?.length ?? this.getCartCount();
        const countSpan = this.shadow.querySelector('.cart-button span') as HTMLSpanElement;
        countSpan.textContent = count.toString();
        console.log(ev);
        console.log(count);
    };
    

    getCartCount() {
        return JSON.parse(localStorage.getItem('carts') || "[]").length || 0;
    }

    setupBurgerMenu() {
        const burgerButton = this.shadow.querySelector('button-burger');
        const burgerMenu = this.shadow.querySelector('.burger-menu');
        const burgerLinks = this.shadow.querySelectorAll('.burger-menu a');

        if (!burgerButton || !burgerMenu) return;

        burgerButton.addEventListener('click', () => {
            this.toggleBurgerMenu();
        });

        burgerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId: string = link.getAttribute('href') as string;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                this.closeBurgerMenu();
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isBurgerOpen) {
                this.closeBurgerMenu();
            }
        });
    }

    toggleBurgerMenu() {
        if (this.isBurgerOpen) {
            this.closeBurgerMenu();
        } else {
            this.openBurgerMenu();
        }
    }

    openBurgerMenu() {
        const burgerMenu: Element = this.shadow.querySelector('.burger-menu') as Element;
        const burgerButton = this.shadow.querySelector('button-burger')  as Element;

        burgerMenu.classList.add('open');
        this.isBurgerOpen = true;

        if (burgerButton) {
            burgerButton.setAttribute('open', 'true');
        }
    }

    closeBurgerMenu() {
        const burgerMenu = this.shadow.querySelector('.burger-menu')  as Element;
        const burgerButton = this.shadow.querySelector('button-burger')  as Element;

        burgerMenu.classList.remove('open');
        this.isBurgerOpen = false;

        if (burgerButton) {
            burgerButton.removeAttribute('open');
        }
    }

}

customElements.define('app-navbar', Navbar);
