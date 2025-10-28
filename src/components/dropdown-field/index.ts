type ValueChangedDetail = { name: string; value: string };

class DropdownField extends HTMLElement {
    private shadow: ShadowRoot;
    private selectEl!: HTMLSelectElement;
    private labelEl!: HTMLLabelElement;
    private errorEl!: HTMLSpanElement;

    static get observedAttributes() {
        return ['label', 'name', 'disabled', 'options', 'value'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    private render(): void {
        this.shadow.innerHTML = `
      <style>
        :host { display: block; }
        .field {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        label { font-family: Inter, sans-serif; font-size:16px; color:var(--dark); font-weight:400; }
        select {
            display: block;
            width: 100%;
            padding: 16px;
            border-radius: 12px;
            border: 1px solid var(--boder-ligtht);
            color: var(--dark);
            font-weight: 400;
            font-size: 16px;
            background: transparent;
            transition: border-color 0.3s ease;
        }

        select option {
            background: var(--body);
            color: var(--dark);
            border: 1px solid var(--boder-ligtht);
            border-radius: 12px;
            padding: 10px;
        }
        select:focus {
            outline: none;
            border-color: var(--accent);
        }
        select.error { border-color: #ff4444; }
        .error-message {
            font-size: 12px;
            color: #ff4444;
            font-weight: 400;
            margin-top: 4px;
            display: none;
        }
        .error-message.show { display: block; }
      </style>

      <div class="field">
        <label></label>
        <select>
          <option value="">Select</option>
        </select>
        <span class="error-message"></span>
      </div>
    `;

        this.labelEl = this.shadow.querySelector('label') as HTMLLabelElement;
        this.selectEl = this.shadow.querySelector('select') as HTMLSelectElement;
        this.errorEl = this.shadow.querySelector('.error-message') as HTMLSpanElement;

        this.selectEl.addEventListener('change', () => this.onChange());
        this.selectEl.addEventListener('blur', () => this.validate());
    }

    attributeChangedCallback(_name: string, _oldVal: string | null, _newVal: string | null): void {
        const label = this.getAttribute('label') ?? '';
        const name = this.getAttribute('name') ?? '';
        const disabled = this.hasAttribute('disabled');
        const optionsAttr = this.getAttribute('options');
        const valueAttr = this.getAttribute('value');

        this.labelEl.textContent = label;
        this.selectEl.name = name;
        this.selectEl.disabled = disabled;

        if (optionsAttr) {
            try {
                const parsed = JSON.parse(optionsAttr) as string[];
                if (Array.isArray(parsed)) this.setOptions(parsed);
            } catch {
                // ignore invalid JSON
            }
        }

        // Only update the select value if attribute differs from current select value.
        // This avoids calling setValue -> setAttribute -> attributeChangedCallback loop.
        if (valueAttr !== null && this.selectEl.value !== valueAttr) {
            this.selectEl.value = valueAttr;
        }
    }



    // Public API
    public setOptions(options: string[]): void {
        // keep first placeholder option
        const prevValue = this.getValue();
        this.selectEl.innerHTML = `<option value="">Select ${this.labelEl.textContent || ''}</option>` +
            options.map(opt => `<option value="${this.escapeHtml(opt)}">${this.escapeHtml(opt)}</option>`).join('');
        // restore previous value if exists in new options
        if (prevValue) this.setValue(prevValue);
    }

    public getValue(): string {
        return this.selectEl.value;
    }

    public setValue(v: string): void {
        // Programmatic set just updates the underlying select element.
        // Do NOT call setAttribute here to avoid infinite loop.
        this.selectEl.value = v;
    }

    public isValid(): boolean {
        return this.validate();
    }

    public clearError(): void {
        this.errorEl.textContent = '';
        this.errorEl.classList.remove('show');
        this.selectEl.classList.remove('error');
    }

    private onChange(): void {
        this.clearError();
        const name = this.getAttribute('name') ?? '';
        const value = this.getValue();
        this.dispatchEvent(new CustomEvent<ValueChangedDetail>('value-changed', {
            detail: { name, value },
            bubbles: true,
            composed: true
        }));
        // also dispatch a generic field-changed for form-level listeners
        document.dispatchEvent(new CustomEvent('field-changed'));
    }

    private validate(): boolean {
        const value = this.getValue();
        if (!value) {
            this.selectEl.classList.add('error');
            this.errorEl.textContent = 'This field is required';
            this.errorEl.classList.add('show');
            return false;
        }
        this.clearError();
        return true;
    }

    private escapeHtml(raw: string): string {
        return raw.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

customElements.define('dropdown-field', DropdownField);
export default DropdownField;
