(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();class g extends HTMLElement{constructor(){super(),this.hideTimer=null,this.remaining=3e3,this.startedAt=0,this.shadow=this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["message"]}render(){this.shadow.innerHTML=`
      <style>
        :host {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          top: 20px;
          z-index: 99999;
          display: block;
          pointer-events: auto;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }

        .toast {
          min-width: 260px;
          max-width: 92vw;
          background: #fff5f5;
          color: #5a2121;
          border: 1px solid #f0b4b4;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          padding: 12px 16px;
          border-radius: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(-10px) scale(0.995);
          transition: opacity 220ms ease, transform 220ms ease;
        }

        .toast.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: inline-grid;
          place-items: center;
          background: #ffdede;
          color: #8b1f1f;
          font-weight: 700;
        }

        .message {
          flex: 1 1 auto;
          font-size: 14px;
          line-height: 1.3;
          word-break: break-word;
        }

        .close {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 6px;
          color: #6a2a2a;
        }

        /* smaller on mobile */
        @media (max-width: 420px) {
          .toast { padding: 10px; border-radius: 8px; }
          .message { font-size: 13px; }
        }
      </style>

      <div class="toast" role="alert" aria-live="assertive" part="toast">
        <div class="icon" aria-hidden="true">!</div>
        <div class="message"></div>
        <button class="close" aria-label="Close">&times;</button>
      </div>
    `,this.container=this.shadow.querySelector(".toast"),this.textEl=this.shadow.querySelector(".message"),this.shadow.querySelector(".close").addEventListener("click",()=>this.hideImmediately()),this.container.addEventListener("mouseenter",()=>this.pauseTimer()),this.container.addEventListener("mouseleave",()=>this.resumeTimer())}attributeChangedCallback(t,e,s){t==="message"&&s!==null&&this.show(s)}async show(t){const e=await this.extractMessage(t);this.textEl.textContent=e??"Something went wrong",this.container.classList.add("show"),this.clearTimer(),this.remaining=3e3,this.startTimer()}async extractMessage(t){if(typeof t=="string")return t;if(t instanceof Error)return t.message||t.name||"Error";if(t instanceof Response){try{if((t.headers.get("content-type")??"").includes("application/json")){const s=await t.json().catch(()=>null);if(s)return typeof s.message=="string"?s.message:typeof s.error=="string"?s.error:s.data&&typeof s.data=="object"&&typeof s.data.message=="string"?s.data.message:JSON.stringify(s).slice(0,200)}else{const s=await t.text().catch(()=>null);if(s)return s.slice(0,300)}}catch{}return`HTTP ${t.status} ${t.statusText}`}if(typeof t=="object"&&t!==null){const e=t;if(typeof e.message=="string")return e.message;if(typeof e.error=="string")return e.error;for(const s of Object.keys(e)){const o=e[s];if(typeof o=="string"&&o.length>0)return o}}}startTimer(){this.startedAt=Date.now(),this.hideTimer=setTimeout(()=>{this.hide()},this.remaining)}pauseTimer(){if(this.hideTimer){clearTimeout(this.hideTimer),this.hideTimer=null;const t=Date.now()-this.startedAt;this.remaining=Math.max(0,this.remaining-t)}}resumeTimer(){this.hideTimer||this.startTimer()}hide(){this.container.classList.remove("show"),this.clearTimer()}hideImmediately(){this.hide()}clearTimer(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null)}}customElements.define("app-error",g);class y extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("text"),e=this.getAttribute("icon");this.innerHTML=`
        <style>
            .tab-button {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px 8px 8px;
                border: none;
                border-radius: 100px;
                cursor: pointer;
                line-height: 150%;
                letter-spacing: 0;
                font-size: 16px;
               
                background: transparent;
                color: var(--dark);
                border: 1px solid var(--boder-ligtht);

                transition: ease-in-out 0.5s;
            }
            .tab-button .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                background: var(--boder-ligtht);
                border-radius: 50%;
                font-size: 16px;
                transition: ease-in-out 0.5s;
                color: var(--dark);
            }

            .tab-button:hover {
                background: var(--boder-dark);
                color: var(--light);
                border: 1px solid var(--boder-dark);
            }
            .tab-button.active {
                background: var(--boder-dark);
                color: var(--light);
                border: 1px solid var(--boder-dark);
            }
            .tab-button:hover .icon {
                background: var(--body);
                color: var(--dark);
            }
        </style>
        <button class="tab-button">
            <span class="icon">
                ${e}
            </span>
            ${t}
        </button>
        `}}customElements.define("tab-button",y);class v extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("text");this.innerHTML=`
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
        `}}customElements.define("button-secondary",v);class b extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("text");this.innerHTML=`
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
        `}}customElements.define("button-primary",b);class w extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){const t=this.getAttribute("text");this.shadow.innerHTML=`
        <style>
            .button-app-store {
                padding: 12px 40px 7px 20px;
                border: 1px solid var(--boder-dark);
                border-radius: 100px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                line-height: 150%;
                background: transparent;
                color: var(--dark);
                overflow: hidden;
                transition: ease-in-out 0.3s;
                display: flex;
                align-items:center;
                gap: 8px;
            }
            .button-app-store .icon-content {

            }
            .button-app-store .text-content {
                display: flex;
                flex-direction: column;
                gap: 2px;
                text-align: left;
            }

            .button-app-store:hover
            {
                background: var(--boder-dark);
                color: var(--light);
            }

            .button-app-store:hover .text-primary,
            .button-app-store:hover .text-secondary {
                color: var(--light);
            }

            .button-app-store .with-icon {
                transition: ease-in-out 0.3s;
                align-self: center;
            }

            .button-app-store .text-primary {
                font-size: 12px;
                color: #666;
                transition: ease-in-out 0.3s;
                justify-self: start;
                line-height: 92%;
            }

            .button-app-store .text-secondary {
                font-size: 16px;
                font-weight: 600;
                color: #000;
                transition: ease-in-out 0.3s;
                justify-self: start;
            }
        </style>

        <button class="button-app-store">
            <div class="icon-content">
                <span class="content with-icon">
                    <slot name="icon"></slot>
                </span>
            </div>
            <div class="text-content">
                <span class="content text-primary">Available on the</span>
                <span class="content text-secondary">${t}</span>
            </div>
        </button>
        `;const e=this.shadow.querySelector('slot[name="icon"]'),s=this.shadow.querySelector(".button-app-store");e&&e.assignedNodes().forEach(i=>{i.querySelectorAll("path").forEach(n=>{s.addEventListener("mouseover",()=>{n.style.transition="0.3s",n.style.fill="var(--light)"}),s.addEventListener("mouseout",()=>{n.style.transition="0.3s",n.style.fill="var(--dark)"})})})}}customElements.define("button-app-store",w);class x extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>
            .carousel-button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
                border: none;
                border-radius: 100px;
                cursor: pointer;
                line-height: 150%;
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
               
                background: transparent;
                color: var(--dark);
                border: 1px solid var(--boder-dark);

                transition: ease-in-out 0.3s;
            }

            .carousel-button:hover {
                background: var(--container);
                color: var(--light);
                border: 1px solid var(--container);
            }

        </style>
        <button class="carousel-button">
            <slot name="icon" class="test"></slot>
        </button>
        `;const t=this.shadow.querySelector('slot[name="icon"]'),e=this.shadow.querySelector(".carousel-button");t&&t.assignedNodes().forEach(o=>{o instanceof Element&&o.querySelectorAll("path").forEach(r=>{e.addEventListener("mouseover",()=>{r.style.transition="0.3s",r.style.stroke="var(--light)"}),e.addEventListener("mouseout",()=>{r.style.transition="0.3s",r.style.stroke="var(--dark)"})})})}}customElements.define("button-carousel",x);class k extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
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
        `;const t=this.shadow.querySelector('slot[name="icon"]'),e=this.shadow.querySelector(".social-button");t&&t.assignedNodes().forEach(o=>{o instanceof Element&&o.querySelectorAll("path").forEach(r=>{e.addEventListener("mouseover",()=>{r.style.transition="0.3s",r.style.stroke="var(--dark)"}),e.addEventListener("mouseout",()=>{r.style.transition="0.3s",r.style.stroke="var(--light)"})})})}}customElements.define("button-social",k);class E extends HTMLElement{constructor(){super(),this.isOpen=!1,this.shadow=this.attachShadow({mode:"open"}),this.isOpen=!1}connectedCallback(){this.shadow.innerHTML=`
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
        `;const t=this.shadow.querySelector(".burger-button");t.addEventListener("click",()=>{this.isOpen=!this.isOpen,t.classList.toggle("open",this.isOpen)})}}customElements.define("button-burger",E);class C extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>
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
        `}}customElements.define("contact-link",C);class L extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML=`<style>
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
        <a href="'/coffee-house/pages/coffee/index'" class="menu-link">
            <div class="contact-content">
                <slot name="text"></slot>
                <slot name="icon"></slot>
            </div>
        </a>
        `}}customElements.define("menu-link",L);class S extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
        <style>
            .slider-card {
                width: 480px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 17px;

            }
            .slider-image {
                width: 100%;
                height: 480px;
            }
            .slider-image ::slotted(img) {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
            .slider-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 13px;
                text-align: center;
            }
            .slider-content ::slotted(h2) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
                margin: 0;
            }
            .slider-content ::slotted(p) {
                font-family: Inter, sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 150%;
                color: var(--dark);
            }
            .slider-content ::slotted(.price) {
                font-size: 24px;
                font-weight: 600;
                color: var(--dark);
            }

            @media (max-width: 380px) {
                .slider-card {
                    width: 348px;
                }
                .slider-image {
                    height: 348px;
                }
            }
        </style>
        <div class="slider-card">
            <div class="slider-image">
                <slot name="image"></slot>
            </div>
            <div class="slider-content">
                <slot name="content-title"></slot>
                <slot name="content-text"></slot>
                <slot name="content-price"></slot>
            </div>
        </div>
    `}}customElements.define("slider-card",S);class T extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
        <style>
            .coffee-card {
                width: 310px;
                border-radius: 40px;
                border: 1px solid var(--boder-ligtht);
                cursor: pointer;
                height: 100%;
            }
            .coffee-image {
                width: 100%;
                height: 310px;
                overflow: hidden;
                border-radius: 40px;
            }
            .coffee-image ::slotted(img) {
                width: 100%;
                height: auto;
                object-fit: cover;
                transform: scale(1.1);
                transition: transform 0.3s ease-in-out;
            }
            .coffee-card:hover ::slotted(img) {
                transform: scale(1.0);
            }
            .coffee-content {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 12px;
                padding: 20px;
                justify-content: space-between;
            }
            .coffee-content .cart-price {
                display: flex;
                align-items: start;
                gap: 12px;
            }
            .coffee-content ::slotted(h2) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
                margin: 0;
            }
            .coffee-content ::slotted(p) {
                font-family: Inter, sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 150%;
                color: var(--dark);
            }
            .coffee-content ::slotted(.price) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
            }
            .coffee-content ::slotted(.content-discountPrice) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
                opacity: 0.5;
                text-decoration: line-through
            }
        </style>
        <div class="coffee-card">
            <div class="coffee-image">
                <slot name="image"></slot>
            </div>
            <div class="coffee-content">
                <slot name="content-title"></slot>
                <slot name="content-text"></slot>
                <div class="cart-price">
                    <slot name="content-price"></slot>
                    <slot name="content-discountPrice"></slot>
                </div>
            </div>
        </div>
    `}}customElements.define("coffee-card",T);class M extends HTMLElement{constructor(){super(),this.isBurgerOpen=!1,this.onCartUpdated=t=>{var i;const e=t,s=((i=e.detail)==null?void 0:i.length)??this.getCartCount(),o=this.shadow.querySelector(".cart-button span");o.textContent=s.toString(),console.log(e),console.log(s)},this.shadow=this.attachShadow({mode:"open"}),window.addEventListener("cart-updated",this.onCartUpdated)}async connectedCallback(){const t=await fetch("/coffee-house/global.css").then(e=>e.text());this.shadow.innerHTML=`
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
                </a>
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

        `,this.setupBurgerMenu()}getCartCount(){return JSON.parse(localStorage.getItem("cart")||"[]").length||0}setupBurgerMenu(){const t=this.shadow.querySelector("button-burger"),e=this.shadow.querySelector(".burger-menu"),s=this.shadow.querySelectorAll(".burger-menu a");!t||!e||(t.addEventListener("click",()=>{this.toggleBurgerMenu()}),s.forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const r=o.getAttribute("href"),n=document.querySelector(r);n&&n.scrollIntoView({behavior:"smooth",block:"start"}),this.closeBurgerMenu()})}),window.addEventListener("resize",()=>{window.innerWidth>768&&this.isBurgerOpen&&this.closeBurgerMenu()}))}toggleBurgerMenu(){this.isBurgerOpen?this.closeBurgerMenu():this.openBurgerMenu()}openBurgerMenu(){const t=this.shadow.querySelector(".burger-menu"),e=this.shadow.querySelector("button-burger");t.classList.add("open"),this.isBurgerOpen=!0,e&&e.setAttribute("open","true")}closeBurgerMenu(){const t=this.shadow.querySelector(".burger-menu"),e=this.shadow.querySelector("button-burger");t.classList.remove("open"),this.isBurgerOpen=!1,e&&e.removeAttribute("open")}}customElements.define("app-navbar",M);class A extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}async connectedCallback(){const t=await fetch("coffee-house/global.css").then(e=>e.text());this.shadow.innerHTML=`
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
        `}}customElements.define("custom-footer",A);class P extends HTMLElement{constructor(){super(),this.selectedSize="s",this.shadow=this.attachShadow({mode:"open"}),this.productData={},this.selectedSize="s",this.selectedAdditives=[],this.isLoading=!1,this.productId=null,this.err=document.getElementById("appError"),this.success=document.getElementById("appSuccess")}connectedCallback(){this.render(),this.setupEventListeners()}render(){const t=this.getAttribute("productId")?this.getAttribute("productId"):null;this.productId=t,this.open(t),this.shadow.innerHTML=`
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

            .discount-price {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
                opacity: 0.5;
                text-decoration: line-through
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
                        <p class="total-price"><span class="discount-price">$0.00</span> <span class="price">$0.00</span></p>
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
        `}setupEventListeners(){const t=this.shadow.querySelector(".overlay"),e=this.shadow.querySelector(".modal");this.shadow.querySelector(".close-icon").addEventListener("click",()=>this.close()),t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",i=>{i.key==="Escape"&&e.classList.contains("show")&&this.close()}),this.shadow.querySelector(".add-to-cart").addEventListener("click",()=>{this.addToCart()})}async open(t=""){var e;this.showLoader();try{const s=await this.fetchProduct(t);this.productData=s,this.populateModal(),this.hideLoader(),this.showModal()}catch(s){this.hideLoader(),this.hideModal(),(e=this.err)==null||e.show("Something went wrong. Please, try again"),console.error("Error fetching product:",s)}}async fetchProduct(t){return new Promise((e,s)=>{setTimeout(async()=>{try{const i=await(await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/"+t)).json(),r=i==null?void 0:i.data;console.log(r),r?e({...r,image:this.getImagePath(r.category,r.id)}):s(new Error("Product not found"))}catch(o){s(o)}},0)})}getImagePath(t,e){return`/images/dessert-img/${t}-${e}.jpg`}populateModal(){if(!this.productData)return;const t=this.shadow.querySelector(".modal-img img"),e=this.shadow.querySelector(".modal-title"),s=this.shadow.querySelector(".modal-description"),o=this.shadow.querySelector(".modal-size .size-item"),i=this.shadow.querySelector(".modal-additives .size-item");t.src=this.productData.image||"",t.alt=this.productData.name,e.textContent=this.productData.name,s.textContent=this.productData.description,o.innerHTML="",i.innerHTML="",Object.entries(this.productData.sizes).forEach(([r,n],a)=>{const c=document.createElement("tab-button");c.setAttribute("text",n.size),c.setAttribute("icon",r.toUpperCase()),c.setAttribute("data-size",r),c.setAttribute("data-price",n.price),c.setAttribute("data-discount-price",n.discountPrice||n.price),a===0&&(c.setAttribute("active","true"),this.selectedSize=r),c.addEventListener("mouseenter",d=>{const u=n.price,h=n.discountPrice;let p="";h&&h!==u?p=`<span style="text-decoration: line-through;">$${u}</span> $${h}`:p=`$${u}`,this.showTooltip(d.target,p)}),c.addEventListener("mouseleave",d=>{this.hideTooltip(d.target)}),c.addEventListener("click",()=>{o.querySelectorAll("tab-button").forEach(d=>d.removeAttribute("active")),this.activeButton(o),c.setAttribute("active","true"),this.selectedSize=r,this.updateTotal()}),o.appendChild(c)}),this.productData.additives.forEach((r,n)=>{const a=document.createElement("tab-button");a.setAttribute("text",r.name),a.setAttribute("icon",(n+1).toString()),a.setAttribute("data-additive",r.name),a.setAttribute("data-price",r.price),a.setAttribute("data-discount-price",r.discountPrice||r.price),a.addEventListener("mouseenter",c=>{const d=r.price,u=r.discountPrice;let h="";u&&u!==d?h=`<span style="text-decoration: line-through;">$${d}</span> $${u}`:h=`+$${d}`,this.showTooltip(c.target,h)}),a.addEventListener("mouseleave",c=>{this.hideTooltip(c.target)}),a.addEventListener("click",()=>{a.hasAttribute("active")?(a.removeAttribute("active"),this.selectedAdditives=this.selectedAdditives.filter(d=>d!==r.name)):(a.setAttribute("active","true"),this.selectedAdditives.push(r.name)),this.updateTotal()}),i.appendChild(a),this.activeButton(i)}),this.updateTotal()}showTooltip(t,e){if(t){const s=document.createElement("div");s.className="tooltip show",s.innerHTML=e,t.style.position="relative",t.appendChild(s)}}hideTooltip(t){if(t){const e=t.querySelector(".tooltip");e&&e.remove()}}updateTotal(){var n;if(!this.productData)return;let t=0,e=0;const s=(n=this.productData.sizes)==null?void 0:n[this.selectedSize];s&&(t+=parseFloat(s.price),e+=parseFloat(s.discountPrice||s.price)),this.selectedAdditives.forEach(a=>{var d;const c=(d=this.productData.additives)==null?void 0:d.find(u=>u.name===a);c&&(t+=parseFloat(c.price),e+=parseFloat(c.discountPrice||c.price))});const o=this.shadow.querySelector(".total-price"),i=o.querySelector(".discount-price"),r=o.querySelector(".price");e!==t?(i.style.display="inline",i.textContent=`$${t.toFixed(2)}`,r.textContent=`$${e.toFixed(2)}`):(i.style.display="none",r.textContent=`$${t.toFixed(2)}`)}showLoader(){var t,e;this.isLoading=!0,(t=this.shadow.querySelector(".overlay"))==null||t.classList.add("show"),(e=this.shadow.querySelector(".loader"))==null||e.classList.add("show")}hideLoader(){this.isLoading=!1,this.shadow.querySelector(".loader").classList.remove("show")}showModal(){this.shadow.querySelector(".modal").classList.add("show"),document.body.style.overflow="hidden"}hideModal(){this.shadow.querySelector(".modal").classList.remove("show"),this.shadow.querySelector(".overlay").classList.remove("show"),document.body.style.overflow="hidden"}addToCart(){var d;if(!this.productData)return;const t=(d=this.productData.sizes)==null?void 0:d[this.selectedSize];if(!t)return;let e=0,s=0;this.selectedAdditives.forEach(u=>{var p;const h=(p=this.productData.additives)==null?void 0:p.find(f=>f.name===u);h&&(e+=parseFloat(h.price),s+=parseFloat(h.discountPrice||h.price))});const o=parseFloat(t.price),i=parseFloat(t.discountPrice||t.price),r=o+e,n=i+s,a={id:this.productData.id,name:this.productData.name,description:this.productData.description,category:this.productData.category,size:t.size,sizePrice:t.price,sizeDiscountPrice:t.discountPrice,additives:[...this.selectedAdditives],additivesPrice:e.toFixed(2),additivesDiscountPrice:s>0?s.toFixed(2):void 0,totalPrice:r.toFixed(2),totalDiscountPrice:n!==r?n.toFixed(2):void 0,image:this.productData.image};q(a)?this.success.show("This item has already been added to cart"):this.success.show("Added to cart"),this.close()}close(){this.shadow.querySelector(".overlay").classList.remove("show"),this.shadow.querySelector(".modal").classList.remove("show"),document.body.style.overflow="",this.selectedSize="s",this.selectedAdditives=[]}activeButton(t){const e=t.querySelectorAll("tab-button");console.log(e),e.forEach((s,o)=>{o===0&&s.setAttribute("active","true"),s.addEventListener("click",()=>{e.forEach(i=>{i.removeAttribute("active"),i.children[1].classList.remove("active")}),s.children[1].classList.add("active"),s.setAttribute("active","true")})})}}function q(l){const t=localStorage.getItem("cart")||"[]",e=JSON.parse(t),s=e.findIndex(o=>o.id===l.id);return s+1?(e.splice(s,1,l),localStorage.setItem("cart",JSON.stringify(e)),!0):(e.push(l),localStorage.setItem("cart",JSON.stringify(e)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:e})),!1)}customElements.define("popup-modal",P);class I extends HTMLElement{constructor(){super(),this.hideTimer=null,this.remaining=3e3,this.startedAt=0,this.shadow=this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["message"]}render(){this.shadow.innerHTML=`
      <style>
        :host {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          top: 20px;
          z-index: 99999;
          display: block;
          pointer-events: auto;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }

        .toast {
          min-width: 260px;
          max-width: 92vw;
          background: #f0fff4; /* pale green */
          color: #064e3b;      /* dark green text */
          border: 1px solid #bbf7d0; /* light green border */
          box-shadow: 0 8px 24px rgba(4, 120, 87, 0.06);
          padding: 12px 16px;
          border-radius: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(-10px) scale(0.995);
          transition: opacity 220ms ease, transform 220ms ease;
        }

        .toast.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: inline-grid;
          place-items: center;
          background: #bbf7d0; /* icon bg */
          color: #065f46;
          font-weight: 700;
        }

        .message {
          flex: 1 1 auto;
          font-size: 14px;
          line-height: 1.3;
          word-break: break-word;
        }

        .close {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 6px;
          color: #065f46;
        }

        @media (max-width: 420px) {
          .toast { padding: 10px; border-radius: 8px; }
          .message { font-size: 13px; }
        }
      </style>

      <div class="toast" role="status" aria-live="polite" part="toast">
        <div class="icon" aria-hidden="true">✓</div>
        <div class="message"></div>
        <button class="close" aria-label="Close">&times;</button>
      </div>
    `,this.container=this.shadow.querySelector(".toast"),this.textEl=this.shadow.querySelector(".message"),this.shadow.querySelector(".close").addEventListener("click",()=>this.hideImmediately()),this.container.addEventListener("mouseenter",()=>this.pauseTimer()),this.container.addEventListener("mouseleave",()=>this.resumeTimer())}attributeChangedCallback(t,e,s){t==="message"&&s!==null&&this.show(s)}async show(t){this.textEl.textContent=t??"Success",this.container.classList.add("show"),this.clearTimer(),this.remaining=3e3,this.startTimer()}startTimer(){this.startedAt=Date.now(),this.hideTimer=setTimeout(()=>{this.hide()},this.remaining)}pauseTimer(){if(this.hideTimer){clearTimeout(this.hideTimer),this.hideTimer=null;const t=Date.now()-this.startedAt;this.remaining=Math.max(0,this.remaining-t)}}resumeTimer(){this.hideTimer||this.startTimer()}hide(){this.container.classList.remove("show"),this.clearTimer()}hideImmediately(){this.hide()}clearTimer(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null)}}customElements.define("app-success",I);class D{constructor(t){this.slides=[],this.currentIndex=0,this.autoPlayInterval=6e3,this.autoPlayTimer=null,this.progressTimer=null,this.isPaused=!1,this.progressWidth=0,this.progressStep=0,this.touchStartX=0,this.touchEndX=0,this.loader=!1,this.slider=t,this.err=document.getElementById("appError");const e=this.slider.querySelector(".slider-items");if(!e||!(e instanceof HTMLElement))throw new Error("Slider: .slider-items element not found");this.sliderItems=e,this.pagination=Array.from(this.slider.querySelectorAll(".slider-pagination span")),this.prevButton=this.slider.querySelector(".slider-buttons button-carousel:first-child"),this.nextButton=this.slider.querySelector(".slider-buttons button-carousel:last-child"),this.progressStep=100/(this.autoPlayInterval/50),this.init()}async init(){await this.loadFavorites(),this.slides=Array.from(this.sliderItems.querySelectorAll("slider-card")),this.setupSlides(),this.setMaximumHeight(this.slides),this.setupEventListeners(),this.showSlide(this.currentIndex),this.startAutoPlay()}async loadFavorites(){var t;try{this.loader=!0;const s=await(await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites")).json();if(s.error){(t=this.err)==null||t.show("Something went wrong. Please, refresh the page");return}const o=s.data;this.loader=!1,this.sliderItems.innerHTML="",o.forEach((r,n)=>{const a=this.createSliderCard(r,n+1);this.sliderItems.appendChild(a)});const i=this.slider.querySelector(".slider-pagination");i&&(i.innerHTML="",o.forEach((r,n)=>{const a=document.createElement("span");n===0&&a.classList.add("active"),i.appendChild(a)}),this.pagination=Array.from(i.querySelectorAll("span")))}catch(e){this.loader=!1,console.error("Error loading favorites:",e)}}createSliderCard(t,e){const s=document.createElement("slider-card"),o=document.createElement("img");o.slot="image",o.src=`./images/coffee-img/coffee-slider-${e}.png`,o.alt=t.name;const i=document.createElement("h2");i.slot="content-title",i.className="title",i.textContent=t.name;const r=document.createElement("p");r.slot="content-text",r.className="text",r.textContent=t.description;const n=document.createElement("span");return n.slot="content-price",n.className="price",t.discountPrice?n.innerHTML=`<span style="text-decoration: line-through; opacity: 0.6; margin-right: 8px;">$${t.price}</span>$${t.discountPrice}`:n.textContent=`$${t.price}`,s.appendChild(o),s.appendChild(i),s.appendChild(r),s.appendChild(n),s}setupSlides(){this.slides.forEach((t,e)=>{e===0?(t.style.display="block",t.style.opacity="1"):(t.style.display="none",t.style.opacity="0")})}setupEventListeners(){this.prevButton&&this.prevButton.addEventListener("click",()=>this.prevSlide()),this.nextButton&&this.nextButton.addEventListener("click",()=>this.nextSlide()),this.pagination.forEach((t,e)=>{t.addEventListener("click",()=>this.goToSlide(e))}),this.sliderItems.addEventListener("mouseenter",()=>this.pauseAutoPlay()),this.sliderItems.addEventListener("mouseleave",()=>this.resumeAutoPlay()),this.sliderItems.addEventListener("touchstart",t=>{var s;const e=(s=t.changedTouches)==null?void 0:s[0];e&&(this.touchStartX=e.screenX),this.pauseAutoPlay()},{passive:!0}),this.sliderItems.addEventListener("touchend",t=>{var s;const e=(s=t.changedTouches)==null?void 0:s[0];e&&(this.touchEndX=e.screenX),this.handleSwipe(),this.resumeAutoPlay()},{passive:!0}),[this.prevButton,this.nextButton].forEach(t=>{t&&(t.addEventListener("mouseenter",()=>this.pauseAutoPlay()),t.addEventListener("mouseleave",()=>this.resumeAutoPlay()))})}handleSwipe(){const e=this.touchStartX-this.touchEndX;Math.abs(e)>50&&(e>0?this.nextSlide():this.prevSlide())}showSlide(t,e="next"){if(t<0||t>=this.slides.length)return;const s=this.slides[this.currentIndex],o=this.slides[t];this.animateTransition(s,o,e),this.pagination[this.currentIndex]&&this.pagination[this.currentIndex].classList.remove("active"),this.pagination[t]&&this.pagination[t].classList.add("active"),this.currentIndex=t,this.resetProgress()}showLoader(){var t;this.loader=!0,(t=document.querySelector(".loader"))==null||t.classList.add("show")}hideLoader(){this.loader=!1,document.querySelector(".loader").classList.remove("show")}animateTransition(t,e,s){const o=s==="next";this.sliderItems.style.position="relative",this.sliderItems.style.overflow="hidden";const i=t.offsetHeight;this.sliderItems.style.minHeight=`${i}px`,t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.transform="translateX(0)",t.style.opacity="1",t.style.transition="none",t.style.zIndex="1",e.style.display="block",e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.transform=o?"translateX(100%)":"translateX(-100%)",e.style.opacity="1",e.style.transition="none",e.style.zIndex="2",e.offsetHeight,t.style.transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",e.style.transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",requestAnimationFrame(()=>{t.style.transform=o?"translateX(-100%)":"translateX(100%)",t.style.opacity="0",e.style.transform="translateX(0)",e.style.opacity="1"}),window.setTimeout(()=>{t.style.display="none",t.style.position="static",t.style.transform="",t.style.opacity="",t.style.transition="",t.style.zIndex="",t.style.width="",e.style.position="static",e.style.transform="",e.style.transition="",e.style.zIndex="",e.style.width="";const r=e.offsetHeight;this.sliderItems.style.minHeight=`${r}px`,setTimeout(()=>{this.sliderItems.style.overflow="visible"},50)},600)}async setMaximumHeight(t){let e=0;t.forEach(s=>{s.style.display="block",s.style.position="static";const o=s.offsetHeight;o>e&&(e=o)}),this.sliderItems.style.height=`${e}px`,t.forEach((s,o)=>{s.style.visibility="visible",s.style.opacity="1",o===0?s.style.display="block":s.style.display="none"})}nextSlide(){const t=(this.currentIndex+1)%this.slides.length;this.showSlide(t,"next")}prevSlide(){const t=(this.currentIndex-1+this.slides.length)%this.slides.length;this.showSlide(t,"prev")}goToSlide(t){if(t!==this.currentIndex){const e=t>this.currentIndex?"next":"prev";this.showSlide(t,e)}}startAutoPlay(){this.autoPlayTimer=window.setTimeout(()=>{this.isPaused||this.nextSlide(),this.startAutoPlay()},this.autoPlayInterval),this.startProgress()}stopAutoPlay(){this.autoPlayTimer!==null&&(clearTimeout(this.autoPlayTimer),this.autoPlayTimer=null),this.stopProgress()}pauseAutoPlay(){this.isPaused=!0,this.stopProgress()}resumeAutoPlay(){this.isPaused=!1,this.startProgress()}startProgress(){this.stopProgress(),this.progressTimer=window.setInterval(()=>{this.isPaused||(this.progressWidth+=this.progressStep,this.progressWidth>=100&&(this.progressWidth=100),this.updateProgressBar())},50)}stopProgress(){this.progressTimer!==null&&(clearInterval(this.progressTimer),this.progressTimer=null)}resetProgress(){this.progressWidth=0,this.updateProgressBar()}updateProgressBar(){this.pagination.forEach((t,e)=>{e===this.currentIndex?t.style.background=`linear-gradient(to right, var(--boder-dark) ${this.progressWidth}%, var(--boder-ligtht) ${this.progressWidth}%)`:t.style.background="var(--boder-ligtht)"})}destroy(){this.stopAutoPlay(),this.stopProgress()}}document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector("#slider");if(l){const e=new D(l);window.carouselInstance=e}const t=localStorage.getItem("toastMessage");t&&(document.getElementById("appSuccess").show(t),localStorage.removeItem("toastMessage"))});class z{constructor(){this.cart=[],this.user=null,this.isLoading=!1,this.init(),this.success=document.getElementById("appSuccess")}async init(){this.loadCart(),this.checkAuth(),this.renderCart(),this.setupEventListeners()}loadCart(){const t=localStorage.getItem("cart");if(t)try{this.cart=JSON.parse(t)}catch(e){console.error("Error parsing cart:",e),this.cart=[]}}saveCart(){localStorage.setItem("cart",JSON.stringify(this.cart)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:this.cart}))}async checkAuth(){if(localStorage.getItem("access_token")){const e=localStorage.getItem("userData");if(e)try{this.user=JSON.parse(e)}catch(s){console.error("Error parsing user:",s)}}}renderCart(){var o,i,r,n;const t=document.querySelector(".cart-content"),e=document.querySelector(".total-price"),s=document.querySelector(".button");if(!(!t||!e||!s)){if(t.innerHTML="",this.cart.length===0){localStorage.getItem("access_token")?t.innerHTML=`
                    <div class="total-price">
                        <p class="total-title">
                            Total:
                            <span class="all-price">
                                <span class="price-discount">$0.00</span>
                                <span class="price">$0.00</span>
                            </span>
                        </p>
                        <p class="total-title adress">
                            Address:
                            <span class="all-price">
                                <span class="price">${(o=this.user)==null?void 0:o.city}, ${(i=this.user)==null?void 0:i.street}, ${(r=this.user)==null?void 0:r.houseNumber}</span>
                            </span>
                        </p>
                        <p class="total-title pay-by">
                            Pay by:
                            <span class="all-price">
                                <span class="price">${(n=this.user)==null?void 0:n.paymentMethod}</span>
                            </span>
                        </p>
                    </div>
                `:t.innerHTML=`
                    <div class="total-price">
                        <p class="total-title">
                            Total:
                            <span class="all-price">
                                <span class="price">$0.00</span>
                            </span>
                        </p>
                    </div>
                `,e.style.display="none",this.renderButtons();return}this.cart.forEach((a,c)=>{const d=this.createCartItemHTML(a,c);t.innerHTML+=d}),this.setupDeleteButtons(),this.renderTotals(),this.renderButtons(),e.style.display="block"}}createCartItemHTML(t,e){return`
            <div class="cart" data-index="${e}">
                <div class="cart-left">
                    <span class="trash" data-index="${e}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <div class="cart-info">
                        <div class="image">
                            <img src="/coffee-house/images/dessert-img/${t.category}-${t.id}.jpg" alt="${t.name}" width="100%">
                        </div>
                        <div class="info-text">
                            <h3 class="info-title">${t.name}</h3>
                            <p class="info-description">${t.description}</p>
                        </div>
                    </div>
                </div>
                <div class="cart-right">
                    ${t.totalDiscountPrice?`<div class="price-discount">$${t.totalPrice}</div>`:""}
                    <div class="price">$${t.totalDiscountPrice||t.totalPrice}</div>
                </div>
            </div>
        `}setupDeleteButtons(){document.querySelectorAll(".trash").forEach(e=>{e.addEventListener("click",s=>{const o=parseInt(s.currentTarget.getAttribute("data-index")||"0");this.removeItem(o)})})}removeItem(t){this.cart.splice(t,1),this.saveCart(),this.renderCart()}renderTotals(){const t=document.querySelector(".total-price");if(!t)return;const{total:e,totalDiscount:s}=this.calculateTotals(),o=s!==e;let i=`
            <p class="total-title">
                Total:
                <span class="all-price">
                    ${o?`<span class="price-discount">$${e}</span>`:""}
                    <span class="price">$${o?s:e}</span>
                </span>
            </p>
        `;this.user&&(i+=`
                <p class="total-title adress">
                    Address:
                    <span class="all-price">
                        <span class="price">${this.user.city}, ${this.user.street}, ${this.user.houseNumber}</span>
                    </span>
                </p>
                <p class="total-title pay-by">
                    Pay by:
                    <span class="all-price">
                        <span class="price">${this.user.paymentMethod==="cash"?"Cash":"Card"}</span>
                    </span>
                </p>
            `),t.innerHTML=i}calculateTotals(){let t=0,e=0;return this.cart.forEach(s=>{t+=parseFloat(s.totalPrice),e+=parseFloat(s.totalDiscountPrice||s.totalPrice)}),{total:t.toFixed(2),totalDiscount:e.toFixed(2)}}renderButtons(){const t=document.querySelector(".button");t&&(!this.user&&this.cart.length>0?(t.innerHTML=`
                <button-secondary text="Sign In" id="signin-btn"></button-secondary>
                <button-secondary text="Registration" id="register-btn"></button-secondary>
            `,this.setupAuthButtons()):this.user&&this.cart.length>0?(t.innerHTML=`
                <button-secondary text="Confirm Order" id="confirm-btn"></button-secondary>
            `,this.setupConfirmButton()):t.innerHTML="")}setupAuthButtons(){var o;const t=document.getElementById("signin-btn"),e=document.getElementById("register-btn"),s=t==null?void 0:t.querySelector("button");s.disabled=!0,s.style.opacity="1",s.style.cursor="pointer",console.log((o=t==null?void 0:t.querySelector("button"))==null?void 0:o.attributes),t==null||t.addEventListener("click",()=>{window.location.href="/pages/login/index"}),e==null||e.addEventListener("click",()=>{window.location.href="/pages/register/index"})}setupConfirmButton(){const t=document.getElementById("confirm-btn");t==null||t.addEventListener("click",()=>{this.confirmOrder()})}async confirmOrder(){if(!this.isLoading){this.showLoader();try{const t=localStorage.getItem("access_token");if(!t){this.showError("Please sign in to place an order");return}const e={items:this.cart.map(o=>({productId:o.id,size:o.size,additives:o.additives,quantity:1})),totalPrice:+this.calculateTotals().totalDiscount||+this.calculateTotals().total};if((await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/orders/confirm",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).status>=400){this.showError("Something went wrong. Please, try again");return}this.clearCart(),this.showSuccess("Thank you for your order! Our manager will contact you shortly."),setTimeout(()=>{window.location.href="/"},3e3)}catch(t){console.error("Error confirming order:",t),this.showError("Something went wrong. Please, try again")}finally{this.hideLoader()}}}clearCart(){this.cart=[],localStorage.removeItem("cart"),window.dispatchEvent(new CustomEvent("cart-updated",{detail:[]})),this.renderCart()}showLoader(){this.isLoading=!0;const t=document.getElementById("confirm-btn"),e=t==null?void 0:t.querySelector("button");e&&(e.disabled=!0,e.textContent="Processing...",e.style.opacity="0.6")}hideLoader(){this.isLoading=!1;const t=document.getElementById("confirm-btn"),e=t==null?void 0:t.querySelector("button");e&&(e.disabled=!1,e.textContent="Confirm Order",e.style.opacity="1")}showError(t){const e=document.getElementById("appError");e&&"show"in e?e.show(t):alert(t)}showSuccess(t){this.success.show(t)}setupEventListeners(){window.addEventListener("cart-updated",()=>{this.loadCart(),this.renderCart()}),window.addEventListener("storage",t=>{(t.key==="access_token"||t.key==="user")&&(this.checkAuth(),this.renderButtons(),this.renderTotals())})}}document.addEventListener("DOMContentLoaded",()=>{new z});var m=(l=>(l.Coffee="coffee",l.Dessert="dessert",l.Tea="tea",l))(m||{});class B{constructor(){this.products=[],this.loader=!1,this.products=[],this.categories={coffee:[],tea:[],dessert:[]},this.currentCategory=m.Coffee,this.displayLimit=4,this.isLoadMoreVisible=!1,this.err=document.getElementById("appError"),this.init()}async init(){await this.loadProducts(),this.organizeByCategory(),this.setupCategoryButtons(),this.setupResponsive(),this.displayProducts()}async loadProducts(){var t,e;try{this.loader=!0;const o=await(await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products")).json();if(o.error){this.loader=!1,(t=this.err)==null||t.show("Something went wrong. Please, refresh the page");return}this.products=o.data,this.loader=!1}catch(s){this.loader=!1,(e=this.err)==null||e.show("Something went wrong. Please, refresh the page"),console.error("Error loading products:",s)}}organizeByCategory(){this.products.forEach((t,e)=>{const s=t.category;this.categories[s]&&this.categories[s].push({...t,index:e+1})})}getImagePath(t,e){const s={coffee:"coffee",tea:"tea",dessert:"dessert"};let o=e;return s[t]==="dessert"?o=o-12:s[t]==="tea"&&(o=o-8),`/images/dessert-img/${s[t]}-${o}.${s[t]==="coffee"?"jpg":"png"}`}createProductCard(t){const e=document.createElement("coffee-card"),s=document.createElement("img");s.slot="image",s.src=this.getImagePath(t.category,t.index),s.alt=t.name;const o=document.createElement("h2");o.slot="content-title",o.className="title",o.textContent=t.name;const i=document.createElement("p");i.slot="content-text",i.className="text",i.textContent=t.description;const r=document.createElement("span");if(r.slot="content-price",r.className="price",r.textContent=`$${t.price}`,localStorage.getItem("access_token")){const n=document.createElement("span");n.slot="content-discountPrice",n.className="content-discountPrice",n.textContent=`$${t.discountPrice}`,e.appendChild(n)}return e.appendChild(s),e.appendChild(o),e.appendChild(i),e.appendChild(r),e}setupCategoryButtons(){const t=document.querySelectorAll("tab-button");t.forEach((e,s)=>{const i=[m.Coffee,m.Tea,m.Dessert][s];s===0&&e.children[1].classList.add("active"),e.addEventListener("click",()=>{t.forEach(r=>{r.removeAttribute("active"),r.children[1].classList.remove("active")}),e.children[1].classList.add("active"),this.currentCategory=i,this.displayProducts()})})}setupResponsive(){let t;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(()=>{this.updateDisplayLimit(),this.displayProducts()},250)}),this.updateDisplayLimit()}updateDisplayLimit(){window.innerWidth<=768?this.displayLimit=4:this.displayLimit=8}displayProducts(){const t=document.querySelector(".cards-content"),e=this.categories[this.currentCategory];if(console.log(e),!t||!e)return;t.innerHTML="",e.slice(0,this.displayLimit).forEach(o=>{const i=this.createProductCard(o);this.addListener(i,o.id||1),t.appendChild(i)}),this.handleLoadMoreButton(e.length)}addListener(t,e){t.addEventListener("click",()=>{const s=document.createElement("popup-modal");s.setAttribute("productId",e.toString()),document.querySelector("body").appendChild(s)})}handleLoadMoreButton(t){const e=document.querySelector(".cards .container");let s=document.querySelector(".load-more-btn");window.innerWidth<=768&&t>this.displayLimit&&this.displayLimit===4?(s||(s=this.createLoadMoreButton(),e.appendChild(s)),s.style.display="flex",this.isLoadMoreVisible=!0):(s&&(s.style.display="none"),this.isLoadMoreVisible=!1)}createLoadMoreButton(){const t=document.createElement("div");return t.className="load-more-btn",t.innerHTML=`
            <button class="load-more">
                <span>Load More</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="#403F3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `,t.querySelector("button").addEventListener("click",()=>{this.loadMoreProducts()}),t}loadMoreProducts(){const t=document.querySelector(".cards-content"),e=this.categories[this.currentCategory];if(!t)return;e.slice(this.displayLimit).forEach(i=>{const r=this.createProductCard(i);t.appendChild(r)});const o=document.querySelector(".load-more-btn");o&&(o.style.display="none"),this.isLoadMoreVisible=!1}showLoader(){var t;this.loader=!0,(t=document.querySelector(".loader"))==null||t.classList.add("show")}hideLoader(){this.loader=!1,document.querySelector(".loader").classList.remove("show")}}document.addEventListener("DOMContentLoaded",()=>{const l=new B;window.menuPageInstance=l});class H extends HTMLElement{constructor(){super(),this.name=null,this.validationRules={login:t=>t.length<3?{isValid:!1,message:"Login must be at least 3 characters"}:/^[a-zA-Z]/.test(t)?/^[a-zA-Z]+$/.test(t)?{isValid:!0,message:""}:{isValid:!1,message:"Only English letters are allowed"}:{isValid:!1,message:"Login must start with a letter"},password:t=>t.length<6?{isValid:!1,message:"Password must be at least 6 characters"}:/[!@#$%^&*(),.?":{}|<>]/.test(t)?{isValid:!0,message:""}:{isValid:!1,message:"Password must contain at least 1 special character"},confirmPassword:t=>{if(window.location.href.includes("register")){const e=document.querySelector('input-field[name="password"]'),s=(e==null?void 0:e.getValue())||"";if(t!==s)return{isValid:!1,message:"Passwords do not match"};if(t.length<6)return{isValid:!1,message:"Password must be at least 6 characters"};if(!/[!@#$%^&*(),.?":{}|<>]/.test(t))return{isValid:!1,message:"Password must contain at least 1 special character"}}return{isValid:!0,message:""}},houseNumber:t=>{if(window.location.href.includes("register")){const e=parseInt(t);if(isNaN(e)||e<=1)return{isValid:!1,message:"House number must be greater than 1"}}return{isValid:!0,message:""}}},this.shadow=this.attachShadow({mode:"open"})}async connectedCallback(){const t=this.getAttribute("label"),e=this.getAttribute("type"),s=this.getAttribute("name");this.name=s||null,this.shadow.innerHTML=`
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Inter', sans-serif;
                font-weight: 600;
                line-height: 150%;
                letter-spacing: 0%;
            }

            .input-field {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .input-field label {
                font-family: Inter;
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                color: var(--dark);
            }

            .input-wrapper {
                position: relative;
            }

            .input-field input {
                display: block;
                width: 100%;
                padding: 12px 16px;
                border-radius: 12px;
                border: 1px solid var(--boder-ligtht);
                color: var(--dark);
                font-weight: 400;
                font-size: 16px;
                background: transparent;
                transition: border-color 0.3s ease;
            }

            .input-field input.error {
                border-color: #ff4444;
                padding-right: 40px;
            }

            .input-field input:focus {
                outline: none;
                border-color: var(--accent);
            }   

            .input-field input::placeholder {
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;
                color: var(--placeholder);
            }

            .error-icon {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                display: none;
            }

            .error-icon.show {
                display: block;
            }

            .error-message {
                font-size: 12px;
                color: #ff4444;
                font-weight: 400;
                margin-top: 4px;
                display: none;
            }

            .error-message.show {
                display: block;
            }
        
        </style>
        <div class="input-field">
            <label for="${t||"Input"}">${t||"Input"}</label>
            <div class="input-wrapper">
                <input type="${e||"text"}" id="${t||"Input"}" name="${s}" placeholder="Placeholder" />
                <span class="error-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#ff4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>
            <span class="error-message"></span>
        </div>
        `,this.setupEventListeners()}setupEventListeners(){const t=this.shadow.querySelector("input");t&&(t.addEventListener("blur",()=>this.validate()),t.addEventListener("focus",()=>this.clearValidation()),t.addEventListener("input",()=>{this.dispatchEvent(new CustomEvent("field-changed",{bubbles:!0,composed:!0}))}))}validate(){if(!this.name||!this.validationRules[this.name])return this.validateRequired();const e=this.shadow.querySelector("input").value.trim();if(!e)return this.showError("This field is required"),!1;const s=this.validationRules[this.name](e);return s.isValid?(this.clearValidation(),!0):(this.showError(s.message),!1)}validateRequired(){return this.shadow.querySelector("input").value.trim()?(this.clearValidation(),!0):(this.showError("This field is required"),!1)}showError(t){const e=this.shadow.querySelector("input"),s=this.shadow.querySelector(".error-icon"),o=this.shadow.querySelector(".error-message");e==null||e.classList.add("error"),s==null||s.classList.add("show"),o&&(o.textContent=t,o.classList.add("show"))}clearValidation(){const t=this.shadow.querySelector("input"),e=this.shadow.querySelector(".error-icon"),s=this.shadow.querySelector(".error-message");t==null||t.classList.remove("error"),e==null||e.classList.remove("show"),s==null||s.classList.remove("show")}get value(){return{[this.name||""]:this.shadow.querySelector("input").value||null}}getValue(){var t;return((t=this.shadow.querySelector("input"))==null?void 0:t.value)||""}isValid(){return this.validate()}}customElements.define("input-field",H);class ${constructor(){this.responseData={},this.err=document.getElementById("appError"),this.success=document.getElementById("appSuccess"),this.setupSubmitButton()}setupSubmitButton(){const t=document.querySelector("button-secondary"),e=t==null?void 0:t.querySelector("button");e&&(e.disabled=!0,e.style.opacity="0.5",e.style.cursor="not-allowed",document.addEventListener("field-changed",()=>{this.checkFormValidity()}),t.addEventListener("click",s=>{s.preventDefault(),this.validateForm()&&this.submit()}))}isFormValid(){const t=document.querySelectorAll("input-field");for(const e of Array.from(t)){const s=e.getValue();if(!s||s.trim()==="")return!1}return!0}checkFormValidity(){const t=document.querySelector("button-secondary button");if(!t)return;const e=this.isFormValid();t.disabled=!e,t.style.opacity=e?"1":"0.5",t.style.cursor=e?"pointer":"not-allowed"}validateForm(){let t=!0;return document.querySelectorAll("input-field").forEach(s=>{s.isValid()||(t=!1)}),t}async submit(){var o;if(!this.validateForm())return;const e=document.querySelector(".form-field").querySelectorAll("input-field"),s={};e.forEach(i=>{const r=i;s[r.getAttribute("name")||""]=r.getValue()}),console.log("Submitting data:",s);try{const i=await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),r=await i.json();if("error"in r&&r.error){(o=this.err)==null||o.show("Incorrect login or password");return}if(i.status>=400)this.responseData=r,console.log(this.responseData);else{const n=r.message||"Registration successful!",a=r;localStorage.setItem("toastMessage",n),localStorage.setItem("userData",JSON.stringify(a.data.user)),localStorage.setItem("access_token",JSON.stringify(a.data.access_token)),window.location.href="index.html"}}catch(i){console.error("Error during registration:",i),alert("An error occurred. Please try again.")}}}document.addEventListener("DOMContentLoaded",()=>new $);class V extends HTMLElement{static get observedAttributes(){return["label","name","disabled","options","value"]}constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){this.shadow.innerHTML=`
      <style>
        :host { display: block; }
        .field {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        label { font-family: Inter, sans-serif; font-size:16px; color:var(--dark); font-weight:400; }
        select {
            display: block;
            width: 100%;
            padding: 16px;
            border-radius: 12px;
            border: 1px solid var(--boder-ligtht);
            color: var(--dark);
            font-weight: 400;
            font-size: 16px;
            background: transparent;
            transition: border-color 0.3s ease;
        }

        select option {
            background: var(--body);
            color: var(--dark);
            border: 1px solid var(--boder-ligtht);
            border-radius: 12px;
            padding: 10px;
        }
        select:focus {
            outline: none;
            border-color: var(--accent);
        }
        select.error { border-color: #ff4444; }
        .error-message {
            font-size: 12px;
            color: #ff4444;
            font-weight: 400;
            margin-top: 4px;
            display: none;
        }
        .error-message.show { display: block; }
      </style>

      <div class="field">
        <label></label>
        <select>
          <option value="">Select</option>
        </select>
        <span class="error-message"></span>
      </div>
    `,this.labelEl=this.shadow.querySelector("label"),this.selectEl=this.shadow.querySelector("select"),this.errorEl=this.shadow.querySelector(".error-message"),this.selectEl.addEventListener("change",()=>this.onChange()),this.selectEl.addEventListener("blur",()=>this.validate())}attributeChangedCallback(t,e,s){const o=this.getAttribute("label")??"",i=this.getAttribute("name")??"",r=this.hasAttribute("disabled"),n=this.getAttribute("options"),a=this.getAttribute("value");if(this.labelEl.textContent=o,this.selectEl.name=i,this.selectEl.disabled=r,n)try{const c=JSON.parse(n);Array.isArray(c)&&this.setOptions(c)}catch{}a!==null&&this.selectEl.value!==a&&(this.selectEl.value=a)}setOptions(t){const e=this.getValue();this.selectEl.innerHTML=`<option value="">Select ${this.labelEl.textContent||""}</option>`+t.map(s=>`<option value="${this.escapeHtml(s)}">${this.escapeHtml(s)}</option>`).join(""),e&&this.setValue(e)}getValue(){return this.selectEl.value}setValue(t){this.selectEl.value=t}isValid(){return this.validate()}clearError(){this.errorEl.textContent="",this.errorEl.classList.remove("show"),this.selectEl.classList.remove("error")}onChange(){this.clearError();const t=this.getAttribute("name")??"",e=this.getValue();this.dispatchEvent(new CustomEvent("value-changed",{detail:{name:t,value:e},bubbles:!0,composed:!0})),document.dispatchEvent(new CustomEvent("field-changed"))}validate(){return this.getValue()?(this.clearError(),!0):(this.selectEl.classList.add("error"),this.errorEl.textContent="This field is required",this.errorEl.classList.add("show"),!1)}escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}customElements.define("dropdown-field",V);class F{constructor(){this.error="",this.responseData={},this.cityStreets={"New York":["5th Avenue","Broadway","Wall Street","Park Avenue","Madison Avenue","Lexington Avenue","3rd Avenue","2nd Avenue","1st Avenue","Amsterdam Avenue"],"Los Angeles":["Sunset Boulevard","Hollywood Boulevard","Rodeo Drive","Melrose Avenue","Venice Boulevard","Santa Monica Boulevard","Wilshire Boulevard","La Brea Avenue","Fairfax Avenue","Beverly Boulevard"],Chicago:["Michigan Avenue","State Street","Lake Shore Drive","Clark Street","Division Street","Ashland Avenue","Western Avenue","Halsted Street","Broadway","Lincoln Avenue"]},this.err=document.getElementById("appError"),this.setupForm(),this.setupSubmitButton()}setupForm(){const t=document.querySelector('dropdown-field[name="city"]'),e=document.querySelector('dropdown-field[name="street"]');if(t){const s=this.createDropdown("city","City",Object.keys(this.cityStreets));t.replaceWith(s),s.addEventListener("value-changed",o=>{console.log(o);const r=o.detail.value;this.updateStreetDropdown(r)})}if(e){const s=this.createDropdown("street","Street",[],!0);e.replaceWith(s)}this.setupPaymentMethod()}createDropdown(t,e,s,o=!1){const i=document.createElement("dropdown-field");return i.setAttribute("name",t),i.setAttribute("label",e),o&&i.setAttribute("disabled",""),i.setOptions(s),i}updateStreetDropdown(t){const e=document.querySelector('dropdown-field[name="street"]');e&&(t?(e.removeAttribute("disabled"),e.setOptions(this.cityStreets[t]||[])):(e.setAttribute("disabled",""),e.setOptions([])))}setupPaymentMethod(){document.querySelectorAll('input[type="radio"]').forEach(e=>{e.addEventListener("change",()=>this.checkFormValidity())})}setupSubmitButton(){const t=document.querySelector("button-secondary"),e=t==null?void 0:t.querySelector("button");e&&(e.disabled=!0,e.style.opacity="0.5",e.style.cursor="not-allowed",document.addEventListener("field-changed",()=>{this.checkFormValidity()}),t.addEventListener("click",s=>{s.preventDefault(),this.validateForm()&&this.submit()}))}checkFormValidity(){const t=document.querySelector("button-secondary button");if(!t)return;const e=this.isFormValid();t.disabled=!e,t.style.opacity=e?"1":"0.5",t.style.cursor=e?"pointer":"not-allowed"}isFormValid(){const t=document.querySelectorAll("input-field"),e=document.querySelectorAll("dropdown-field"),s=document.querySelector('input[type="radio"]:checked');for(const o of Array.from(t)){const i=o.getValue();if(!i||i.trim()==="")return!1}for(const o of Array.from(e)){const i=o.getValue();if(!i||i.trim()==="")return!1}return!!s}validateForm(){let t=!0;if(document.querySelectorAll("input-field").forEach(i=>{i.isValid()||(t=!1)}),document.querySelectorAll("dropdown-field").forEach(i=>{i.isValid()||(t=!1)}),!document.querySelector('input[type="radio"]:checked')){t=!1;const i=document.querySelector(".radio-container");if(i&&!i.querySelector(".payment-error")){const r=document.createElement("span");r.className="payment-error",r.style.cssText="font-size: 12px; color: #ff4444; margin-top: 4px; display: block;",r.textContent="Please select a payment method",i.appendChild(r)}}return t}async submit(){var r;if(!this.validateForm())return;const e=document.querySelector(".form-field").querySelectorAll("input-field"),s=document.querySelectorAll("dropdown-field"),o=document.querySelector('input[type="radio"]:checked'),i={};e.forEach(n=>{const a=n;i[a.getAttribute("name")||""]=a.getValue()}),s.forEach(n=>{const a=n;i[a.getAttribute("name")||""]=a.getValue()}),o&&(i.paymentMethod=o.value),i.houseNumber=+i.houseNumber,console.log("Submitting data:",i);try{const n=await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await n.json();if(console.log(a),"error"in a&&a.error){this.error=a.error,(r=this.err)==null||r.show(a.error);return}n.status>=400?(this.responseData=a,console.log(this.responseData)):(window.location.href="index.html",alert(a.message))}catch(n){console.error("Error during registration:",n),alert("An error occurred. Please try again.")}}}document.addEventListener("DOMContentLoaded",()=>new F);
