var tt=Object.defineProperty;var et=(a,e,t)=>e in a?tt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var c=(a,e,t)=>(et(a,typeof e!="symbol"?e+"":e,t),t),R=(a,e,t)=>{if(!e.has(a))throw TypeError("Cannot "+t)};var N=(a,e,t)=>(R(a,e,"read from private field"),t?t.call(a):e.get(a)),n=(a,e,t)=>{if(e.has(a))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(a):e.set(a,t)};var r=(a,e,t)=>(R(a,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();var w,z,L,Z,S,F,p,y,A,C;class st{constructor(e){n(this,w);n(this,L);n(this,S);n(this,p);n(this,A);c(this,"attributes",{container:"container",region:"region",toggle:"toggle"});c(this,"disclosures");c(this,"config");this.disclosures=new Map;const t={idPrefix:"disclosure_",activeClass:"disclosure-active",targetAttribute:"data-disclosure",duration:200,defaultState:!1,closeAll:!0};this.config={...t,...e},r(this,w,z).call(this)}}w=new WeakSet,z=function(){document.querySelectorAll(`[${this.config.targetAttribute}="${this.attributes.container}"]`).forEach((t,s)=>{let i=this.config.defaultState;t.hasAttribute(`${this.config.targetAttribute}-state`)&&(i=t.getAttribute(`${this.config.targetAttribute}-state`)==="true"),this.disclosures.set(t,{index:s,state:i,region:t.querySelector(`[${this.config.targetAttribute}="${this.attributes.region}"]`),regionScrollHeight:0,togglers:t.querySelectorAll(`[${this.config.targetAttribute}="${this.attributes.toggle}"]`)}),r(this,L,Z).call(this,t)})},L=new WeakSet,Z=function(e){const t=this.disclosures.get(e);!t||(r(this,p,y).call(this,e,t.state,!1),r(this,A,C).call(this,t),r(this,p,y).call(this,t.region,t.state,!0),t.region.style.transition=`max-height ${this.config.duration}ms ease-in-out`,t.region.style.overflow="hidden",t.region.setAttribute("role","region"),t.region.setAttribute("id",`${this.config.idPrefix}region-${t.index}`),t.togglers.forEach((s,i)=>{s.setAttribute("role","button"),s.setAttribute("aria-controls",t.region.id),s.setAttribute("id",`${this.config.idPrefix}toggler-${t.index}-${i}`),i===0&&t.region.setAttribute("aria-labelledby",t.togglers[0].id),s.addEventListener("click",o=>{o.preventDefault(),r(this,S,F).call(this,e)}),s.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&(o.preventDefault(),r(this,S,F).call(this,e))})}))},S=new WeakSet,F=function(e){const t=this.disclosures.get(e);if(!!t){if(t.state=!t.state,this.config.closeAll&&t.state)for(let[s,i]of this.disclosures.entries())s!==e&&(i.state=!1,r(this,p,y).call(this,s,i.state,!1),r(this,A,C).call(this,i),r(this,p,y).call(this,i.region,i.state,!0));r(this,p,y).call(this,e,t.state,!1),r(this,A,C).call(this,t),r(this,p,y).call(this,t.region,t.state,!0)}},p=new WeakSet,y=function(e,t,s){t?(e.classList.add(this.config.activeClass),s&&(e.style.maxHeight=e.scrollHeight+"px")):(e.classList.remove(this.config.activeClass),s&&(e.style.maxHeight="0px"))},A=new WeakSet,C=function(e){e.togglers.forEach(t=>{e.state?(t.classList.add(this.config.activeClass),t.setAttribute("aria-expanded","true")):(t.classList.remove(this.config.activeClass),t.setAttribute("aria-expanded","false"))})};class it{constructor(e,t){c(this,"config");c(this,"headerEle");c(this,"scrollPos");c(this,"prevScrollPos");c(this,"state");c(this,"prevState");c(this,"onScroll");c(this,"onScrollHandler");var s,i,o;this.config={triggerDistance:(t==null?void 0:t.triggerDistance)||50,classes:{top:((s=t==null?void 0:t.classes)==null?void 0:s.top)||"sticky-top",movedDown:((i=t==null?void 0:t.classes)==null?void 0:i.movedDown)||"sticky-down",movedUp:((o=t==null?void 0:t.classes)==null?void 0:o.movedUp)||"sticky-up"},onChange:(t==null?void 0:t.onChange)||void 0},this.scrollPos=document.body.scrollTop||document.documentElement.scrollTop,this.prevScrollPos=this.scrollPos,this.state=void 0,this.prevState=void 0,this.headerEle=document.getElementById(e),this.headerEle!==void 0?(this.onScroll=function(){this.scrollPos=document.body.scrollTop||document.documentElement.scrollTop,this.scrollPos>this.config.triggerDistance?this.scrollPos>this.prevScrollPos?(this.state=this.config.classes.movedDown,this.prevScrollPos=this.scrollPos):(this.state=this.config.classes.movedUp,this.prevScrollPos=this.scrollPos):this.state=this.config.classes.top,this.prevState!=this.state&&(this.prevState=this.state,this.state!=this.config.classes.movedDown&&this.headerEle.classList.remove(this.config.classes.movedDown),this.state!=this.config.classes.movedUp&&this.headerEle.classList.remove(this.config.classes.movedUp),this.state!=this.config.classes.top&&this.headerEle.classList.remove(this.config.classes.top),this.headerEle.classList.add(this.state),this.config.onChange!=null&&this.config.onChange({state:this.state,scrollPos:this.scrollPos}))},this.onScrollHandler=this.onScroll.bind(this),this.onScrollHandler(),window.addEventListener("scroll",this.onScrollHandler,!0)):console.error(`Header with an ID of ${e} cannot be found!`)}destroy(){this.onScrollHandler&&window.removeEventListener("scroll",this.onScrollHandler,!0),this.headerEle.classList.remove(this.config.classes.movedDown),this.headerEle.classList.remove(this.config.classes.movedUp),this.headerEle.classList.remove(this.config.classes.top)}}var k,B,V,_,D,G,g,b;class rt{constructor(e){n(this,k);n(this,V);n(this,D);n(this,g);c(this,"config");c(this,"map");c(this,"multiToggler");this.config={activeClass:"active",attributes:{toggler:"data-toggler",receiver:"data-toggler-receiver",class:"data-toggler-class",state:"data-toggler-state",close:"data-toggler-close",multi:"data-toggler-multi",multiTargets:"data-toggler-multi-targets",multiState:"data-toggler-multi-state"},...e},this.map=new Map,this.multiToggler=new Map,r(this,k,B).call(this)}}k=new WeakSet,B=function(){const e=document.querySelectorAll(`[${this.config.attributes.toggler}]`),t=document.querySelectorAll(`[${this.config.attributes.multi}]`);[...e].map(s=>{const i=s.getAttribute(this.config.attributes.toggler);if(!i)return;const o=s.getAttribute(this.config.attributes.close),l=o?o.replaceAll(" ","").split(","):[];this.map.has(i)||(this.map.set(i,{state:s.getAttribute(this.config.attributes.state)==="true",activeClass:s.getAttribute(this.config.attributes.class)||this.config.activeClass,closeTogglers:l}),r(this,V,_).call(this,s))}),[...t].map(s=>{const i=s.getAttribute(this.config.attributes.multi);if(!i)return;const o=s.getAttribute(this.config.attributes.multiTargets),l=o?o.replaceAll(" ","").split(","):[];this.multiToggler.has(i)||(this.multiToggler.set(i,{state:s.getAttribute(this.config.attributes.multiState)==="true",targets:l,activeClass:s.getAttribute(this.config.attributes.class)||this.config.activeClass}),r(this,D,G).call(this,s))})},V=new WeakSet,_=function(e){const t=e.getAttribute(this.config.attributes.toggler);if(!t)return;const s=this.map.get(t);if(!s)return;const i=()=>{r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${t}"]`),s,!1),r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${t}"]`),s,!0),s.closeTogglers.map(l=>{const m=this.map.get(l);!m||(m.state=!1,r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${l}"]`),m,!0),r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${l}"]`),m,!1))})};i();const o=()=>{this.multiToggler.forEach((l,m)=>{l.targets.includes(t)&&(l.state=!1,r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.multi}="${m}"]`),l,!0))})};e.addEventListener("click",l=>{l.preventDefault(),s.state=!s.state,i(),s.state||o()})},D=new WeakSet,G=function(e){const t=e.getAttribute(this.config.attributes.multi);if(!t)return;const s=this.multiToggler.get(t);if(!s)return;const i=()=>{s.targets.map(o=>{const l=this.map.get(o);!l||(l.state=s.state,r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.toggler}="${o}"]`),l,!0),r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.receiver}="${o}"]`),l,!1))}),r(this,g,b).call(this,document.querySelectorAll(`[${this.config.attributes.multi}="${t}"]`),s,!0)};i(),e.addEventListener("click",o=>{o.preventDefault(),s.state=!s.state,i()})},g=new WeakSet,b=function(e,t,s){[...e].map(i=>{t.state?(i.classList.add(t.activeClass),s&&i.setAttribute("aria-expanded","true")):(i.classList.remove(t.activeClass),s&&i.setAttribute("aria-expanded","false"))})};var T,J,x,K,q;class ot{constructor(e){n(this,T);n(this,x);c(this,"config");c(this,"map");n(this,q,(e,t)=>{e.forEach(s=>{const i=s.target,o=this.map.get(i);if(o){const l=h=>{setTimeout(()=>{i.classList.add(h.class)},h.delay||0)},m=h=>{i.classList.remove(h.class)};s.isIntersecting?(i.classList.add(this.config.activeClass),o.forEach(h=>{l(h)})):(this.config.reset&&i.classList.remove(this.config.activeClass),o.forEach(h=>{h.reset&&m(h)}))}})});this.config={reset:!0,activeClass:"animate",threshold:1,attributes:{animate:"data-animate"},...e},this.map=new WeakMap,r(this,T,J).call(this)}}T=new WeakSet,J=function(){const e=new IntersectionObserver(N(this,q),{threshold:this.config.threshold});[...document.querySelectorAll(`[${this.config.attributes.animate}]`)].forEach(s=>{const i=s.getAttribute(this.config.attributes.animate),o=r(this,x,K).call(this,i);this.map.set(s,o),e.observe(s)})},x=new WeakSet,K=function(e){const t=e.replace(/'/g,'"').replace(/([a-zA-Z0-9]+):/g,'"$1":').replace(/:(?=[a-zA-Z0-9])/g,':"').replace(/,(?=[a-zA-Z0-9])/g,'",').replace(/}$/,'"}');return[...JSON.parse(t)].filter(i=>{if(i.class!==void 0)return i.delay=i.delay||0,i.reset=typeof i.reset=="boolean"?i.reset:this.config.reset,i})},q=new WeakMap;var P,Q,H,X,M,Y,E,I,$,U,u,f,d,v,O,j;class W{constructor(e,t){n(this,P);n(this,H);n(this,M);n(this,E);n(this,$);n(this,u);n(this,d);n(this,O);c(this,"config");c(this,"form");if(this.config={validateOnChange:!1,externalValidation:!1,errorClass:"error",customValidation:[],onError:void 0,reset:!0,showMessageDuration:3e3,attributes:{inputRelation:"data-input-relation",formSubmit:"data-form-submit",formStatus:"data-form-status",formMessage:"data-form-message"},...t},this.form=document.querySelector(e),!this.form)throw new Error("Form not found");r(this,P,Q).call(this)}setInputError(e){[...this.form.querySelectorAll(`[${this.config.attributes.inputRelation}="${e}"], [name="${e}"]`)].forEach(s=>{s.classList.add(this.config.errorClass)})}}P=new WeakSet,Q=function(){this.form.setAttribute("novalidate","true"),r(this,u,f).call(this,""),this.config.validateOnChange&&!this.config.externalValidation&&r(this,H,X).call(this),r(this,M,Y).call(this)},H=new WeakSet,X=function(){this.form.addEventListener("change",e=>{e.preventDefault(),r(this,u,f).call(this,"");const t=e.target;if(!t)return;t.setCustomValidity(""),r(this,E,I).call(this,t);const s=r(this,$,U).call(this,t);!this.form.checkValidity()&&this.config.onError&&this.config.onError([s])})},M=new WeakSet,Y=function(){this.form.addEventListener("submit",async e=>{r(this,u,f).call(this,""),r(this,d,v).call(this,!1),e.preventDefault();const t=this.form.querySelector(`[${this.config.attributes.formSubmit}]`);if(t&&(t.disabled=!0),this.config.externalValidation){r(this,O,j).call(this),r(this,u,f).call(this,"loading");const s=await this.config.submitForm(this.form);s.success?(this.config.reset&&this.form.reset(),r(this,u,f).call(this,"success"),r(this,d,v).call(this,this.config.reset,s.message)):s.errors?(this.config.onError&&this.config.onError(s.errors),r(this,u,f).call(this,""),r(this,d,v).call(this,!1)):(r(this,u,f).call(this,"error"),r(this,d,v).call(this,!1,s.message)),t&&(t.disabled=!1)}else{const s=Array.from(this.form.elements),i=[];if(s.forEach(o=>{o.type!=="submit"&&(o.setCustomValidity(""),r(this,E,I).call(this,o),i.push(r(this,$,U).call(this,o)))}),!this.form.checkValidity())this.config.onError&&this.config.onError(i),t&&(t.disabled=!1);else{r(this,u,f).call(this,"loading");const o=await this.config.submitForm(this.form);o.success?(this.config.reset&&this.form.reset(),r(this,u,f).call(this,"success"),r(this,d,v).call(this,this.config.reset,o.message)):(r(this,u,f).call(this,"error"),r(this,d,v).call(this,!1,o.message)),t&&(t.disabled=!1)}}})},E=new WeakSet,I=function(e){this.config.customValidation.length&&this.config.customValidation.forEach(t=>{if(e.name===t.name){let s=t.validator(e.value);e.setCustomValidity(s)}})},$=new WeakSet,U=function(e){const t=(o,l)=>{[...this.form.querySelectorAll(`[${this.config.attributes.inputRelation}="${l}"]`)].forEach(h=>{o?h.classList.remove(this.config.errorClass):h.classList.add(this.config.errorClass)}),o?e.classList.remove(this.config.errorClass):e.classList.add(this.config.errorClass)},s=e.checkValidity(),i=e.name;return t(s,i),{name:i,valid:s,message:e.validationMessage}},u=new WeakSet,f=function(e){this.form.querySelectorAll(`[${this.config.attributes.formStatus}]`).forEach(s=>{s.setAttribute(this.config.attributes.formStatus,e)}),this.form.setAttribute(this.config.attributes.formStatus,e)},d=new WeakSet,v=function(e,t){this.form.querySelectorAll(`[${this.config.attributes.formMessage}]`).forEach(i=>{i.innerHTML=t||""}),e&&setTimeout(()=>{r(this,d,v).call(this,!1),r(this,u,f).call(this,"")},this.config.showMessageDuration)},O=new WeakSet,j=function(){Array.from(this.form.elements).forEach(t=>{t.type!=="submit"&&t.classList.remove(this.config.errorClass)})};new st({idPrefix:"disclosure_",activeClass:"disclosure-active",targetAttribute:"data-disclosure",duration:200,defaultState:!1,closeAll:!0});new it("siteHeader",{triggerDistance:50,classes:{top:"sticky-top",movedDown:"sticky-down",movedUp:"sticky-up"},onChange:()=>{}});new rt({activeClass:"active"});new ot({activeClass:"animate",reset:!0,threshold:1});const at=new W("#form-change",{validateOnChange:!0,externalValidation:!0,onError:a=>{console.log("errors",a);for(let e in a)at.setInputError(e)},submitForm:async a=>{const e=a.getAttribute("action"),t=a.getAttribute("method");if(e&&t){const i=await(await fetch(e,{method:t,body:new FormData(a)})).json();return i.errors?{success:!1,errors:i.errors}:{success:!0,message:"Form submitted successfully"}}return{success:!1,message:"The form must have an action and method attribute"}}});new W("#form-submit",{validateOnChange:!1,externalValidation:!1,onError:a=>{console.log("errors",a)},submitForm:async a=>{const e=a.getAttribute("action"),t=a.getAttribute("method");return e&&t?(await fetch(e,{method:t,body:new FormData(a)})).ok?(console.log("success"),{success:!0,message:"Form submission successful"}):(console.log("error"),{success:!1,message:"Form submission failed"}):{success:!1,message:"The form must have an action and method attribute"}}});
