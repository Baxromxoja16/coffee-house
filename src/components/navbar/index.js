class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const globalStyles = await fetch('../../../global.css').then(r => r.text());

        this.shadowRoot.innerHTML = `
        <style>
            ${globalStyles}
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

        </style>
        <div class="container">
            <nav>
                <a href="#! " class="image">
                    <img src="./images/logo.png" alt="png"/>
                </a>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="#slider">Favorite coffee</a></li>
                    <li class="nav-item"><a href="#friends">About</a></li>
                    <li class="nav-item"><a href="#download">Mobile app</a></li>
                    <li class="nav-item"><a href="#footer">Contact us</a></li>
                </ul>
                
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
        `;
    }
}

customElements.define('app-navbar', Navbar);
