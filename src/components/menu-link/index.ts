class MenuLink extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot!.innerHTML = `<style>
            .menu-link {
                letter-spacing: 0;
                line-height: 150%;
                font-size: 16px;
                font-weight: 600;
                color: var(--dark);
                text-decoration: none;
                display: inline-block;
                position: relative;
            }
            
            .menu-link::after {
                content: "";
                display: block;
                height: 2px;
                width: 100%;
                background: var(--dark);
                opacity: 0;

                transition: opacity 0.3s ease-in-out;
            }

            .menu-link:hover::after {
                opacity: 1;
            }

            .contact-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            @media (min-width: 768px) {
                .menu-link .contact-content ::slotted(span.text) {
                    font-size: 32px;
                }
            }

        </style>
        <a href="/coffee-house/pages/coffee/index" class="menu-link">
            <div class="contact-content">
                <slot name="text"></slot>
                <slot name="icon"></slot>
            </div>
        </a>
        `;
    }
}

customElements.define('menu-link', MenuLink);