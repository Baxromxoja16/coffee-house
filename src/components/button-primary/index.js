class PrimaryButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.getAttribute('text');
        this.innerHTML = `
        <style>
            .primary-button {
                position: relative;
                padding: 20px 78px;
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
            <span class="content text-only">${text}</span>
            <span class="content with-icon">
                ${text}
                <svg class="icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.166 9.76667V11.6667C14.166 14.8883 11.5543 17.5 8.33268 17.5C5.11102 17.5 2.49935 14.8883 2.49935 11.6667V9.76667C2.49935 9.4353 2.76798 9.16667 3.09935 9.16667H13.566C13.8974 9.16667 14.166 9.4353 14.166 9.76667Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.99935 7.49996C9.99935 6.66663 10.5946 5.83329 11.7851 5.83329C13.1 5.83329 14.166 4.7673 14.166 3.45234V2.91663" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66732 7.5V7.08333C6.66732 5.70262 7.78661 4.58333 9.16732 4.58333C10.0878 4.58333 10.834 3.83714 10.834 2.91667V2.5" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.334 9.16663H15.4173C16.5679 9.16663 17.5007 10.0994 17.5007 11.25C17.5007 12.4006 16.5679 13.3333 15.4173 13.3333H14.1673" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </button>
        `;
    }

}

customElements.define('button-primary', PrimaryButton);