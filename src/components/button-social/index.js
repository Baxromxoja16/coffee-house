class SocialButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const text = this.getAttribute('text');
        this.shadowRoot.innerHTML = `
        <style>
            .social-button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
                border-radius: 100px;
                cursor: pointer;
                line-height: 150%;
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
                width: 60px;
                height: 60px;
               
                background: var(--white);
                border: 1px solid var(--boder-ligtht);

                transition: ease-in-out 0.3s;
            }

            .social-button:hover {
                background: var(--body);
                border: 1px solid var(--body);
            }
        </style>

        <button class="social-button">
            <slot name="icon" class="test"></slot>
        </button>
        `;

        const svgElement = this.shadowRoot.querySelector('slot[name="icon"]');
        const buttonElement = this.shadowRoot.querySelector('.social-button');
        if (svgElement) {
            const assignedNodes = svgElement.assignedNodes();
            assignedNodes.forEach(node => {
                const paths = node.querySelectorAll('path');
                paths.forEach(p => {
                    console.log(buttonElement);
                    buttonElement.addEventListener('mouseover', () => {
                        p.style.transition = '0.3s';
                        p.style.stroke = 'var(--dark)';
                    });
                    buttonElement.addEventListener('mouseout', () => {
                        p.style.transition = '0.3s';
                        p.style.stroke = 'var(--light)';
                    });
                });
            });
        }
    }

}

customElements.define('button-social', SocialButton);