class SliderCard extends HTMLElement {
    shadow: ShadowRoot
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

    connectedCallback() {
    this.shadow.innerHTML = `
        <style>
            .slider-card {
                width: 480px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 17px;

            }
            .slider-image {
                width: 100%;
                height: 480px;
            }
            .slider-image ::slotted(img) {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
            .slider-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 13px;
                text-align: center;
            }
            .slider-content ::slotted(h2) {
                font-size: 24px;
                font-weight: 600;
                line-height: 125%;
                color: var(--dark);
                margin: 0;
            }
            .slider-content ::slotted(p) {
                font-family: Inter, sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 150%;
                color: var(--dark);
            }
            .slider-content ::slotted(.price) {
                font-size: 24px;
                font-weight: 600;
                color: var(--dark);
            }

            @media (max-width: 380px) {
                .slider-card {
                    width: 348px;
                }
                .slider-image {
                    height: 348px;
                }
            }
        </style>
        <div class="slider-card">
            <div class="slider-image">
                <slot name="image"></slot>
            </div>
            <div class="slider-content">
                <slot name="content-title"></slot>
                <slot name="content-text"></slot>
                <slot name="content-price"></slot>
            </div>
        </div>
    `;
  }
}

customElements.define('slider-card', SliderCard);