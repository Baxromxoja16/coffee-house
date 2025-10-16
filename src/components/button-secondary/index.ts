class SecondaryButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.getAttribute('text');
        this.innerHTML = `
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
               width:100%;
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
            ${text}
        </button>
        `;
    }

}

customElements.define('button-secondary', SecondaryButton);