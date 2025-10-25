// src/components/app-success.ts
// type ErrorPayload = string | Error | Response | ApiErrorLike;
// interface ApiErrorLike {
//   message?: string;
//   error?: string;
//   [key: string]: unknown;
// }

class AppSuccess extends HTMLElement {
  private shadow: ShadowRoot;
  private container!: HTMLElement;
  private textEl!: HTMLElement;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private remaining = 3000; // ms
  private startedAt = 0;

  static get observedAttributes() {
    return ['message'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  private render(): void {
    this.shadow.innerHTML = `
      <style>
        :host {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          top: 20px;
          z-index: 99999;
          display: block;
          pointer-events: auto;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }

        .toast {
          min-width: 260px;
          max-width: 92vw;
          background: #f0fff4; /* pale green */
          color: #064e3b;      /* dark green text */
          border: 1px solid #bbf7d0; /* light green border */
          box-shadow: 0 8px 24px rgba(4, 120, 87, 0.06);
          padding: 12px 16px;
          border-radius: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(-10px) scale(0.995);
          transition: opacity 220ms ease, transform 220ms ease;
        }

        .toast.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: inline-grid;
          place-items: center;
          background: #bbf7d0; /* icon bg */
          color: #065f46;
          font-weight: 700;
        }

        .message {
          flex: 1 1 auto;
          font-size: 14px;
          line-height: 1.3;
          word-break: break-word;
        }

        .close {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 6px;
          color: #065f46;
        }

        @media (max-width: 420px) {
          .toast { padding: 10px; border-radius: 8px; }
          .message { font-size: 13px; }
        }
      </style>

      <div class="toast" role="status" aria-live="polite" part="toast">
        <div class="icon" aria-hidden="true">✓</div>
        <div class="message"></div>
        <button class="close" aria-label="Close">&times;</button>
      </div>
    `;

    this.container = this.shadow.querySelector('.toast') as HTMLElement;
    this.textEl = this.shadow.querySelector('.message') as HTMLElement;

    const closeBtn = this.shadow.querySelector('.close') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => this.hideImmediately());

    // Pause timer on hover
    this.container.addEventListener('mouseenter', () => this.pauseTimer());
    this.container.addEventListener('mouseleave', () => this.resumeTimer());
  }

  attributeChangedCallback(name: string, _oldVal: string | null, newVal: string | null) {
    if (name === 'message' && newVal !== null) {
      // when attribute set, treat as a simple string show
      this.show(newVal);
    }
  }

  // Public API: show(payload)
  public async show(message: string): Promise<void> {
    // const message = await this.extractMessage(payload);
    this.textEl.textContent = message ?? 'Success';

    // show
    this.container.classList.add('show');

    // reset timer
    this.clearTimer();
    this.remaining = 3000;
    this.startTimer();
  }

  // extract useful message from various payload types
  // private async extractMessage(payload: ErrorPayload): Promise<string | undefined> {
  //   if (typeof payload === 'string') return payload;

  //   if (payload instanceof Error) {
  //     return payload.message || payload.name || 'Success';
  //   }

  //   if (payload instanceof Response) {
  //     try {
  //       const contentType = payload.headers.get('content-type') ?? '';
  //       if (contentType.includes('application/json')) {
  //         const json = await payload.json().catch(() => null);
  //         if (json) {
  //           if (typeof json.message === 'string') return json.message;
  //           if (typeof json.success === 'string') return json.success;
  //           if (typeof json.error === 'string') return json.error;
  //           if (json.data && typeof json.data === 'object' && typeof (json.data as any).message === 'string') {
  //             return (json.data as any).message;
  //           }
  //           return JSON.stringify(json).slice(0, 200);
  //         }
  //       } else {
  //         const text = await payload.text().catch(() => null);
  //         if (text) return text.slice(0, 300);
  //       }
  //     } catch {
  //       // ignore parse errors
  //     }
  //     return `HTTP ${payload.status} ${payload.statusText}`;
  //   }

  //   if (typeof payload === 'object' && payload !== null) {
  //     const p = payload as ApiErrorLike;
  //     if (typeof p.message === 'string') return p.message;
  //     if (typeof p.error === 'string') return p.error;
  //     if (typeof (p as any).success === 'string') return (p as any).success;
  //     for (const k of Object.keys(p)) {
  //       const v = p[k];
  //       if (typeof v === 'string' && v.length > 0) return v;
  //     }
  //   }

  //   return undefined;
  // }

  private startTimer(): void {
    this.startedAt = Date.now();
    this.hideTimer = setTimeout(() => {
      this.hide();
    }, this.remaining);
  }

  private pauseTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
      const elapsed = Date.now() - this.startedAt;
      this.remaining = Math.max(0, this.remaining - elapsed);
    }
  }

  private resumeTimer(): void {
    if (!this.hideTimer) {
      this.startTimer();
    }
  }

  private hide(): void {
    this.container.classList.remove('show');
    this.clearTimer();
  }

  private hideImmediately(): void {
    this.hide();
  }

  private clearTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
}

customElements.define('app-success', AppSuccess);

export default AppSuccess;
