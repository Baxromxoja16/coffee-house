class i extends HTMLElement{constructor(){super(),this.hideTimer=null,this.remaining=3e3,this.startedAt=0,this.shadow=this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["message"]}render(){this.shadow.innerHTML=`
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
    `,this.container=this.shadow.querySelector(".toast"),this.textEl=this.shadow.querySelector(".message"),this.shadow.querySelector(".close").addEventListener("click",()=>this.hideImmediately()),this.container.addEventListener("mouseenter",()=>this.pauseTimer()),this.container.addEventListener("mouseleave",()=>this.resumeTimer())}attributeChangedCallback(e,a,t){e==="message"&&t!==null&&this.show(t)}async show(e){this.textEl.textContent=e??"Success",this.container.classList.add("show"),this.clearTimer(),this.remaining=3e3,this.startTimer()}startTimer(){this.startedAt=Date.now(),this.hideTimer=setTimeout(()=>{this.hide()},this.remaining)}pauseTimer(){if(this.hideTimer){clearTimeout(this.hideTimer),this.hideTimer=null;const e=Date.now()-this.startedAt;this.remaining=Math.max(0,this.remaining-e)}}resumeTimer(){this.hideTimer||this.startTimer()}hide(){this.container.classList.remove("show"),this.clearTimer()}hideImmediately(){this.hide()}clearTimer(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null)}}customElements.define("app-success",i);
