class AppStoreButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const text = this.getAttribute('text');
        const icon = this.getAttribute('icon');
        this.shadowRoot.innerHTML = `
        <style>
            .button-app-store {
                padding: 12px 40px 12px 20px;
                border: 1px solid var(--boder-dark);
                border-radius: 100px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                line-height: 150%;
                background: var(--white);
                color: var(--dark);
                overflow: hidden;
                transition: ease-in-out 0.3s;
            }
            .button-app-store {
                display: grid;
                grid-template-columns: auto 1fr; 
                grid-template-rows: auto auto;  
                gap: 0 8px; 
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
                grid-row: 1 / span 2;
                grid-column: 1;
                transition: ease-in-out 0.3s;
                align-self: center;
            }

            .button-app-store .text-primary {
                grid-row: 1;
                grid-column: 2;
                font-size: 12px;
                color: #666;
                transition: ease-in-out 0.3s;
                justify-self: start;
            }

            .button-app-store .text-secondary {
                grid-row: 2;
                grid-column: 2;
                font-size: 16px;
                font-weight: 600;
                color: #000;
                transition: ease-in-out 0.3s;
                justify-self: start;
            }
        </style>

        <button class="button-app-store">
            <span class="content with-icon">
                <slot name="icon"></slot>
            </span>
            <span class="content text-primary">Available on the</span>
            <span class="content text-secondary">${text}</span>
        </button>
        `;
    }

}

customElements.define('button-app-store', AppStoreButton);