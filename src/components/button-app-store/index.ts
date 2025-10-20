class AppStoreButton extends HTMLElement {
    private shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const text = this.getAttribute('text');
        this.shadow.innerHTML = `
        <style>
            .button-app-store {
                padding: 12px 40px 7px 20px;
                border: 1px solid var(--boder-dark);
                border-radius: 100px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                line-height: 150%;
                background: transparent;
                color: var(--dark);
                overflow: hidden;
                transition: ease-in-out 0.3s;
                display: flex;
                align-items:center;
                gap: 8px;
            }
            .button-app-store .icon-content {

            }
            .button-app-store .text-content {
                display: flex;
                flex-direction: column;
                gap: 2px;
                text-align: left;
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
                transition: ease-in-out 0.3s;
                align-self: center;
            }

            .button-app-store .text-primary {
                font-size: 12px;
                color: #666;
                transition: ease-in-out 0.3s;
                justify-self: start;
                line-height: 92%;
            }

            .button-app-store .text-secondary {
                font-size: 16px;
                font-weight: 600;
                color: #000;
                transition: ease-in-out 0.3s;
                justify-self: start;
            }
        </style>

        <button class="button-app-store">
            <div class="icon-content">
                <span class="content with-icon">
                    <slot name="icon"></slot>
                </span>
            </div>
            <div class="text-content">
                <span class="content text-primary">Available on the</span>
                <span class="content text-secondary">${text}</span>
            </div>
        </button>
        `;

        const svgElement = this.shadow.querySelector('slot[name="icon"]') as HTMLSlotElement;
        const buttonElement = this.shadow.querySelector('.button-app-store') as Element;
        if (svgElement) {
            const assignedNodes: HTMLSlotElement[] = svgElement.assignedNodes() as HTMLSlotElement[];
            assignedNodes.forEach(node => {
                const paths = node.querySelectorAll('path');
                paths.forEach(p => {
                    buttonElement.addEventListener('mouseover', () => {
                        p.style.transition = '0.3s';
                        p.style.fill = 'var(--light)';
                    });
                    buttonElement.addEventListener('mouseout', () => {
                        p.style.transition = '0.3s';
                        p.style.fill = 'var(--dark)';
                    });
                });
            });
        }
    }

}

customElements.define('button-app-store', AppStoreButton);