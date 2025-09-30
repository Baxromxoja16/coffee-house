class CarouselButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const type = this.getAttribute('type');
        this.shadowRoot.innerHTML = `<style>
            .carousel-button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
                border: none;
                border-radius: 100px;
                cursor: pointer;
                line-height: 150%;
                letter-spacing: 0;
                font-size: 16px;
                font-weight: 600;
               
                background: var(--white);
                color: var(--dark);
                border: 1px solid var(--boder-dark);

                transition: ease-in-out 0.3s;
            }

            .carousel-button:hover {
                background: var(--container);
                color: var(--light);
                border: 1px solid var(--container);
            }

        </style>
        <button class="carousel-button">
            <slot name="icon" class="test"></slot>
        </button>
        `;

        const svgElement = this.shadowRoot.querySelector('slot[name="icon"]');
        const buttonElement = this.shadowRoot.querySelector('.carousel-button');
        if (svgElement) {
            const assignedNodes = svgElement.assignedNodes();
            assignedNodes.forEach(node => {
                const paths = node.querySelectorAll('path');
                paths.forEach(p => {
                    buttonElement.addEventListener('mouseover', () => {
                        p.style.transition = '0.3s';
                        p.style.stroke = 'var(--light)';
                    });
                    buttonElement.addEventListener('mouseout', () => {
                        p.style.transition = '0.3s';
                        p.style.stroke = 'var(--dark)';
                    });
                });
            });
        }
    }

}

customElements.define('button-carousel', CarouselButton);