(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();class l extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("text");this.innerHTML=`
        <style>
            .secondary-button {
                padding: 10px 78px;
                border: none;
                border-radius: 100px;
                cursor: pointer;
                line-height: 150%;
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
            //    width:100%;
                background: transparent;
                color: var(--dark);
                border: 1px solid var(--boder-dark);

                transition: ease-in-out 0.3s;
            }

            .secondary-button:hover {
                background: var(--container);
                color: var(--light);
                border: 1px solid var(--container);
            }
        </style>
        <button class="secondary-button">
            ${t}
        </button>
        `}}customElements.define("button-secondary",l);class c extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("text");this.innerHTML=`
        <style>
            .primary-button {
                position: relative;
                padding: 20px 64px;
                border: none;
                border-radius: 100px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                line-height: 150%;
                background: var(--body);
                color: var(--dark);
                overflow: hidden;
            }

            .primary-button .content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;

                transition: transform 0.3s ease, opacity 0.3s ease;
            }

            .primary-button .text-only {
                opacity: 1;
                transform: translateY(0);
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .primary-button:hover .text-only {
                opacity: 0;
                transform: translateY(-10px);
            }

            .primary-button .with-icon {
                opacity: 0;
                transform: translateY(10px);
            }

            .primary-button:hover .with-icon {
                opacity: 1;
                transform: translateY(0);
            }

            .icon {
                width: 20px;
                height: 20px;
            }
        </style>

        <button class="primary-button">
            <span class="content text-only">${t}</span>
            <span class="content with-icon">
                ${t}
                <svg class="icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.166 9.76667V11.6667C14.166 14.8883 11.5543 17.5 8.33268 17.5C5.11102 17.5 2.49935 14.8883 2.49935 11.6667V9.76667C2.49935 9.4353 2.76798 9.16667 3.09935 9.16667H13.566C13.8974 9.16667 14.166 9.4353 14.166 9.76667Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.99935 7.49996C9.99935 6.66663 10.5946 5.83329 11.7851 5.83329C13.1 5.83329 14.166 4.7673 14.166 3.45234V2.91663" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66732 7.5V7.08333C6.66732 5.70262 7.78661 4.58333 9.16732 4.58333C10.0878 4.58333 10.834 3.83714 10.834 2.91667V2.5" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.334 9.16663H15.4173C16.5679 9.16663 17.5007 10.0994 17.5007 11.25C17.5007 12.4006 16.5679 13.3333 15.4173 13.3333H14.1673" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </button>
        `}}customElements.define("button-primary",c);class d extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
        <style>
            .social-button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
                border-radius: 100px;
                cursor: pointer;
                line-height: 150%;
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
                width: 60px;
                height: 60px;
               
                background: transparent;
                border: 1px solid var(--boder-ligtht);

                transition: ease-in-out 0.3s;
            }

            .social-button:hover {
                background: var(--body);
                border: 1px solid var(--body);
            }
        </style>

        <button class="social-button">
            <slot name="icon" class="test"></slot>
        </button>
        `;const t=this.shadow.querySelector('slot[name="icon"]'),o=this.shadow.querySelector(".social-button");t&&t.assignedNodes().forEach(e=>{e instanceof Element&&e.querySelectorAll("path").forEach(s=>{o.addEventListener("mouseover",()=>{s.style.transition="0.3s",s.style.stroke="var(--dark)"}),o.addEventListener("mouseout",()=>{s.style.transition="0.3s",s.style.stroke="var(--light)"})})})}}customElements.define("button-social",d);class u extends HTMLElement{constructor(){super(),this.isOpen=!1,this.shadow=this.attachShadow({mode:"open"}),this.isOpen=!1}connectedCallback(){this.shadow.innerHTML=`
        <style>
            .burger-button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
                border-radius: 100px;
                cursor: pointer;
                width: 44px;
                height: 44px;
                background: transparent;
                border: 1px solid var(--boder-dark, #ccc);
                transition: background 0.3s ease;
                position: relative;
            }

            ::slotted(svg) {
                position: absolute;
                transition: opacity 0.3s ease, transform 0.3s ease;
            }

            ::slotted([slot="burger"]) {
                opacity: 1;
                transform: rotate(0deg);
            }

            ::slotted([slot="close"]) {
                opacity: 0;
                transform: rotate(-90deg);
            }

            .burger-button.open ::slotted([slot="burger"]) {
                opacity: 0;
                transform: rotate(90deg);
            }

            .burger-button.open ::slotted([slot="close"]) {
                opacity: 1;
                transform: rotate(0deg);
            }
        </style>

        <button class="burger-button">
            <slot name="burger"></slot>
            <slot name="close"></slot>
        </button>
        `;const t=this.shadow.querySelector(".burger-button");t.addEventListener("click",()=>{this.isOpen=!this.isOpen,t.classList.toggle("open",this.isOpen)})}}customElements.define("button-burger",u);class p extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>
            .contact-link {
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
                color: var(--light);
                text-decoration: none;
                display: inline-block;
                position: relative;
            }
            
            .contact-link::after {
                content: "";
                display: block;
                height: 2px;
                width: 100%;
                background: var(--light);
                opacity: 0;
                margin-top: 4px;
                transition: opacity 0.3s ease-in-out;
            }

            .contact-link:hover::after {
                opacity: 1;
            }

            .contact-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }

        </style>
        <a href="#!" class="contact-link">
            <div class="contact-content">
                <slot name="icon"></slot>
                <slot name="text"></slot>
            </div>
        </a>
        `}}customElements.define("contact-link",p);class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML=`<style>
            .menu-link {
                letter-spacing: 0;
                line-height: 150%;
                font-size: 16px;
                font-weight: 600;
                color: var(--dark);
                text-decoration: none;
                display: inline-block;
                position: relative;
            }
            
            .menu-link::after {
                content: "";
                display: block;
                height: 2px;
                width: 100%;
                background: var(--dark);
                opacity: 0;

                transition: opacity 0.3s ease-in-out;
            }

            .menu-link:hover::after {
                opacity: 1;
            }

            .contact-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            @media (min-width: 768px) {
                .menu-link .contact-content ::slotted(span.text) {
                    font-size: 32px;
                }
            }

        </style>
        <a href="/coffee-house/pages/coffee/index" class="menu-link">
            <div class="contact-content">
                <slot name="text"></slot>
                <slot name="icon"></slot>
            </div>
        </a>
        `}}customElements.define("menu-link",h);class g extends HTMLElement{constructor(){super(),this.isBurgerOpen=!1,this.onCartUpdated=t=>{var n;const o=t,i=((n=o.detail)==null?void 0:n.length)??this.getCartCount(),e=this.shadow.querySelector(".cart-button span");e.textContent=i.toString(),console.log(o),console.log(i)},this.shadow=this.attachShadow({mode:"open"}),window.addEventListener("cart-updated",this.onCartUpdated)}async connectedCallback(){const t=await fetch("/coffee-house/global.css").then(o=>o.text());this.shadow.innerHTML=`
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
                text-decoration: none;
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
            ${t}

        </style>
        <div class="container">
            <nav>
                <a href="/coffee-house/" class="image">
                    <img src="/coffee-house/images/logo.png" alt="png"/>
                </a>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="#slider">Favorite coffee</a></li>
                    <li class="nav-item"><a href="#friends">About</a></li>
                    <li class="nav-item"><a href="#download">Mobile app</a></li>
                    <li class="nav-item"><a href="#footer">Contact us</a></li>
                </ul>
                
           
                <a class="menu-buttons" href="/coffee-house/pages/cart/index">
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
                    </a>

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

        `,this.setupBurgerMenu()}getCartCount(){return JSON.parse(localStorage.getItem("cart")||"[]").length||0}setupBurgerMenu(){const t=this.shadow.querySelector("button-burger"),o=this.shadow.querySelector(".burger-menu"),i=this.shadow.querySelectorAll(".burger-menu a");!t||!o||(t.addEventListener("click",()=>{this.toggleBurgerMenu()}),i.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const s=e.getAttribute("href"),a=document.querySelector(s);a&&a.scrollIntoView({behavior:"smooth",block:"start"}),this.closeBurgerMenu()})}),window.addEventListener("resize",()=>{window.innerWidth>768&&this.isBurgerOpen&&this.closeBurgerMenu()}))}toggleBurgerMenu(){this.isBurgerOpen?this.closeBurgerMenu():this.openBurgerMenu()}openBurgerMenu(){const t=this.shadow.querySelector(".burger-menu"),o=this.shadow.querySelector("button-burger");t.classList.add("open"),this.isBurgerOpen=!0,o&&o.setAttribute("open","true")}closeBurgerMenu(){const t=this.shadow.querySelector(".burger-menu"),o=this.shadow.querySelector("button-burger");t.classList.remove("open"),this.isBurgerOpen=!1,o&&o.removeAttribute("open")}}customElements.define("app-navbar",g);class f extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}async connectedCallback(){const t=await fetch("/coffee-house/global.css").then(o=>o.text());this.shadow.innerHTML=`
            <style>
            ${t}
                footer {
                    margin-bottom: 40px;
                } 
                footer .footer-content {
                    background: var(--container);
                    border-radius: 40px;
                    padding: 100px;
                    display: flex;
                    align-items: center;
                    gap: 100px;
                } 

                footer .footer-content .footer-social .main-title{
                    color: var(--light);
                    line-height: 107%;
                    margin-bottom: 35px;
                    text-align: left;
                }
                footer .footer-content .footer-social .social {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                footer .footer-content .footer-contact,
                footer .footer-content .footer-social {
                    max-width: 530px;
                }

                footer .footer-content .footer-contact .contact-title {
                    font-style: Semi Bold;
                    font-size: 24px;
                    line-height: 125%;
                    color: var(--light);
                    margin-bottom: 40px;
                }
                
                footer .footer-content .footer-contact .contact-links {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                     @media (max-width:768px) {
                    footer .footer-content {
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: start;
                        text-align: start;

                        padding: 60px;
                    }

                    footer .footer-content .footer-social .main-title {
                        font-size: 60px;
                        text-align: start;
                        letter-spacing: 1px;
                    }

                    footer .footer-content .footer-contact,
                    footer .footer-content .footer-social {
                        max-width: 100%;
                    }

                    footer .footer-content .footer-contact .contact-title {
                        font-size: 20px;
                    }
                }

                @media (max-width:380px) {
                    footer .container {
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    padding:0;
                    }
                    footer .footer-content {
                        flex-direction: column;
                        width:328px;
                        
                        align-items: flex-start;
                        justify-content: start;
                        text-align: start;

                        padding: 40px;
                    }

                    footer .footer-content .footer-social .main-title {
                        font-size: 32px;
                        text-align: start;
                    }

                    footer .footer-content .footer-contact,
                    footer .footer-content .footer-social {
                        max-width: 100%;
                    }

                    footer .footer-content .footer-contact .contact-title {
                        font-size: 20px;
                    }
                }
            </style>

            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-social">
                            <h2 class="main-title">Sip, Savor, Smile. <span>It’s coffee time!</span></h2>
                            <div class="social">
                                <button-social>
                                    <span slot="icon" class="center">
                                        <svg width="24" height="24"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z" stroke="#E1D4C9" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>     
                                    </span>                            
                                </button-social>
                                <button-social>
                                    <span slot="icon" class="center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#E1D4C9" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#E1D4C9"/>
                                            <path d="M17.5 6.51L17.51 6.49889" stroke="#E1D4C9" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </button-social>
                                <button-social>
                                    <span slot="icon" class="center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="#E1D4C9" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </button-social>
                            </div>
                        </div>
                        <div class="footer-contact">
                            <h3 class="contact-title">Contact us</h3>

                            <div class="contact-links">
                                <contact-link>
                                    <svg width="20" height="20" slot="icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6663 8.33329C16.6663 12.0152 9.99967 18.3333 9.99967 18.3333C9.99967 18.3333 3.33301 12.0152 3.33301 8.33329C3.33301 4.65139 6.31778 1.66663 9.99967 1.66663C13.6816 1.66663 16.6663 4.65139 16.6663 8.33329Z" stroke="#E1D4C9" stroke-width="1.5"/>
                                        <path d="M10.0003 9.16667C10.4606 9.16667 10.8337 8.79357 10.8337 8.33333C10.8337 7.8731 10.4606 7.5 10.0003 7.5C9.54009 7.5 9.16699 7.8731 9.16699 8.33333C9.16699 8.79357 9.54009 9.16667 10.0003 9.16667Z" fill="#E1D4C9" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                            
                                    <span slot="text">8558 Green Rd.,  LA</span>
                                </contact-link>
                                <contact-link>
                                    <svg width="20" slot="icon" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0984 12.2516L11.6665 12.9166C9.34845 11.7531 7.91654 10.4166 7.08321 8.33329L7.72483 4.89154L6.51197 1.66663L3.72946 1.66663C2.60191 1.66663 1.71466 2.59958 1.90108 3.71161C2.29888 6.08454 3.37231 10.0391 6.24987 12.9166C9.27338 15.9401 13.5661 17.3318 16.1378 17.9288C17.299 18.1983 18.3332 17.2908 18.3332 16.0988L18.3332 13.4843L15.0984 12.2516Z" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span slot="text">+1 (603) 555-0123</span>
                                </contact-link>
                                <contact-link>
                                    <svg width="20" height="20" slot="icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_217_1736)">
                                        <path d="M10 5L10 10L15 10" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_217_1736">
                                        <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                    <span slot="text">Mon-Sat: 9:00 AM – 23:00 PM</span>
                                </contact-link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `}}customElements.define("custom-footer",f);
