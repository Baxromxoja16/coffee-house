(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class h extends HTMLElement{constructor(){super(),this.hideTimer=null,this.remaining=3e3,this.startedAt=0,this.shadow=this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["message"]}render(){this.shadow.innerHTML=`
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
    `,this.container=this.shadow.querySelector(".toast"),this.textEl=this.shadow.querySelector(".message"),this.shadow.querySelector(".close").addEventListener("click",()=>this.hideImmediately()),this.container.addEventListener("mouseenter",()=>this.pauseTimer()),this.container.addEventListener("mouseleave",()=>this.resumeTimer())}attributeChangedCallback(e,t,s){e==="message"&&s!==null&&this.show(s)}async show(e){this.textEl.textContent=e??"Success",this.container.classList.add("show"),this.clearTimer(),this.remaining=3e3,this.startTimer()}startTimer(){this.startedAt=Date.now(),this.hideTimer=setTimeout(()=>{this.hide()},this.remaining)}pauseTimer(){if(this.hideTimer){clearTimeout(this.hideTimer),this.hideTimer=null;const e=Date.now()-this.startedAt;this.remaining=Math.max(0,this.remaining-e)}}resumeTimer(){this.hideTimer||this.startTimer()}hide(){this.container.classList.remove("show"),this.clearTimer()}hideImmediately(){this.hide()}clearTimer(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null)}}customElements.define("app-success",h);class d extends HTMLElement{constructor(){super(),this.hideTimer=null,this.remaining=3e3,this.startedAt=0,this.shadow=this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["message"]}render(){this.shadow.innerHTML=`
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
          background: #fff5f5;
          color: #5a2121;
          border: 1px solid #f0b4b4;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
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
          background: #ffdede;
          color: #8b1f1f;
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
          color: #6a2a2a;
        }

        /* smaller on mobile */
        @media (max-width: 420px) {
          .toast { padding: 10px; border-radius: 8px; }
          .message { font-size: 13px; }
        }
      </style>

      <div class="toast" role="alert" aria-live="assertive" part="toast">
        <div class="icon" aria-hidden="true">!</div>
        <div class="message"></div>
        <button class="close" aria-label="Close">&times;</button>
      </div>
    `,this.container=this.shadow.querySelector(".toast"),this.textEl=this.shadow.querySelector(".message"),this.shadow.querySelector(".close").addEventListener("click",()=>this.hideImmediately()),this.container.addEventListener("mouseenter",()=>this.pauseTimer()),this.container.addEventListener("mouseleave",()=>this.resumeTimer())}attributeChangedCallback(e,t,s){e==="message"&&s!==null&&this.show(s)}async show(e){const t=await this.extractMessage(e);this.textEl.textContent=t??"Something went wrong",this.container.classList.add("show"),this.clearTimer(),this.remaining=3e3,this.startTimer()}async extractMessage(e){if(typeof e=="string")return e;if(e instanceof Error)return e.message||e.name||"Error";if(e instanceof Response){try{if((e.headers.get("content-type")??"").includes("application/json")){const s=await e.json().catch(()=>null);if(s)return typeof s.message=="string"?s.message:typeof s.error=="string"?s.error:s.data&&typeof s.data=="object"&&typeof s.data.message=="string"?s.data.message:JSON.stringify(s).slice(0,200)}else{const s=await e.text().catch(()=>null);if(s)return s.slice(0,300)}}catch{}return`HTTP ${e.status} ${e.statusText}`}if(typeof e=="object"&&e!==null){const t=e;if(typeof t.message=="string")return t.message;if(typeof t.error=="string")return t.error;for(const s of Object.keys(t)){const i=t[s];if(typeof i=="string"&&i.length>0)return i}}}startTimer(){this.startedAt=Date.now(),this.hideTimer=setTimeout(()=>{this.hide()},this.remaining)}pauseTimer(){if(this.hideTimer){clearTimeout(this.hideTimer),this.hideTimer=null;const e=Date.now()-this.startedAt;this.remaining=Math.max(0,this.remaining-e)}}resumeTimer(){this.hideTimer||this.startTimer()}hide(){this.container.classList.remove("show"),this.clearTimer()}hideImmediately(){this.hide()}clearTimer(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null)}}customElements.define("app-error",d);class c{constructor(e){this.slides=[],this.currentIndex=0,this.autoPlayInterval=6e3,this.autoPlayTimer=null,this.progressTimer=null,this.isPaused=!1,this.progressWidth=0,this.progressStep=0,this.touchStartX=0,this.touchEndX=0,this.loader=!1,this.slider=e,this.err=document.getElementById("appError");const t=this.slider.querySelector(".slider-items");if(!t||!(t instanceof HTMLElement))throw new Error("Slider: .slider-items element not found");this.sliderItems=t,this.pagination=Array.from(this.slider.querySelectorAll(".slider-pagination span")),this.prevButton=this.slider.querySelector(".slider-buttons button-carousel:first-child"),this.nextButton=this.slider.querySelector(".slider-buttons button-carousel:last-child"),this.progressStep=100/(this.autoPlayInterval/50),this.init()}async init(){await this.loadFavorites(),this.slides=Array.from(this.sliderItems.querySelectorAll("slider-card")),this.setupSlides(),this.setMaximumHeight(this.slides),this.setupEventListeners(),this.showSlide(this.currentIndex),this.startAutoPlay()}async loadFavorites(){var e;try{this.loader=!0;const s=await(await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites")).json();if(s.error){(e=this.err)==null||e.show("Something went wrong. Please, refresh the page");return}const i=s.data;this.loader=!1,this.sliderItems.innerHTML="",i.forEach((o,a)=>{const l=this.createSliderCard(o,a+1);this.sliderItems.appendChild(l)});const r=this.slider.querySelector(".slider-pagination");r&&(r.innerHTML="",i.forEach((o,a)=>{const l=document.createElement("span");a===0&&l.classList.add("active"),r.appendChild(l)}),this.pagination=Array.from(r.querySelectorAll("span")))}catch(t){this.loader=!1,console.error("Error loading favorites:",t)}}createSliderCard(e,t){const s=document.createElement("slider-card"),i=document.createElement("img");i.slot="image",i.src=`./images/coffee-img/coffee-slider-${t}.png`,i.alt=e.name;const r=document.createElement("h2");r.slot="content-title",r.className="title",r.textContent=e.name;const o=document.createElement("p");o.slot="content-text",o.className="text",o.textContent=e.description;const a=document.createElement("span");return a.slot="content-price",a.className="price",e.discountPrice?a.innerHTML=`<span style="text-decoration: line-through; opacity: 0.6; margin-right: 8px;">$${e.price}</span>$${e.discountPrice}`:a.textContent=`$${e.price}`,s.appendChild(i),s.appendChild(r),s.appendChild(o),s.appendChild(a),s}setupSlides(){this.slides.forEach((e,t)=>{t===0?(e.style.display="block",e.style.opacity="1"):(e.style.display="none",e.style.opacity="0")})}setupEventListeners(){this.prevButton&&this.prevButton.addEventListener("click",()=>this.prevSlide()),this.nextButton&&this.nextButton.addEventListener("click",()=>this.nextSlide()),this.pagination.forEach((e,t)=>{e.addEventListener("click",()=>this.goToSlide(t))}),this.sliderItems.addEventListener("mouseenter",()=>this.pauseAutoPlay()),this.sliderItems.addEventListener("mouseleave",()=>this.resumeAutoPlay()),this.sliderItems.addEventListener("touchstart",e=>{var s;const t=(s=e.changedTouches)==null?void 0:s[0];t&&(this.touchStartX=t.screenX),this.pauseAutoPlay()},{passive:!0}),this.sliderItems.addEventListener("touchend",e=>{var s;const t=(s=e.changedTouches)==null?void 0:s[0];t&&(this.touchEndX=t.screenX),this.handleSwipe(),this.resumeAutoPlay()},{passive:!0}),[this.prevButton,this.nextButton].forEach(e=>{e&&(e.addEventListener("mouseenter",()=>this.pauseAutoPlay()),e.addEventListener("mouseleave",()=>this.resumeAutoPlay()))})}handleSwipe(){const t=this.touchStartX-this.touchEndX;Math.abs(t)>50&&(t>0?this.nextSlide():this.prevSlide())}showSlide(e,t="next"){if(e<0||e>=this.slides.length)return;const s=this.slides[this.currentIndex],i=this.slides[e];this.animateTransition(s,i,t),this.pagination[this.currentIndex]&&this.pagination[this.currentIndex].classList.remove("active"),this.pagination[e]&&this.pagination[e].classList.add("active"),this.currentIndex=e,this.resetProgress()}showLoader(){var e;this.loader=!0,(e=document.querySelector(".loader"))==null||e.classList.add("show")}hideLoader(){this.loader=!1,document.querySelector(".loader").classList.remove("show")}animateTransition(e,t,s){const i=s==="next";this.sliderItems.style.position="relative",this.sliderItems.style.overflow="hidden";const r=e.offsetHeight;this.sliderItems.style.minHeight=`${r}px`,e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.transform="translateX(0)",e.style.opacity="1",e.style.transition="none",e.style.zIndex="1",t.style.display="block",t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.transform=i?"translateX(100%)":"translateX(-100%)",t.style.opacity="1",t.style.transition="none",t.style.zIndex="2",t.offsetHeight,e.style.transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",t.style.transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",requestAnimationFrame(()=>{e.style.transform=i?"translateX(-100%)":"translateX(100%)",e.style.opacity="0",t.style.transform="translateX(0)",t.style.opacity="1"}),window.setTimeout(()=>{e.style.display="none",e.style.position="static",e.style.transform="",e.style.opacity="",e.style.transition="",e.style.zIndex="",e.style.width="",t.style.position="static",t.style.transform="",t.style.transition="",t.style.zIndex="",t.style.width="";const o=t.offsetHeight;this.sliderItems.style.minHeight=`${o}px`,setTimeout(()=>{this.sliderItems.style.overflow="visible"},50)},600)}async setMaximumHeight(e){let t=0;e.forEach(s=>{s.style.display="block",s.style.position="static";const i=s.offsetHeight;i>t&&(t=i)}),this.sliderItems.style.height=`${t}px`,e.forEach((s,i)=>{s.style.visibility="visible",s.style.opacity="1",i===0?s.style.display="block":s.style.display="none"})}nextSlide(){const e=(this.currentIndex+1)%this.slides.length;this.showSlide(e,"next")}prevSlide(){const e=(this.currentIndex-1+this.slides.length)%this.slides.length;this.showSlide(e,"prev")}goToSlide(e){if(e!==this.currentIndex){const t=e>this.currentIndex?"next":"prev";this.showSlide(e,t)}}startAutoPlay(){this.autoPlayTimer=window.setTimeout(()=>{this.isPaused||this.nextSlide(),this.startAutoPlay()},this.autoPlayInterval),this.startProgress()}stopAutoPlay(){this.autoPlayTimer!==null&&(clearTimeout(this.autoPlayTimer),this.autoPlayTimer=null),this.stopProgress()}pauseAutoPlay(){this.isPaused=!0,this.stopProgress()}resumeAutoPlay(){this.isPaused=!1,this.startProgress()}startProgress(){this.stopProgress(),this.progressTimer=window.setInterval(()=>{this.isPaused||(this.progressWidth+=this.progressStep,this.progressWidth>=100&&(this.progressWidth=100),this.updateProgressBar())},50)}stopProgress(){this.progressTimer!==null&&(clearInterval(this.progressTimer),this.progressTimer=null)}resetProgress(){this.progressWidth=0,this.updateProgressBar()}updateProgressBar(){this.pagination.forEach((e,t)=>{t===this.currentIndex?e.style.background=`linear-gradient(to right, var(--boder-dark) ${this.progressWidth}%, var(--boder-ligtht) ${this.progressWidth}%)`:e.style.background="var(--boder-ligtht)"})}destroy(){this.stopAutoPlay(),this.stopProgress()}}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#slider");if(n){const t=new c(n);window.carouselInstance=t}const e=localStorage.getItem("toastMessage");e&&(document.getElementById("appSuccess").show(e),localStorage.removeItem("toastMessage"))});
