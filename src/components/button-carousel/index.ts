class CarouselButton extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `<style>
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
               
                background: transparent;
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

        const svgElement = this.shadow.querySelector('slot[name="icon"]') as HTMLSlotElement;
        const buttonElement = this.shadow.querySelector('.carousel-button') as HTMLElement;
        if (svgElement) {
            const assignedNodes = svgElement.assignedNodes();
            assignedNodes.forEach((node) => {
                if (node instanceof Element) {
                    const paths = node.querySelectorAll('path');
                    paths.forEach((p) => {
                        buttonElement.addEventListener('mouseover', () => {
                            (p as SVGPathElement).style.transition = '0.3s';
                            (p as SVGPathElement).style.stroke = 'var(--light)';
                        });
                        buttonElement.addEventListener('mouseout', () => {
                            (p as SVGPathElement).style.transition = '0.3s';
                            (p as SVGPathElement).style.stroke = 'var(--dark)';
                        });
                    });
                }
            });
        }
    }

}

customElements.define('button-carousel', CarouselButton);