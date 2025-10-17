class InputField extends HTMLElement {
    shadow: ShadowRoot
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const label = this.getAttribute('label');
        const type = this.getAttribute('type');
        this.shadow.innerHTML = `
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

            .input-field input {
                display: block;
                padding: 12px 16px;
                border-radius: 12px;
                border-width: 1px;
                border: 1px solid var(--boder-ligtht);
                color: var(--placeholder)
                font-weight: 400;
                font-size: 16px;
                background: transparent;
            }

            .input-field input:focus {
                outline: none;
            }   

            .input-field input::placeholder {
                font-weight: 400;
                font-style: Regular;
                font-size: 16px;

                color: var(--placeholder)
            }
        
        </style>
        <div class="input-field">
            <label for="${label || 'Input'}">${label || 'Input'}</label>
            <input type="${type || 'text'}" id="${label || 'Input'}" placeholder="Placeholder" />
        </div>
        `
    }
}


customElements.define('input-field', InputField);

export default InputField;