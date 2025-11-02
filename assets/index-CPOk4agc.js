class m extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("text"),e=this.getAttribute("icon");this.innerHTML=`
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
        `}}customElements.define("tab-button",m);class f extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){const t=this.getAttribute("text");this.shadow.innerHTML=`
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
        `;const e=this.shadow.querySelector('slot[name="icon"]'),o=this.shadow.querySelector(".button-app-store");e&&e.assignedNodes().forEach(n=>{n.querySelectorAll("path").forEach(d=>{o.addEventListener("mouseover",()=>{d.style.transition="0.3s",d.style.fill="var(--light)"}),o.addEventListener("mouseout",()=>{d.style.transition="0.3s",d.style.fill="var(--dark)"})})})}}customElements.define("button-app-store",f);class v extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>
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
        `;const t=this.shadow.querySelector('slot[name="icon"]'),e=this.shadow.querySelector(".carousel-button");t&&t.assignedNodes().forEach(i=>{i instanceof Element&&i.querySelectorAll("path").forEach(s=>{e.addEventListener("mouseover",()=>{s.style.transition="0.3s",s.style.stroke="var(--light)"}),e.addEventListener("mouseout",()=>{s.style.transition="0.3s",s.style.stroke="var(--dark)"})})})}}customElements.define("button-carousel",v);class g extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
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
    `}}customElements.define("slider-card",g);class x extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
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
    `}}customElements.define("coffee-card",x);class b extends HTMLElement{constructor(){super(),this.selectedSize="s",this.shadow=this.attachShadow({mode:"open"}),this.productData={},this.selectedSize="s",this.selectedAdditives=[],this.isLoading=!1,this.productId=null,this.err=document.getElementById("appError"),this.success=document.getElementById("appSuccess")}connectedCallback(){this.render(),this.setupEventListeners()}render(){const t=this.getAttribute("productId")?this.getAttribute("productId"):null;this.productId=t,this.open(t),this.shadow.innerHTML=`
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
        `}setupEventListeners(){const t=this.shadow.querySelector(".overlay"),e=this.shadow.querySelector(".modal");this.shadow.querySelector(".close-icon").addEventListener("click",()=>this.close()),t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",n=>{n.key==="Escape"&&e.classList.contains("show")&&this.close()}),this.shadow.querySelector(".add-to-cart").addEventListener("click",()=>{this.addToCart()})}async open(t=""){this.showLoader();try{const e=await this.fetchProduct(t);this.productData=e,this.populateModal(),this.hideLoader(),this.showModal()}catch(e){this.hideLoader(),this.hideModal(),this.err?.show("Something went wrong. Please, try again"),console.error("Error fetching product:",e)}}async fetchProduct(t){return new Promise((e,o)=>{setTimeout(async()=>{try{const s=(await(await fetch("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/"+t)).json())?.data;console.log(s),s?e({...s,image:this.getImagePath(s.category,s.id)}):o(new Error("Product not found"))}catch(i){o(i)}},0)})}getImagePath(t,e){const o={coffee:"coffee",tea:"tea",dessert:"dessert"};let i=e;return o[t]==="dessert"?i=i-16:o[t]==="tea"&&(i=i-8),console.log(i),`../../images/dessert-img/${o[t]}-${i}.${o[t]==="coffee"?"jpg":"png"}`}populateModal(){if(!this.productData)return;const t=this.shadow.querySelector(".modal-img img"),e=this.shadow.querySelector(".modal-title"),o=this.shadow.querySelector(".modal-description"),i=this.shadow.querySelector(".modal-size .size-item"),n=this.shadow.querySelector(".modal-additives .size-item");t.src=this.productData.image||"",console.log(t.src),t.alt=this.productData.name,e.textContent=this.productData.name,o.textContent=this.productData.description,i.innerHTML="",n.innerHTML="",Object.entries(this.productData.sizes).forEach(([s,d],a)=>{const r=document.createElement("tab-button");r.setAttribute("text",d.size),r.setAttribute("icon",s.toUpperCase()),r.setAttribute("data-size",s),r.setAttribute("data-price",d.price),r.setAttribute("data-discount-price",d.discountPrice||d.price),a===0&&(r.setAttribute("active","true"),this.selectedSize=s),r.addEventListener("mouseenter",l=>{const c=d.price,h=d.discountPrice;let u="";h&&h!==c?u=`<span style="text-decoration: line-through;">$${c}</span> $${h}`:u=`$${c}`,this.showTooltip(l.target,u)}),r.addEventListener("mouseleave",l=>{this.hideTooltip(l.target)}),r.addEventListener("click",()=>{i.querySelectorAll("tab-button").forEach(l=>l.removeAttribute("active")),this.activeButton(i),r.setAttribute("active","true"),this.selectedSize=s,this.updateTotal()}),i.appendChild(r)}),this.productData.additives.forEach((s,d)=>{const a=document.createElement("tab-button");a.setAttribute("text",s.name),a.setAttribute("icon",(d+1).toString()),a.setAttribute("data-additive",s.name),a.setAttribute("data-price",s.price),a.setAttribute("data-discount-price",s.discountPrice||s.price),a.addEventListener("mouseenter",r=>{const l=s.price,c=s.discountPrice;let h="";c&&c!==l?h=`<span style="text-decoration: line-through;">$${l}</span> $${c}`:h=`+$${l}`,this.showTooltip(r.target,h)}),a.addEventListener("mouseleave",r=>{this.hideTooltip(r.target)}),a.addEventListener("click",()=>{a.hasAttribute("active")?(a.removeAttribute("active"),this.selectedAdditives=this.selectedAdditives.filter(l=>l!==s.name)):(a.setAttribute("active","true"),this.selectedAdditives.push(s.name)),this.updateTotal()}),n.appendChild(a),this.activeButton(n)}),this.updateTotal()}showTooltip(t,e){if(t){const o=document.createElement("div");o.className="tooltip show",o.innerHTML=e,t.style.position="relative",t.appendChild(o)}}hideTooltip(t){if(t){const e=t.querySelector(".tooltip");e&&e.remove()}}updateTotal(){if(!this.productData)return;let t=0,e=0;const o=this.productData.sizes?.[this.selectedSize];o&&(t+=parseFloat(o.price),e+=parseFloat(o.discountPrice||o.price)),this.selectedAdditives.forEach(d=>{const a=this.productData.additives?.find(r=>r.name===d);a&&(t+=parseFloat(a.price),e+=parseFloat(a.discountPrice||a.price))});const i=this.shadow.querySelector(".total-price"),n=i.querySelector(".discount-price"),s=i.querySelector(".price");e!==t?(n.style.display="inline",n.textContent=`$${t.toFixed(2)}`,s.textContent=`$${e.toFixed(2)}`):(n.style.display="none",s.textContent=`$${t.toFixed(2)}`)}showLoader(){this.isLoading=!0,this.shadow.querySelector(".overlay")?.classList.add("show"),this.shadow.querySelector(".loader")?.classList.add("show")}hideLoader(){this.isLoading=!1,this.shadow.querySelector(".loader").classList.remove("show")}showModal(){this.shadow.querySelector(".modal").classList.add("show"),document.body.style.overflow="hidden"}hideModal(){this.shadow.querySelector(".modal").classList.remove("show"),this.shadow.querySelector(".overlay").classList.remove("show"),document.body.style.overflow="hidden"}addToCart(){if(!this.productData)return;const t=this.productData.sizes?.[this.selectedSize];if(!t)return;let e=0,o=0;this.selectedAdditives.forEach(l=>{const c=this.productData.additives?.find(h=>h.name===l);c&&(e+=parseFloat(c.price),o+=parseFloat(c.discountPrice||c.price))});const i=parseFloat(t.price),n=parseFloat(t.discountPrice||t.price),s=i+e,d=n+o,a={id:this.productData.id,name:this.productData.name,description:this.productData.description,category:this.productData.category,size:t.size,sizePrice:t.price,sizeDiscountPrice:t.discountPrice,additives:[...this.selectedAdditives],additivesPrice:e.toFixed(2),additivesDiscountPrice:o>0?o.toFixed(2):void 0,totalPrice:s.toFixed(2),totalDiscountPrice:d!==s?d.toFixed(2):void 0,image:this.productData.image};y(a)?this.success.show("This item has already been added to cart"):this.success.show("Added to cart"),this.close()}close(){this.shadow.querySelector(".overlay").classList.remove("show"),this.shadow.querySelector(".modal").classList.remove("show"),document.body.style.overflow="",this.selectedSize="s",this.selectedAdditives=[]}activeButton(t){const e=t.querySelectorAll("tab-button");console.log(e),e.forEach((o,i)=>{i===0&&o.setAttribute("active","true"),o.addEventListener("click",()=>{e.forEach(n=>{n.removeAttribute("active"),n.children[1].classList.remove("active")}),o.children[1].classList.add("active"),o.setAttribute("active","true")})})}}function y(p){const t=localStorage.getItem("cart")||"[]",e=JSON.parse(t),o=e.findIndex(i=>i.id===p.id);return o+1?(e.splice(o,1,p),localStorage.setItem("cart",JSON.stringify(e)),!0):(e.push(p),localStorage.setItem("cart",JSON.stringify(e)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:e})),!1)}customElements.define("popup-modal",b);
