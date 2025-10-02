class BurgerButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
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
                background: var(--white, #fff);
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
        `;

        const button = this.shadowRoot.querySelector('.burger-button');
        
        button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            button.classList.toggle('open', this.isOpen);
        });
    }
}

customElements.define('button-burger', BurgerButton);