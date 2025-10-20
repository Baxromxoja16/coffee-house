class TabButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.getAttribute('text');
        const icon = this.getAttribute('icon');
        this.innerHTML = `
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
                ${icon}
            </span>
            ${text}
        </button>
        `;
    }

}

customElements.define('tab-button', TabButton);