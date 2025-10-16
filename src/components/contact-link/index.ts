class ContactLink extends HTMLElement {
    shadow: ShadowRoot

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `<style>
            .contact-link {
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
                color: var(--light);
                text-decoration: none;
                display: inline-block;
                position: relative;
            }
            
            .contact-link::after {
                content: "";
                display: block;
                height: 2px;
                width: 100%;
                background: var(--light);
                opacity: 0;
                margin-top: 4px;
                transition: opacity 0.3s ease-in-out;
            }

            .contact-link:hover::after {
                opacity: 1;
            }

            .contact-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }

        </style>
        <a href="#!" class="contact-link">
            <div class="contact-content">
                <slot name="icon"></slot>
                <slot name="text"></slot>
            </div>
        </a>
        `;
    }
}

customElements.define('contact-link', ContactLink);