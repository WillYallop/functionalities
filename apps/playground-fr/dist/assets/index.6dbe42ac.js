(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();var a=globalThis&&globalThis.__classPrivateFieldGet||function(r,t,s,e){if(s==="a"&&!e)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?r!==t||!e:!t.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return s==="m"?e:s==="a"?e.call(r):e?e.value:t.get(r)},n,k,S,w,p,h,v;class L{constructor(t){n.add(this),this.config=Object.assign({activeClass:"active",attributes:{toggler:"data-toggler",receiver:"data-toggler-receiver",class:"data-toggler-class",state:"data-toggler-state",close:"data-toggler-close",targets:"data-toggler-targets",function:"data-toggler-function"},functions:{}},t),this.map=new Map,a(this,n,"m",k).call(this)}toggle(t,s){const e=this.map.get(t);if(!e)return;const i=s===void 0?!e.state:s;e.targets.length>0?(e.state=i,a(this,n,"m",p).call(this,e,t)):(e.state=i,a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${t}"]`),e,!0),a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${t}"]`),e,!1))}}n=new WeakSet,k=function(){[...document.querySelectorAll(`[${this.config.attributes.toggler}]`)].map(s=>{const e=s.getAttribute(this.config.attributes.toggler);if(!e)return;const i=s.getAttribute(this.config.attributes.targets),o=i?i.replaceAll(" ","").split(","):[],l=s.getAttribute(this.config.attributes.close),c=l?l.replaceAll(" ","").split(","):[];this.map.has(e)||(this.map.set(e,{state:s.getAttribute(this.config.attributes.state)==="true",activeClass:s.getAttribute(this.config.attributes.class)||this.config.activeClass,closeTogglers:c,targets:o,function:s.getAttribute(this.config.attributes.function)||void 0}),o.length>0?a(this,n,"m",w).call(this,s):a(this,n,"m",S).call(this,s))}),this.map.forEach((s,e)=>{s.targets.length>0&&s.state&&a(this,n,"m",p).call(this,s,e)})},S=function(t){const s=t.getAttribute(this.config.attributes.toggler);if(!s)return;const e=this.map.get(s);if(!e)return;const i=()=>{a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${s}"]`),e,!1),a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${s}"]`),e,!0),e.closeTogglers.map(l=>{const c=this.map.get(l);!c||(c.state=!1,a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${l}"]`),c,!0),a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${l}"]`),c,!1))})};i();const o=()=>{this.map.forEach((l,c)=>{e.state?l.targets.includes(s)&&l.targets.every(u=>{const A=this.map.get(u);return A?A.state:!1})&&(l.state=!0,a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${c}"]`),l,!0)):l.targets.includes(s)&&(l.state=!1,a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${c}"]`),l,!0))})};t.addEventListener("click",l=>{l.preventDefault(),e.state=!e.state,a(this,n,"m",v).call(this,e,t),i(),o()})},w=function(t){const s=t.getAttribute(this.config.attributes.toggler);if(!s)return;const e=this.map.get(s);!e||t.addEventListener("click",i=>{i.preventDefault(),a(this,n,"m",v).call(this,e,t),e.state=!e.state,a(this,n,"m",p).call(this,e,s)})},p=function(t,s){t.targets.map(e=>{const i=this.map.get(e);!i||(i.state=t.state,a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${e}"]`),i,!0),a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${e}"]`),i,!1))}),a(this,n,"m",h).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${s}"]`),t,!0)},h=function(t,s,e){[...t].map(i=>{s.state?(i.classList.add(s.activeClass),e&&i.setAttribute("aria-expanded","true")):(i.classList.remove(s.activeClass),e&&i.setAttribute("aria-expanded","false"))})},v=function(t,s){if(t.function){const e=this.config.functions[t.function];e&&e(t,s)}};var y=globalThis&&globalThis.__classPrivateFieldGet||function(r,t,s,e){if(s==="a"&&!e)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?r!==t||!e:!t.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return s==="m"?e:s==="a"?e.call(r):e?e.value:t.get(r)},b,_,T,E;class ${constructor(t){b.add(this),E.set(this,(s,e)=>{s.forEach(i=>{const o=i.target,l=this.map.get(o);if(l){const c=u=>{setTimeout(()=>{o.classList.add(u.class)},u.delay||0)},f=u=>{o.classList.remove(u.class)};i.isIntersecting?(o.classList.add(this.config.activeClass),l.forEach(u=>{c(u)})):(this.config.reset&&o.classList.remove(this.config.activeClass),l.forEach(u=>{u.reset&&f(u)}))}})}),this.config=Object.assign({reset:!0,activeClass:"animate",threshold:1,attributes:{animate:"data-animate"}},t),this.map=new WeakMap,y(this,b,"m",_).call(this)}}E=new WeakMap,b=new WeakSet,_=function(){const t=new IntersectionObserver(y(this,E,"f"),{threshold:this.config.threshold});[...document.querySelectorAll(`[${this.config.attributes.animate}]`)].forEach(e=>{const i=e.getAttribute(this.config.attributes.animate),o=y(this,b,"m",T).call(this,i);this.map.set(e,o),t.observe(e)})},T=function(t){const s=t.replace(/'/g,'"').replace(/([a-zA-Z0-9]+):/g,'"$1":').replace(/:(?=[a-zA-Z0-9])/g,':"').replace(/,(?=[a-zA-Z0-9])/g,'",').replace(/}$/,'"}');return[...JSON.parse(s)].filter(i=>{if(i.class!==void 0)return i.delay=i.delay||0,i.reset=typeof i.reset=="boolean"?i.reset:this.config.reset,i})};class P extends HTMLElement{constructor(){if(super(),this.initialised=!1,this.disableWatch=!1,this.detailEle=this.querySelector("details"),!this.detailEle)throw new Error("Details element not found for details web component!");if(this.summaryEle=this.querySelector("summary"),!this.summaryEle)throw new Error("Summary element not found for details web component!");if(this.content=this.summaryEle.nextElementSibling,!this.content)throw new Error("Details content element not found for details web component!")}connectedCallback(){this.initialised||(this.initialised=!0,this.summaryEle.setAttribute("role","button"),this.detailEle.addEventListener("toggle",this.onToggle.bind(this)),this.getAttribute("close-on-leave")==="true"&&document.addEventListener("click",this.onFocusOut.bind(this)))}disconnectedCallback(){this.detailEle.removeEventListener("toggle",this.onToggle.bind(this)),this.getAttribute("close-on-leave")==="true"&&document.addEventListener("click",this.onFocusOut.bind(this))}attributeChangedCallback(t,s,e){t==="open"&&!this.disableWatch&&(e===null?this.close():this.open())}static get observedAttributes(){return["open"]}onFocusOut(t){t.composedPath().includes(this)||this.close()}onToggle(){this.animations||(this.animations=this.content.getAnimations()),this.detailEle.hasAttribute("open")?(this.animations.forEach(t=>t.cancel()),this.animations.forEach(t=>t.play()),this.open()):(this.animations.forEach(t=>t.cancel()),this.close())}open(){this.disableWatch=!0,this.detailEle.setAttribute("open",""),this.summaryEle.setAttribute("aria-expanded","true"),this.setAttribute("open",""),this.disableWatch=!1}close(){this.disableWatch=!0,this.detailEle.removeAttribute("open"),this.summaryEle.setAttribute("aria-expanded","false"),this.removeAttribute("open"),this.disableWatch=!1}}const C=P;class O extends C{constructor(){super(),this.initialised=!1,this.group="",this.duration=200}connectedCallback(){if(!this.initialised){this.initialised=!0,this.group=this.getAttribute("group")||"",this.duration=parseInt(this.getAttribute("duration")||"200");const t=this.summaryEle.id||`d_${this.group}_${Math.random().toString(36).substring(2,9)}`;this.summaryEle.setAttribute("id",t),this.summaryEle.setAttribute("role","button"),this.content.setAttribute("role","region"),this.content.setAttribute("aria-labelledby",t),this.detailEle.addEventListener("toggle",this.onToggle.bind(this)),this.detailEle.addEventListener("click",this.detailsClick.bind(this)),this.summaryEle.addEventListener("click",this.summaryClick.bind(this)),this.content.addEventListener("click",this.contentClick.bind(this)),this.content.style.transition=`max-height ${this.duration}ms ease-in-out`,this.content.style.overflow="hidden",this.getAttribute("open")||this.detailEle.hasAttribute("open")?this.content.style.maxHeight=`${this.content.scrollHeight}px`:this.content.style.maxHeight="0"}}disconnectedCallback(){this.detailEle.removeEventListener("toggle",this.onToggle.bind(this)),this.detailEle.removeEventListener("click",this.detailsClick.bind(this)),this.summaryEle.removeEventListener("click",this.summaryClick.bind(this)),this.content.removeEventListener("click",this.contentClick.bind(this))}attributeChangedCallback(t,s,e){super.attributeChangedCallback(t,s,e),t==="group"&&(this.group=e),t==="duration"&&(this.duration=parseInt(e),this.content.style.transition=`max-height ${this.duration}ms ease-in-out`)}static get observedAttributes(){return["open","group","duration"]}detailsClick(t){t.preventDefault()}summaryClick(t){(t.target===this.summaryEle||this.summaryEle.contains(t.target))&&(this.closeSetTimeout&&clearTimeout(this.closeSetTimeout),this.getAttribute("open")===null?(this.setAttribute("open",""),this.content.style.maxHeight=`${this.content.scrollHeight}px`):(this.content.style.maxHeight="0",this.closeSetTimeout=setTimeout(()=>{this.removeAttribute("open")},this.duration)))}contentClick(t){t.stopPropagation()}onToggle(){super.onToggle(),this.getAttribute("open")!==null&&this.group&&document.querySelectorAll(`[group="${this.group}"]`).forEach(s=>{var e;if(s!==this){if(s.getAttribute("open")===null)return;(e=s.querySelector("summary"))===null||e===void 0||e.click()}})}open(){super.open()}}const x=O,d="sticky-top",g="sticky-down",m="sticky-up";class q extends HTMLElement{constructor(){super(),this.initialised=!1,this.triggerOffset=0,this.prevScrollPos=0,this.scrollPos=0,this.state=d,this.prevState=this.state}connectedCallback(){this.initialised||(this.initialised=!0,this.hasAttribute("trigger-offset")?this.triggerOffset=parseInt(this.getAttribute("trigger-offset")||"0"):this.triggerOffset=this.offsetHeight,this.scrollPos=document.body.scrollTop||document.documentElement.scrollTop,this.prevScrollPos=this.scrollPos,this.scrollPos>this.triggerOffset?this.state=g:this.state=d,this.prevState=this.state,this.setClass(),window.addEventListener("scroll",this.onScroll.bind(this),{passive:!0}),this.hasAttribute("trigger-offset")||window.addEventListener("resize",this.onResize.bind(this),{passive:!0}))}disconnectedCallback(){window.removeEventListener("scroll",this.onScroll.bind(this)),this.hasAttribute("trigger-offset")||window.removeEventListener("resize",this.onResize.bind(this)),this.classList.remove(g),this.classList.remove(m),this.classList.remove(d)}attributeChangedCallback(t,s,e){t==="trigger-offset"&&(this.triggerOffset=parseInt(e||"0"))}static get observedAttributes(){return["trigger-offset"]}onScroll(){if(this.scrollPos=document.body.scrollTop||document.documentElement.scrollTop,this.scrollPos>this.triggerOffset?this.scrollPos>this.prevScrollPos?(this.state=g,this.prevScrollPos=this.scrollPos):(this.state=m,this.prevScrollPos=this.scrollPos):this.state=d,this.prevState!=this.state&&(this.prevState=this.state,this.setClass(),this.hasAttribute("on-change"))){const t=this.getAttribute("on-change");t&&typeof window[t]=="function"&&window[t]({state:this.state,prevState:this.prevState,scrollPos:this.scrollPos})}if(this.hasAttribute("on-scroll")){const t=this.getAttribute("on-scroll");t&&typeof window[t]=="function"&&window[t]({state:this.state,prevState:this.prevState,scrollPos:this.scrollPos})}}setClass(){this.state!=g&&this.classList.remove(g),this.state!=m&&this.classList.remove(m),this.state!=d&&this.classList.remove(d),this.classList.add(this.state)}onResize(){this.triggerOffset=this.offsetHeight}}const H=q;class M extends HTMLElement{constructor(){super(),this.currentSlide=0,this.carouselTrack=null,this.nextButton=null,this.prevButton=null,this.slides=null}connectedCallback(){this.carouselTrack=this===null||this===void 0?void 0:this.querySelector(".carousel-track"),this.nextButton=document==null?void 0:document.querySelector("#next-slide"),this.prevButton=document==null?void 0:document.querySelector("#prev-slide"),this.slides=this===null||this===void 0?void 0:this.querySelectorAll(".carousel-slide"),this.updateSlides(),this.registerEvents()}registerEvents(){var t,s;(t=this.nextButton)===null||t===void 0||t.addEventListener("click",()=>this.nextSlide()),(s=this.prevButton)===null||s===void 0||s.addEventListener("click",()=>this.prevSlide())}updateSlides(){if(!this.carouselTrack||!this.slides)return;const t=this.slides.length,s=360/t;this.slides.forEach((i,o)=>{const l=s*o,c=Math.sin(l*Math.PI/180)*50,f=Math.cos(l*Math.PI/180)*50-50;i.style.transform=`translateX(${c}%) translateZ(${f}px) rotateY(${l}deg)`});const e=-s*this.currentSlide;this.carouselTrack.style.transform=`rotateY(${e}deg)`}nextSlide(){!this.slides||(this.currentSlide=(this.currentSlide+1)%this.slides.length,this.updateSlides())}prevSlide(){!this.slides||(this.currentSlide=(this.currentSlide-1+this.slides.length)%this.slides.length,this.updateSlides())}get template(){const t=document.createElement("template");return t.innerHTML=`
        <div class="carousel-track">
          <div class="carousel-slide">1</div>
          <div class="carousel-slide">2</div>
          <div class="carousel-slide">3</div>
          <div class="carousel-slide">4</div>
          <div class="carousel-slide">5</div>
        </div>
      `,t}}const D=M;customElements.define("functionalities-details",C);customElements.define("functionalities-disclosure",x);customElements.define("functionalities-sticky-header",H);customElements.define("functionalities-carousel",D);window.windowOnScroll=r=>{};window.windowOnChange=r=>{};new L({activeClass:"active",functions:{updateDonkeys:(r,t)=>{console.log("updateDonkeys",r,t)}}});new $({activeClass:"animate",reset:!0,threshold:1});