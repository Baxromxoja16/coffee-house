import"./index-CPOk4agc.js";import"./index-BX_3DaOn.js";import"./index-BTdpohs5.js";import"./index-DS_3fMwH.js";class c extends HTMLElement{static get observedAttributes(){return["label","name","disabled","options","value"]}constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){this.shadow.innerHTML=`
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
    `,this.labelEl=this.shadow.querySelector("label"),this.selectEl=this.shadow.querySelector("select"),this.errorEl=this.shadow.querySelector(".error-message"),this.selectEl.addEventListener("change",()=>this.onChange()),this.selectEl.addEventListener("blur",()=>this.validate())}attributeChangedCallback(e,t,o){const i=this.getAttribute("label")??"",r=this.getAttribute("name")??"",s=this.hasAttribute("disabled"),n=this.getAttribute("options"),a=this.getAttribute("value");if(this.labelEl.textContent=i,this.selectEl.name=r,this.selectEl.disabled=s,n)try{const l=JSON.parse(n);Array.isArray(l)&&this.setOptions(l)}catch{}a!==null&&this.selectEl.value!==a&&(this.selectEl.value=a)}setOptions(e){const t=this.getValue();this.selectEl.innerHTML=`<option value="">Select ${this.labelEl.textContent||""}</option>`+e.map(o=>`<option value="${this.escapeHtml(o)}">${this.escapeHtml(o)}</option>`).join(""),t&&this.setValue(t)}getValue(){return this.selectEl.value}setValue(e){this.selectEl.value=e}isValid(){return this.validate()}clearError(){this.errorEl.textContent="",this.errorEl.classList.remove("show"),this.selectEl.classList.remove("error")}onChange(){this.clearError();const e=this.getAttribute("name")??"",t=this.getValue();this.dispatchEvent(new CustomEvent("value-changed",{detail:{name:e,value:t},bubbles:!0,composed:!0})),document.dispatchEvent(new CustomEvent("field-changed"))}validate(){return this.getValue()?(this.clearError(),!0):(this.selectEl.classList.add("error"),this.errorEl.textContent="This field is required",this.errorEl.classList.add("show"),!1)}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}customElements.define("dropdown-field",c);class u{constructor(){this.error="",this.responseData={},this.cityStreets={"New York":["5th Avenue","Broadway","Wall Street","Park Avenue","Madison Avenue","Lexington Avenue","3rd Avenue","2nd Avenue","1st Avenue","Amsterdam Avenue"],"Los Angeles":["Sunset Boulevard","Hollywood Boulevard","Rodeo Drive","Melrose Avenue","Venice Boulevard","Santa Monica Boulevard","Wilshire Boulevard","La Brea Avenue","Fairfax Avenue","Beverly Boulevard"],Chicago:["Michigan Avenue","State Street","Lake Shore Drive","Clark Street","Division Street","Ashland Avenue","Western Avenue","Halsted Street","Broadway","Lincoln Avenue"]},this.err=document.getElementById("appError"),this.setupForm(),this.setupSubmitButton()}setupForm(){const e=document.querySelector('dropdown-field[name="city"]'),t=document.querySelector('dropdown-field[name="street"]');if(e){const o=this.createDropdown("city","City",Object.keys(this.cityStreets));e.replaceWith(o),o.addEventListener("value-changed",i=>{console.log(i);const s=i.detail.value;this.updateStreetDropdown(s)})}if(t){const o=this.createDropdown("street","Street",[],!0);t.replaceWith(o)}this.setupPaymentMethod()}createDropdown(e,t,o,i=!1){const r=document.createElement("dropdown-field");return r.setAttribute("name",e),r.setAttribute("label",t),i&&r.setAttribute("disabled",""),r.setOptions(o),r}updateStreetDropdown(e){const t=document.querySelector('dropdown-field[name="street"]');t&&(e?(t.removeAttribute("disabled"),t.setOptions(this.cityStreets[e]||[])):(t.setAttribute("disabled",""),t.setOptions([])))}setupPaymentMethod(){document.querySelectorAll('input[type="radio"]').forEach(t=>{t.addEventListener("change",()=>this.checkFormValidity())})}setupSubmitButton(){const e=document.querySelector("button-secondary"),t=e?.querySelector("button");t&&(window.location.href.includes("register")&&(t.disabled=!0,t.style.opacity="0.5",t.style.cursor="not-allowed"),document.addEventListener("field-changed",()=>{this.checkFormValidity()}),e.addEventListener("click",o=>{o.preventDefault(),this.validateForm()&&this.submit()}))}checkFormValidity(){const e=document.querySelector("button-secondary button");if(!e)return;const t=this.isFormValid();e.disabled=!t,e.style.opacity=t?"1":"0.5",e.style.cursor=t?"pointer":"not-allowed"}isFormValid(){const e=document.querySelectorAll("input-field"),t=document.querySelectorAll("dropdown-field"),o=document.querySelector('input[type="radio"]:checked');for(const i of Array.from(e)){const r=i.getValue();if(!r||r.trim()==="")return!1}for(const i of Array.from(t)){const r=i.getValue();if(!r||r.trim()==="")return!1}return!!o}validateForm(){let e=!0;if(document.querySelectorAll("input-field").forEach(r=>{r.isValid()||(e=!1)}),document.querySelectorAll("dropdown-field").forEach(r=>{r.isValid()||(e=!1)}),!document.querySelector('input[type="radio"]:checked')){e=!1;const r=document.querySelector(".radio-container");if(r&&!r.querySelector(".payment-error")){const s=document.createElement("span");s.className="payment-error",s.style.cssText="font-size: 12px; color: #ff4444; margin-top: 4px; display: block;",s.textContent="Please select a payment method",r.appendChild(s)}}return e}async submit(){if(!this.validateForm())return;const t=document.querySelector(".form-field").querySelectorAll("input-field"),o=document.querySelectorAll("dropdown-field"),i=document.querySelector('input[type="radio"]:checked'),r={};t.forEach(s=>{const n=s;r[n.getAttribute("name")||""]=n.getValue()}),o.forEach(s=>{const n=s;r[n.getAttribute("name")||""]=n.getValue()}),i&&(r.paymentMethod=i.value),r.houseNumber=+r.houseNumber,console.log("Submitting data:",r);try{const s=await fetch("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),n=await s.json();if(console.log(n),"error"in n&&n.error){this.error=n.error,this.err?.show(n.error);return}s.status>=400?(this.responseData=n,console.log(this.responseData)):(window.location.href="index.html",alert(n.message))}catch(s){console.error("Error during registration:",s),alert("An error occurred. Please try again.")}}}document.addEventListener("DOMContentLoaded",()=>new u);
