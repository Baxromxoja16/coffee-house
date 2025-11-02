import"./index-BX_3DaOn.js";import"./index-DS_3fMwH.js";import"./index-CaH19xyh.js";class a{constructor(){this.cart=[],this.user=null,this.isLoading=!1,this.init(),this.success=document.getElementById("appSuccess")}async init(){this.loadCart(),this.checkAuth(),this.renderCart(),this.setupEventListeners()}loadCart(){const t=localStorage.getItem("cart");if(t)try{this.cart=JSON.parse(t)}catch(e){console.error("Error parsing cart:",e),this.cart=[]}}saveCart(){localStorage.setItem("cart",JSON.stringify(this.cart)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:this.cart}))}async checkAuth(){if(localStorage.getItem("access_token")){const e=localStorage.getItem("userData");if(e)try{this.user=JSON.parse(e)}catch(s){console.error("Error parsing user:",s)}}}renderCart(){const t=document.querySelector(".cart-content"),e=document.querySelector(".total-price"),s=document.querySelector(".button");if(!(!t||!e||!s)){if(t.innerHTML="",this.cart.length===0){localStorage.getItem("access_token")?t.innerHTML=`
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
                                <span class="price">${this.user?.city}, ${this.user?.street}, ${this.user?.houseNumber}</span>
                            </span>
                        </p>
                        <p class="total-title pay-by">
                            Pay by:
                            <span class="all-price">
                                <span class="price">${this.user?.paymentMethod}</span>
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
                `,e.style.display="none",this.renderButtons();return}this.cart.forEach((r,n)=>{const o=this.createCartItemHTML(r,n);t.innerHTML+=o}),this.setupDeleteButtons(),this.renderTotals(),this.renderButtons(),e.style.display="block"}}createCartItemHTML(t,e){return`
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
        `}setupDeleteButtons(){document.querySelectorAll(".trash").forEach(e=>{e.addEventListener("click",s=>{const r=parseInt(s.currentTarget.getAttribute("data-index")||"0");this.removeItem(r)})})}removeItem(t){this.cart.splice(t,1),this.saveCart(),this.renderCart()}renderTotals(){const t=document.querySelector(".total-price");if(!t)return;const{total:e,totalDiscount:s}=this.calculateTotals(),r=s!==e;let n=`
            <p class="total-title">
                Total:
                <span class="all-price">
                    ${r?`<span class="price-discount">$${e}</span>`:""}
                    <span class="price">$${r?s:e}</span>
                </span>
            </p>
        `;this.user&&(n+=`
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
            `),t.innerHTML=n}calculateTotals(){let t=0,e=0;return this.cart.forEach(s=>{t+=parseFloat(s.totalPrice),e+=parseFloat(s.totalDiscountPrice||s.totalPrice)}),{total:t.toFixed(2),totalDiscount:e.toFixed(2)}}renderButtons(){const t=document.querySelector(".button");t&&(!this.user&&this.cart.length>0?(t.innerHTML=`
                <button-secondary text="Sign In" id="signin-btn"></button-secondary>
                <button-secondary text="Registration" id="register-btn"></button-secondary>
            `,this.setupAuthButtons(),t.querySelector("button-secondary button").removeAttribute("disabled"),t.querySelector("button-secondary button").style.cursor="pointer",console.log(t.querySelector("button-secondary button"))):this.user&&this.cart.length>0?(t.innerHTML=`
                <button-secondary text="Confirm Order" id="confirm-btn"></button-secondary>
            `,this.setupConfirmButton()):t.innerHTML="")}setupAuthButtons(){const t=document.getElementById("signin-btn"),e=document.getElementById("register-btn"),s=t?.querySelector("button");s.disabled=!1,s.style.opacity="1",s.style.cursor="pointer",console.log(t?.querySelector("button")?.attributes),t?.addEventListener("click",()=>{window.location.href="/coffee-house/pages/login/index"}),e?.addEventListener("click",()=>{window.location.href="/coffee-house/pages/register/index"})}setupConfirmButton(){document.getElementById("confirm-btn")?.addEventListener("click",()=>{this.confirmOrder()})}async confirmOrder(){if(!this.isLoading){this.showLoader();try{const t=localStorage.getItem("access_token");if(!t){this.showError("Please sign in to place an order");return}const e={items:this.cart.map(r=>({productId:r.id,size:r.size,additives:r.additives,quantity:1})),totalPrice:+this.calculateTotals().totalDiscount||+this.calculateTotals().total};if((await fetch("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/orders/confirm",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).status>=400){this.showError("Something went wrong. Please, try again");return}this.clearCart(),this.showSuccess("Thank you for your order! Our manager will contact you shortly."),setTimeout(()=>{window.location.href="/"},3e3)}catch(t){console.error("Error confirming order:",t),this.showError("Something went wrong. Please, try again")}finally{this.hideLoader()}}}clearCart(){this.cart=[],localStorage.removeItem("cart"),window.dispatchEvent(new CustomEvent("cart-updated",{detail:[]})),this.renderCart()}showLoader(){this.isLoading=!0;const e=document.getElementById("confirm-btn")?.querySelector("button");e&&(e.disabled=!0,e.textContent="Processing...",e.style.opacity="0.6")}hideLoader(){this.isLoading=!1;const e=document.getElementById("confirm-btn")?.querySelector("button");e&&(e.disabled=!1,e.textContent="Confirm Order",e.style.opacity="1")}showError(t){const e=document.getElementById("appError");e&&"show"in e?e.show(t):alert(t)}showSuccess(t){this.success.show(t)}setupEventListeners(){window.addEventListener("cart-updated",()=>{this.loadCart(),this.renderCart()}),window.addEventListener("storage",t=>{(t.key==="access_token"||t.key==="user")&&(this.checkAuth(),this.renderButtons(),this.renderTotals())})}}document.addEventListener("DOMContentLoaded",()=>{new a});
