(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var l=globalThis&&globalThis.__classPrivateFieldGet||function(n,t,e,i){if(e==="a"&&!i)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?n!==t||!i:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?i:e==="a"?i.call(n):i?i.value:t.get(n)},a,L,S,w,f,c,p;class x{constructor(t){a.add(this),this.config=Object.assign({activeClass:"active",attributes:{toggler:"data-toggler",receiver:"data-toggler-receiver",class:"data-toggler-class",state:"data-toggler-state",close:"data-toggler-close",targets:"data-toggler-targets",function:"data-toggler-function"},functions:{}},t),this.map=new Map,l(this,a,"m",L).call(this)}toggle(t,e){const i=this.map.get(t);if(!i)return;const s=e===void 0?!i.state:e;i.targets.length>0?(i.state=s,l(this,a,"m",f).call(this,i,t)):(i.state=s,l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${t}"]`),i,!0),l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${t}"]`),i,!1))}}a=new WeakSet,L=function(){[...document.querySelectorAll(`[${this.config.attributes.toggler}]`)].map(e=>{const i=e.getAttribute(this.config.attributes.toggler);if(!i)return;const s=e.getAttribute(this.config.attributes.targets),o=s?s.replaceAll(" ","").split(","):[],r=e.getAttribute(this.config.attributes.close),h=r?r.replaceAll(" ","").split(","):[];this.map.has(i)||(this.map.set(i,{state:e.getAttribute(this.config.attributes.state)==="true",activeClass:e.getAttribute(this.config.attributes.class)||this.config.activeClass,closeTogglers:h,targets:o,function:e.getAttribute(this.config.attributes.function)||void 0}),o.length>0?l(this,a,"m",w).call(this,e):l(this,a,"m",S).call(this,e))}),this.map.forEach((e,i)=>{e.targets.length>0&&e.state&&l(this,a,"m",f).call(this,e,i)})},S=function(t){const e=t.getAttribute(this.config.attributes.toggler);if(!e)return;const i=this.map.get(e);if(!i)return;const s=()=>{l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${e}"]`),i,!1),l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${e}"]`),i,!0),i.closeTogglers.map(r=>{const h=this.map.get(r);!h||(h.state=!1,l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${r}"]`),h,!0),l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${r}"]`),h,!1))})};s();const o=()=>{this.map.forEach((r,h)=>{i.state?r.targets.includes(e)&&r.targets.every(u=>{const k=this.map.get(u);return k?k.state:!1})&&(r.state=!0,l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${h}"]`),r,!0)):r.targets.includes(e)&&(r.state=!1,l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${h}"]`),r,!0))})};t.addEventListener("click",r=>{r.preventDefault(),i.state=!i.state,l(this,a,"m",p).call(this,i,t),s(),o()})},w=function(t){const e=t.getAttribute(this.config.attributes.toggler);if(!e)return;const i=this.map.get(e);!i||t.addEventListener("click",s=>{s.preventDefault(),l(this,a,"m",p).call(this,i,t),i.state=!i.state,l(this,a,"m",f).call(this,i,e)})},f=function(t,e){t.targets.map(i=>{const s=this.map.get(i);!s||(s.state=t.state,l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${i}"]`),s,!0),l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${i}"]`),s,!1))}),l(this,a,"m",c).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${e}"]`),t,!0)},c=function(t,e,i){[...t].map(s=>{e.state?(s.classList.add(e.activeClass),i&&s.setAttribute("aria-expanded","true")):(s.classList.remove(e.activeClass),i&&s.setAttribute("aria-expanded","false"))})},p=function(t,e){if(t.function){const i=this.config.functions[t.function];i&&i(t,e)}};var A=globalThis&&globalThis.__classPrivateFieldGet||function(n,t,e,i){if(e==="a"&&!i)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?n!==t||!i:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?i:e==="a"?i.call(n):i?i.value:t.get(n)},m,T,_,E;class C{constructor(t){m.add(this),E.set(this,(e,i)=>{e.forEach(s=>{const o=s.target,r=this.map.get(o);if(r){const h=u=>{setTimeout(()=>{o.classList.add(u.class)},u.delay||0)},y=u=>{o.classList.remove(u.class)};s.isIntersecting?(o.classList.add(this.config.activeClass),r.forEach(u=>{h(u)})):(this.config.reset&&o.classList.remove(this.config.activeClass),r.forEach(u=>{u.reset&&y(u)}))}})}),this.config=Object.assign({reset:!0,activeClass:"animate",threshold:1,attributes:{animate:"data-animate"}},t),this.map=new WeakMap,A(this,m,"m",T).call(this)}}E=new WeakMap,m=new WeakSet,T=function(){const t=new IntersectionObserver(A(this,E,"f"),{threshold:this.config.threshold});[...document.querySelectorAll(`[${this.config.attributes.animate}]`)].forEach(i=>{const s=i.getAttribute(this.config.attributes.animate),o=A(this,m,"m",_).call(this,s);this.map.set(i,o),t.observe(i)})},_=function(t){const e=t.replace(/'/g,'"').replace(/([a-zA-Z0-9]+):/g,'"$1":').replace(/:(?=[a-zA-Z0-9])/g,':"').replace(/,(?=[a-zA-Z0-9])/g,'",').replace(/}$/,'"}');return[...JSON.parse(e)].filter(s=>{if(s.class!==void 0)return s.delay=s.delay||0,s.reset=typeof s.reset=="boolean"?s.reset:this.config.reset,s})};class $ extends HTMLElement{constructor(){super(),this.disableWatch=!1,this.detailEle=null,this.summaryEle=null,this.content=null}connectedCallback(){this.setElements(),this.registerEvents(),this.setAttributes(),this.setState()}disconnectedCallback(){var t;(t=this.detailEle)===null||t===void 0||t.removeEventListener("toggle",this.onToggle.bind(this)),this.hasAttribute("close-on-leave")&&document.addEventListener("click",this.onFocusOut.bind(this)),this.hasAttribute("open-on-hover")&&(this===null||this===void 0||this.removeEventListener("mouseenter",this.onHoverIn.bind(this)),this===null||this===void 0||this.removeEventListener("mouseleave",this.onHoverOut.bind(this))),this.hasAttribute("open-on-focus")&&(this===null||this===void 0||this.removeEventListener("focusin",this.onHoverIn.bind(this)))}attributeChangedCallback(t,e,i){switch(t){case"open":this.disableWatch||(i===null?this.close():this.open())}}static get observedAttributes(){return["open","close-on-leave"]}setElements(){if(this.detailEle=this.querySelector("details"),!this.detailEle)throw new Error("Details element not found for details web component!");if(this.summaryEle=this.querySelector("summary"),!this.summaryEle)throw new Error("Summary element not found for details web component!");if(this.content=this.summaryEle.nextElementSibling,!this.content)throw new Error("Details content element not found for details web component!")}registerEvents(){var t;(t=this.detailEle)===null||t===void 0||t.addEventListener("toggle",this.onToggle.bind(this)),this.hasAttribute("close-on-leave")&&document.addEventListener("click",this.onFocusOut.bind(this)),this.hasAttribute("open-on-hover")&&(this===null||this===void 0||this.addEventListener("mouseenter",this.onHoverIn.bind(this)),this===null||this===void 0||this.addEventListener("mouseleave",this.onHoverOut.bind(this))),this.hasAttribute("open-on-focus")&&(this===null||this===void 0||this.addEventListener("focusin",this.onHoverIn.bind(this)))}setState(){var t;(this.hasAttribute("open")||((t=this.detailEle)===null||t===void 0?void 0:t.hasAttribute("open")))&&this.open()}setAttributes(){var t;(t=this.summaryEle)===null||t===void 0||t.setAttribute("role","button")}onFocusOut(t){t.composedPath().includes(this)||this.close()}onToggle(){var t;!((t=this.detailEle)===null||t===void 0)&&t.hasAttribute("open")?this.open():this.close()}onHoverIn(t){this.open()}onHoverOut(t){this.close()}open(){var t,e;this.disableWatch=!0,(t=this.detailEle)===null||t===void 0||t.setAttribute("open",""),(e=this.summaryEle)===null||e===void 0||e.setAttribute("aria-expanded","true");const i=this.getAttribute("body-class");i&&document.body.classList.add(i),this.setAttribute("open",""),this.disableWatch=!1}close(){var t,e;this.disableWatch=!0,(t=this.detailEle)===null||t===void 0||t.removeAttribute("open"),(e=this.summaryEle)===null||e===void 0||e.setAttribute("aria-expanded","false");const i=this.getAttribute("body-class");i&&document.body.classList.remove(i),this.removeAttribute("open"),this.disableWatch=!1}}const O=$;class P extends HTMLElement{constructor(){super(),this.disableWatch=!1,this.group="",this.duration=200,this.state=!1,this.detailEle=null,this.summaryEle=null,this.content=null}connectedCallback(){this.setElements(),this.registerEvents(),this.setState(),this.setAttributes(),this.setStyle()}disconnectedCallback(){var t,e,i;(t=this.detailEle)===null||t===void 0||t.removeEventListener("click",this.detailsClick.bind(this)),(e=this.summaryEle)===null||e===void 0||e.removeEventListener("click",this.summaryClick.bind(this)),(i=this.content)===null||i===void 0||i.removeEventListener("click",this.contentClick.bind(this))}attributeChangedCallback(t,e,i){switch(t){case"open":{this.disableWatch||(i===null?this.close():this.open());break}case"group":{this.group=i;break}case"duration":{this.duration=parseInt(i),this.content&&(this.content.style.transition=`max-height ${this.duration}ms ease-in-out`);break}}}static get observedAttributes(){return["open","group","duration"]}setElements(){if(this.detailEle=this.querySelector("details"),!this.detailEle)throw new Error("Details element not found for details web component!");if(this.summaryEle=this.querySelector("summary"),!this.summaryEle)throw new Error("Summary element not found for details web component!");if(this.content=this.summaryEle.nextElementSibling,!this.content)throw new Error("Details content element not found for details web component!")}registerEvents(){var t,e,i;(t=this.detailEle)===null||t===void 0||t.addEventListener("click",this.detailsClick.bind(this)),(e=this.summaryEle)===null||e===void 0||e.addEventListener("click",this.summaryClick.bind(this)),(i=this.content)===null||i===void 0||i.addEventListener("click",this.contentClick.bind(this))}setState(){var t;this.group=this.getAttribute("group")||"",this.duration=parseInt(this.getAttribute("duration")||"200"),(this.hasAttribute("open")||((t=this.detailEle)===null||t===void 0?void 0:t.hasAttribute("open")))&&this.open()}setAttributes(){var t,e,i,s,o;const r=((t=this.summaryEle)===null||t===void 0?void 0:t.id)||`d_${this.group}_${Math.random().toString(36).substring(2,9)}`;(e=this.summaryEle)===null||e===void 0||e.setAttribute("id",r),(i=this.summaryEle)===null||i===void 0||i.setAttribute("role","button"),(s=this.content)===null||s===void 0||s.setAttribute("role","region"),(o=this.content)===null||o===void 0||o.setAttribute("aria-labelledby",r)}setStyle(){var t;this.content&&(this.content.style.transition=`max-height ${this.duration}ms ease-in-out`,this.content.style.overflow="hidden",this.hasAttribute("open")||((t=this.detailEle)===null||t===void 0?void 0:t.hasAttribute("open"))?this.content.style.maxHeight=`${this.content.scrollHeight}px`:this.content.style.maxHeight="0")}detailsClick(t){t.preventDefault()}summaryClick(t){var e;(t.target===this.summaryEle||((e=this.summaryEle)===null||e===void 0?void 0:e.contains(t.target)))&&(this.closeSetTimeout&&clearTimeout(this.closeSetTimeout),this.state?this.close():this.open())}contentClick(t){t.stopPropagation()}open(){var t,e;this.disableWatch=!0,this.state=!0,(t=this.detailEle)===null||t===void 0||t.setAttribute("open",""),(e=this.summaryEle)===null||e===void 0||e.setAttribute("aria-expanded","true"),this.setAttribute("open",""),this.content&&(this.content.style.maxHeight=`${this.content.scrollHeight}px`),this.toggleGroup(),this.disableWatch=!1}close(){this.disableWatch=!0,this.state=!1,this.content&&(this.content.style.maxHeight="0"),this.closeSetTimeout=setTimeout(()=>{var t,e;(t=this.detailEle)===null||t===void 0||t.removeAttribute("open"),this.removeAttribute("open"),(e=this.summaryEle)===null||e===void 0||e.setAttribute("aria-expanded","false"),this.disableWatch=!1},this.duration)}toggleGroup(){this.group&&document.querySelectorAll(`[group="${this.group}"]`).forEach(e=>{var i;if(e!==this)if(e.hasAttribute("open"))(i=e.querySelector("summary"))===null||i===void 0||i.click();else return})}}const H=P,d="sticky-top",v="sticky-down",b="sticky-up";class I extends HTMLElement{constructor(){super(),this.triggerOffset=0,this.prevScrollPos=0,this.scrollPos=0,this.state=d,this.prevState=this.state}connectedCallback(){this.registerEvents(),this.setState(),this.setClass()}disconnectedCallback(){window.removeEventListener("scroll",this.onScroll.bind(this)),this.hasAttribute("trigger-offset")||window.removeEventListener("resize",this.onResize.bind(this)),this.classList.remove(v),this.classList.remove(b),this.classList.remove(d)}attributeChangedCallback(t,e,i){switch(t){case"trigger-offset":this.triggerOffset=parseInt(i||"0");break}}static get observedAttributes(){return["trigger-offset"]}registerEvents(){window.addEventListener("scroll",this.onScroll.bind(this),{passive:!0}),this.hasAttribute("trigger-offset")||window.addEventListener("resize",this.onResize.bind(this),{passive:!0})}setState(){this.hasAttribute("trigger-offset")?this.triggerOffset=parseInt(this.getAttribute("trigger-offset")||"0"):this.triggerOffset=this.offsetHeight,this.scrollPos=document.body.scrollTop||document.documentElement.scrollTop,this.prevScrollPos=this.scrollPos,this.scrollPos>this.triggerOffset?this.state=v:this.state=d,this.prevState=this.state}onScroll(){if(this.scrollPos=document.body.scrollTop||document.documentElement.scrollTop,this.scrollPos>this.triggerOffset?this.scrollPos>this.prevScrollPos?(this.state=v,this.prevScrollPos=this.scrollPos):(this.state=b,this.prevScrollPos=this.scrollPos):this.state=d,this.prevState!=this.state&&(this.prevState=this.state,this.setClass(),this.hasAttribute("on-change"))){const t=this.getAttribute("on-change");t&&typeof window[t]=="function"&&window[t]({state:this.state,prevState:this.prevState,scrollPos:this.scrollPos})}if(this.hasAttribute("on-scroll")){const t=this.getAttribute("on-scroll");t&&typeof window[t]=="function"&&window[t]({state:this.state,prevState:this.prevState,scrollPos:this.scrollPos})}}setClass(){this.state!=v&&(this.classList.remove(v),document.body.classList.remove(v)),this.state!=b&&(this.classList.remove(b),document.body.classList.remove(b)),this.state!=d&&(this.classList.remove(d),document.body.classList.remove(d)),this.classList.add(this.state),document.body.classList.add(this.state)}onResize(){this.triggerOffset=this.offsetHeight}}const M=I;class q extends HTMLElement{constructor(){super(),this.track=null,this.autoplayInterval=null,this.disableAutoplay=!1,this.disabledAutoplayTimeout=null}connectedCallback(){this.initialAttributes(),this.registerEvents(),this.autoplay&&this.startAutoplay()}disconnectedCallback(){this.autoplayInterval&&clearInterval(this.autoplayInterval),this.disabledAutoplayTimeout&&clearTimeout(this.disabledAutoplayTimeout),this.removeEventListener("focusin",this.stopAutoplay.bind(this)),this.removeEventListener("focusout",this.startAutoplay.bind(this)),this.removeEventListener("mouseenter",this.stopAutoplay.bind(this)),this.removeEventListener("mousemove",this.stopAutoplay.bind(this)),this.removeEventListener("mouseleave",this.startAutoplay.bind(this))}attributeChangedCallback(t,e,i){switch(t){case"autoplay":{i==="true"?this.startAutoplay():this.stopAutoplay();break}case"duration":{this.stopAutoplay(),this.startAutoplay();break}}}static get observedAttributes(){return["autoplay","duration"]}initialAttributes(){this.setAttribute("role","region"),this.setAttribute("aria-roledescription","carousel")}registerEvents(){this.addEventListener("focusin",this.stopAutoplay.bind(this)),this.addEventListener("focusout",this.startAutoplay.bind(this)),this.addEventListener("mouseenter",this.stopAutoplay.bind(this)),this.addEventListener("mousemove",this.stopAutoplay.bind(this)),this.addEventListener("mouseleave",this.startAutoplay.bind(this))}startAutoplay(){var t;!this.autoplay||!((t=this.playPauseButton)===null||t===void 0)&&t.classList.contains("paused")||(this.autoplayInterval&&clearInterval(this.autoplayInterval),this.autoplayInterval=setInterval(()=>{this.disableAutoplay||this.nextSlide()},this.duration))}stopAutoplay(){this.autoplayInterval&&clearInterval(this.autoplayInterval)}resetSlides(){this.slides.forEach(t=>{t.active=!1})}nextSlide(){this.disableAutoplayAction();const{index:t}=this.currentSlide;let e=t+1;t===this.slides.length-1&&(e=0),this.resetSlides(),this.slides[e].active=!0,this.slides[e].scrollTo()}previousSlide(){this.disableAutoplayAction();const{index:t}=this.currentSlide;let e=t-1;t-1<0&&(e=this.slides.length-1),this.resetSlides(),this.slides[e].active=!0,this.slides[e].scrollTo()}gotToSlide(t){this.disableAutoplayAction(),this.resetSlides(),this.slides[t].active=!0,this.slides[t].scrollTo()}disableAutoplayAction(){this.disabledAutoplayTimeout&&clearTimeout(this.disabledAutoplayTimeout),this.disabledAutoplayTimeout=setTimeout(()=>{this.disableAutoplay=!1},2e3)}get slides(){return this.querySelectorAll("[slide-index]")}get pagination(){return this.querySelector(`#carousel-pagination-${this.index}`)}get index(){const t=document.querySelectorAll(this.tagName);let e=0;return t.forEach((i,s)=>{i===this&&(e=s)}),e}get currentSlide(){var t;let e=0;return(t=this.slides)===null||t===void 0||t.forEach((i,s)=>{i.active&&(e=s)}),{index:e,element:this.slides[e]}}get playPauseButton(){return this.querySelector(".cc_con__btn--play-pause")}get duration(){return parseInt(this.getAttribute("duration"))}get autoplay(){return this.getAttribute("autoplay")==="true"}set autoplay(t){this.setAttribute("autoplay",t.toString()),t?this.startAutoplay():this.stopAutoplay()}}const D=q;class B extends HTMLElement{constructor(){super(),this.dragging=!1,this.dragStartX=0,this.dragStartY=0,this.dragEndX=0,this.dragEndY=0}connectedCallback(){this.container.track=this,this.initialAttributes(),this.registerEvents()}disconnectedCallback(){this.removeEventListener("mousedown",this.onMouseDown.bind(this)),this.removeEventListener("mouseup",this.onMouseUp.bind(this)),this.removeEventListener("mouseleave",this.onMouseLeave.bind(this)),this.removeEventListener("touchstart",this.onTouchStart.bind(this)),this.removeEventListener("touchend",this.onTouchEnd.bind(this)),this.removeEventListener("touchcancel",this.onTouchCancel.bind(this))}initialAttributes(){this.id||(this.id=`carousel-track-${this.container.index}`),this.setAttribute("role","presentation"),this.setAttribute("aria-live","polite"),this.setAttribute("aria-atomic","true"),this.setAttribute("tabindex","-1"),this.setAttribute("carousel-track","")}registerEvents(){this.addEventListener("mousedown",this.onMouseDown.bind(this)),this.addEventListener("mouseup",this.onMouseUp.bind(this)),this.addEventListener("mouseleave",this.onMouseLeave.bind(this)),this.addEventListener("touchstart",this.onTouchStart.bind(this)),this.addEventListener("touchend",this.onTouchEnd.bind(this)),this.addEventListener("touchcancel",this.onTouchCancel.bind(this))}onMouseDown(t){this.dragStart(t.clientX,t.clientY)}onMouseUp(t){this.dragEnd(t.clientX,t.clientY)}onMouseLeave(t){this.dragEnd(t.clientX,t.clientY)}onTouchStart(t){this.dragStart(t.touches[0].clientX,t.touches[0].clientY)}onTouchEnd(t){this.dragEnd(t.changedTouches[0].clientX,t.changedTouches[0].clientY)}onTouchCancel(t){this.dragEnd(t.changedTouches[0].clientX,t.changedTouches[0].clientY)}dragStart(t,e){this.dragging=!0,this.dragStartX=t,this.dragStartY=e}dragEnd(t,e){!this.dragging||(this.dragging=!1,this.dragEndX=t,this.dragEndY=e,this.container.disableAutoplay=!0,this.scrollToSlide())}scrollToSlide(){if(Math.abs(this.dragOffsetX)<50&&Math.abs(this.dragOffsetY)<50)return;const t=this.dragOffsetX>0?"left":"right",e=this.dragOffsetY>0?"up":"down",i=Math.abs(this.dragOffsetX)>Math.abs(this.dragOffsetY)?t:e;(i==="left"||i==="up")&&this.container.previousSlide(),(i==="right"||i==="down")&&this.container.nextSlide()}get container(){return this.parentElement}get slides(){return this.container.slides}get dragOffsetX(){return this.dragEndX-this.dragStartX}get dragOffsetY(){return this.dragEndY-this.dragStartY}}const X=B;class Y extends HTMLElement{constructor(){super(),this.scrollTimeout=null}connectedCallback(){this.initialAttributes(),this.registerObserver()}initialAttributes(){const t=Array.from(this.track.slides).indexOf(this);this.id||(this.id=`carousel-slide-${this.track.container.index}-${Math.random().toString(36).substring(2,9)}`),this.setAttribute("role","tabpanel"),this.setAttribute("aria-roledescription","slide"),this.setAttribute("aria-label",`${t+1} of ${this.track.slides.length}`),this.setAttribute("slide-index",`${t}`),this.updateAttributes(this.active)}registerObserver(){new IntersectionObserver(e=>{e.forEach(i=>{this.active=i.isIntersecting})},{root:this.track,rootMargin:"0px",threshold:.5}).observe(this)}updateAttributes(t){t?(this.setAttribute("aria-hidden","false"),this.setAttribute("active","true")):(this.setAttribute("aria-hidden","true"),this.setAttribute("active","false"))}scrollTo(){this.scrollTimeout&&clearTimeout(this.scrollTimeout),this.scrollTimeout=setTimeout(()=>{const t=this.offsetLeft-this.track.offsetLeft,e=this.offsetTop-this.track.offsetTop;this.track.scrollTo(t,e)})}get track(){return this.parentElement}get active(){return this.getAttribute("active")==="true"}get index(){return parseInt(this.getAttribute("slide-index")||"0",10)}set active(t){t!==this.active&&(this.updateAttributes(t),this.track.container.pagination.update())}}const W=Y;class z extends HTMLElement{constructor(){super(),this.prevButton=null,this.playPauseButton=null,this.nextButton=null}connectedCallback(){this.render(),this.initialAttributes(),this.registerEvents()}disconnectedCallback(){var t,e;(t=this.prevButton)===null||t===void 0||t.removeEventListener("click",this.prevSlide.bind(this)),(e=this.nextButton)===null||e===void 0||e.removeEventListener("click",this.nextSlide.bind(this))}render(){this.innerHTML=`
          <div class="cc-con">
              <button class="cc-con__btn cc-con__btn--prev" aria-label="Previous slide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4a32 32 0 0 0 0 45.3l192 192a32 32 0 0 0 45.3-45.3L77.3 256 246.6 86.6a32 32 0 0 0-45.3-45.3l-192 192z"/></svg>
              </button>
              <button class="cc-con__btn cc-con__btn--play-pause">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48H48zm192 0a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48h-32z"/></svg>
              </button>
              <button class="cc-con__btn cc-con__btn--next" aria-label="Next slide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4a32 32 0 0 1 0 45.3l-192 192a32 32 0 0 1-45.3-45.3L242.7 256 73.4 86.6a32 32 0 0 1 45.3-45.3l192 192z"/></svg>
              </button>
          </div>
          `,this.prevButton=this.querySelector(".cc-con__btn--prev"),this.nextButton=this.querySelector(".cc-con__btn--next"),this.playPauseButton=this.querySelector(".cc-con__btn--play-pause")}initialAttributes(){var t;this.id||(this.id=`carousel-controls-${this.container.index}`),(t=this.playPauseButton)===null||t===void 0||t.setAttribute("aria-controls",this.track.id),this.updateState()}registerEvents(){var t,e,i;(t=this.prevButton)===null||t===void 0||t.addEventListener("click",this.prevSlide.bind(this)),(e=this.nextButton)===null||e===void 0||e.addEventListener("click",this.nextSlide.bind(this)),(i=this.playPauseButton)===null||i===void 0||i.addEventListener("click",this.toggleAutoplay.bind(this))}updateState(){this.playPauseButton&&(this.container.autoplay?(this.playPauseButton.setAttribute("aria-label","Pause"),this.playPauseButton.classList.remove("paused"),this.playPauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48H48zm192 0a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48h-32z"/></svg>',this.track.setAttribute("aria-live","off")):(this.playPauseButton.setAttribute("aria-label","Play"),this.playPauseButton.classList.add("paused"),this.playPauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39A47.9 47.9 0 0 0 0 80v352a48 48 0 0 0 73 41l288-176a48 48 0 0 0 0-82L73 39z"/></svg>',this.track.setAttribute("aria-live","polite")))}prevSlide(){var t;(t=this.container)===null||t===void 0||t.previousSlide()}nextSlide(){var t;(t=this.container)===null||t===void 0||t.nextSlide()}toggleAutoplay(){this.container.autoplay?this.container.autoplay=!1:this.container.autoplay=!0,this.updateState()}get container(){return this.parentElement}get track(){return this.container.track}}const F=z;class V extends HTMLElement{constructor(){super(),this.updateTimeout=null}connectedCallback(){this.render(),this.initialAttributes(),this.registerEvents()}disconnectedCallback(){this.buttons.forEach(t=>{t.removeEventListener("click",this.buttonClick.bind(this)),t.removeEventListener("keydown",this.buttonKeyDown.bind(this))})}render(){const t=document.createElement("ul");t.classList.add("cp-con"),this.track.slides.forEach(()=>{const e=document.createElement("li"),i=document.createElement("button");e.classList.add("cp-con__li"),i.classList.add("cp-con__li__btn"),e.appendChild(i),t.appendChild(e)}),this.appendChild(t)}initialAttributes(){var t,e;this.id||(this.id=`carousel-pagination-${this.container.index}`),(t=this.ul)===null||t===void 0||t.setAttribute("role","tablist"),(e=this.ul)===null||e===void 0||e.setAttribute("aria-label","Select a slide to show"),this.listItems.forEach(i=>{i.setAttribute("role","presentation")}),this.buttons.forEach((i,s)=>{i.setAttribute("role","tab"),i.setAttribute("aria-controls",this.track.slides[s].id),i.setAttribute("aria-label",`Slide ${s+1}`),i.setAttribute("type","button"),this.updateState(s)})}registerEvents(){this.buttons.forEach(t=>{t.addEventListener("click",this.buttonClick.bind(this)),t.addEventListener("keydown",this.buttonKeyDown.bind(this))})}updateState(t){const e=this.buttons[t];this.track.slides[t].active?(e.classList.add("active"),e.setAttribute("aria-selected","true"),e.removeAttribute("tabindex")):(e.classList.remove("active"),e.setAttribute("aria-selected","false"),e.setAttribute("tabindex","-1"))}buttonClick(t){const e=t.target,i=Array.from(this.buttons).indexOf(e);this.track.container.gotToSlide(i),this.updateState(i),this.buttons.forEach((s,o)=>{o!==i&&this.updateState(o)})}buttonKeyDown(t){if(t.key==="ArrowLeft"){const e=t.target,i=Array.from(this.buttons).indexOf(e);i>0&&(this.track.container.gotToSlide(i-1),this.updateState(i-1),this.updateState(i),this.buttons[i-1].focus())}if(t.key==="ArrowRight"){const e=t.target,i=Array.from(this.buttons).indexOf(e);i<this.buttons.length-1&&(this.track.container.gotToSlide(i+1),this.updateState(i+1),this.updateState(i),this.buttons[i+1].focus())}}update(){this.updateTimeout&&clearTimeout(this.updateTimeout),this.updateTimeout=setTimeout(()=>{this.buttons.forEach((t,e)=>{this.updateState(e)})},300)}get container(){return this.parentElement}get track(){return this.container.track}get ul(){return this.querySelector("ul")}get listItems(){return this.querySelectorAll("li")}get buttons(){return this.querySelectorAll("button")}}const G=V,g={Container:D,Track:X,Slide:W,Controls:F,Pagination:G};class K extends HTMLElement{constructor(){super(),this.handleClick=t=>{t.preventDefault(),this.toggleCheckbox()},this.handleKeydown=t=>{(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.toggleCheckbox())},this.label=null,this.checkbox=null,this.target=null}connectedCallback(){this.setElements(),this.registerEvents(),this.setAttributes()}disconnectedCallback(){var t,e;(t=this.label)===null||t===void 0||t.removeEventListener("click",this.handleClick.bind(this)),(e=this.label)===null||e===void 0||e.removeEventListener("keydown",this.handleKeydown.bind(this)),this.hasAttribute("close-on-leave")&&document.removeEventListener("click",this.onFocusOut.bind(this)),this.hasAttribute("open-on-hover")&&(this===null||this===void 0||this.removeEventListener("mouseenter",this.onHoverIn.bind(this)),this===null||this===void 0||this.removeEventListener("mouseleave",this.onHoverOut.bind(this))),this.hasAttribute("open-on-focus")&&(this===null||this===void 0||this.removeEventListener("focusin",this.onHoverIn.bind(this)),this===null||this===void 0||this.removeEventListener("focusout",this.onHoverOut.bind(this)))}setElements(){const t=this.getAttribute("input-id");if(this.label=document.querySelector(`label[for="${t}"]`),!this.label)throw new Error(`Label not found for checkbox toggler web component with for attronite of "${t}".`);if(this.checkbox=document.querySelector(`input[id="${t}"]`),!this.checkbox)throw new Error(`Checkbox not found for checkbox toggler web component with ID of "${t}".`);const e=this.getAttribute("target-id");if(e&&(this.target=document.querySelector(`#${e}`),!this.target))throw new Error(`Target not found for checkbox toggler web component with ID of "${e}".`)}registerEvents(){var t,e;(t=this.label)===null||t===void 0||t.addEventListener("click",this.handleClick.bind(this)),(e=this.label)===null||e===void 0||e.addEventListener("keydown",this.handleKeydown.bind(this)),this.hasAttribute("close-on-leave")&&document.addEventListener("click",this.onFocusOut.bind(this)),this.hasAttribute("open-on-hover")&&(this===null||this===void 0||this.addEventListener("mouseenter",this.onHoverIn.bind(this)),this===null||this===void 0||this.addEventListener("mouseleave",this.onHoverOut.bind(this))),this.hasAttribute("open-on-focus")&&(this===null||this===void 0||this.addEventListener("focusin",this.onHoverIn.bind(this)),this===null||this===void 0||this.addEventListener("focusout",this.onHoverOut.bind(this)))}setAttributes(){var t,e,i,s,o,r;(t=this.label)===null||t===void 0||t.setAttribute("aria-expanded","false"),(e=this.label)===null||e===void 0||e.setAttribute("tabindex","0"),(i=this.label)===null||i===void 0||i.setAttribute("role","button");const h=this.getAttribute("data-target-id");h&&((s=this.label)===null||s===void 0||s.setAttribute("aria-controls",h)),!((o=this.checkbox)===null||o===void 0)&&o.checked&&((r=this.label)===null||r===void 0||r.setAttribute("aria-expanded","true"))}onFocusOut(t){var e;t.composedPath().includes(this)||!((e=this.checkbox)===null||e===void 0)&&e.checked&&this.toggleCheckbox()}onHoverIn(t){var e;!((e=this.checkbox)===null||e===void 0)&&e.checked||this.toggleCheckbox()}onHoverOut(t){var e;!((e=this.checkbox)===null||e===void 0)&&e.checked&&this.toggleCheckbox()}toggleCheckbox(){var t,e;if(this.checkbox){this.checkbox.checked=!this.checkbox.checked,this.checkbox.dispatchEvent(new Event("change"));const i=this.getAttribute("body-class");this.checkbox.checked?((t=this.label)===null||t===void 0||t.setAttribute("aria-expanded","true"),i&&document.body.classList.add(i)):((e=this.label)===null||e===void 0||e.setAttribute("aria-expanded","false"),i&&document.body.classList.remove(i))}}}const N=K;customElements.define("enhanced-details",O);customElements.define("detail-disclosure",H);customElements.define("sticky-header",M);customElements.define("checkbox-toggler",N);customElements.define("carousel-container",g.Container);customElements.define("carousel-track",g.Track);customElements.define("carousel-slide",g.Slide);customElements.define("carousel-controls",g.Controls);customElements.define("carousel-pagination",g.Pagination);window.windowOnScroll=n=>{};window.windowOnChange=n=>{};new x({activeClass:"active",functions:{updateDonkeys:(n,t)=>{console.log("updateDonkeys",n,t)}}});new C({activeClass:"animate",reset:!0,threshold:1});