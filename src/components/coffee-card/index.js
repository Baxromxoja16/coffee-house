class CoffeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

    connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            .coffee-card {
                width: 310px;
                border-radius: 40px;
                border: 1px solid var(--boder-ligtht);
                cursor: pointer;
            }
            .coffee-image {
                width: 100%;
                height: 310px;
                overflow: hidden;
                border-radius: 40px;
            }
            .coffee-image ::slotted(img) {
                width: 100%;
                height: auto;
                object-fit: cover;
                transform: scale(1.1);
                transition: transform 0.3s ease-in-out;
            }
            .coffee-card:hover ::slotted(img) {
                transform: scale(1.0);
            }
            .coffee-content {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 12px;
                padding: 20px;
            }
            .coffee-content ::slotted(h2) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
                margin: 0;
            }
            .coffee-content ::slotted(p) {
                font-family: Inter, sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 150%;
                color: var(--dark);
            }
            .coffee-content ::slotted(.price) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
            }
        </style>
        <div class="coffee-card">
            <div class="coffee-image">
                <slot name="image"></slot>
            </div>
            <div class="coffee-content">
                <slot name="content-title"></slot>
                <slot name="content-text"></slot>
                <slot name="content-price"></slot>
            </div>
        </div>
    `;
  }
}

customElements.define('coffee-card', CoffeeCard);