class i extends HTMLElement{constructor(){super(),this.name=null,this.validationRules={login:e=>e.length<3?{isValid:!1,message:"Login must be at least 3 characters"}:/^[a-zA-Z]/.test(e)?/^[a-zA-Z]+$/.test(e)?{isValid:!0,message:""}:{isValid:!1,message:"Only English letters are allowed"}:{isValid:!1,message:"Login must start with a letter"},password:e=>e.length<6?{isValid:!1,message:"Password must be at least 6 characters"}:/[!@#$%^&*(),.?":{}|<>]/.test(e)?{isValid:!0,message:""}:{isValid:!1,message:"Password must contain at least 1 special character"},confirmPassword:e=>{if(window.location.href.includes("register")){const s=document.querySelector('input-field[name="password"]')?.getValue()||"";if(e!==s)return{isValid:!1,message:"Passwords do not match"};if(e.length<6)return{isValid:!1,message:"Password must be at least 6 characters"};if(!/[!@#$%^&*(),.?":{}|<>]/.test(e))return{isValid:!1,message:"Password must contain at least 1 special character"}}return{isValid:!0,message:""}},houseNumber:e=>{if(window.location.href.includes("register")){const t=parseInt(e);if(isNaN(t)||t<=1)return{isValid:!1,message:"House number must be greater than 1"}}return{isValid:!0,message:""}}},this.shadow=this.attachShadow({mode:"open"})}async connectedCallback(){const e=this.getAttribute("label"),t=this.getAttribute("type"),s=this.getAttribute("name");this.name=s||null,this.shadow.innerHTML=`
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
            <label for="${e||"Input"}">${e||"Input"}</label>
            <div class="input-wrapper">
                <input type="${t||"text"}" id="${e||"Input"}" name="${s}" placeholder="Placeholder" />
                <span class="error-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#ff4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>
            <span class="error-message"></span>
        </div>
        `,this.setupEventListeners()}setupEventListeners(){const e=this.shadow.querySelector("input");e&&(e.addEventListener("blur",()=>this.validate()),e.addEventListener("focus",()=>this.clearValidation()),e.addEventListener("input",()=>{this.dispatchEvent(new CustomEvent("field-changed",{bubbles:!0,composed:!0}))}))}validate(){if(!this.name||!this.validationRules[this.name])return this.validateRequired();const t=this.shadow.querySelector("input").value.trim();if(!t)return this.showError("This field is required"),!1;const s=this.validationRules[this.name](t);return s.isValid?(this.clearValidation(),!0):(this.showError(s.message),!1)}validateRequired(){return this.shadow.querySelector("input").value.trim()?(this.clearValidation(),!0):(this.showError("This field is required"),!1)}showError(e){const t=this.shadow.querySelector("input"),s=this.shadow.querySelector(".error-icon"),r=this.shadow.querySelector(".error-message");t?.classList.add("error"),s?.classList.add("show"),r&&(r.textContent=e,r.classList.add("show"))}clearValidation(){const e=this.shadow.querySelector("input"),t=this.shadow.querySelector(".error-icon"),s=this.shadow.querySelector(".error-message");e?.classList.remove("error"),t?.classList.remove("show"),s?.classList.remove("show")}get value(){return{[this.name||""]:this.shadow.querySelector("input").value||null}}getValue(){return this.shadow.querySelector("input")?.value||""}isValid(){return this.validate()}}customElements.define("input-field",i);
