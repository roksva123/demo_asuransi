var Rm=Object.defineProperty;var Cm=(r,e,t)=>e in r?Rm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var gi=(r,e,t)=>Cm(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function cd(r,e,t){return Math.max(r,Math.min(e,t))}class Pm{advance(e){var o;if(!this.isRunning)return;let t=!1;if(this.lerp)this.value=(n=this.value,i=this.to,s=60*this.lerp,a=e,function(l,c,u){return(1-u)*l+u*c}(n,i,1-Math.exp(-s*a))),Math.round(this.value)===this.to&&(this.value=this.to,t=!0);else{this.currentTime+=e;const l=cd(0,this.currentTime/this.duration,1);t=l>=1;const c=t?1:this.easing(l);this.value=this.from+(this.to-this.from)*c}var n,i,s,a;(o=this.onUpdate)==null||o.call(this,this.value,t),t&&this.stop()}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n=.1,duration:i=1,easing:s=l=>l,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,a==null||a(),this.onUpdate=o}}class Lm{constructor({wrapper:e,content:t,autoResize:n=!0,debounce:i=250}={}){gi(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});gi(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});gi(this,"onContentResize",()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=e,this.content=t,n&&(this.debouncedResize=function(s,a){let o;return function(){let l=arguments,c=this;clearTimeout(o),o=setTimeout(function(){s.apply(c,l)},a)}}(this.resize,i),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var e,t;(e=this.wrapperResizeObserver)==null||e.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class ud{constructor(){this.events={}}emit(e,...t){let n=this.events[e]||[];for(let i=0,s=n.length;i<s;i++)n[i](...t)}on(e,t){var n;return(n=this.events[e])!=null&&n.push(t)||(this.events[e]=[t]),()=>{var i;this.events[e]=(i=this.events[e])==null?void 0:i.filter(s=>t!==s)}}off(e,t){var n;this.events[e]=(n=this.events[e])==null?void 0:n.filter(i=>t!==i)}destroy(){this.events={}}}const Yu=100/6;class Dm{constructor(e,{wheelMultiplier:t=1,touchMultiplier:n=1}){gi(this,"onTouchStart",e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})});gi(this,"onTouchMove",e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,i=-(t-this.touchStart.x)*this.touchMultiplier,s=-(n-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:e})});gi(this,"onTouchEnd",e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})});gi(this,"onWheel",e=>{let{deltaX:t,deltaY:n,deltaMode:i}=e;t*=i===1?Yu:i===2?this.windowWidth:1,n*=i===1?Yu:i===2?this.windowHeight:1,t*=this.wheelMultiplier,n*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:n,event:e})});gi(this,"onWindowResize",()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight});this.element=e,this.wheelMultiplier=t,this.touchMultiplier=n,this.touchStart={x:null,y:null},this.emitter=new ud,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class Um{constructor({wrapper:e=window,content:t=document.documentElement,wheelEventsTarget:n=e,eventsTarget:i=n,smoothWheel:s=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:l=35,duration:c,easing:u=v=>Math.min(1,1.001-Math.pow(2,-10*v)),lerp:h=!c&&.1,infinite:f=!1,orientation:d="vertical",gestureOrientation:g="vertical",touchMultiplier:_=1,wheelMultiplier:p=1,autoResize:m=!0,__experimental__naiveDimensions:M=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:v,deltaY:x,event:R})=>{if(R.ctrlKey)return;const w=R.type.includes("touch"),E=R.type.includes("wheel");if(this.options.syncTouch&&w&&R.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();const D=v===0&&x===0,S=this.options.gestureOrientation==="vertical"&&x===0||this.options.gestureOrientation==="horizontal"&&v===0;if(D||S)return;let y=R.composedPath();if(y=y.slice(0,y.indexOf(this.rootElement)),y.find(P=>{var k,H,V,q,$;return((k=P.hasAttribute)===null||k===void 0?void 0:k.call(P,"data-lenis-prevent"))||w&&((H=P.hasAttribute)===null||H===void 0?void 0:H.call(P,"data-lenis-prevent-touch"))||E&&((V=P.hasAttribute)===null||V===void 0?void 0:V.call(P,"data-lenis-prevent-wheel"))||((q=P.classList)===null||q===void 0?void 0:q.contains("lenis"))&&!(!(($=P.classList)===null||$===void 0)&&$.contains("lenis-stopped"))}))return;if(this.isStopped||this.isLocked)return void R.preventDefault();if(this.isSmooth=this.options.syncTouch&&w||this.options.smoothWheel&&E,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();R.preventDefault();let U=x;this.options.gestureOrientation==="both"?U=Math.abs(x)>Math.abs(v)?x:v:this.options.gestureOrientation==="horizontal"&&(U=v);const I=w&&this.options.syncTouch,J=w&&R.type==="touchend"&&Math.abs(U)>5;J&&(U=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+U,Object.assign({programmatic:!1},I?{lerp:J?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const v=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-v),this.emit()}},window.lenisVersion="1.0.42",e!==document.documentElement&&e!==document.body||(e=window),this.options={wrapper:e,content:t,wheelEventsTarget:n,eventsTarget:i,smoothWheel:s,syncTouch:a,syncTouchLerp:o,touchInertiaMultiplier:l,duration:c,easing:u,lerp:h,infinite:f,gestureOrientation:g,orientation:d,touchMultiplier:_,wheelMultiplier:p,autoResize:m,__experimental__naiveDimensions:M},this.animate=new Pm,this.emitter=new ud,this.dimensions=new Lm({wrapper:e,content:t,autoResize:m}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=a||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new Dm(i,{touchMultiplier:_,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}setScroll(e){this.isHorizontal?this.rootElement.scrollLeft=e:this.rootElement.scrollTop=e}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(e){const t=e-(this.time||e);this.time=e,this.animate.advance(.001*t)}scrollTo(e,{offset:t=0,immediate:n=!1,lock:i=!1,duration:s=this.options.duration,easing:a=this.options.easing,lerp:o=!s&&this.options.lerp,onComplete:l,force:c=!1,programmatic:u=!0}={}){if(!this.isStopped&&!this.isLocked||c){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let h;if(typeof e=="string"?h=document.querySelector(e):e!=null&&e.nodeType&&(h=e),h){if(this.options.wrapper!==window){const d=this.options.wrapper.getBoundingClientRect();t-=this.isHorizontal?d.left:d.top}const f=h.getBoundingClientRect();e=(this.isHorizontal?f.left:f.top)+this.animatedScroll}}if(typeof e=="number"){if(e+=t,e=Math.round(e),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):e=cd(0,e,this.limit),n)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(l==null||l(this));if(!u){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:s,easing:a,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(h,f)=>{this.isScrolling=!0,this.velocity=h-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=h,this.setScroll(this.scroll),u&&(this.targetScroll=h),f||this.emit(),f&&(this.reset(),this.emit(),l==null||l(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(e=this.animatedScroll,t=this.limit,(e%t+t)%t):this.animatedScroll;var e,t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(e){this.__isSmooth!==e&&(this.__isSmooth=e,this.toggleClassName("lenis-smooth",e))}get isScrolling(){return this.__isScrolling}set isScrolling(e){this.__isScrolling!==e&&(this.__isScrolling=e,this.toggleClassName("lenis-scrolling",e))}get isStopped(){return this.__isStopped}set isStopped(e){this.__isStopped!==e&&(this.__isStopped=e,this.toggleClassName("lenis-stopped",e))}get isLocked(){return this.__isLocked}set isLocked(e){this.__isLocked!==e&&(this.__isLocked=e,this.toggleClassName("lenis-locked",e))}get className(){let e="lenis";return this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isSmooth&&(e+=" lenis-smooth"),e}toggleClassName(e,t){this.rootElement.classList.toggle(e,t),this.emitter.emit("className change",this)}}function Ti(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function hd(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var kn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ya={duration:.5,overwrite:!1,delay:0},nu,Jt,Mt,Kn=1e8,mt=1/Kn,xc=Math.PI*2,Nm=xc/4,Im=0,fd=Math.sqrt,Om=Math.cos,Fm=Math.sin,$t=function(e){return typeof e=="string"},Pt=function(e){return typeof e=="function"},Li=function(e){return typeof e=="number"},iu=function(e){return typeof e>"u"},mi=function(e){return typeof e=="object"},yn=function(e){return e!==!1},ru=function(){return typeof window<"u"},Ha=function(e){return Pt(e)||$t(e)},dd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},on=Array.isArray,km=/random\([^)]+\)/g,Bm=/,\s*/g,$u=/(?:-?\.?\d|\.)+/gi,pd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,fs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,xl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,md=/[+-]=-?[.\d]+/,zm=/[^,'"\[\]\s]+/gi,Hm=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,wt,oi,Sc,su,zn={},ko={},_d,gd=function(e){return(ko=As(e,zn))&&wn},au=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ma=function(e,t){return!t&&console.warn(e)},vd=function(e,t){return e&&(zn[e]=t)&&ko&&(ko[e]=t)||zn},Ea=function(){return 0},Gm={suppressEvents:!0,isStart:!0,kill:!1},Ao={suppressEvents:!0,kill:!1},Vm={suppressEvents:!0},ou={},$i=[],yc={},xd,Dn={},Sl={},Ku=30,Ro=[],lu="",cu=function(e){var t=e[0],n,i;if(mi(t)||Pt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Ro.length;i--&&!Ro[i].targetTest(t););n=Ro[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Hd(e[i],n)))||e.splice(i,1);return e},wr=function(e){return e._gsap||cu(Jn(e))[0]._gsap},Sd=function(e,t,n){return(n=e[t])&&Pt(n)?e[t]():iu(n)&&e.getAttribute&&e.getAttribute(t)||n},Mn=function(e,t){return(e=e.split(",")).forEach(t)||e},Lt=function(e){return Math.round(e*1e5)/1e5||0},bt=function(e){return Math.round(e*1e7)/1e7||0},vs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Wm=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Bo=function(){var e=$i.length,t=$i.slice(0),n,i;for(yc={},$i.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},uu=function(e){return!!(e._initted||e._startAt||e.add)},yd=function(e,t,n,i){$i.length&&!Jt&&Bo(),e.render(t,n,!!(Jt&&t<0&&uu(e))),$i.length&&!Jt&&Bo()},Md=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(zm).length<2?t:$t(e)?e.trim():e},Ed=function(e){return e},Hn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Xm=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},As=function(e,t){for(var n in t)e[n]=t[n];return e},Ju=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=mi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},zo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},ra=function(e){var t=e.parent||wt,n=e.keyframes?Xm(on(e.keyframes)):Hn;if(yn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},qm=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Td=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},rl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},tr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ar=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ym=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Mc=function(e,t,n,i){return e._startAt&&(Jt?e._startAt.revert(Ao):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},$m=function r(e){return!e||e._ts&&r(e.parent)},Zu=function(e){return e._repeat?Rs(e._tTime,e=e.duration()+e._rDelay)*e:0},Rs=function(e,t){var n=Math.floor(e=bt(e/t));return e&&n===e?n-1:n},Ho=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},sl=function(e){return e._end=bt(e._start+(e._tDur/Math.abs(e._ts||e._rts||mt)||0))},al=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=bt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),sl(e),n._dirty||Ar(n,e)),e},bd=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Ho(e.rawTime(),t),(!t._dur||Fa(0,t.totalDuration(),n)-t._tTime>mt)&&t.render(n,!0)),Ar(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-mt}},ui=function(e,t,n,i){return t.parent&&tr(t),t._start=bt((Li(n)?n:!n&&Go(t)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:n||e!==wt?Wn(e,n,t):e._time)+t._delay),t._end=bt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Td(e,t,"_first","_last",e._sort?"_start":0),Go(t)||(e._recent=t),i||bd(e,t),e._ts<0&&al(e,e._tTime),e},wd=function(e,t){return(zn.ScrollTrigger||au("scrollTrigger",t))&&zn.ScrollTrigger.create(t,e)},Ad=function(e,t,n,i,s){if(fu(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Jt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&xd!==In.frame)return $i.push(e),e._lazy=[s,i],1},Km=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Go=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Jm=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&Km(e)&&!(!e._initted&&Go(e))||(e._ts<0||e._dp._ts<0)&&!Go(e))?0:1,o=e._rDelay,l=0,c,u,h;if(o&&e._repeat&&(l=Fa(0,e._tDur,t),u=Rs(l,o),e._yoyo&&u&1&&(a=1-a),u!==Rs(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Jt||i||e._zTime===mt||!t&&e._zTime){if(!e._initted&&Ad(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?mt:0),n||(n=t&&!h),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Mc(e,t,n,!0),e._onUpdate&&!n&&On(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&On(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&tr(e,1),!n&&!Jt&&(On(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Zm=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Cs=function(e,t,n,i){var s=e._repeat,a=bt(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:bt(a*(s+1)+e._rDelay*s):a,o>0&&!i&&al(e,e._tTime=e._tDur*o),e.parent&&sl(e),n||Ar(e.parent,e),e},ju=function(e){return e instanceof xn?Ar(e):Cs(e,e._dur)},jm={_start:0,endTime:Ea,totalDuration:Ea},Wn=function r(e,t,n){var i=e.labels,s=e._recent||jm,a=e.duration()>=Kn?s.endTime(!1):e._dur,o,l,c;return $t(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(on(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},sa=function(e,t,n){var i=Li(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=yn(l.vars.inherit)&&l.parent;a.immediateRender=yn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Ot(t[0],a,t[s+1])},ar=function(e,t){return e||e===0?t(e):t},Fa=function(e,t,n){return n<e?e:n>t?t:n},sn=function(e,t){return!$t(e)||!(t=Hm.exec(e))?"":t[1]},Qm=function(e,t,n){return ar(n,function(i){return Fa(e,t,i)})},Ec=[].slice,Rd=function(e,t){return e&&mi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&mi(e[0]))&&!e.nodeType&&e!==oi},e_=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return $t(i)&&!t||Rd(i,1)?(s=n).push.apply(s,Jn(i)):n.push(i)})||n},Jn=function(e,t,n){return Mt&&!t&&Mt.selector?Mt.selector(e):$t(e)&&!n&&(Sc||!Ps())?Ec.call((t||su).querySelectorAll(e),0):on(e)?e_(e,n):Rd(e)?Ec.call(e,0):e?[e]:[]},Tc=function(e){return e=Jn(e)[0]||Ma("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Jn(t,n.querySelectorAll?n:n===e?Ma("Invalid scope")||su.createElement("div"):e)}},Cd=function(e){return e.sort(function(){return .5-Math.random()})},Pd=function(e){if(Pt(e))return e;var t=mi(e)?e:{each:e},n=Rr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,u=i,h=i;return $t(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||t).length,p=a[_],m,M,v,x,R,w,E,D,S;if(!p){if(S=t.grid==="auto"?0:(t.grid||[1,Kn])[1],!S){for(E=-Kn;E<(E=g[S++].getBoundingClientRect().left)&&S<_;);S<_&&S--}for(p=a[_]=[],m=l?Math.min(S,_)*u-.5:i%S,M=S===Kn?0:l?_*h/S-.5:i/S|0,E=0,D=Kn,w=0;w<_;w++)v=w%S-m,x=M-(w/S|0),p[w]=R=c?Math.abs(c==="y"?x:v):fd(v*v+x*x),R>E&&(E=R),R<D&&(D=R);i==="random"&&Cd(p),p.max=E-D,p.min=D,p.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(S>_?_-1:c?c==="y"?_/S:S:Math.max(S,_/S))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=sn(t.amount||t.each)||0,n=n&&_<0?d_(n):n}return _=(p[f]-p.min)/p.max||0,bt(p.b+(n?n(_):_)*p.v)+p.u}},bc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=bt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Li(n)?0:sn(n))}},Ld=function(e,t){var n=on(e),i,s;return!n&&mi(e)&&(i=n=e.radius||Kn,e.values?(e=Jn(e.values),(s=!Li(e[0]))&&(i*=i)):e=bc(e.increment)),ar(t,n?Pt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Kn,u=0,h=e.length,f,d;h--;)s?(f=e[h].x-o,d=e[h].y-l,f=f*f+d*d):f=Math.abs(e[h]-o),f<c&&(c=f,u=h);return u=!i||c<=i?e[u]:a,s||u===a||Li(a)?u:u+sn(a)}:bc(e))},Dd=function(e,t,n,i){return ar(on(e)?!t:n===!0?!!(n=0):!i,function(){return on(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},t_=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},n_=function(e,t){return function(n){return e(parseFloat(n))+(t||sn(n))}},i_=function(e,t,n){return Nd(e,t,0,1,n)},Ud=function(e,t,n){return ar(n,function(i){return e[~~t(i)]})},r_=function r(e,t,n){var i=t-e;return on(e)?Ud(e,r(0,e.length),t):ar(n,function(s){return(i+(s-e)%i)%i+e})},s_=function r(e,t,n){var i=t-e,s=i*2;return on(e)?Ud(e,r(0,e.length-1),t):ar(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},Ta=function(e){return e.replace(km,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Bm);return Dd(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Nd=function(e,t,n,i,s){var a=t-e,o=i-n;return ar(s,function(l){return n+((l-e)/a*o||0)})},a_=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=$t(e),o={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(on(e)&&!on(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=As(on(e)?[]:{},e));if(!u){for(l in t)hu.call(o,e,l,"get",t[l]);s=function(g){return mu(g,o)||(a?e.p:e)}}}return ar(n,s)},Qu=function(e,t,n){var i=e.labels,s=Kn,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},On=function(e,t,n){var i=e.vars,s=i[t],a=Mt,o=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&$i.length&&Bo(),o&&(Mt=o),u=l?s.apply(c,l):s.call(c),Mt=a,u},Zs=function(e){return tr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Jt),e.progress()<1&&On(e,"onInterrupt"),e},ds,Id=[],Od=function(e){if(e)if(e=!e.name&&e.default||e,ru()||e.headless){var t=e.name,n=Pt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ea,render:mu,add:hu,kill:E_,modifier:M_,rawVars:0},a={targetTest:0,get:0,getSetter:pu,aliases:{},register:0};if(Ps(),e!==i){if(Dn[t])return;Hn(i,Hn(zo(e,s),a)),As(i.prototype,As(s,zo(e,a))),Dn[i.prop=t]=i,e.targetTest&&(Ro.push(i),ou[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}vd(t,i),e.register&&e.register(wn,i,En)}else Id.push(e)},_t=255,js={aqua:[0,_t,_t],lime:[0,_t,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,_t],navy:[0,0,128],white:[_t,_t,_t],olive:[128,128,0],yellow:[_t,_t,0],orange:[_t,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[_t,0,0],pink:[_t,192,203],cyan:[0,_t,_t],transparent:[_t,_t,_t,0]},yl=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*_t+.5|0},Fd=function(e,t,n){var i=e?Li(e)?[e>>16,e>>8&_t,e&_t]:0:js.black,s,a,o,l,c,u,h,f,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),js[e])i=js[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&_t,i&_t,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&_t,e&_t]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match($u),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=yl(l+1/3,s,a),i[1]=yl(l,s,a),i[2]=yl(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(pd),n&&i.length<4&&(i[3]=1),i}else i=e.match($u)||js.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/_t,a=i[1]/_t,o=i[2]/_t,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(a-o)/d+(a<o?6:0):h===a?(o-s)/d+2:(s-a)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},kd=function(e){var t=[],n=[],i=-1;return e.split(Ki).forEach(function(s){var a=s.match(fs)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},eh=function(e,t,n){var i="",s=(e+i).match(Ki),a=t?"hsla(":"rgba(",o=0,l,c,u,h;if(!s)return e;if(s=s.map(function(f){return(f=Fd(f,t,1))&&a+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=kd(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Ki,"1").split(fs),h=c.length-1;o<h;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Ki),h=c.length-1;o<h;o++)i+=c[o]+s[o];return i+c[h]},Ki=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in js)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),o_=/hsl[a]?\(/,Bd=function(e){var t=e.join(" "),n;if(Ki.lastIndex=0,Ki.test(t))return n=o_.test(t),e[1]=eh(e[1],n),e[0]=eh(e[0],n,kd(e[1])),!0},ba,In=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,u,h,f,d,g=function _(p){var m=r()-i,M=p===!0,v,x,R,w;if((m>e||m<0)&&(n+=m-t),i+=m,R=i-n,v=R-a,(v>0||M)&&(w=++h.frame,f=R-h.time*1e3,h.time=R=R/1e3,a+=v+(v>=s?0:s-v),x=1),M||(l=c(_)),x)for(d=0;d<o.length;d++)o[d](R,f,w,p)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){_d&&(!Sc&&ru()&&(oi=Sc=window,su=oi.document||{},zn.gsap=wn,(oi.gsapVersions||(oi.gsapVersions=[])).push(wn.version),gd(ko||oi.GreenSockGlobals||!oi.gsap&&oi||{}),Id.forEach(Od)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(p){return setTimeout(p,a-h.time*1e3+1|0)},ba=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ba=0,c=Ea},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=h.time*1e3+s},add:function(p,m,M){var v=m?function(x,R,w,E){p(x,R,w,E),h.remove(v)}:p;return h.remove(p),o[M?"unshift":"push"](v),Ps(),v},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},h}(),Ps=function(){return!ba&&In.wake()},st={},l_=/^[\d.\-M][\d.\-,\s]/,c_=/["']/g,u_=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(c_,"").trim():+c,i=l.substr(o+1).trim();return t},h_=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},f_=function(e){var t=(e+"").split("("),n=st[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[u_(t[1])]:h_(e).split(",").map(Md)):st._CE&&l_.test(e)?st._CE("",e):n},d_=function(e){return function(t){return 1-e(1-t)}},Rr=function(e,t){return e&&(Pt(e)?e:st[e]||f_(e))||t},Vr=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Mn(e,function(o){st[o]=zn[o]=s,st[a=o.toLowerCase()]=n;for(var l in s)st[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=st[o+"."+l]=s[l]}),s},zd=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ml=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/xc*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*Fm((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:zd(o);return s=xc/s,l.config=function(c,u){return r(e,c,u)},l},El=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:zd(n);return i.config=function(s){return r(e,s)},i};Mn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Vr(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});st.Linear.easeNone=st.none=st.Linear.easeIn;Vr("Elastic",Ml("in"),Ml("out"),Ml());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};Vr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);Vr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Vr("Circ",function(r){return-(fd(1-r*r)-1)});Vr("Sine",function(r){return r===1?1:-Om(r*Nm)+1});Vr("Back",El("in"),El("out"),El());st.SteppedEase=st.steps=zn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-mt;return function(o){return((i*Fa(0,a,o)|0)+s)*n}}};ya.ease=st["quad.out"];Mn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return lu+=r+","+r+"Params,"});var Hd=function(e,t){this.id=Im++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Sd,this.set=t?t.getSetter:pu},wa=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Cs(this,+t.duration,1,1),this.data=t.data,Mt&&(this._ctx=Mt,Mt.data.push(this)),ba||In.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Cs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ps(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(al(this,n),!s._dp||s.parent||bd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ui(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===mt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),yd(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Zu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Zu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Rs(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-mt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ho(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-mt?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||s>0&&s<o)&&this.totalTime(Fa(-Math.abs(this._delay),o,s),i!==!1),sl(this),Ym(this)},e.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Ps(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,s=this.progress()===1&&Math.abs(this._zTime)!==mt,a;if(s)for(this._tTime-=mt,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+mt){s=!1;break}a=a._next}this.totalTime(i,s)}return this},e.startTime=function(n){if(arguments.length){this._start=bt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&ui(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(yn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ho(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Vm);var i=Jt;return Jt=n,uu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Jt=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,ju(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,ju(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Wn(this,n),yn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,yn(i)),this._dur||(this._zTime=-mt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-mt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-mt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-mt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Pt(n)?n:Ed,l=function(){var u=i.then;i.then=null,s&&s(),Pt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){Zs(this)},r}();Hn(wa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-mt,_prom:0,_ps:!1,_rts:1});var xn=function(r){hd(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=yn(n.sortChildren),wt&&ui(n.parent||wt,Ti(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&wd(Ti(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return sa(0,arguments,this),this},t.from=function(i,s,a){return sa(1,arguments,this),this},t.fromTo=function(i,s,a,o){return sa(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,ra(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ot(i,s,Wn(this,a),1),this},t.call=function(i,s,a){return ui(this,Ot.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Ot(i,a,Wn(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,u){return a.runBackwards=1,ra(a).immediateRender=yn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,u)},t.staggerFromTo=function(i,s,a,o,l,c,u,h){return o.startAt=a,ra(o).immediateRender=yn(o.immediateRender),this.staggerTo(i,s,o,l,c,u,h)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:bt(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,g,_,p,m,M,v,x,R,w,E;if(this!==wt&&u>l&&i>=0&&(u=l),u!==this._tTime||a||h){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),f=u,x=this._start,v=this._ts,m=!v,h&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(f=bt(u%p),u===l?(_=this._repeat,f=c):(R=bt(u/p),_=~~R,_&&_===R&&(f=c,_--),f>c&&(f=c)),R=Rs(this._tTime,p),!o&&this._tTime&&R!==_&&this._tTime-R*p-this._dur<=0&&(R=_),w&&_&1&&(f=c-f,E=1),_!==R&&!this._lock){var D=w&&R&1,S=D===(w&&_&1);if(_<R&&(D=!D),o=D?0:u%c?c:u,this._lock=1,this.render(o||(E?0:bt(_*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&On(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,R=_),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=D?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=Zm(this,bt(o),bt(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&c&&!s&&!R&&(On(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!m){M=0,g&&(u+=this._zTime=-mt);break}}d=g}else{d=this._last;for(var y=i<0?i:f;d;){if(g=d._prev,(d._act||y<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(y-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(y-d._start)*d._ts,s,a||Jt&&uu(d)),f!==this._time||!this._ts&&!m){M=0,g&&(u+=this._zTime=y?-mt:mt);break}}d=g}}if(M&&!s&&(this.pause(),M.render(f>=o?0:-mt)._zTime=f>=o?1:-1,this._ts))return this._start=x,sl(this),this.render(i,s,a);this._onUpdate&&!s&&On(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(x===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&tr(this,1),!s&&!(i<0&&!o)&&(u||o||!l)&&(On(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(Li(s)||(s=Wn(this,s,i)),!(i instanceof wa)){if(on(i))return i.forEach(function(o){return a.add(o,s)}),this;if($t(i))return this.addLabel(i,s);if(Pt(i))i=Ot.delayedCall(0,i);else return this}return this!==i?ui(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Kn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ot?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return $t(i)?this.removeLabel(i):Pt(i)?this.killTweensOf(i):(i.parent===this&&rl(this,i),i===this._recent&&(this._recent=this._last),Ar(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=bt(In.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Wn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Ot.delayedCall(0,s||Ea,a);return o.data="isPause",this._hasPause=1,ui(this,o,Wn(this,i))},t.removePause=function(i){var s=this._first;for(i=Wn(this,i);s;)s._start===i&&s.data==="isPause"&&tr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)zi!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=Jn(i),l=this._first,c=Li(s),u;l;)l instanceof Ot?Wm(l._targets,o)&&(c?(!zi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=Wn(a,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,g=Ot.to(a,Hn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||mt,onStart:function(){if(a.pause(),!d){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&Cs(g,p,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Hn({startAt:{time:Wn(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Qu(this,Wn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Qu(this,Wn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+mt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=bt(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Ar(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ar(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Kn,c,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,ui(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=bt(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Cs(a,a===wt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(wt._ts&&(yd(wt,Ho(i,wt)),xd=In.frame),In.frame>=Ku){Ku+=kn.autoSleep||120;var s=wt._first;if((!s||!s._ts)&&kn.autoSleep&&In._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||In.sleep()}}},e}(wa);Hn(xn.prototype,{_lock:0,_hasPause:0,_forcing:0});var p_=function(e,t,n,i,s,a,o){var l=new En(this._pt,e,t,0,1,qd,null,s),c=0,u=0,h,f,d,g,_,p,m,M;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Ta(i)),a&&(M=[n,i],a(M,e,t),n=M[0],i=M[1]),f=n.match(xl)||[];h=xl.exec(i);)g=h[0],_=i.substring(c,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(p=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:p,c:g.charAt(1)==="="?vs(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},c=xl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(md.test(i)||m)&&(l.e=0),this._pt=l,l},hu=function(e,t,n,i,s,a,o,l,c,u){Pt(i)&&(i=i(s||0,e,a));var h=e[t],f=n!=="get"?n:Pt(h)?c?e[t.indexOf("set")||!Pt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,d=Pt(h)?c?x_:Wd:du,g;if($t(i)&&(~i.indexOf("random(")&&(i=Ta(i)),i.charAt(1)==="="&&(g=vs(f,i)+(sn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||wc)return!isNaN(f*i)&&i!==""?(g=new En(this._pt,e,t,+f||0,i-(f||0),typeof h=="boolean"?y_:Xd,0,d),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!h&&!(t in e)&&au(t,i),p_.call(this,e,t,f,i,d,l||kn.stringFilter,c))},m_=function(e,t,n,i,s){if(Pt(e)&&(e=aa(e,s,t,n,i)),!mi(e)||e.style&&e.nodeType||on(e)||dd(e))return $t(e)?aa(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=aa(e[o],s,t,n,i);return a},Gd=function(e,t,n,i,s,a){var o,l,c,u;if(Dn[e]&&(o=new Dn[e]).init(s,o.rawVars?t[e]:m_(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new En(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==ds))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},zi,wc,fu=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,p=e._targets,m=e.parent,M=m&&m.data==="nested"?m.vars.targets:p,v=e._overwrite==="auto"&&!nu,x=e.timeline,R=i.easeReverse||h,w,E,D,S,y,U,I,J,P,k,H,V,q;if(x&&(!f||!s)&&(s="none"),e._ease=Rr(s,ya.ease),e._rEase=R&&(Rr(R)||e._ease),e._from=!x&&!!i.runBackwards,e._from&&(e.ratio=1),!x||f&&!i.stagger){if(J=p[0]?wr(p[0]).harness:0,V=J&&i[J.prop],w=zo(i,ou),_&&(_._zTime<0&&_.progress(1),t<0&&u&&o&&!d?_.render(-1,!0):_.revert(u&&g?Ao:Gm),_._lazy=0),a){if(tr(e._startAt=Ot.set(p,Hn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&yn(l),startAt:null,delay:0,onUpdate:c&&function(){return On(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Jt||!o&&!d)&&e._startAt.revert(Ao),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(o=!1),D=Hn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&yn(l),immediateRender:o,stagger:0,parent:m},w),V&&(D[J.prop]=V),tr(e._startAt=Ot.set(p,D)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Jt?e._startAt.revert(Ao):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,mt,mt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&yn(l)||l&&!g,E=0;E<p.length;E++){if(y=p[E],I=y._gsap||cu(p)[E]._gsap,e._ptLookup[E]=k={},yc[I.id]&&$i.length&&Bo(),H=M===p?E:M.indexOf(y),J&&(P=new J).init(y,V||w,e,H,M)!==!1&&(e._pt=S=new En(e._pt,y,P.name,0,1,P.render,P,0,P.priority),P._props.forEach(function($){k[$]=S}),P.priority&&(U=1)),!J||V)for(D in w)Dn[D]&&(P=Gd(D,w,e,H,y,M))?P.priority&&(U=1):k[D]=S=hu.call(e,y,D,"get",w[D],H,M,0,i.stringFilter);e._op&&e._op[E]&&e.kill(y,e._op[E]),v&&e._pt&&(zi=e,wt.killTweensOf(y,k,e.globalTime(t)),q=!e.parent,zi=0),e._pt&&l&&(yc[I.id]=1)}U&&Yd(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!q,f&&t<=0&&x.render(Kn,!0,!0)},__=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,d;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(u=f[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return wc=1,e.vars[t]="+=0",fu(e,o),wc=0,l?Ma(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,h.e&&(h.e=Lt(n)+sn(h.e)),h.b&&(h.b=u.s+sn(h.b))},g_=function(e,t){var n=e[0]?wr(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=As({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},v_=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(on(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},aa=function(e,t,n,i,s){return Pt(e)?e.call(t,n,i,s):$t(e)&&~e.indexOf("random(")?Ta(e):e},Vo=lu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Vd={};Mn(Vo+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Vd[r]=1});Vo=Vo.split(",");var Ot=function(r){hd(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:ra(i))||this;var l=o.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||wt,M=(on(n)||dd(n)?Li(n[0]):"length"in i)?[n]:Jn(n),v,x,R,w,E,D,S,y;if(o._targets=M.length?cu(M):Ma("GSAP target "+n+" not found. https://gsap.com",!kn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||f||Ha(c)||Ha(u)){i=o.vars;var U=i.easeReverse||i.yoyoEase;if(v=o.timeline=new xn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:M}),v.kill(),v.parent=v._dp=Ti(o),v._start=0,f||Ha(c)||Ha(u)){if(w=M.length,S=f&&Pd(f),mi(f))for(E in f)~Vo.indexOf(E)&&(y||(y={}),y[E]=f[E]);for(x=0;x<w;x++)R=zo(i,Vd),R.stagger=0,U&&(R.easeReverse=U),y&&As(R,y),D=M[x],R.duration=+aa(c,Ti(o),x,D,M),R.delay=(+aa(u,Ti(o),x,D,M)||0)-o._delay,!f&&w===1&&R.delay&&(o._delay=u=R.delay,o._start+=u,R.delay=0),v.to(D,R,S?S(x,D,M):0),v._ease=st.none;v.duration()?c=u=0:o.timeline=0}else if(g){ra(Hn(v.vars.defaults,{ease:"none"})),v._ease=Rr(g.ease||i.ease||"none");var I=0,J,P,k;if(on(g))g.forEach(function(H){return v.to(M,H,">")}),v.duration();else{R={};for(E in g)E==="ease"||E==="easeEach"||v_(E,g[E],R,g.easeEach);for(E in R)for(J=R[E].sort(function(H,V){return H.t-V.t}),I=0,x=0;x<J.length;x++)P=J[x],k={ease:P.e,duration:(P.t-(x?J[x-1].t:0))/100*c},k[E]=P.v,v.to(M,k,I),I+=k.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||o.duration(c=v.duration())}else o.timeline=0;return d===!0&&!nu&&(zi=Ti(o),wt.killTweensOf(M),zi=0),ui(m,Ti(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!c&&!g&&o._start===bt(m._time)&&yn(h)&&$m(Ti(o))&&m.data!=="nested")&&(o._tTime=-mt,o.render(Math.max(0,-u)||0)),p&&wd(Ti(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-mt&&!u?l:i<mt?0:i,f,d,g,_,p,m,M,v;if(!c)Jm(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,a);if(f=bt(h%_),h===l?(g=this._repeat,f=c):(p=bt(h/_),g=~~p,g&&g===p?(f=c,g--):f>c&&(f=c)),m=this._yoyo&&g&1,m&&(f=c-f),p=Rs(this._tTime,_),f===o&&!a&&this._initted&&g===p)return this._tTime=h,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==_&&this._initted&&(this._lock=a=1,this.render(bt(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Ad(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var x=f<o;if(x!==this._inv){var R=x?o:c-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=R?(x?-1:1)/R:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=M=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=M=this._ease(f/c);if(this._from&&(this.ratio=M=1-M),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&h&&!s&&!p&&(On(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Mc(this,i,s,a),On(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&On(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Mc(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&tr(this,1),!s&&!(u&&!o)&&(h||o||m)&&(On(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){ba||In.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||fu(this,c),u=this._ease(c/this._dur),__(this,i,s,a,o,u,c,l)?this.resetTo(i,s,a,o,1):(al(this,0),this.parent||Td(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Zs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Jt),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,zi&&zi.vars.overwrite!==!0)._first||Zs(this),this.parent&&a!==this.timeline.totalDuration()&&Cs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Jn(i):o,c=this._ptLookup,u=this._pt,h,f,d,g,_,p,m;if((!s||s==="all")&&qm(o,l))return s==="all"&&(this._pt=0),Zs(this);for(h=this._op=this._op||[],s!=="all"&&($t(s)&&(_={},Mn(s,function(M){return _[M]=1}),s=_),s=g_(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){f=c[m],s==="all"?(h[m]=s,g=f,d={}):(d=h[m]=h[m]||{},g=s);for(_ in g)p=f&&f[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&rl(this,p,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Zs(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return sa(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return sa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return wt.killTweensOf(i,s,a)},e}(wa);Hn(Ot.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Mn("staggerTo,staggerFrom,staggerFromTo",function(r){Ot[r]=function(){var e=new xn,t=Ec.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var du=function(e,t,n){return e[t]=n},Wd=function(e,t,n){return e[t](n)},x_=function(e,t,n,i){return e[t](i.fp,n)},S_=function(e,t,n){return e.setAttribute(t,n)},pu=function(e,t){return Pt(e[t])?Wd:iu(e[t])&&e.setAttribute?S_:du},Xd=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},y_=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},qd=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},mu=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},M_=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},E_=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?rl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},T_=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Yd=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},En=function(){function r(t,n,i,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Xd,this.d=l||this,this.set=c||du,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=T_,this.m=n,this.mt=s,this.tween=i},r}();Mn(lu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return ou[r]=1});zn.TweenMax=zn.TweenLite=Ot;zn.TimelineLite=zn.TimelineMax=xn;wt=new xn({sortChildren:!1,defaults:ya,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});kn.stringFilter=Bd;var Cr=[],Co={},b_=[],th=0,w_=0,Tl=function(e){return(Co[e]||b_).map(function(t){return t()})},Aa=function(){var e=Date.now(),t=[];e-th>2&&(Tl("matchMediaInit"),Cr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=oi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Tl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),th=e,Tl("matchMedia"))},$d=function(){function r(t,n){this.selector=n&&Tc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=w_++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Pt(n)&&(s=i,i=n,n=Pt);var a=this,o=function(){var c=Mt,u=a.selector,h;return c&&c!==a&&c.data.push(a),s&&(a.selector=Tc(s)),Mt=a,h=i.apply(a,arguments),Pt(h)&&a._r.push(h),Mt=c,a.selector=u,a.isReverted=!1,h};return a.last=o,n===Pt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=Mt;Mt=null,n(this),Mt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ot&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof xn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ot)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=Cr.length;a--;)Cr[a].id===this.id&&Cr.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(Aa):o.removeEventListener("change",Aa)}),this._mqs=null}},e.revert=function(n){this.kill(n||{})},r}(),A_=function(){function r(t){this.contexts=[],this.scope=t,Mt&&Mt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){mi(n)||(n={matches:n});var a=new $d(0,s||this.scope),o=a.conditions={},l,c,u;Mt&&!a.selector&&(a.selector=Mt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=oi.matchMedia(n[c]),l&&(Cr.indexOf(a)<0&&Cr.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Aa):l.addEventListener("change",Aa),(a._mqs||(a._mqs=[])).push(l)));return u&&i(a,function(h){return a.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Wo={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Od(i)})},timeline:function(e){return new xn(e)},getTweensOf:function(e,t){return wt.getTweensOf(e,t)},getProperty:function(e,t,n,i){$t(e)&&(e=Jn(e)[0]);var s=wr(e||{}).get,a=n?Ed:Md;return n==="native"&&(n=""),e&&(t?a((Dn[t]&&Dn[t].get||s)(e,t,n,i)):function(o,l,c){return a((Dn[o]&&Dn[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=Jn(e),e.length>1){var i=e.map(function(u){return wn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var a=Dn[t],o=wr(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var h=new a;ds._pt=0,h.init(e,n?u+n:u,ds,0,[e]),h.render(1,h),ds._pt&&mu(1,ds)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var i,s=wn.to(e,Hn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return wt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Rr(e.ease,ya.ease)),Ju(ya,e||{})},config:function(e){return Ju(kn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Dn[o]&&!zn[o]&&Ma(t+" effect requires "+o+" plugin.")}),Sl[t]=function(o,l,c){return n(Jn(o),Hn(l||{},s),c)},a&&(xn.prototype[t]=function(o,l,c){return this.add(Sl[t](o,mi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){st[e]=Rr(t)},parseEase:function(e,t){return arguments.length?Rr(e,t):st},getById:function(e){return wt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new xn(e),i,s;for(n.smoothChildTiming=yn(e.smoothChildTiming),wt.remove(n),n._dp=0,n._time=n._tTime=wt._time,i=wt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Ot&&i.vars.onComplete===i._targets[0]))&&ui(n,i,i._start-i._delay),i=s;return ui(wt,n,0),n},context:function(e,t){return e?new $d(e,t):Mt},matchMedia:function(e){return new A_(e)},matchMediaRefresh:function(){return Cr.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Aa()},addEventListener:function(e,t){var n=Co[e]||(Co[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Co[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:r_,wrapYoyo:s_,distribute:Pd,random:Dd,snap:Ld,normalize:i_,getUnit:sn,clamp:Qm,splitColor:Fd,toArray:Jn,selector:Tc,mapRange:Nd,pipe:t_,unitize:n_,interpolate:a_,shuffle:Cd},install:gd,effects:Sl,ticker:In,updateRoot:xn.updateRoot,plugins:Dn,globalTimeline:wt,core:{PropTween:En,globals:vd,Tween:Ot,Timeline:xn,Animation:wa,getCache:wr,_removeLinkedListItem:rl,reverting:function(){return Jt},context:function(e){return e&&Mt&&(Mt.data.push(e),e._ctx=Mt),Mt},suppressOverwrites:function(e){return nu=e}}};Mn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Wo[r]=Ot[r]});In.add(xn.updateRoot);ds=Wo.to({},{duration:0});var R_=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},C_=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=R_(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},bl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if($t(s)&&(l={},Mn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}C_(o,s)}}}},wn=Wo.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Jt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},bl("roundProps",bc),bl("modifiers"),bl("snap",Ld))||Wo;Ot.version=xn.version=wn.version="3.15.1";_d=1;ru()&&Ps();st.Power0;st.Power1;st.Power2;st.Power3;st.Power4;st.Linear;st.Quad;st.Cubic;st.Quart;st.Quint;st.Strong;st.Elastic;st.Back;st.SteppedEase;st.Bounce;st.Sine;st.Expo;st.Circ;/*!
 * CSSPlugin 3.15.1
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var nh,Hi,xs,_u,Er,ih,gu,P_=function(){return typeof window<"u"},Di={},_r=180/Math.PI,Ss=Math.PI/180,Wr=Math.atan2,rh=1e8,vu=/([A-Z])/g,L_=/(left|right|width|margin|padding|x)/i,D_=/[\s,\(]\S/,hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ac=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},U_=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},N_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},I_=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},O_=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Kd=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Jd=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},F_=function(e,t,n){return e.style[t]=n},k_=function(e,t,n){return e.style.setProperty(t,n)},B_=function(e,t,n){return e._gsap[t]=n},z_=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},H_=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},G_=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},At="transform",Tn=At+"Origin",V_=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in Di&&s){if(this.tfm=this.tfm||{},e!=="transform")e=hi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=bi(i,o)}):this.tfm[e]=a.x?a[e]:bi(i,e),e===Tn&&(this.tfm.zOrigin=a.zOrigin);else return hi.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(At)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Tn,t,"")),e=At}(s||t)&&this.props.push(e,t,s[e])},Zd=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},W_=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(vu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=gu(),(!s||!s.isStart)&&!n[At]&&(Zd(n),i.zOrigin&&n[Tn]&&(n[Tn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},jd=function(e,t){var n={target:e,props:[],revert:W_,save:V_};return e._gsap||wn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Qd,Rc=function(e,t){var n=Hi.createElementNS?Hi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Hi.createElement(e);return n&&n.style?n:Hi.createElement(e)},Fn=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(vu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Ls(t)||t,1)||""},sh="O,Moz,ms,Ms,Webkit".split(","),Ls=function(e,t,n){var i=t||Er,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(sh[a]+e in s););return a<0?null:(a===3?"ms":a>=0?sh[a]:"")+e},Cc=function(){P_()&&window.document&&(nh=window,Hi=nh.document,xs=Hi.documentElement,Er=Rc("div")||{style:{}},Rc("div"),At=Ls(At),Tn=At+"Origin",Er.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Qd=!!Ls("perspective"),gu=wn.core.reverting,_u=1)},ah=function(e){var t=e.ownerSVGElement,n=Rc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),xs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),xs.removeChild(n),s},oh=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},ep=function(e){var t,n;try{t=e.getBBox()}catch{t=ah(e),n=1}return t&&(t.width||t.height)||n||(t=ah(e)),t&&!t.width&&!t.x&&!t.y?{x:+oh(e,["x","cx","x1"])||0,y:+oh(e,["y","cy","y1"])||0,width:0,height:0}:t},tp=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&ep(e))},nr=function(e,t){if(t){var n=e.style,i;t in Di&&t!==Tn&&(t=At),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(vu,"-$1").toLowerCase())):n.removeAttribute(t)}},Gi=function(e,t,n,i,s,a){var o=new En(e._pt,t,n,0,1,a?Jd:Kd);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},lh={deg:1,rad:1,turn:1},X_={grid:1,flex:1},ir=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Er.style,l=L_.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,p,m;if(i===a||!s||lh[i]||lh[a])return s;if(a!=="px"&&!f&&(s=r(e,t,n,"px")),m=e.getCTM&&tp(e),(d||a==="%")&&(Di[t]||~t.indexOf("adius")))return g=m?e.getBBox()[l?"width":"height"]:e[u],Lt(d?s/g*h:s/100*g);if(o[l?"width":"height"]=h+(f?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Hi||!_.appendChild)&&(_=Hi.body),p=_._gsap,p&&d&&p.width&&l&&p.time===In.time&&!p.uncache)return Lt(s/p.width*h);if(d&&(t==="height"||t==="width")){var M=e.style[t];e.style[t]=h+i,g=e[u],M?e.style[t]=M:nr(e,t)}else(d||a==="%")&&!X_[Fn(_,"display")]&&(o.position=Fn(e,"position")),_===e&&(o.position="static"),_.appendChild(Er),g=Er[u],_.removeChild(Er),o.position="absolute";return l&&d&&(p=wr(_),p.time=In.time,p.width=_[u]),Lt(f?g*s/h:g&&s?h/g*s:0)},bi=function(e,t,n,i){var s;return _u||Cc(),t in hi&&t!=="transform"&&(t=hi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Di[t]&&t!=="transform"?(s=Ca(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:qo(Fn(e,Tn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Xo[t]&&Xo[t](e,t,n)||Fn(e,t)||Sd(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ir(e,t,s,n)+n:s},q_=function(e,t,n,i){if(!n||n==="none"){var s=Ls(t,e,1),a=s&&Fn(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Fn(e,"borderTopColor"))}var o=new En(this._pt,e.style,t,0,1,qd),l=0,c=0,u,h,f,d,g,_,p,m,M,v,x,R;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Fn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=Fn(e,t)||i,_?e.style[t]=_:nr(e,t)),u=[n,i],Bd(u),n=u[0],i=u[1],f=n.match(fs)||[],R=i.match(fs)||[],R.length){for(;h=fs.exec(i);)p=h[0],M=i.substring(l,h.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),p!==(_=f[c++]||"")&&(d=parseFloat(_)||0,x=_.substr((d+"").length),p.charAt(1)==="="&&(p=vs(d,p)+x),m=parseFloat(p),v=p.substr((m+"").length),l=fs.lastIndex-v.length,v||(v=v||kn.units[t]||x,l===i.length&&(i+=v,o.e+=v)),x!==v&&(d=ir(e,t,_,v)||0),o._pt={_next:o._pt,p:M||c===1?M:",",s:d,c:m-d,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Jd:Kd;return md.test(i)&&(o.e=0),this._pt=o,o},ch={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Y_=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=ch[n]||n,t[1]=ch[i]||i,t.join(" ")},$_=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Di[o]&&(l=1,o=o==="transformOrigin"?Tn:At),nr(n,o);l&&(nr(n,At),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ca(n,1),a.uncache=1,Zd(i)))}},Xo={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new En(e._pt,t,n,0,0,$_);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Ra=[1,0,0,1,0,0],np={},ip=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},uh=function(e){var t=Fn(e,At);return ip(t)?Ra:t.substr(7).match(pd).map(Lt)},xu=function(e,t){var n=e._gsap||wr(e),i=e.style,s=uh(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ra:s):(s===Ra&&!e.offsetParent&&e!==xs&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,xs.appendChild(e)),s=uh(e),l?i.display=l:nr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):xs.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Pc=function(e,t,n,i,s,a){var o=e._gsap,l=s||xu(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,d=l[0],g=l[1],_=l[2],p=l[3],m=l[4],M=l[5],v=t.split(" "),x=parseFloat(v[0])||0,R=parseFloat(v[1])||0,w,E,D,S;n?l!==Ra&&(E=d*p-g*_)&&(D=x*(p/E)+R*(-_/E)+(_*M-p*m)/E,S=x*(-g/E)+R*(d/E)-(d*M-g*m)/E,x=D,R=S):(w=ep(e),x=w.x+(~v[0].indexOf("%")?x/100*w.width:x),R=w.y+(~(v[1]||v[0]).indexOf("%")?R/100*w.height:R)),i||i!==!1&&o.smooth?(m=x-c,M=R-u,o.xOffset=h+(m*d+M*_)-m,o.yOffset=f+(m*g+M*p)-M):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=R,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Tn]="0px 0px",a&&(Gi(a,o,"xOrigin",c,x),Gi(a,o,"yOrigin",u,R),Gi(a,o,"xOffset",h,o.xOffset),Gi(a,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+R)},Ca=function(e,t){var n=e._gsap||new Hd(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Fn(e,Tn)||"0",u,h,f,d,g,_,p,m,M,v,x,R,w,E,D,S,y,U,I,J,P,k,H,V,q,$,C,Q,ae,Y,j,le;return u=h=f=_=p=m=M=v=x=0,d=g=1,n.svg=!!(e.getCTM&&tp(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[At]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[At]!=="none"?l[At]:"")),i.scale=i.rotate=i.translate="none"),E=xu(e,n.svg),n.svg&&(n.uncache?(q=e.getBBox(),c=n.xOrigin-q.x+"px "+(n.yOrigin-q.y)+"px",V=""):V=!t&&e.getAttribute("data-svg-origin"),Pc(e,V||c,!!V||n.originIsAbsolute,n.smooth!==!1,E)),R=n.xOrigin||0,w=n.yOrigin||0,E!==Ra&&(U=E[0],I=E[1],J=E[2],P=E[3],u=k=E[4],h=H=E[5],E.length===6?(d=Math.sqrt(U*U+I*I),g=Math.sqrt(P*P+J*J),_=U||I?Wr(I,U)*_r:0,M=J||P?Wr(J,P)*_r+_:0,M&&(g*=Math.abs(Math.cos(M*Ss))),n.svg&&(u-=R-(R*U+w*J),h-=w-(R*I+w*P))):(le=E[6],Y=E[7],C=E[8],Q=E[9],ae=E[10],j=E[11],u=E[12],h=E[13],f=E[14],D=Wr(le,ae),p=D*_r,D&&(S=Math.cos(-D),y=Math.sin(-D),V=k*S+C*y,q=H*S+Q*y,$=le*S+ae*y,C=k*-y+C*S,Q=H*-y+Q*S,ae=le*-y+ae*S,j=Y*-y+j*S,k=V,H=q,le=$),D=Wr(-J,ae),m=D*_r,D&&(S=Math.cos(-D),y=Math.sin(-D),V=U*S-C*y,q=I*S-Q*y,$=J*S-ae*y,j=P*y+j*S,U=V,I=q,J=$),D=Wr(I,U),_=D*_r,D&&(S=Math.cos(D),y=Math.sin(D),V=U*S+I*y,q=k*S+H*y,I=I*S-U*y,H=H*S-k*y,U=V,k=q),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=Lt(Math.sqrt(U*U+I*I+J*J)),g=Lt(Math.sqrt(H*H+le*le)),D=Wr(k,H),M=Math.abs(D)>2e-4?D*_r:0,x=j?1/(j<0?-j:j):0),n.svg&&(V=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!ip(Fn(e,At)),V&&e.setAttribute("transform",V))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Lt(d),n.scaleY=Lt(g),n.rotation=Lt(_)+o,n.rotationX=Lt(p)+o,n.rotationY=Lt(m)+o,n.skewX=M+o,n.skewY=v+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Tn]=qo(c)),n.xOffset=n.yOffset=0,n.force3D=kn.force3D,n.renderTransform=n.svg?J_:Qd?rp:K_,n.uncache=0,n},qo=function(e){return(e=e.split(" "))[0]+" "+e[1]},wl=function(e,t,n){var i=sn(t);return Lt(parseFloat(t)+parseFloat(ir(e,"x",n+"px",i)))+i},K_=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,rp(e,t)},cr="0deg",Gs="0px",ur=") ",rp=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,M=n.target,v=n.zOrigin,x="",R=m==="auto"&&e&&e!==1||m===!0;if(v&&(h!==cr||u!==cr)){var w=parseFloat(u)*Ss,E=Math.sin(w),D=Math.cos(w),S;w=parseFloat(h)*Ss,S=Math.cos(w),a=wl(M,a,E*S*-v),o=wl(M,o,-Math.sin(w)*-v),l=wl(M,l,D*S*-v+v)}p!==Gs&&(x+="perspective("+p+ur),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(R||a!==Gs||o!==Gs||l!==Gs)&&(x+=l!==Gs||R?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ur),c!==cr&&(x+="rotate("+c+ur),u!==cr&&(x+="rotateY("+u+ur),h!==cr&&(x+="rotateX("+h+ur),(f!==cr||d!==cr)&&(x+="skew("+f+", "+d+ur),(g!==1||_!==1)&&(x+="scale("+g+", "+_+ur),M.style[At]=x||"translate(0, 0)"},J_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,M=n.forceCSS,v=parseFloat(a),x=parseFloat(o),R,w,E,D,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ss,c*=Ss,R=Math.cos(l)*h,w=Math.sin(l)*h,E=Math.sin(l-c)*-f,D=Math.cos(l-c)*f,c&&(u*=Ss,S=Math.tan(c-u),S=Math.sqrt(1+S*S),E*=S,D*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),R*=S,w*=S)),R=Lt(R),w=Lt(w),E=Lt(E),D=Lt(D)):(R=h,D=f,w=E=0),(v&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(v=ir(d,"x",a,"px"),x=ir(d,"y",o,"px")),(g||_||p||m)&&(v=Lt(v+g-(g*R+_*E)+p),x=Lt(x+_-(g*w+_*D)+m)),(i||s)&&(S=d.getBBox(),v=Lt(v+i/100*S.width),x=Lt(x+s/100*S.height)),S="matrix("+R+","+w+","+E+","+D+","+v+","+x+")",d.setAttribute("transform",S),M&&(d.style[At]=S)},Z_=function(e,t,n,i,s){var a=360,o=$t(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?_r:1),c=l-i,u=i+c+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),h==="cw"&&c<0?c=(c+a*rh)%a-~~(c/a)*a:h==="ccw"&&c>0&&(c=(c-a*rh)%a-~~(c/a)*a)),e._pt=f=new En(e._pt,t,n,i,c,U_),f.e=u,f.u="deg",e._props.push(n),f},hh=function(e,t){for(var n in t)e[n]=t[n];return e},j_=function(e,t,n){var i=hh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,h,f,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[At]=t,o=Ca(n,1),nr(n,At),n.setAttribute("transform",c)):(c=getComputedStyle(n)[At],a[At]=t,o=Ca(n,1),a[At]=c);for(l in Di)c=i[l],u=o[l],c!==u&&s.indexOf(l)<0&&(d=sn(c),g=sn(u),h=d!==g?ir(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new En(e._pt,o,l,h,f-h,Ac),e._pt.u=g||0,e._props.push(l));hh(o,i)};Mn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Xo[e>1?"border"+r:r]=function(o,l,c,u,h){var f,d;if(arguments.length<4)return f=a.map(function(g){return bi(o,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},a.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),o.init(l,d,h)}});var sp={name:"css",register:Cc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,h,f,d,g,_,p,m,M,v,x,R,w,E,D,S;_u||Cc(),this.styles=this.styles||jd(e),D=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Dn[_]&&Gd(_,t,n,i,e,s)))){if(d=typeof u,g=Xo[_],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Ta(u)),g)g(this,e,_,u,n)&&(E=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",Ki.lastIndex=0,Ki.test(c)||(p=sn(c),m=sn(u),m?p!==m&&(c=ir(e,_,c,m)+m):p&&(u+=p)),this.add(o,"setProperty",c,u,i,s,0,0,_),a.push(_),D.push(_,0,o[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],$t(c)&&~c.indexOf("random(")&&(c=Ta(c)),sn(c+"")||c==="auto"||(c+=kn.units[_]||sn(bi(e,_))||""),(c+"").charAt(1)==="="&&(c=bi(e,_))):c=bi(e,_),f=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),h=parseFloat(u),_ in hi&&(_==="autoAlpha"&&(f===1&&bi(e,"visibility")==="hidden"&&h&&(f=0),D.push("visibility",0,o.visibility),Gi(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=hi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in Di,v){if(this.styles.save(_),S=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Fn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var y=e.style.perspective;e.style.perspective=u,u=Fn(e,"perspective"),y?e.style.perspective=y:nr(e,"perspective")}h=parseFloat(u)}if(x||(R=e._gsap,R.renderTransform&&!t.parseTransform||Ca(e,t.parseTransform),w=t.smoothOrigin!==!1&&R.smooth,x=this._pt=new En(this._pt,o,At,0,1,R.renderTransform,R,0,-1),x.dep=1),_==="scale")this._pt=new En(this._pt,R,"scaleY",R.scaleY,(M?vs(R.scaleY,M+h):h)-R.scaleY||0,Ac),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){D.push(Tn,0,o[Tn]),u=Y_(u),R.svg?Pc(e,u,0,w,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==R.zOrigin&&Gi(this,R,"zOrigin",R.zOrigin,m),Gi(this,o,_,qo(c),qo(u)));continue}else if(_==="svgOrigin"){Pc(e,u,1,w,0,this);continue}else if(_ in np){Z_(this,R,_,f,M?vs(f,M+u):u);continue}else if(_==="smoothOrigin"){Gi(this,R,"smooth",R.smooth,u);continue}else if(_==="force3D"){R[_]=u;continue}else if(_==="transform"){j_(this,u,e);continue}}else _ in o||(_=Ls(_)||_);if(v||(h||h===0)&&(f||f===0)&&!D_.test(u)&&_ in o)p=(c+"").substr((f+"").length),h||(h=0),m=sn(u)||(_ in kn.units?kn.units[_]:p),p!==m&&(f=ir(e,_,c,m)),this._pt=new En(this._pt,v?R:o,_,f,(M?vs(f,M+h):h)-f,!v&&(m==="px"||_==="zIndex")&&t.autoRound!==!1?O_:Ac),this._pt.u=m||0,v&&S!==u?(this._pt.b=c,this._pt.e=S,this._pt.r=I_):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=N_);else if(_ in o)q_.call(this,e,_,c,M?M+u:u);else if(_ in e)this.add(e,_,c||e[_],M?M+u:u,i,s);else if(_!=="parseTransform"){au(_,u);continue}v||(_ in o?D.push(_,0,o[_]):typeof e[_]=="function"?D.push(_,2,e[_]()):D.push(_,1,c||e[_])),a.push(_)}}E&&Yd(this)},render:function(e,t){if(t.tween._time||!gu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:bi,aliases:hi,getSetter:function(e,t,n){var i=hi[t];return i&&i.indexOf(",")<0&&(t=i),t in Di&&t!==Tn&&(e._gsap.x||bi(e,"x"))?n&&ih===n?t==="scale"?z_:B_:(ih=n||{})&&(t==="scale"?H_:G_):e.style&&!iu(e.style[t])?F_:~t.indexOf("-")?k_:pu(e,t)},core:{_removeProperty:nr,_getMatrix:xu}};wn.utils.checkPrefix=Ls;wn.core.getStyleSaver=jd;(function(r,e,t,n){var i=Mn(r+","+e+","+t,function(s){Di[s]=1});Mn(e,function(s){kn.units[s]="deg",np[s]=1}),hi[i[13]]=r+","+e,Mn(n,function(s){var a=s.split(":");hi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Mn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){kn.units[r]="px"});wn.registerPlugin(sp);var ol=wn.registerPlugin(sp)||wn;ol.core.Tween;function Q_(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function eg(r,e,t){return e&&Q_(r.prototype,e),r}/*!
 * Observer 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Kt,Po,Sn,Vi,Wi,ys,ap,gr,Ms,op,Ri,ti,lp,cp=function(){return Kt||typeof window<"u"&&(Kt=window.gsap)&&Kt.registerPlugin&&Kt},up=1,ps=[],je=[],di=[],oa=Date.now,Lc=function(e,t){return t},tg=function(){var e=Ms.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,je),i.push.apply(i,di),je=n,di=i,Lc=function(a,o){return t[a](o)}},Ji=function(e,t){return~di.indexOf(e)&&di[di.indexOf(e)+1][t]},la=function(e){return!!~op.indexOf(e)},un=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ga="scrollLeft",Va="scrollTop",Dc=function(){return Ri&&Ri.isPressed||je.cache++},Yo=function(e,t){var n=function i(s){if(s||s===0){up&&Sn.history.scrollRestoration!=="manual"&&(Sn.history.scrollRestoration="manual");var a=Ri&&Ri.isPressed;s=i.v=Math.round(s)||(Ri&&Ri.iOS?1:0),e(s),i.cacheID=je.cache,a&&Lc("ss",s)}else(t||je.cache!==i.cacheID||Lc("ref"))&&(i.cacheID=je.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},_n={s:Ga,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Yo(function(r){return arguments.length?Sn.scrollTo(r,zt.sc()):Sn.pageXOffset||Vi[Ga]||Wi[Ga]||ys[Ga]||0})},zt={s:Va,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:_n,sc:Yo(function(r){return arguments.length?Sn.scrollTo(_n.sc(),r):Sn.pageYOffset||Vi[Va]||Wi[Va]||ys[Va]||0})},vn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Kt.utils.toArray)(e)[0]||(typeof e=="string"&&Kt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},ng=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},rr=function(e,t){var n=t.s,i=t.sc;la(e)&&(e=Vi.scrollingElement||Wi);var s=je.indexOf(e),a=i===zt.sc?1:2;!~s&&(s=je.push(e)-1),je[s+a]||un(e,"scroll",Dc);var o=je[s+a],l=o||(je[s+a]=Yo(Ji(e,n),!0)||(la(e)?i:Yo(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Kt.getProperty(e,"scrollBehavior")==="smooth"),l},Uc=function(e,t,n){var i=e,s=e,a=oa(),o=a,l=t||50,c=Math.max(500,l*3),u=function(g,_){var p=oa();_||p-a>l?(s=i,i=g,o=a,a=p):n?i+=g:i=s+(g-s)/(p-o)*(a-o)},h=function(){s=i=n?0:i,o=a=0},f=function(g){var _=o,p=s,m=oa();return(g||g===0)&&g!==i&&u(g),a===o||m-o>c?0:(i+(n?p:-p))/((n?m:a)-_)*1e3};return{update:u,reset:h,getVelocity:f}},Vs=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},fh=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},hp=function(){Ms=Kt.core.globals().ScrollTrigger,Ms&&Ms.core&&tg()},fp=function(e){return Kt=e||cp(),!Po&&Kt&&typeof document<"u"&&document.body&&(Sn=window,Vi=document,Wi=Vi.documentElement,ys=Vi.body,op=[Sn,Vi,Wi,ys],Kt.utils.clamp,lp=Kt.core.context||function(){},gr="onpointerenter"in ys?"pointer":"mouse",ap=Dt.isTouch=Sn.matchMedia&&Sn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Sn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ti=Dt.eventTypes=("ontouchstart"in Wi?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Wi?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return up=0},500),Po=1),Ms||hp(),Po};_n.op=zt;je.cache=0;var Dt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Po||fp(Kt)||console.warn("Please gsap.registerPlugin(Observer)"),Ms||hp();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,p=n.onDragStart,m=n.onDragEnd,M=n.onDrag,v=n.onPress,x=n.onRelease,R=n.onRight,w=n.onLeft,E=n.onUp,D=n.onDown,S=n.onChangeX,y=n.onChangeY,U=n.onChange,I=n.onToggleX,J=n.onToggleY,P=n.onHover,k=n.onHoverEnd,H=n.onMove,V=n.ignoreCheck,q=n.isNormalizer,$=n.onGestureStart,C=n.onGestureEnd,Q=n.onWheel,ae=n.onEnable,Y=n.onDisable,j=n.onClick,le=n.scrollSpeed,ye=n.capture,ce=n.allowClicks,Ae=n.lockAxis,Ue=n.onLockAxis;this.target=o=vn(o)||Wi,this.vars=n,d&&(d=Kt.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,le=le||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Sn.getComputedStyle(ys).lineHeight)||22);var Ee,De,L,ee,K,se,Z,F=this,me=0,A=0,T=n.passive||!u&&n.passive!==!1,B=rr(o,_n),ie=rr(o,zt),re=B(),te=ie(),ve=~a.indexOf("touch")&&!~a.indexOf("pointer")&&ti[0]==="pointerdown",_e=la(o),he=o.ownerDocument||Vi,Ce=[0,0,0],Be=[0,0,0],ne=0,nt=function(){return ne=oa()},Ie=function(Te,Oe){return(F.event=Te)&&d&&ng(Te.target,d)||Oe&&ve&&Te.pointerType!=="touch"||V&&V(Te,Oe)},We=function(){F._vx.reset(),F._vy.reset(),De.pause(),h&&h(F)},Pe=function(){var Te=F.deltaX=fh(Ce),Oe=F.deltaY=fh(Be),oe=Math.abs(Te)>=i,He=Math.abs(Oe)>=i;U&&(oe||He)&&U(F,Te,Oe,Ce,Be),oe&&(R&&F.deltaX>0&&R(F),w&&F.deltaX<0&&w(F),S&&S(F),I&&F.deltaX<0!=me<0&&I(F),me=F.deltaX,Ce[0]=Ce[1]=Ce[2]=0),He&&(D&&F.deltaY>0&&D(F),E&&F.deltaY<0&&E(F),y&&y(F),J&&F.deltaY<0!=A<0&&J(F),A=F.deltaY,Be[0]=Be[1]=Be[2]=0),(ee||L)&&(H&&H(F),L&&(p&&L===1&&p(F),M&&M(F),L=0),ee=!1),se&&!(se=!1)&&Ue&&Ue(F),K&&(Q(F),K=!1),Ee=0},Me=function(Te,Oe,oe){Ce[oe]+=Te,Be[oe]+=Oe,F._vx.update(Te),F._vy.update(Oe),c?Ee||(Ee=requestAnimationFrame(Pe)):Pe()},Xe=function(Te,Oe){Ae&&!Z&&(F.axis=Z=Math.abs(Te)>Math.abs(Oe)?"x":"y",se=!0),Z!=="y"&&(Ce[2]+=Te,F._vx.update(Te,!0)),Z!=="x"&&(Be[2]+=Oe,F._vy.update(Oe,!0)),c?Ee||(Ee=requestAnimationFrame(Pe)):Pe()},Qe=function(Te){if(!Ie(Te,1)){Te=Vs(Te,u);var Oe=Te.clientX,oe=Te.clientY,He=Oe-F.x,ke=oe-F.y,Ye=F.isDragging;F.x=Oe,F.y=oe,(Ye||(He||ke)&&(Math.abs(F.startX-Oe)>=s||Math.abs(F.startY-oe)>=s))&&(L||(L=Ye?2:1),Ye||(F.isDragging=!0),Xe(He,ke))}},lt=F.onPress=function(Le){Ie(Le,1)||Le&&Le.button||(F.axis=Z=null,De.pause(),F.isPressed=!0,Le=Vs(Le),me=A=0,F.startX=F.x=Le.clientX,F.startY=F.y=Le.clientY,F._vx.reset(),F._vy.reset(),un(q?o:he,ti[1],Qe,T,!0),F.deltaX=F.deltaY=0,v&&v(F))},Se=F.onRelease=function(Le){if(!Ie(Le,1)){cn(q?o:he,ti[1],Qe,!0);var Te=!isNaN(F.y-F.startY),Oe=F.isDragging,oe=Oe&&(Math.abs(F.x-F.startX)>3||Math.abs(F.y-F.startY)>3),He=Vs(Le);!oe&&Te&&(F._vx.reset(),F._vy.reset(),u&&ce&&Kt.delayedCall(.08,function(){if(oa()-ne>300&&!Le.defaultPrevented){if(Le.target.click)Le.target.click();else if(he.createEvent){var ke=he.createEvent("MouseEvents");ke.initMouseEvent("click",!0,!0,Sn,1,He.screenX,He.screenY,He.clientX,He.clientY,!1,!1,!1,!1,0,null),Le.target.dispatchEvent(ke)}}})),F.isDragging=F.isGesturing=F.isPressed=!1,h&&Oe&&!q&&De.restart(!0),L&&Pe(),m&&Oe&&m(F),x&&x(F,oe)}},ue=function(Te){return Te.touches&&Te.touches.length>1&&(F.isGesturing=!0)&&$(Te,F.isDragging)},N=function(){return(F.isGesturing=!1)||C(F)},fe=function(Te){if(!Ie(Te)){var Oe=B(),oe=ie();Me((Oe-re)*le,(oe-te)*le,1),re=Oe,te=oe,h&&De.restart(!0)}},de=function(Te){if(!Ie(Te)){Te=Vs(Te,u),Q&&(K=!0);var Oe=(Te.deltaMode===1?l:Te.deltaMode===2?Sn.innerHeight:1)*g;Me(Te.deltaX*Oe,Te.deltaY*Oe,0),h&&!q&&De.restart(!0)}},ze=function(Te){if(!Ie(Te)){var Oe=Te.clientX,oe=Te.clientY,He=Oe-F.x,ke=oe-F.y;F.x=Oe,F.y=oe,ee=!0,h&&De.restart(!0),(He||ke)&&Xe(He,ke)}},Fe=function(Te){F.event=Te,P(F)},rt=function(Te){F.event=Te,k(F)},at=function(Te){return Ie(Te)||Vs(Te,u)&&j(F)};De=F._dc=Kt.delayedCall(f||.25,We).pause(),F.deltaX=F.deltaY=0,F._vx=Uc(0,50,!0),F._vy=Uc(0,50,!0),F.scrollX=B,F.scrollY=ie,F.isDragging=F.isGesturing=F.isPressed=!1,lp(this),F.enable=function(Le){return F.isEnabled||(un(_e?he:o,"scroll",Dc),a.indexOf("scroll")>=0&&un(_e?he:o,"scroll",fe,T,ye),a.indexOf("wheel")>=0&&un(o,"wheel",de,T,ye),(a.indexOf("touch")>=0&&ap||a.indexOf("pointer")>=0)&&(un(o,ti[0],lt,T,ye),un(he,ti[2],Se),un(he,ti[3],Se),ce&&un(o,"click",nt,!0,!0),j&&un(o,"click",at),$&&un(he,"gesturestart",ue),C&&un(he,"gestureend",N),P&&un(o,gr+"enter",Fe),k&&un(o,gr+"leave",rt),H&&un(o,gr+"move",ze)),F.isEnabled=!0,F.isDragging=F.isGesturing=F.isPressed=ee=L=!1,F._vx.reset(),F._vy.reset(),re=B(),te=ie(),Le&&Le.type&&lt(Le),ae&&ae(F)),F},F.disable=function(){F.isEnabled&&(ps.filter(function(Le){return Le!==F&&la(Le.target)}).length||cn(_e?he:o,"scroll",Dc),F.isPressed&&(F._vx.reset(),F._vy.reset(),cn(q?o:he,ti[1],Qe,!0)),cn(_e?he:o,"scroll",fe,ye),cn(o,"wheel",de,ye),cn(o,ti[0],lt,ye),cn(he,ti[2],Se),cn(he,ti[3],Se),cn(o,"click",nt,!0),cn(o,"click",at),cn(he,"gesturestart",ue),cn(he,"gestureend",N),cn(o,gr+"enter",Fe),cn(o,gr+"leave",rt),cn(o,gr+"move",ze),F.isEnabled=F.isPressed=F.isDragging=!1,Y&&Y(F))},F.kill=F.revert=function(){F.disable();var Le=ps.indexOf(F);Le>=0&&ps.splice(Le,1),Ri===F&&(Ri=0)},ps.push(F),q&&la(o)&&(Ri=F),F.enable(_)},eg(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Dt.version="3.15.1";Dt.create=function(r){return new Dt(r)};Dt.register=fp;Dt.getAll=function(){return ps.slice()};Dt.getById=function(r){return ps.filter(function(e){return e.vars.id===r})[0]};cp()&&Kt.registerPlugin(Dt);/*!
 * ScrollTrigger 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var be,us,Ze,ft,Un,ct,Su,$o,Pa,ca,Qs,Wa,tn,ll,Nc,dn,dh,ph,hs,dp,Al,pp,fn,Ic,mp,_p,Bi,Oc,yu,Es,Mu,Zi,Fc,Rl,Xa=1,nn=Date.now,Cl=nn(),Zn=0,ea=0,mh=function(e,t,n){var i=Ln(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},_h=function(e,t){return t&&(!Ln(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},ig=function r(){return ea&&requestAnimationFrame(r)},gh=function(){return ll=1},vh=function(){return ll=0},li=function(e){return e},ta=function(e){return Math.round(e*1e5)/1e5||0},gp=function(){return typeof window<"u"},vp=function(){return be||gp()&&(be=window.gsap)&&be.registerPlugin&&be},Fr=function(e){return!!~Su.indexOf(e)},xp=function(e){return(e==="Height"?Mu:Ze["inner"+e])||Un["client"+e]||ct["client"+e]},Sp=function(e){return Ji(e,"getBoundingClientRect")||(Fr(e)?function(){return Io.width=Ze.innerWidth,Io.height=Mu,Io}:function(){return wi(e)})},rg=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=Ji(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?xp(s):e["client"+s])||0}},sg=function(e,t){return!t||~di.indexOf(e)?Sp(e):function(){return Io}},fi=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=Ji(e,n))?a()-Sp(e)()[s]:Fr(e)?(Un[n]||ct[n])-xp(i):e[n]-e["offset"+i])},qa=function(e,t){for(var n=0;n<hs.length;n+=3)(!t||~t.indexOf(hs[n+1]))&&e(hs[n],hs[n+1],hs[n+2])},Ln=function(e){return typeof e=="string"},an=function(e){return typeof e=="function"},na=function(e){return typeof e=="number"},vr=function(e){return typeof e=="object"},Ws=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Xr=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},qr=Math.abs,yp="left",Mp="top",Eu="right",Tu="bottom",Pr="width",Lr="height",ua="Right",ha="Left",fa="Top",da="Bottom",It="padding",Xn="margin",Ds="Width",bu="Height",Bt="px",qn=function(e){return Ze.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},ag=function(e){var t=qn(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},xh=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},wi=function(e,t){var n=t&&qn(e)[Nc]!=="matrix(1, 0, 0, 1, 0, 0)"&&be.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Ko=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Ep=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},og=function(e){return function(t){return be.utils.snap(Ep(e),t)}},wu=function(e){var t=be.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},lg=function(e){return function(t,n){return wu(Ep(e))(t,n.direction)}},Ya=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Xt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Wt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},$a=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Sh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ka={toggleActions:"play",anticipatePin:0},Jo={top:0,left:0,center:.5,bottom:1,right:1},Lo=function(e,t){if(Ln(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Jo?Jo[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Ja=function(e,t,n,i,s,a,o,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,g=ft.createElement("div"),_=Fr(n)||Ji(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=_?ct:n.tagName==="IFRAME"?n.contentDocument.body:n,M=e.indexOf("start")!==-1,v=M?c:u,x="border-color:"+v+";font-size:"+h+";color:"+v+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(x+=(i===zt?Eu:Tu)+":"+(a+parseFloat(f))+"px;"),o&&(x+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=x,g.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(g,m.children[0]):m.appendChild(g),g._offset=g["offset"+i.op.d2],Do(g,0,i,M),g},Do=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+Ds]=1,s["border"+o+Ds]=0,s[n.p]=t+"px",be.set(e,s)},Je=[],kc={},La,yh=function(){return nn()-Zn>34&&(La||(La=requestAnimationFrame(Pi)))},Yr=function(){(!fn||!fn.isPressed||fn.startX>ct.clientWidth)&&(je.cache++,fn?La||(La=requestAnimationFrame(Pi)):Pi(),Zn||Br("scrollStart"),Zn=nn())},Pl=function(){_p=Ze.innerWidth,mp=Ze.innerHeight},ia=function(e){je.cache++,(e===!0||!tn&&!pp&&!ft.fullscreenElement&&!ft.webkitFullscreenElement&&(!Ic||_p!==Ze.innerWidth||Math.abs(Ze.innerHeight-mp)>Ze.innerHeight*.25))&&$o.restart(!0)},kr={},cg=[],Tp=function r(){return Wt(it,"scrollEnd",r)||Tr(!0)},Br=function(e){return kr[e]&&kr[e].map(function(t){return t()})||cg},Pn=[],bp=function(e){for(var t=0;t<Pn.length;t+=5)(!e||Pn[t+4]&&Pn[t+4].query===e)&&(Pn[t].style.cssText=Pn[t+1],Pn[t].getBBox&&Pn[t].setAttribute("transform",Pn[t+2]||""),Pn[t+3].uncache=1)},wp=function(){je.cache++,je.forEach(function(e){return an(e)&&(e.rec=e())})},Au=function(e,t){var n;for(dn=0;dn<Je.length;dn++)n=Je[dn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Zi=!0,t&&bp(t),t||Br("revert")},Ap=function(e,t){je.cache++,(t||!pn)&&je.forEach(function(n){return an(n)&&n.cacheID++&&(n.rec=0)}),Ln(e)&&(yu=e,Ze.history.scrollRestoration!==e&&(Ze.history.scrollRestoration=e))},pn,Dr=0,Mh,ug=function(){if(Mh!==Dr){var e=Mh=Dr;requestAnimationFrame(function(){return e===Dr&&Tr(!0)})}},Rp=function(){ct.appendChild(Es),Mu=!fn&&Es.offsetHeight||Ze.innerHeight,ct.removeChild(Es)},Eh=function(e){return Pa(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Tr=function(e,t){if(Un=ft.documentElement,ct=ft.body,Su=[Ze,ft,Un,ct],Zn&&!e&&!Zi){Xt(it,"scrollEnd",Tp);return}Rp(),pn=it.isRefreshing=!0,Zi||wp();var n=Br("refreshInit");dp&&it.sort(),t||Au(),je.forEach(function(i){an(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Je.slice(0).forEach(function(i){return i.refresh()}),Zi=!1,Je.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),Fc=1,Eh(!0),Je.forEach(function(i){var s=fi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),Eh(!1),Fc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),je.forEach(function(i){an(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Ap(yu,1),$o.pause(),Dr++,pn=2,Pi(2),Je.forEach(function(i){return an(i.vars.onRefresh)&&i.vars.onRefresh(i)}),pn=it.isRefreshing=!1,Br("refresh")},Bc=0,Uo=1,pa,Pi=function(e){if(e===2||!pn&&!Zi){it.isUpdating=!0,pa&&pa.update(0);var t=Je.length,n=nn(),i=n-Cl>=50,s=t&&Je[0].scroll();if(Uo=Bc>s?-1:1,pn||(Bc=s),i&&(Zn&&!ll&&n-Zn>200&&(Zn=0,Br("scrollEnd")),Qs=Cl,Cl=n),Uo<0){for(dn=t;dn-- >0;)Je[dn]&&Je[dn].update(0,i);Uo=1}else for(dn=0;dn<t;dn++)Je[dn]&&Je[dn].update(0,i);it.isUpdating=!1}La=0},zc=[yp,Mp,Tu,Eu,Xn+da,Xn+ua,Xn+fa,Xn+ha,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],No=zc.concat([Pr,Lr,"boxSizing","max"+Ds,"max"+bu,"position",Xn,It,It+fa,It+ua,It+da,It+ha]),hg=function(e,t,n){Ts(n);var i=e._gsap;if(i.spacerIsNative)Ts(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Ll=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=zc.length,a=t.style,o=e.style,l;s--;)l=zc[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[Tu]=o[Eu]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Pr]=Ko(e,_n)+Bt,a[Lr]=Ko(e,zt)+Bt,a[It]=o[Xn]=o[Mp]=o[yp]="0",Ts(i),o[Pr]=o["max"+Ds]=n[Pr],o[Lr]=o["max"+bu]=n[Lr],o[It]=n[It],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},fg=/([A-Z])/g,Ts=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||be.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(fg,"-$1").toLowerCase())}},Za=function(e){for(var t=No.length,n=e.style,i=[],s=0;s<t;s++)i.push(No[s],n[No[s]]);return i.t=e,i},dg=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},Io={left:0,top:0},Th=function(e,t,n,i,s,a,o,l,c,u,h,f,d,g){an(e)&&(e=e(l)),Ln(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Lo("0"+e.substr(3),n):0));var _=d?d.time():0,p,m,M;if(d&&d.seek(0),isNaN(e)||(e=+e),na(e))d&&(e=be.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),o&&Do(o,n,i,!0);else{an(t)&&(t=t(l));var v=(e||"0").split(" "),x,R,w,E;M=vn(t,l)||ct,x=wi(M)||{},(!x||!x.left&&!x.top)&&qn(M).display==="none"&&(E=M.style.display,M.style.display="block",x=wi(M),E?M.style.display=E:M.style.removeProperty("display")),R=Lo(v[0],x[i.d]),w=Lo(v[1]||"0",n),e=x[i.p]-c[i.p]-u+R+s-w,o&&Do(o,w,i,n-w<20||o._isStart&&w>20),n-=n-w}if(g&&(l[g]=e||-.001,e<0&&(e=0)),a){var D=e+n,S=a._isStart;p="scroll"+i.d2,Do(a,D,i,S&&D>20||!S&&(h?Math.max(ct[p],Un[p]):a.parentNode[p])<=D+1),h&&(c=wi(o),h&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Bt))}return d&&M&&(p=wi(M),d.seek(f),m=wi(M),d._caScrollDist=p[i.p]-m[i.p],e=e/d._caScrollDist*f),d&&d.seek(_),d?e:Math.round(e)},pg=/(webkit|moz|length|cssText|inset)/i,bh=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===ct){e._stOrig=s.cssText,o=qn(e);for(a in o)!+a&&!pg.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;be.core.getCache(e).uncache=1,t.appendChild(e)}},Cp=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},ja=function(e,t,n){var i={};i[t.p]="+="+n,be.set(e,i)},wh=function(e,t){var n=rr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,u,h){var f=a.tween,d=l.onComplete,g={};c=c||n();var _=Cp(n,c,function(){f.kill(),a.tween=0});return h=u&&h||0,u=u||o-c,f&&f.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){je.cache++,a.tween&&Pi()},l.onComplete=function(){a.tween=0,d&&d.call(f)},f=a.tween=be.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Xt(e,"wheel",n.wheelHandler),it.isTouch&&Xt(e,"touchmove",n.wheelHandler),s},it=function(){function r(t,n){us||r.register(be)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Oc(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ea){this.update=this.refresh=this.kill=li;return}n=xh(Ln(n)||na(n)||n.nodeType?{trigger:n}:n,Ka);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,M=s.onSnapComplete,v=s.once,x=s.snap,R=s.pinReparent,w=s.pinSpacer,E=s.containerAnimation,D=s.fastScrollEnd,S=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?_n:zt,U=!h&&h!==0,I=vn(n.scroller||Ze),J=be.core.getCache(I),P=Fr(I),k=("pinType"in n?n.pinType:Ji(I,"pinType")||P&&"fixed")==="fixed",H=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],V=U&&n.toggleActions.split(" "),q="markers"in n?n.markers:Ka.markers,$=P?0:parseFloat(qn(I)["border"+y.p2+Ds])||0,C=this,Q=n.onRefreshInit&&function(){return n.onRefreshInit(C)},ae=rg(I,P,y),Y=sg(I,P),j=0,le=0,ye=0,ce=rr(I,y),Ae,Ue,Ee,De,L,ee,K,se,Z,F,me,A,T,B,ie,re,te,ve,_e,he,Ce,Be,ne,nt,Ie,We,Pe,Me,Xe,Qe,lt,Se,ue,N,fe,de,ze,Fe,rt;if(C._startClamp=C._endClamp=!1,C._dir=y,p*=45,C.scroller=I,C.scroll=E?E.time.bind(E):ce,De=ce(),Zi&&ce.rec==null&&(ce.rec=De),C.vars=n,i=i||n.animation,"refreshPriority"in n&&(dp=1,n.refreshPriority===-9999&&(pa=C)),J.tweenScroll=J.tweenScroll||{top:wh(I,zt),left:wh(I,_n)},C.tweenTo=Ae=J.tweenScroll[y.p],C.scrubDuration=function(oe){ue=na(oe)&&oe,ue?Se?Se.duration(oe):Se=be.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ue,paused:!0,onComplete:function(){return m&&m(C)}}):(Se&&Se.progress(1).kill(),Se=0)},i&&(i.vars.lazy=!1,i._initted&&!C.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),C.animation=i.pause(),i.scrollTrigger=C,C.scrubDuration(h),Qe=0,l||(l=i.vars.id)),x&&((!vr(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in ct.style&&be.set(P?[ct,Un]:I,{scrollBehavior:"auto"}),je.forEach(function(oe){return an(oe)&&oe.target===(P?ft.scrollingElement||Un:I)&&(oe.smooth=!1)}),Ee=an(x.snapTo)?x.snapTo:x.snapTo==="labels"?og(i):x.snapTo==="labelsDirectional"?lg(i):x.directional!==!1?function(oe,He){return wu(x.snapTo)(oe,nn()-le<500?0:He.direction)}:be.utils.snap(x.snapTo),N=x.duration||{min:.1,max:2},N=vr(N)?ca(N.min,N.max):ca(N,N),fe=be.delayedCall(x.delay||ue/2||.1,function(){var oe=ce(),He=nn()-le<500,ke=Ae.tween;if((He||Math.abs(C.getVelocity())<10)&&!ke&&!ll&&j!==oe){var Ye=(oe-ee)/B,Tt=i&&!U?i.totalProgress():Ye,et=He?0:(Tt-lt)/(nn()-Qs)*1e3||0,gt=be.utils.clamp(-Ye,1-Ye,qr(et/2)*et/.185),Ft=Ye+(x.inertia===!1?0:gt),xt,vt,ut=x,An=ut.onStart,b=ut.onInterrupt,z=ut.onComplete;if(xt=Ee(Ft,C),na(xt)||(xt=Ft),vt=Math.max(0,Math.round(ee+xt*B)),oe<=K&&oe>=ee&&vt!==oe){if(ke&&!ke._initted&&ke.data<=qr(vt-oe))return;x.inertia===!1&&(gt=xt-Ye),Ae(vt,{duration:N(qr(Math.max(qr(Ft-Tt),qr(xt-Tt))*.185/et/.05||0)),ease:x.ease||"power3",data:qr(vt-oe),onInterrupt:function(){return fe.restart(!0)&&b&&Xr(C,b)},onComplete:function(){C.update(),j=ce(),i&&!U&&(Se?Se.resetTo("totalProgress",xt,i._tTime/i._tDur):i.progress(xt)),Qe=lt=i&&!U?i.totalProgress():C.progress,M&&M(C),z&&Xr(C,z)}},oe,gt*B,vt-oe-gt*B),An&&Xr(C,An,Ae.tween)}}else C.isActive&&j!==oe&&fe.restart(!0)}).pause()),l&&(kc[l]=C),f=C.trigger=vn(f||d!==!0&&d),rt=f&&f._gsap&&f._gsap.stRevert,rt&&(rt=rt(C)),d=d===!0?f:vn(d),Ln(o)&&(o={targets:f,className:o}),d&&(g===!1||g===Xn||(g=!g&&d.parentNode&&d.parentNode.style&&qn(d.parentNode).display==="flex"?!1:It),C.pin=d,Ue=be.core.getCache(d),Ue.spacer?ie=Ue.pinState:(w&&(w=vn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),Ue.spacerIsNative=!!w,w&&(Ue.spacerState=Za(w))),Ue.spacer=ve=w||ft.createElement("div"),ve.classList.add("pin-spacer"),l&&ve.classList.add("pin-spacer-"+l),Ue.pinState=ie=Za(d)),n.force3D!==!1&&be.set(d,{force3D:!0}),C.spacer=ve=Ue.spacer,Xe=qn(d),nt=Xe[g+y.os2],he=be.getProperty(d),Ce=be.quickSetter(d,y.a,Bt),Ll(d,ve,Xe),te=Za(d)),q){A=vr(q)?xh(q,Sh):Sh,F=Ja("scroller-start",l,I,y,A,0),me=Ja("scroller-end",l,I,y,A,0,F),_e=F["offset"+y.op.d2];var at=vn(Ji(I,"content")||I);se=this.markerStart=Ja("start",l,at,y,A,_e,0,E),Z=this.markerEnd=Ja("end",l,at,y,A,_e,0,E),E&&(Fe=be.quickSetter([se,Z],y.a,Bt)),!k&&!(di.length&&Ji(I,"fixedMarkers")===!0)&&(ag(P?ct:I),be.set([F,me],{force3D:!0}),We=be.quickSetter(F,y.a,Bt),Me=be.quickSetter(me,y.a,Bt))}if(E){var Le=E.vars.onUpdate,Te=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){C.update(0,0,1),Le&&Le.apply(E,Te||[])})}if(C.previous=function(){return Je[Je.indexOf(C)-1]},C.next=function(){return Je[Je.indexOf(C)+1]},C.revert=function(oe,He){if(!He)return C.kill(!0);var ke=oe!==!1||!C.enabled,Ye=tn;ke!==C.isReverted&&(ke&&(de=Math.max(ce(),C.scroll.rec||0),ye=C.progress,ze=i&&i.progress()),se&&[se,Z,F,me].forEach(function(Tt){return Tt.style.display=ke?"none":"block"}),ke&&(tn=C,C.update(ke)),d&&(!R||!C.isActive)&&(ke?hg(d,ve,ie):Ll(d,ve,qn(d),Ie)),ke||C.update(ke),tn=Ye,C.isReverted=ke)},C.refresh=function(oe,He,ke,Ye){if(!((tn||!C.enabled)&&!He)){if(d&&oe&&Zn){Xt(r,"scrollEnd",Tp);return}!pn&&Q&&Q(C),tn=C,Ae.tween&&!ke&&(Ae.tween.kill(),Ae.tween=0),Se&&Se.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(qe){return qe.vars.immediateRender&&qe.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),C.isReverted||C.revert(!0,!0),C._subPinOffset=!1;var Tt=ae(),et=Y(),gt=E?E.duration():fi(I,y),Ft=B<=.01||!B,xt=0,vt=Ye||0,ut=vr(ke)?ke.end:n.end,An=n.endTrigger||f,b=vr(ke)?ke.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),z=C.pinnedContainer=n.pinnedContainer&&vn(n.pinnedContainer,C),X=f&&Math.max(0,Je.indexOf(C))||0,W=X,G,pe,we,Ge,Re,Ne,Ve,$e,yt,kt,ht,ln,dt;for(q&&vr(ke)&&(ln=be.getProperty(F,y.p),dt=be.getProperty(me,y.p));W-- >0;)Ne=Je[W],Ne.end||Ne.refresh(0,1)||(tn=C),Ve=Ne.pin,Ve&&(Ve===f||Ve===d||Ve===z)&&!Ne.isReverted&&(kt||(kt=[]),kt.unshift(Ne),Ne.revert(!0,!0)),Ne!==Je[W]&&(X--,W--);for(an(b)&&(b=b(C)),b=mh(b,"start",C),ee=Th(b,f,Tt,y,ce(),se,F,C,et,$,k,gt,E,C._startClamp&&"_startClamp")||(d?-.001:0),an(ut)&&(ut=ut(C)),Ln(ut)&&!ut.indexOf("+=")&&(~ut.indexOf(" ")?ut=(Ln(b)?b.split(" ")[0]:"")+ut:(xt=Lo(ut.substr(2),Tt),ut=Ln(b)?b:(E?be.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,ee):ee)+xt,An=f)),ut=mh(ut,"end",C),K=Math.max(ee,Th(ut||(An?"100% 0":gt),An,Tt,y,ce()+xt,Z,me,C,et,$,k,gt,E,C._endClamp&&"_endClamp"))||-.001,xt=0,W=X;W--;)Ne=Je[W]||{},Ve=Ne.pin,Ve&&Ne.start-Ne._pinPush<=ee&&!E&&Ne.end>0&&(G=Ne.end-(C._startClamp?Math.max(0,Ne.start):Ne.start),(Ve===f&&Ne.start-Ne._pinPush<ee||Ve===z)&&isNaN(b)&&(xt+=G*(1-Ne.progress)),Ve===d&&(vt+=G));if(ee+=xt,K+=xt,C._startClamp&&(C._startClamp+=xt),C._endClamp&&!pn&&(C._endClamp=K||-.001,K=Math.min(K,fi(I,y))),B=K-ee||(ee-=.01)&&.001,Ft&&(ye=be.utils.clamp(0,1,be.utils.normalize(ee,K,de))),C._pinPush=vt,se&&xt&&(G={},G[y.a]="+="+xt,z&&(G[y.p]="-="+ce()),be.set([se,Z],G)),d&&!(Fc&&C.end>=fi(I,y)))G=qn(d),Ge=y===zt,we=ce(),Be=parseFloat(he(y.a))+vt,!gt&&K>1&&(ht=(P?ft.scrollingElement||Un:I).style,ht={style:ht,value:ht["overflow"+y.a.toUpperCase()]},P&&qn(ct)["overflow"+y.a.toUpperCase()]!=="scroll"&&(ht.style["overflow"+y.a.toUpperCase()]="scroll")),Ll(d,ve,G),te=Za(d),pe=wi(d,!0),$e=k&&rr(I,Ge?_n:zt)(),g?(Ie=[g+y.os2,B+vt+Bt],Ie.t=ve,W=g===It?Ko(d,y)+B+vt:0,W&&(Ie.push(y.d,W+Bt),ve.style.flexBasis!=="auto"&&(ve.style.flexBasis=W+Bt)),Ts(Ie),z&&Je.forEach(function(qe){qe.pin===z&&qe.vars.pinSpacing!==!1&&(qe._subPinOffset=!0)}),k&&ce(de)):(W=Ko(d,y),W&&ve.style.flexBasis!=="auto"&&(ve.style.flexBasis=W+Bt)),k&&(Re={top:pe.top+(Ge?we-ee:$e)+Bt,left:pe.left+(Ge?$e:we-ee)+Bt,boxSizing:"border-box",position:"fixed"},Re[Pr]=Re["max"+Ds]=Math.ceil(pe.width)+Bt,Re[Lr]=Re["max"+bu]=Math.ceil(pe.height)+Bt,Re[Xn]=Re[Xn+fa]=Re[Xn+ua]=Re[Xn+da]=Re[Xn+ha]="0",Re[It]=G[It],Re[It+fa]=G[It+fa],Re[It+ua]=G[It+ua],Re[It+da]=G[It+da],Re[It+ha]=G[It+ha],re=dg(ie,Re,R),pn&&ce(0)),i?(yt=i._initted,Al(1),i.render(i.duration(),!0,!0),ne=he(y.a)-Be+B+vt,Pe=Math.abs(B-ne)>1,k&&Pe&&re.splice(re.length-2,2),i.render(0,!0,!0),yt||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Al(0)):ne=B,ht&&(ht.value?ht.style["overflow"+y.a.toUpperCase()]=ht.value:ht.style.removeProperty("overflow-"+y.a));else if(f&&ce()&&!E)for(pe=f.parentNode;pe&&pe!==ct;)pe._pinOffset&&(ee-=pe._pinOffset,K-=pe._pinOffset),pe=pe.parentNode;kt&&kt.forEach(function(qe){return qe.revert(!1,!0)}),C.start=ee,C.end=K,De=L=pn?de:ce(),!E&&!pn&&!Zi&&(De<de&&ce(de),C.scroll.rec=0),C.revert(!1,!0),le=nn(),fe&&(j=-1,fe.restart(!0)),tn=0,i&&U&&(i._initted||ze)&&i.progress()!==ze&&i.progress(ze||0,!0).render(i.time(),!0,!0),(Ft||ye!==C.progress||E||_||i&&!i._initted)&&(i&&!U&&(i._initted||ye||i.vars.immediateRender!==!1)&&i.totalProgress(E&&ee<-.001&&!ye?be.utils.normalize(ee,K,0):ye,!0),C.progress=Ft||(De-ee)/B===ye?0:ye),d&&g&&(ve._pinOffset=Math.round(C.progress*ne)),Se&&Se.invalidate(),isNaN(ln)||(ln-=be.getProperty(F,y.p),dt-=be.getProperty(me,y.p),ja(F,y,ln),ja(se,y,ln-(Ye||0)),ja(me,y,dt),ja(Z,y,dt-(Ye||0))),Ft&&!pn&&C.update(),u&&!pn&&!T&&(T=!0,u(C),T=!1)}},C.getVelocity=function(){return(ce()-L)/(nn()-Qs)*1e3||0},C.endAnimation=function(){Ws(C.callbackAnimation),i&&(Se?Se.progress(1):i.paused()?U||Ws(i,C.direction<0,1):Ws(i,i.reversed()))},C.labelToScroll=function(oe){return i&&i.labels&&(ee||C.refresh()||ee)+i.labels[oe]/i.duration()*B||0},C.getTrailing=function(oe){var He=Je.indexOf(C),ke=C.direction>0?Je.slice(0,He).reverse():Je.slice(He+1);return(Ln(oe)?ke.filter(function(Ye){return Ye.vars.preventOverlaps===oe}):ke).filter(function(Ye){return C.direction>0?Ye.end<=ee:Ye.start>=K})},C.update=function(oe,He,ke){if(!(E&&!ke&&!oe)){var Ye=pn===!0?de:C.scroll(),Tt=oe?0:(Ye-ee)/B,et=Tt<0?0:Tt>1?1:Tt||0,gt=C.progress,Ft,xt,vt,ut,An,b,z,X;if(He&&(L=De,De=E?ce():Ye,x&&(lt=Qe,Qe=i&&!U?i.totalProgress():et)),p&&d&&!tn&&!Xa&&Zn&&(!et&&ee<Ye+(Ye-L)/(nn()-Qs)*p?et=1e-4:et===1&&K>Ye+(Ye-L)/(nn()-Qs)*p&&(et=.9999)),et!==gt&&C.enabled){if(Ft=C.isActive=!!et&&et<1,xt=!!gt&&gt<1,b=Ft!==xt,An=b||!!et!=!!gt,C.direction=et>gt?1:-1,C.progress=et,An&&!tn&&(vt=et&&!gt?0:et===1?1:gt===1?2:3,U&&(ut=!b&&V[vt+1]!=="none"&&V[vt+1]||V[vt],X=i&&(ut==="complete"||ut==="reset"||ut in i))),S&&(b||X)&&(X||h||!i)&&(an(S)?S(C):C.getTrailing(S).forEach(function(we){return we.endAnimation()})),U||(Se&&!tn&&!Xa?(Se._dp._time-Se._start!==Se._time&&Se.render(Se._dp._time-Se._start),Se.resetTo?Se.resetTo("totalProgress",et,i._tTime/i._tDur):(Se.vars.totalProgress=et,Se.invalidate().restart())):i&&i.totalProgress(et,!!(tn&&(le||oe)))),d){if(oe&&g&&(ve.style[g+y.os2]=nt),!k)Ce(ta(Be+ne*et));else if(An){if(z=!oe&&et>gt&&K+1>Ye&&Ye+1>=fi(I,y),R)if(!oe&&(Ft||z)){var W=wi(d,!0),G=Ye-ee;bh(d,ct,W.top+(y===zt?G:0)+Bt,W.left+(y===zt?0:G)+Bt)}else bh(d,ve);Ts(Ft||z?re:te),Pe&&et<1&&Ft||Ce(Be+(et===1&&!z?ne:0))}}x&&!Ae.tween&&!tn&&!Xa&&fe.restart(!0),o&&(b||v&&et&&(et<1||!Rl))&&Pa(o.targets).forEach(function(we){return we.classList[Ft||v?"add":"remove"](o.className)}),a&&!U&&!oe&&a(C),An&&!tn?(U&&(X&&(ut==="complete"?i.pause().totalProgress(1):ut==="reset"?i.restart(!0).pause():ut==="restart"?i.restart(!0):i[ut]()),a&&a(C)),(b||!Rl)&&(c&&b&&Xr(C,c),H[vt]&&Xr(C,H[vt]),v&&(et===1?C.kill(!1,1):H[vt]=0),b||(vt=et===1?1:3,H[vt]&&Xr(C,H[vt]))),D&&!Ft&&Math.abs(C.getVelocity())>(na(D)?D:2500)&&(Ws(C.callbackAnimation),Se?Se.progress(1):Ws(i,ut==="reverse"?1:!et,1))):U&&a&&!tn&&a(C)}if(Me){var pe=E?Ye/E.duration()*(E._caScrollDist||0):Ye;We(pe+(F._isFlipped?1:0)),Me(pe)}Fe&&Fe(-Ye/E.duration()*(E._caScrollDist||0))}},C.enable=function(oe,He){C.enabled||(C.enabled=!0,Xt(I,"resize",ia),P||Xt(I,"scroll",Yr),Q&&Xt(r,"refreshInit",Q),oe!==!1&&(C.progress=ye=0,De=L=j=ce()),He!==!1&&C.refresh())},C.getTween=function(oe){return oe&&Ae?Ae.tween:Se},C.setPositions=function(oe,He,ke,Ye){if(E){var Tt=E.scrollTrigger,et=E.duration(),gt=Tt.end-Tt.start;oe=Tt.start+gt*oe/et,He=Tt.start+gt*He/et}C.refresh(!1,!1,{start:_h(oe,ke&&!!C._startClamp),end:_h(He,ke&&!!C._endClamp)},Ye),C.update()},C.adjustPinSpacing=function(oe){if(Ie&&oe){var He=Ie.indexOf(y.d)+1;Ie[He]=parseFloat(Ie[He])+oe+Bt,Ie[1]=parseFloat(Ie[1])+oe+Bt,Ts(Ie)}},C.disable=function(oe,He){if(oe!==!1&&C.revert(!0,!0),C.enabled&&(C.enabled=C.isActive=!1,He||Se&&Se.pause(),de=0,Ue&&(Ue.uncache=1),Q&&Wt(r,"refreshInit",Q),fe&&(fe.pause(),Ae.tween&&Ae.tween.kill()&&(Ae.tween=0)),!P)){for(var ke=Je.length;ke--;)if(Je[ke].scroller===I&&Je[ke]!==C)return;Wt(I,"resize",ia),P||Wt(I,"scroll",Yr)}},C.kill=function(oe,He){C.disable(oe,He),Se&&!He&&Se.kill(),l&&delete kc[l];var ke=Je.indexOf(C);ke>=0&&Je.splice(ke,1),ke===dn&&Uo>0&&dn--,ke=0,Je.forEach(function(Ye){return Ye.scroller===C.scroller&&(ke=1)}),ke||pn||Zi||(C.scroll.rec=0),i&&(i.scrollTrigger=null,oe&&i.revert({kill:!1}),He||i.kill()),se&&[se,Z,F,me].forEach(function(Ye){return Ye.parentNode&&Ye.parentNode.removeChild(Ye)}),pa===C&&(pa=0),d&&(Ue&&(Ue.uncache=1),ke=0,Je.forEach(function(Ye){return Ye.pin===d&&ke++}),ke||(Ue.spacer=0)),n.onKill&&n.onKill(C)},Je.push(C),C.enable(!1,!1),rt&&rt(C),i&&i.add&&!B){var Oe=C.update;C.update=function(){C.update=Oe,je.cache++,ee||K||C.refresh()},be.delayedCall(.01,C.update),B=.01,ee=K=0}else C.refresh();d&&ug()},r.register=function(n){return us||(be=n||vp(),gp()&&window.document&&r.enable(),us=ea),us},r.defaults=function(n){if(n)for(var i in n)Ka[i]=n[i];return Ka},r.disable=function(n,i){ea=0,Je.forEach(function(a){return a[i?"kill":"disable"](n)}),Wt(Ze,"wheel",Yr),Wt(ft,"scroll",Yr),clearInterval(Wa),Wt(ft,"touchcancel",li),Wt(ct,"touchstart",li),Ya(Wt,ft,"pointerdown,touchstart,mousedown",gh),Ya(Wt,ft,"pointerup,touchend,mouseup",vh),$o.kill(),qa(Wt);for(var s=0;s<je.length;s+=3)$a(Wt,je[s],je[s+1]),$a(Wt,je[s],je[s+2])},r.enable=function(){if(Ze=window,ft=document,Un=ft.documentElement,ct=ft.body,be){if(Pa=be.utils.toArray,ca=be.utils.clamp,Oc=be.core.context||li,Al=be.core.suppressOverwrites||li,yu=Ze.history.scrollRestoration||"auto",Bc=Ze.pageYOffset||0,be.core.globals("ScrollTrigger",r),ct){ea=1,Es=document.createElement("div"),Es.style.height="100vh",Es.style.position="absolute",Rp(),ig(),Dt.register(be),r.isTouch=Dt.isTouch,Bi=Dt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ic=Dt.isTouch===1,Xt(Ze,"wheel",Yr),Su=[Ze,ft,Un,ct],be.matchMedia?(r.matchMedia=function(u){var h=be.matchMedia(),f;for(f in u)h.add(f,u[f]);return h},be.addEventListener("matchMediaInit",function(){wp(),Au()}),be.addEventListener("matchMediaRevert",function(){return bp()}),be.addEventListener("matchMedia",function(){Tr(0,1),Br("matchMedia")}),be.matchMedia().add("(orientation: portrait)",function(){return Pl(),Pl})):console.warn("Requires GSAP 3.11.0 or later"),Pl(),Xt(ft,"scroll",Yr);var n=ct.hasAttribute("style"),i=ct.style,s=i.borderTopStyle,a=be.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=wi(ct),zt.m=Math.round(o.top+zt.sc())||0,_n.m=Math.round(o.left+_n.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(ct.setAttribute("style",""),ct.removeAttribute("style")),Wa=setInterval(yh,250),be.delayedCall(.5,function(){return Xa=0}),Xt(ft,"touchcancel",li),Xt(ct,"touchstart",li),Ya(Xt,ft,"pointerdown,touchstart,mousedown",gh),Ya(Xt,ft,"pointerup,touchend,mouseup",vh),Nc=be.utils.checkPrefix("transform"),No.push(Nc),us=nn(),$o=be.delayedCall(.2,Tr).pause(),hs=[ft,"visibilitychange",function(){var u=Ze.innerWidth,h=Ze.innerHeight;ft.hidden?(dh=u,ph=h):(dh!==u||ph!==h)&&ia()},ft,"DOMContentLoaded",Tr,Ze,"load",Tr,Ze,"resize",ia],qa(Xt),Je.forEach(function(u){return u.enable(0,1)}),l=0;l<je.length;l+=3)$a(Wt,je[l],je[l+1]),$a(Wt,je[l],je[l+2])}else if(ft){var c=function u(){r.enable(),ft.removeEventListener("DOMContentLoaded",u)};ft.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Rl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Wa)||(Wa=i)&&setInterval(yh,i),"ignoreMobileResize"in n&&(Ic=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(qa(Wt)||qa(Xt,n.autoRefreshEvents||"none"),pp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=vn(n),a=je.indexOf(s),o=Fr(s);~a&&je.splice(a,o?6:2),i&&(o?di.unshift(Ze,i,ct,i,Un,i):di.unshift(s,i))},r.clearMatchMedia=function(n){Je.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(Ln(n)?vn(n):n).getBoundingClientRect(),o=a[s?Pr:Lr]*i||0;return s?a.right-o>0&&a.left+o<Ze.innerWidth:a.bottom-o>0&&a.top+o<Ze.innerHeight},r.positionInViewport=function(n,i,s){Ln(n)&&(n=vn(n));var a=n.getBoundingClientRect(),o=a[s?Pr:Lr],l=i==null?o/2:i in Jo?Jo[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/Ze.innerWidth:(a.top+l)/Ze.innerHeight},r.killAll=function(n){if(Je.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=kr.killAll||[];kr={},i.forEach(function(s){return s()})}},r}();it.version="3.15.1";it.saveStyles=function(r){return r?Pa(r).forEach(function(e){if(e&&e.style){var t=Pn.indexOf(e);t>=0&&Pn.splice(t,5),Pn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),be.core.getCache(e),Oc())}}):Pn};it.revert=function(r,e){return Au(!r,e)};it.create=function(r,e){return new it(r,e)};it.refresh=function(r){return r?ia(!0):(us||it.register())&&Tr(!0)};it.update=function(r){return++je.cache&&Pi(r===!0?2:0)};it.clearScrollMemory=Ap;it.maxScroll=function(r,e){return fi(r,e?_n:zt)};it.getScrollFunc=function(r,e){return rr(vn(r),e?_n:zt)};it.getById=function(r){return kc[r]};it.getAll=function(){return Je.filter(function(r){return r.vars.id!=="ScrollSmoother"})};it.isScrolling=function(){return!!Zn};it.snapDirectional=wu;it.addEventListener=function(r,e){var t=kr[r]||(kr[r]=[]);~t.indexOf(e)||t.push(e)};it.removeEventListener=function(r,e){var t=kr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};it.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var h=[],f=[],d=be.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||d.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&an(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return an(s)&&(s=s(),Xt(it,"refresh",function(){return s=e.batchMax()})),Pa(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(it.create(c))}),t};var Ah=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Dl=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Dt.isTouch?" pinch-zoom":""):"none",e===Un&&r(ct,t)},Qa={auto:1,scroll:1},mg=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||be.core.getCache(s),o=nn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==ct&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Qa[(l=qn(s)).overflowY]||Qa[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Fr(s)&&(Qa[(l=qn(s)).overflowY]||Qa[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Pp=function(e,t,n,i){return Dt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&mg,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Xt(ft,Dt.eventTypes[0],Ch,!1,!0)},onDisable:function(){return Wt(ft,Dt.eventTypes[0],Ch,!0)}})},_g=/(input|label|select|textarea)/i,Rh,Ch=function(e){var t=_g.test(e.target.tagName);(t||Rh)&&(e._gsapAllow=!0,Rh=t)},gg=function(e){vr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=vn(e.target)||Un,u=be.core.globals().ScrollSmoother,h=u&&u.get(),f=Bi&&(e.content&&vn(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),d=rr(c,zt),g=rr(c,_n),_=1,p=(Dt.isTouch&&Ze.visualViewport?Ze.visualViewport.scale*Ze.visualViewport.width:Ze.outerWidth)/Ze.innerWidth,m=0,M=an(i)?function(){return i(o)}:function(){return i||2.8},v,x,R=Pp(c,e.type,!0,s),w=function(){return x=!1},E=li,D=li,S=function(){l=fi(c,zt),D=ca(Bi?1:0,l),n&&(E=ca(0,fi(c,_n))),v=Dr},y=function(){f._gsap.y=ta(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},U=function(){if(x){requestAnimationFrame(w);var q=ta(o.deltaY/2),$=D(d.v-q);if(f&&$!==d.v+d.offset){d.offset=$-d.v;var C=ta((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+C+", 0, 1)",f._gsap.y=C+"px",d.cacheID=je.cache,Pi()}return!0}d.offset&&y(),x=!0},I,J,P,k,H=function(){S(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return f&&be.set(f,{y:"+=0"}),e.ignoreCheck=function(V){return Bi&&V.type==="touchmove"&&U()||_>1.05&&V.type!=="touchstart"||o.isGesturing||V.touches&&V.touches.length>1},e.onPress=function(){x=!1;var V=_;_=ta((Ze.visualViewport&&Ze.visualViewport.scale||1)/p),I.pause(),V!==_&&Dl(c,_>1.01?!0:n?!1:"x"),J=g(),P=d(),S(),v=Dr},e.onRelease=e.onGestureStart=function(V,q){if(d.offset&&y(),!q)k.restart(!0);else{je.cache++;var $=M(),C,Q;n&&(C=g(),Q=C+$*.05*-V.velocityX/.227,$*=Ah(g,C,Q,fi(c,_n)),I.vars.scrollX=E(Q)),C=d(),Q=C+$*.05*-V.velocityY/.227,$*=Ah(d,C,Q,fi(c,zt)),I.vars.scrollY=D(Q),I.invalidate().duration($).play(.01),(Bi&&I.vars.scrollY>=l||C>=l-1)&&be.to({},{onUpdate:H,duration:$})}a&&a(V)},e.onWheel=function(){I._ts&&I.pause(),nn()-m>1e3&&(v=0,m=nn())},e.onChange=function(V,q,$,C,Q){if(Dr!==v&&S(),q&&n&&g(E(C[2]===q?J+(V.startX-V.x):g()+q-C[1])),$){d.offset&&y();var ae=Q[2]===$,Y=ae?P+V.startY-V.y:d()+$-Q[1],j=D(Y);ae&&Y!==j&&(P+=j-Y),d(j)}($||q)&&Pi()},e.onEnable=function(){Dl(c,n?!1:"x"),it.addEventListener("refresh",H),Xt(Ze,"resize",H),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),R.enable()},e.onDisable=function(){Dl(c,!0),Wt(Ze,"resize",H),it.removeEventListener("refresh",H),R.kill()},e.lockAxis=e.lockAxis!==!1,o=new Dt(e),o.iOS=Bi,Bi&&!d()&&d(1),Bi&&be.ticker.add(li),k=o._dc,I=be.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Cp(d,d(),function(){return I.pause()})},onUpdate:Pi,onComplete:k.vars.onComplete}),o};it.sort=function(r){if(an(r))return Je.sort(r);var e=Ze.pageYOffset||0;return it.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+Ze.innerHeight}),Je.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};it.observe=function(r){return new Dt(r)};it.normalizeScroll=function(r){if(typeof r>"u")return fn;if(r===!0&&fn)return fn.enable();if(r===!1){fn&&fn.kill(),fn=r;return}var e=r instanceof Dt?r:gg(r);return fn&&fn.target===e.target&&fn.kill(),Fr(e.target)&&(fn=e),e};it.core={_getVelocityProp:Uc,_inputObserver:Pp,_scrollers:je,_proxies:di,bridge:{ss:function(){Zn||Br("scrollStart"),Zn=nn()},ref:function(){return tn}}};vp()&&be.registerPlugin(it);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ru="160",vg=0,Ph=1,xg=2,Lp=1,Sg=2,Ei=3,sr=0,bn=1,Ai=2,ji=0,bs=1,Lh=2,Dh=3,Uh=4,yg=5,yr=100,Mg=101,Eg=102,Nh=103,Ih=104,Tg=200,bg=201,wg=202,Ag=203,Hc=204,Gc=205,Rg=206,Cg=207,Pg=208,Lg=209,Dg=210,Ug=211,Ng=212,Ig=213,Og=214,Fg=0,kg=1,Bg=2,Zo=3,zg=4,Hg=5,Gg=6,Vg=7,Dp=0,Wg=1,Xg=2,Qi=0,qg=1,Yg=2,$g=3,Kg=4,Jg=5,Zg=6,Up=300,Us=301,Ns=302,Vc=303,Wc=304,cl=306,Xc=1e3,ii=1001,qc=1002,mn=1003,Oh=1004,Ul=1005,Yn=1006,jg=1007,Da=1008,er=1009,Qg=1010,e0=1011,Cu=1012,Np=1013,Xi=1014,qi=1015,Ua=1016,Ip=1017,Op=1018,Ur=1020,t0=1021,ri=1023,n0=1024,i0=1025,Nr=1026,Is=1027,r0=1028,Fp=1029,s0=1030,kp=1031,Bp=1033,Nl=33776,Il=33777,Ol=33778,Fl=33779,Fh=35840,kh=35841,Bh=35842,zh=35843,zp=36196,Hh=37492,Gh=37496,Vh=37808,Wh=37809,Xh=37810,qh=37811,Yh=37812,$h=37813,Kh=37814,Jh=37815,Zh=37816,jh=37817,Qh=37818,ef=37819,tf=37820,nf=37821,kl=36492,rf=36494,sf=36495,a0=36283,af=36284,of=36285,lf=36286,Hp=3e3,Ir=3001,o0=3200,l0=3201,Gp=0,c0=1,$n="",qt="srgb",Ui="srgb-linear",Pu="display-p3",ul="display-p3-linear",jo="linear",St="srgb",Qo="rec709",el="p3",$r=7680,cf=519,u0=512,h0=513,f0=514,Vp=515,d0=516,p0=517,m0=518,_0=519,uf=35044,hf="300 es",Yc=1035,Ci=2e3,tl=2001;class Fs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bl=Math.PI/180,$c=180/Math.PI;function ks(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[r&255]+Qt[r>>8&255]+Qt[r>>16&255]+Qt[r>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function rn(r,e,t){return Math.max(e,Math.min(t,r))}function g0(r,e){return(r%e+e)%e}function zl(r,e,t){return(1-t)*r+t*e}function ff(r){return(r&r-1)===0&&r!==0}function Kc(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Xs(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function gn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class xe{constructor(e=0,t=0){xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(rn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e,t,n,i,s,a,o,l,c){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],M=i[1],v=i[4],x=i[7],R=i[2],w=i[5],E=i[8];return s[0]=a*_+o*M+l*R,s[3]=a*p+o*v+l*w,s[6]=a*m+o*x+l*E,s[1]=c*_+u*M+h*R,s[4]=c*p+u*v+h*w,s[7]=c*m+u*x+h*E,s[2]=f*_+d*M+g*R,s[5]=f*p+d*v+g*w,s[8]=f*m+d*x+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,d=c*s-a*l,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Hl.makeScale(e,t)),this}rotate(e){return this.premultiply(Hl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hl=new tt;function Wp(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function nl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function v0(){const r=nl("canvas");return r.style.display="block",r}const df={};function ma(r){r in df||(df[r]=!0,console.warn(r))}const pf=new tt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),mf=new tt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),eo={[Ui]:{transfer:jo,primaries:Qo,toReference:r=>r,fromReference:r=>r},[qt]:{transfer:St,primaries:Qo,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[ul]:{transfer:jo,primaries:el,toReference:r=>r.applyMatrix3(mf),fromReference:r=>r.applyMatrix3(pf)},[Pu]:{transfer:St,primaries:el,toReference:r=>r.convertSRGBToLinear().applyMatrix3(mf),fromReference:r=>r.applyMatrix3(pf).convertLinearToSRGB()}},x0=new Set([Ui,ul]),pt={enabled:!0,_workingColorSpace:Ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!x0.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=eo[e].toReference,i=eo[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return eo[r].primaries},getTransfer:function(r){return r===$n?jo:eo[r].transfer}};function ws(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Kr;class Xp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Kr===void 0&&(Kr=nl("canvas")),Kr.width=e.width,Kr.height=e.height;const n=Kr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Kr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=nl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ws(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ws(t[n]/255)*255):t[n]=ws(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let S0=0;class qp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=ks(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Vl(i[a].image)):s.push(Vl(i[a]))}else s=Vl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Vl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Xp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let y0=0;class Bn extends Fs{constructor(e=Bn.DEFAULT_IMAGE,t=Bn.DEFAULT_MAPPING,n=ii,i=ii,s=Yn,a=Da,o=ri,l=er,c=Bn.DEFAULT_ANISOTROPY,u=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=ks(),this.name="",this.source=new qp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ma("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Ir?qt:$n),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Up)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xc:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case qc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xc:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case qc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ma("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===qt?Ir:Hp}set encoding(e){ma("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ir?qt:$n}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=Up;Bn.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,t=0,n=0,i=1){Et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(d+1)/2,R=(m+1)/2,w=(u+f)/4,E=(h+_)/4,D=(g+p)/4;return v>x&&v>R?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=w/n,s=E/n):x>R?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=w/i,s=D/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=E/s,i=D/s),this.set(n,i,s,t),this}let M=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(h-_)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class M0 extends Fs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(ma("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ir?qt:$n),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Bn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new qp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zr extends M0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yp extends Bn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=mn,this.minFilter=mn,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class E0 extends Bn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=mn,this.minFilter=mn,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ka{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let p=1-o;const m=l*f+c*d+u*g+h*_,M=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const R=Math.sqrt(v),w=Math.atan2(R,m*M);p=Math.sin(p*w)/R,o=Math.sin(o*w)/R}const x=o*M;if(l=l*p+f*x,c=c*p+d*x,u=u*p+g*x,h=h*p+_*x,p===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],f=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-o*d,e[t+2]=c*g+u*d+o*f-l*h,e[t+3]=u*g-o*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-i)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+c)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(s-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,n=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_f.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_f.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wl.copy(this).projectOnVector(e),this.sub(Wl)}reflect(e){return this.sub(Wl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(rn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wl=new O,_f=new ka;class Ba{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),to.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),to.copy(n.boundingBox)),to.applyMatrix4(e.matrixWorld),this.union(to)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),no.subVectors(this.max,qs),Jr.subVectors(e.a,qs),Zr.subVectors(e.b,qs),jr.subVectors(e.c,qs),Ni.subVectors(Zr,Jr),Ii.subVectors(jr,Zr),hr.subVectors(Jr,jr);let t=[0,-Ni.z,Ni.y,0,-Ii.z,Ii.y,0,-hr.z,hr.y,Ni.z,0,-Ni.x,Ii.z,0,-Ii.x,hr.z,0,-hr.x,-Ni.y,Ni.x,0,-Ii.y,Ii.x,0,-hr.y,hr.x,0];return!Xl(t,Jr,Zr,jr,no)||(t=[1,0,0,0,1,0,0,0,1],!Xl(t,Jr,Zr,jr,no))?!1:(io.crossVectors(Ni,Ii),t=[io.x,io.y,io.z],Xl(t,Jr,Zr,jr,no))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vi=[new O,new O,new O,new O,new O,new O,new O,new O],jn=new O,to=new Ba,Jr=new O,Zr=new O,jr=new O,Ni=new O,Ii=new O,hr=new O,qs=new O,no=new O,io=new O,fr=new O;function Xl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){fr.fromArray(r,s);const o=i.x*Math.abs(fr.x)+i.y*Math.abs(fr.y)+i.z*Math.abs(fr.z),l=e.dot(fr),c=t.dot(fr),u=n.dot(fr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const T0=new Ba,Ys=new O,ql=new O;class Lu{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):T0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ys.subVectors(e,this.center);const t=Ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ys,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ys.copy(e.center).add(ql)),this.expandByPoint(Ys.copy(e.center).sub(ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xi=new O,Yl=new O,ro=new O,Oi=new O,$l=new O,so=new O,Kl=new O;class b0{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xi.copy(this.origin).addScaledVector(this.direction,t),xi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Yl.copy(e).add(t).multiplyScalar(.5),ro.copy(t).sub(e).normalize(),Oi.copy(this.origin).sub(Yl);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ro),o=Oi.dot(this.direction),l=-Oi.dot(ro),c=Oi.lengthSq(),u=Math.abs(1-a*a);let h,f,d,g;if(u>0)if(h=a*l-o,f=a*o-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Yl).addScaledVector(ro,f),d}intersectSphere(e,t){xi.subVectors(e.center,this.origin);const n=xi.dot(this.direction),i=xi.dot(xi)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,xi)!==null}intersectTriangle(e,t,n,i,s){$l.subVectors(t,e),so.subVectors(n,e),Kl.crossVectors($l,so);let a=this.direction.dot(Kl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Oi.subVectors(this.origin,e);const l=o*this.direction.dot(so.crossVectors(Oi,so));if(l<0)return null;const c=o*this.direction.dot($l.cross(Oi));if(c<0||l+c>a)return null;const u=-o*Oi.dot(Kl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(e,t,n,i,s,a,o,l,c,u,h,f,d,g,_,p){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,h,f,d,g,_,p)}set(e,t,n,i,s,a,o,l,c,u,h,f,d,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Qr.setFromMatrixColumn(e,0).length(),s=1/Qr.setFromMatrixColumn(e,1).length(),a=1/Qr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,d=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f+_*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,d=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,d=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=a*l,d=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=a*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(w0,e,A0)}lookAt(e,t,n){const i=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Fi.crossVectors(n,Rn),Fi.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Fi.crossVectors(n,Rn)),Fi.normalize(),ao.crossVectors(Rn,Fi),i[0]=Fi.x,i[4]=ao.x,i[8]=Rn.x,i[1]=Fi.y,i[5]=ao.y,i[9]=Rn.y,i[2]=Fi.z,i[6]=ao.z,i[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],M=n[3],v=n[7],x=n[11],R=n[15],w=i[0],E=i[4],D=i[8],S=i[12],y=i[1],U=i[5],I=i[9],J=i[13],P=i[2],k=i[6],H=i[10],V=i[14],q=i[3],$=i[7],C=i[11],Q=i[15];return s[0]=a*w+o*y+l*P+c*q,s[4]=a*E+o*U+l*k+c*$,s[8]=a*D+o*I+l*H+c*C,s[12]=a*S+o*J+l*V+c*Q,s[1]=u*w+h*y+f*P+d*q,s[5]=u*E+h*U+f*k+d*$,s[9]=u*D+h*I+f*H+d*C,s[13]=u*S+h*J+f*V+d*Q,s[2]=g*w+_*y+p*P+m*q,s[6]=g*E+_*U+p*k+m*$,s[10]=g*D+_*I+p*H+m*C,s[14]=g*S+_*J+p*V+m*Q,s[3]=M*w+v*y+x*P+R*q,s[7]=M*E+v*U+x*k+R*$,s[11]=M*D+v*I+x*H+R*C,s[15]=M*S+v*J+x*V+R*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*l*h-i*c*h-s*o*f+n*c*f+i*o*d-n*l*d)+_*(+t*l*d-t*c*f+s*a*f-i*a*d+i*c*u-s*l*u)+p*(+t*c*h-t*o*d-s*a*h+n*a*d+s*o*u-n*c*u)+m*(-i*o*u-t*l*h+t*o*f+i*a*h-n*a*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],p=e[14],m=e[15],M=h*p*c-_*f*c+_*l*d-o*p*d-h*l*m+o*f*m,v=g*f*c-u*p*c-g*l*d+a*p*d+u*l*m-a*f*m,x=u*_*c-g*h*c+g*o*d-a*_*d-u*o*m+a*h*m,R=g*h*l-u*_*l-g*o*f+a*_*f+u*o*p-a*h*p,w=t*M+n*v+i*x+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/w;return e[0]=M*E,e[1]=(_*f*s-h*p*s-_*i*d+n*p*d+h*i*m-n*f*m)*E,e[2]=(o*p*s-_*l*s+_*i*c-n*p*c-o*i*m+n*l*m)*E,e[3]=(h*l*s-o*f*s-h*i*c+n*f*c+o*i*d-n*l*d)*E,e[4]=v*E,e[5]=(u*p*s-g*f*s+g*i*d-t*p*d-u*i*m+t*f*m)*E,e[6]=(g*l*s-a*p*s-g*i*c+t*p*c+a*i*m-t*l*m)*E,e[7]=(a*f*s-u*l*s+u*i*c-t*f*c-a*i*d+t*l*d)*E,e[8]=x*E,e[9]=(g*h*s-u*_*s-g*n*d+t*_*d+u*n*m-t*h*m)*E,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*m+t*o*m)*E,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*d-t*o*d)*E,e[12]=R*E,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*p+t*h*p)*E,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*p-t*o*p)*E,e[15]=(a*h*i-u*o*i+u*n*l-t*h*l-a*n*f+t*o*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,d=s*u,g=s*h,_=a*u,p=a*h,m=o*h,M=l*c,v=l*u,x=l*h,R=n.x,w=n.y,E=n.z;return i[0]=(1-(_+m))*R,i[1]=(d+x)*R,i[2]=(g-v)*R,i[3]=0,i[4]=(d-x)*w,i[5]=(1-(f+m))*w,i[6]=(p+M)*w,i[7]=0,i[8]=(g+v)*E,i[9]=(p-M)*E,i[10]=(1-(f+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Qr.set(i[0],i[1],i[2]).length();const a=Qr.set(i[4],i[5],i[6]).length(),o=Qr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Qn.copy(this);const c=1/s,u=1/a,h=1/o;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=h,Qn.elements[9]*=h,Qn.elements[10]*=h,t.setFromRotationMatrix(Qn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Ci){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,g;if(o===Ci)d=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===tl)d=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Ci){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(a-s),f=(t+e)*c,d=(n+i)*u;let g,_;if(o===Ci)g=(a+s)*h,_=-2*h;else if(o===tl)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qr=new O,Qn=new Ut,w0=new O(0,0,0),A0=new O(1,1,1),Fi=new O,ao=new O,Rn=new O,gf=new Ut,vf=new ka;class hl{constructor(e=0,t=0,n=0,i=hl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(rn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(rn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-rn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vf.setFromEuler(this),this.setFromQuaternion(vf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hl.DEFAULT_ORDER="XYZ";class $p{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let R0=0;const xf=new O,es=new ka,Si=new Ut,oo=new O,$s=new O,C0=new O,P0=new ka,Sf=new O(1,0,0),yf=new O(0,1,0),Mf=new O(0,0,1),L0={type:"added"},D0={type:"removed"};class Zt extends Fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new O,t=new hl,n=new ka,i=new O(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ut},normalMatrix:{value:new tt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $p,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis(Sf,e)}rotateY(e){return this.rotateOnAxis(yf,e)}rotateZ(e){return this.rotateOnAxis(Mf,e)}translateOnAxis(e,t){return xf.copy(e).applyQuaternion(this.quaternion),this.position.add(xf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sf,e)}translateY(e){return this.translateOnAxis(yf,e)}translateZ(e){return this.translateOnAxis(Mf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oo.copy(e):oo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt($s,oo,this.up):Si.lookAt(oo,$s,this.up),this.quaternion.setFromRotationMatrix(Si),i&&(Si.extractRotation(i.matrixWorld),es.setFromRotationMatrix(Si),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(L0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(D0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,C0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,P0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++){const o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Zt.DEFAULT_UP=new O(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ei=new O,yi=new O,Jl=new O,Mi=new O,ts=new O,ns=new O,Ef=new O,Zl=new O,jl=new O,Ql=new O;let lo=!1;class ni{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ei.subVectors(e,t),i.cross(ei);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ei.subVectors(i,t),yi.subVectors(n,t),Jl.subVectors(e,t);const a=ei.dot(ei),o=ei.dot(yi),l=ei.dot(Jl),c=yi.dot(yi),u=yi.dot(Jl),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-o*u)*f,g=(a*u-o*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getUV(e,t,n,i,s,a,o,l){return lo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),lo=!0),this.getInterpolation(e,t,n,i,s,a,o,l)}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mi.x),l.addScaledVector(a,Mi.y),l.addScaledVector(o,Mi.z),l)}static isFrontFacing(e,t,n,i){return ei.subVectors(n,t),yi.subVectors(e,t),ei.cross(yi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),ei.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ni.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return lo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),lo=!0),ni.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return ni.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;ts.subVectors(i,n),ns.subVectors(s,n),Zl.subVectors(e,n);const l=ts.dot(Zl),c=ns.dot(Zl);if(l<=0&&c<=0)return t.copy(n);jl.subVectors(e,i);const u=ts.dot(jl),h=ns.dot(jl);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(ts,a);Ql.subVectors(e,s);const d=ts.dot(Ql),g=ns.dot(Ql);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ns,o);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return Ef.subVectors(s,i),o=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(Ef,o);const m=1/(p+_+f);return a=_*m,o=f*m,t.copy(n).addScaledVector(ts,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},co={h:0,s:0,l:0};function ec(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ot{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=pt.workingColorSpace){if(e=g0(e,1),t=rn(t,0,1),n=rn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ec(a,s,e+1/3),this.g=ec(a,s,e),this.b=ec(a,s,e-1/3)}return pt.toWorkingColorSpace(this,i),this}setStyle(e,t=qt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const n=Kp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}copyLinearToSRGB(e){return this.r=Gl(e.r),this.g=Gl(e.g),this.b=Gl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return pt.fromWorkingColorSpace(en.copy(this),e),Math.round(rn(en.r*255,0,255))*65536+Math.round(rn(en.g*255,0,255))*256+Math.round(rn(en.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(en.copy(this),t);const n=en.r,i=en.g,s=en.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=qt){pt.fromWorkingColorSpace(en.copy(this),e);const t=en.r,n=en.g,i=en.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ki),this.setHSL(ki.h+e,ki.s+t,ki.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ki),e.getHSL(co);const n=zl(ki.h,co.h,t),i=zl(ki.s,co.s,t),s=zl(ki.l,co.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new ot;ot.NAMES=Kp;let U0=0;class za extends Fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=ks(),this.name="",this.type="Material",this.blending=bs,this.side=sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hc,this.blendDst=Gc,this.blendEquation=yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Zo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$r,this.stencilZFail=$r,this.stencilZPass=$r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(n.blending=this.blending),this.side!==sr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hc&&(n.blendSrc=this.blendSrc),this.blendDst!==Gc&&(n.blendDst=this.blendDst),this.blendEquation!==yr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$r&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$r&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$r&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Du extends za{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new O,uo=new xe;class pi{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=uf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)uo.fromBufferAttribute(this,t),uo.applyMatrix3(e),this.setXY(t,uo.x,uo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xs(t,this.array)),t}setX(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xs(t,this.array)),t}setY(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xs(t,this.array)),t}setW(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array),i=gn(i,this.array),s=gn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==uf&&(e.usage=this.usage),e}}class Jp extends pi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zp extends pi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Yt extends pi{constructor(e,t,n){super(new Float32Array(e),t,n)}}let N0=0;const Vn=new Ut,tc=new Zt,is=new O,Cn=new Ba,Ks=new Ba,Vt=new O;class ai extends Fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=ks(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wp(e)?Zp:Jp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,n){return Vn.makeTranslation(e,t,n),this.applyMatrix4(Vn),this}scale(e,t,n){return Vn.makeScale(e,t,n),this.applyMatrix4(Vn),this}lookAt(e){return tc.lookAt(e),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Yt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ba);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lu);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(e){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(Cn.min,Ks.min),Cn.expandByPoint(Vt),Vt.addVectors(Cn.max,Ks.max),Cn.expandByPoint(Vt)):(Cn.expandByPoint(Ks.min),Cn.expandByPoint(Ks.max))}Cn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Vt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Vt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Vt.fromBufferAttribute(o,c),l&&(is.fromBufferAttribute(e,c),Vt.add(is)),i=Math.max(i,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pi(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let y=0;y<o;y++)c[y]=new O,u[y]=new O;const h=new O,f=new O,d=new O,g=new xe,_=new xe,p=new xe,m=new O,M=new O;function v(y,U,I){h.fromArray(i,y*3),f.fromArray(i,U*3),d.fromArray(i,I*3),g.fromArray(a,y*2),_.fromArray(a,U*2),p.fromArray(a,I*2),f.sub(h),d.sub(h),_.sub(g),p.sub(g);const J=1/(_.x*p.y-p.x*_.y);isFinite(J)&&(m.copy(f).multiplyScalar(p.y).addScaledVector(d,-_.y).multiplyScalar(J),M.copy(d).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(J),c[y].add(m),c[U].add(m),c[I].add(m),u[y].add(M),u[U].add(M),u[I].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let y=0,U=x.length;y<U;++y){const I=x[y],J=I.start,P=I.count;for(let k=J,H=J+P;k<H;k+=3)v(n[k+0],n[k+1],n[k+2])}const R=new O,w=new O,E=new O,D=new O;function S(y){E.fromArray(s,y*3),D.copy(E);const U=c[y];R.copy(U),R.sub(E.multiplyScalar(E.dot(U))).normalize(),w.crossVectors(D,U);const J=w.dot(u[y])<0?-1:1;l[y*4]=R.x,l[y*4+1]=R.y,l[y*4+2]=R.z,l[y*4+3]=J}for(let y=0,U=x.length;y<U;++y){const I=x[y],J=I.start,P=I.count;for(let k=J,H=J+P;k<H;k+=3)S(n[k+0]),S(n[k+1]),S(n[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new O,s=new O,a=new O,o=new O,l=new O,c=new O,u=new O,h=new O;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*u;for(let m=0;m<u;m++)f[g++]=c[d++]}return new pi(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ai,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tf=new Ut,dr=new b0,ho=new Lu,bf=new O,rs=new O,ss=new O,as=new O,nc=new O,fo=new O,po=new xe,mo=new xe,_o=new xe,wf=new O,Af=new O,Rf=new O,go=new O,vo=new O;class si extends Zt{constructor(e=new ai,t=new Du){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){fo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(nc.fromBufferAttribute(h,e),a?fo.addScaledVector(nc,u):fo.addScaledVector(nc.sub(t),u))}t.add(fo)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(s),dr.copy(e.ray).recast(e.near),!(ho.containsPoint(dr.origin)===!1&&(dr.intersectSphere(ho,bf)===null||dr.origin.distanceToSquared(bf)>(e.far-e.near)**2))&&(Tf.copy(s).invert(),dr.copy(e.ray).applyMatrix4(Tf),!(n.boundingBox!==null&&dr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,dr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let x=M,R=v;x<R;x+=3){const w=o.getX(x),E=o.getX(x+1),D=o.getX(x+2);i=xo(this,m,e,n,c,u,h,w,E,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const M=o.getX(p),v=o.getX(p+1),x=o.getX(p+2);i=xo(this,a,e,n,c,u,h,M,v,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let x=M,R=v;x<R;x+=3){const w=x,E=x+1,D=x+2;i=xo(this,m,e,n,c,u,h,w,E,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const M=p,v=p+1,x=p+2;i=xo(this,a,e,n,c,u,h,M,v,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function I0(r,e,t,n,i,s,a,o){let l;if(e.side===bn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===sr,o),l===null)return null;vo.copy(o),vo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(vo);return c<t.near||c>t.far?null:{distance:c,point:vo.clone(),object:r}}function xo(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,rs),r.getVertexPosition(l,ss),r.getVertexPosition(c,as);const u=I0(r,e,t,n,rs,ss,as,go);if(u){i&&(po.fromBufferAttribute(i,o),mo.fromBufferAttribute(i,l),_o.fromBufferAttribute(i,c),u.uv=ni.getInterpolation(go,rs,ss,as,po,mo,_o,new xe)),s&&(po.fromBufferAttribute(s,o),mo.fromBufferAttribute(s,l),_o.fromBufferAttribute(s,c),u.uv1=ni.getInterpolation(go,rs,ss,as,po,mo,_o,new xe),u.uv2=u.uv1),a&&(wf.fromBufferAttribute(a,o),Af.fromBufferAttribute(a,l),Rf.fromBufferAttribute(a,c),u.normal=ni.getInterpolation(go,rs,ss,as,wf,Af,Rf,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new O,materialIndex:0};ni.getNormal(rs,ss,as,h.normal),u.face=h}return u}class Bs extends ai{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(h,2));function g(_,p,m,M,v,x,R,w,E,D,S){const y=x/E,U=R/D,I=x/2,J=R/2,P=w/2,k=E+1,H=D+1;let V=0,q=0;const $=new O;for(let C=0;C<H;C++){const Q=C*U-J;for(let ae=0;ae<k;ae++){const Y=ae*y-I;$[_]=Y*M,$[p]=Q*v,$[m]=P,c.push($.x,$.y,$.z),$[_]=0,$[p]=0,$[m]=w>0?1:-1,u.push($.x,$.y,$.z),h.push(ae/E),h.push(1-C/D),V+=1}}for(let C=0;C<D;C++)for(let Q=0;Q<E;Q++){const ae=f+Q+k*C,Y=f+Q+k*(C+1),j=f+(Q+1)+k*(C+1),le=f+(Q+1)+k*C;l.push(ae,Y,le),l.push(Y,j,le),q+=6}o.addGroup(d,q,S),d+=q,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Os(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function hn(r){const e={};for(let t=0;t<r.length;t++){const n=Os(r[t]);for(const i in n)e[i]=n[i]}return e}function O0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function jp(r){return r.getRenderTarget()===null?r.outputColorSpace:pt.workingColorSpace}const F0={clone:Os,merge:hn};var k0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hr extends za{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=k0,this.fragmentShader=B0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Os(e.uniforms),this.uniformsGroups=O0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qp extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Nn extends Qp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$c*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $c*2*Math.atan(Math.tan(Bl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const os=-90,ls=1;class z0 extends Zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Nn(os,ls,e,t);i.layers=this.layers,this.add(i);const s=new Nn(os,ls,e,t);s.layers=this.layers,this.add(s);const a=new Nn(os,ls,e,t);a.layers=this.layers,this.add(a);const o=new Nn(os,ls,e,t);o.layers=this.layers,this.add(o);const l=new Nn(os,ls,e,t);l.layers=this.layers,this.add(l);const c=new Nn(os,ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Ci)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class em extends Bn{constructor(e,t,n,i,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Us,super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class H0 extends zr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ma("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ir?qt:$n),this.texture=new em(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Bs(5,5,5),s=new Hr({name:"CubemapFromEquirect",uniforms:Os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:ji});s.uniforms.tEquirect.value=t;const a=new si(i,s),o=t.minFilter;return t.minFilter===Da&&(t.minFilter=Yn),new z0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const ic=new O,G0=new O,V0=new tt;class xr{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ic.subVectors(n,t).cross(G0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ic),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||V0.getNormalMatrix(e),i=this.coplanarPoint(ic).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pr=new Lu,So=new O;class Uu{constructor(e=new xr,t=new xr,n=new xr,i=new xr,s=new xr,a=new xr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ci){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],M=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-s,f-c,p-d,x-m).normalize(),n[1].setComponents(l+s,f+c,p+d,x+m).normalize(),n[2].setComponents(l+a,f+u,p+g,x+M).normalize(),n[3].setComponents(l-a,f-u,p-g,x-M).normalize(),n[4].setComponents(l-o,f-h,p-_,x-v).normalize(),t===Ci)n[5].setComponents(l+o,f+h,p+_,x+v).normalize();else if(t===tl)n[5].setComponents(o,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pr)}intersectsSprite(e){return pr.center.set(0,0,0),pr.radius=.7071067811865476,pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(pr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(So.x=i.normal.x>0?e.max.x:e.min.x,So.y=i.normal.y>0?e.max.y:e.min.y,So.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(So)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function tm(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function W0(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,d=h.byteLength,g=r.createBuffer();r.bindBuffer(u,g),r.bufferData(u,h,f),c.onUploadCallback();let _;if(h instanceof Float32Array)_=r.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=r.SHORT;else if(h instanceof Uint32Array)_=r.UNSIGNED_INT;else if(h instanceof Int32Array)_=r.INT;else if(h instanceof Int8Array)_=r.BYTE;else if(h instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,u,h){const f=u.array,d=u._updateRange,g=u.updateRanges;if(r.bindBuffer(h,c),d.count===-1&&g.length===0&&r.bufferSubData(h,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];t?r.bufferSubData(h,m.start*f.BYTES_PER_ELEMENT,f,m.start,m.count):r.bufferSubData(h,m.start*f.BYTES_PER_ELEMENT,f.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}d.count!==-1&&(t?r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,i(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:a,remove:o,update:l}}class Nu extends ai{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,f=t/l,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const M=m*f-a;for(let v=0;v<c;v++){const x=v*h-s;g.push(x,-M,0),_.push(0,0,1),p.push(v/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const v=M+c*m,x=M+c*(m+1),R=M+1+c*(m+1),w=M+1+c*m;d.push(v,x,w),d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(_,3)),this.setAttribute("uv",new Yt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nu(e.width,e.height,e.widthSegments,e.heightSegments)}}var X0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,q0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Y0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,J0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Z0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,j0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ev=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,tv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,rv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,av=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,ov=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,dv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,pv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_v=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mv=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Ev=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Tv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Uv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Nv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Iv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ov=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Bv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Wv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$v=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Zv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,jv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ex=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ix=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ax=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,ox=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,lx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ux=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,px=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_x=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ex=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Ax=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Px=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ux=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ix=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ox=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,jx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,eS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,fS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_S=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,MS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ES=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:X0,alphahash_pars_fragment:q0,alphamap_fragment:Y0,alphamap_pars_fragment:$0,alphatest_fragment:K0,alphatest_pars_fragment:J0,aomap_fragment:Z0,aomap_pars_fragment:j0,batching_pars_vertex:Q0,batching_vertex:ev,begin_vertex:tv,beginnormal_vertex:nv,bsdfs:iv,iridescence_fragment:rv,bumpmap_pars_fragment:sv,clipping_planes_fragment:av,clipping_planes_pars_fragment:ov,clipping_planes_pars_vertex:lv,clipping_planes_vertex:cv,color_fragment:uv,color_pars_fragment:hv,color_pars_vertex:fv,color_vertex:dv,common:pv,cube_uv_reflection_fragment:mv,defaultnormal_vertex:_v,displacementmap_pars_vertex:gv,displacementmap_vertex:vv,emissivemap_fragment:xv,emissivemap_pars_fragment:Sv,colorspace_fragment:yv,colorspace_pars_fragment:Mv,envmap_fragment:Ev,envmap_common_pars_fragment:Tv,envmap_pars_fragment:bv,envmap_pars_vertex:wv,envmap_physical_pars_fragment:kv,envmap_vertex:Av,fog_vertex:Rv,fog_pars_vertex:Cv,fog_fragment:Pv,fog_pars_fragment:Lv,gradientmap_pars_fragment:Dv,lightmap_fragment:Uv,lightmap_pars_fragment:Nv,lights_lambert_fragment:Iv,lights_lambert_pars_fragment:Ov,lights_pars_begin:Fv,lights_toon_fragment:Bv,lights_toon_pars_fragment:zv,lights_phong_fragment:Hv,lights_phong_pars_fragment:Gv,lights_physical_fragment:Vv,lights_physical_pars_fragment:Wv,lights_fragment_begin:Xv,lights_fragment_maps:qv,lights_fragment_end:Yv,logdepthbuf_fragment:$v,logdepthbuf_pars_fragment:Kv,logdepthbuf_pars_vertex:Jv,logdepthbuf_vertex:Zv,map_fragment:jv,map_pars_fragment:Qv,map_particle_fragment:ex,map_particle_pars_fragment:tx,metalnessmap_fragment:nx,metalnessmap_pars_fragment:ix,morphcolor_vertex:rx,morphnormal_vertex:sx,morphtarget_pars_vertex:ax,morphtarget_vertex:ox,normal_fragment_begin:lx,normal_fragment_maps:cx,normal_pars_fragment:ux,normal_pars_vertex:hx,normal_vertex:fx,normalmap_pars_fragment:dx,clearcoat_normal_fragment_begin:px,clearcoat_normal_fragment_maps:mx,clearcoat_pars_fragment:_x,iridescence_pars_fragment:gx,opaque_fragment:vx,packing:xx,premultiplied_alpha_fragment:Sx,project_vertex:yx,dithering_fragment:Mx,dithering_pars_fragment:Ex,roughnessmap_fragment:Tx,roughnessmap_pars_fragment:bx,shadowmap_pars_fragment:wx,shadowmap_pars_vertex:Ax,shadowmap_vertex:Rx,shadowmask_pars_fragment:Cx,skinbase_vertex:Px,skinning_pars_vertex:Lx,skinning_vertex:Dx,skinnormal_vertex:Ux,specularmap_fragment:Nx,specularmap_pars_fragment:Ix,tonemapping_fragment:Ox,tonemapping_pars_fragment:Fx,transmission_fragment:kx,transmission_pars_fragment:Bx,uv_pars_fragment:zx,uv_pars_vertex:Hx,uv_vertex:Gx,worldpos_vertex:Vx,background_vert:Wx,background_frag:Xx,backgroundCube_vert:qx,backgroundCube_frag:Yx,cube_vert:$x,cube_frag:Kx,depth_vert:Jx,depth_frag:Zx,distanceRGBA_vert:jx,distanceRGBA_frag:Qx,equirect_vert:eS,equirect_frag:tS,linedashed_vert:nS,linedashed_frag:iS,meshbasic_vert:rS,meshbasic_frag:sS,meshlambert_vert:aS,meshlambert_frag:oS,meshmatcap_vert:lS,meshmatcap_frag:cS,meshnormal_vert:uS,meshnormal_frag:hS,meshphong_vert:fS,meshphong_frag:dS,meshphysical_vert:pS,meshphysical_frag:mS,meshtoon_vert:_S,meshtoon_frag:gS,points_vert:vS,points_frag:xS,shadow_vert:SS,shadow_frag:yS,sprite_vert:MS,sprite_frag:ES},ge={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},ci={basic:{uniforms:hn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:hn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:hn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:hn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:hn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:hn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:hn([ge.points,ge.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:hn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:hn([ge.common,ge.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:hn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:hn([ge.sprite,ge.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:hn([ge.common,ge.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:hn([ge.lights,ge.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};ci.physical={uniforms:hn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const yo={r:0,b:0,g:0};function TS(r,e,t,n,i,s,a){const o=new ot(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(p,m){let M=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),M=!0);const x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||M)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===cl)?(u===void 0&&(u=new si(new Bs(1,1,1),new Hr({name:"BackgroundCubeMaterial",uniforms:Os(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=pt.getTransfer(v.colorSpace)!==St,(h!==v||f!==v.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new si(new Nu(2,2),new Hr({name:"BackgroundMaterial",uniforms:Os(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:sr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=pt.getTransfer(v.colorSpace)!==St,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(yo,jp(r)),n.buffers.color.setClear(yo.r,yo.g,yo.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),l=m,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function bS(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,u=!1;function h(P,k,H,V,q){let $=!1;if(a){const C=_(V,H,k);c!==C&&(c=C,d(c.object)),$=m(P,V,H,q),$&&M(P,V,H,q)}else{const C=k.wireframe===!0;(c.geometry!==V.id||c.program!==H.id||c.wireframe!==C)&&(c.geometry=V.id,c.program=H.id,c.wireframe=C,$=!0)}q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),($||u)&&(u=!1,D(P,k,H,V),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(P){return n.isWebGL2?r.bindVertexArray(P):s.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?r.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,k,H){const V=H.wireframe===!0;let q=o[P.id];q===void 0&&(q={},o[P.id]=q);let $=q[k.id];$===void 0&&($={},q[k.id]=$);let C=$[V];return C===void 0&&(C=p(f()),$[V]=C),C}function p(P){const k=[],H=[],V=[];for(let q=0;q<i;q++)k[q]=0,H[q]=0,V[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:H,attributeDivisors:V,object:P,attributes:{},index:null}}function m(P,k,H,V){const q=c.attributes,$=k.attributes;let C=0;const Q=H.getAttributes();for(const ae in Q)if(Q[ae].location>=0){const j=q[ae];let le=$[ae];if(le===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),j===void 0||j.attribute!==le||le&&j.data!==le.data)return!0;C++}return c.attributesNum!==C||c.index!==V}function M(P,k,H,V){const q={},$=k.attributes;let C=0;const Q=H.getAttributes();for(const ae in Q)if(Q[ae].location>=0){let j=$[ae];j===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(j=P.instanceColor));const le={};le.attribute=j,j&&j.data&&(le.data=j.data),q[ae]=le,C++}c.attributes=q,c.attributesNum=C,c.index=V}function v(){const P=c.newAttributes;for(let k=0,H=P.length;k<H;k++)P[k]=0}function x(P){R(P,0)}function R(P,k){const H=c.newAttributes,V=c.enabledAttributes,q=c.attributeDivisors;H[P]=1,V[P]===0&&(r.enableVertexAttribArray(P),V[P]=1),q[P]!==k&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,k),q[P]=k)}function w(){const P=c.newAttributes,k=c.enabledAttributes;for(let H=0,V=k.length;H<V;H++)k[H]!==P[H]&&(r.disableVertexAttribArray(H),k[H]=0)}function E(P,k,H,V,q,$,C){C===!0?r.vertexAttribIPointer(P,k,H,q,$):r.vertexAttribPointer(P,k,H,V,q,$)}function D(P,k,H,V){if(n.isWebGL2===!1&&(P.isInstancedMesh||V.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const q=V.attributes,$=H.getAttributes(),C=k.defaultAttributeValues;for(const Q in $){const ae=$[Q];if(ae.location>=0){let Y=q[Q];if(Y===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),Y!==void 0){const j=Y.normalized,le=Y.itemSize,ye=t.get(Y);if(ye===void 0)continue;const ce=ye.buffer,Ae=ye.type,Ue=ye.bytesPerElement,Ee=n.isWebGL2===!0&&(Ae===r.INT||Ae===r.UNSIGNED_INT||Y.gpuType===Np);if(Y.isInterleavedBufferAttribute){const De=Y.data,L=De.stride,ee=Y.offset;if(De.isInstancedInterleavedBuffer){for(let K=0;K<ae.locationSize;K++)R(ae.location+K,De.meshPerAttribute);P.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=De.meshPerAttribute*De.count)}else for(let K=0;K<ae.locationSize;K++)x(ae.location+K);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let K=0;K<ae.locationSize;K++)E(ae.location+K,le/ae.locationSize,Ae,j,L*Ue,(ee+le/ae.locationSize*K)*Ue,Ee)}else{if(Y.isInstancedBufferAttribute){for(let De=0;De<ae.locationSize;De++)R(ae.location+De,Y.meshPerAttribute);P.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let De=0;De<ae.locationSize;De++)x(ae.location+De);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let De=0;De<ae.locationSize;De++)E(ae.location+De,le/ae.locationSize,Ae,j,le*Ue,le/ae.locationSize*De*Ue,Ee)}}else if(C!==void 0){const j=C[Q];if(j!==void 0)switch(j.length){case 2:r.vertexAttrib2fv(ae.location,j);break;case 3:r.vertexAttrib3fv(ae.location,j);break;case 4:r.vertexAttrib4fv(ae.location,j);break;default:r.vertexAttrib1fv(ae.location,j)}}}}w()}function S(){I();for(const P in o){const k=o[P];for(const H in k){const V=k[H];for(const q in V)g(V[q].object),delete V[q];delete k[H]}delete o[P]}}function y(P){if(o[P.id]===void 0)return;const k=o[P.id];for(const H in k){const V=k[H];for(const q in V)g(V[q].object),delete V[q];delete k[H]}delete o[P.id]}function U(P){for(const k in o){const H=o[k];if(H[P.id]===void 0)continue;const V=H[P.id];for(const q in V)g(V[q].object),delete V[q];delete H[P.id]}}function I(){J(),u=!0,c!==l&&(c=l,d(c.object))}function J(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:I,resetDefaultState:J,dispose:S,releaseStatesOfGeometry:y,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:x,disableUnusedAttributes:w}}function wS(r,e,t,n){const i=n.isWebGL2;let s;function a(u){s=u}function o(u,h){r.drawArrays(s,u,h),t.update(h,s,1)}function l(u,h,f){if(f===0)return;let d,g;if(i)d=r,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](s,u,h,f),t.update(h,s,f)}function c(u,h,f){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(s,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];t.update(g,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function AS(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,x=a||e.has("OES_texture_float"),R=v&&x,w=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:R,maxSamples:w}}function RS(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new xr,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||g===null||g.length===0||s&&!p)s?u(null):c();else{const M=s?0:n,v=M*4;let x=m.clippingState||null;l.value=x,x=u(g,f,v,d);for(let R=0;R!==v;++R)x[R]=t[R];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,x=d;v!==_;++v,x+=4)a.copy(h[v]).applyMatrix4(M,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function CS(r){let e=new WeakMap;function t(a,o){return o===Vc?a.mapping=Us:o===Wc&&(a.mapping=Ns),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Vc||o===Wc)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new H0(l.height/2);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class nm extends Qp{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ms=4,Cf=[.125,.215,.35,.446,.526,.582],Mr=20,rc=new nm,Pf=new ot;let sc=null,ac=0,oc=0;const Sr=(1+Math.sqrt(5))/2,cs=1/Sr,Lf=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,Sr,cs),new O(0,Sr,-cs),new O(cs,0,Sr),new O(-cs,0,Sr),new O(Sr,cs,0),new O(-Sr,cs,0)];class Df{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){sc=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=If(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sc,ac,oc),e.scissorTest=!1,Mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Us||e.mapping===Ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sc=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:Ua,format:ri,colorSpace:Ui,depthBuffer:!1},i=Uf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uf(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=PS(s)),this._blurMaterial=LS(s,e,t)}return i}_compileMaterial(e){const t=new si(this._lodPlanes[0],e);this._renderer.compile(t,rc)}_sceneToCubeUV(e,t,n,i){const o=new Nn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Pf),u.toneMapping=Qi,u.autoClear=!1;const d=new Du({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1}),g=new si(new Bs,d);let _=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,_=!0):(d.color.copy(Pf),_=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const v=this._cubeSize;Mo(i,M*v,m>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Us||e.mapping===Ns;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=If()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nf());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new si(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Mo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,rc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Lf[(i-1)%Lf.length];this._blur(e,i-1,i,s,a)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new si(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Mr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):Mr;p>Mr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Mr}`);const m=[];let M=0;for(let E=0;E<Mr;++E){const D=E/_,S=Math.exp(-D*D/2);m.push(S),E===0?M+=S:E<p&&(M+=2*S)}for(let E=0;E<m.length;E++)m[E]=m[E]/M;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const x=this._sizeLods[i],R=3*x*(i>v-ms?i-v+ms:0),w=4*(this._cubeSize-x);Mo(t,R,w,3*x,2*x),l.setRenderTarget(t),l.render(h,rc)}}function PS(r){const e=[],t=[],n=[];let i=r;const s=r-ms+1+Cf.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-ms?l=Cf[a-r+ms-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,p=2,m=1,M=new Float32Array(_*g*d),v=new Float32Array(p*g*d),x=new Float32Array(m*g*d);for(let w=0;w<d;w++){const E=w%3*2/3-1,D=w>2?0:-1,S=[E,D,0,E+2/3,D,0,E+2/3,D+1,0,E,D,0,E+2/3,D+1,0,E,D+1,0];M.set(S,_*g*w),v.set(f,p*g*w);const y=[w,w,w,w,w,w];x.set(y,m*g*w)}const R=new ai;R.setAttribute("position",new pi(M,_)),R.setAttribute("uv",new pi(v,p)),R.setAttribute("faceIndex",new pi(x,m)),e.push(R),i>ms&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Uf(r,e,t){const n=new zr(r,e,t);return n.texture.mapping=cl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function LS(r,e,t){const n=new Float32Array(Mr),i=new O(0,1,0);return new Hr({name:"SphericalGaussianBlur",defines:{n:Mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Nf(){return new Hr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function If(){return new Hr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Iu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function DS(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Vc||l===Wc,u=l===Us||l===Ns;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Df(r)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new Df(r));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function US(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function NS(r,e,t,n){const i={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],r.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let v=0,x=M.length;v<x;v+=3){const R=M[v+0],w=M[v+1],E=M[v+2];f.push(R,w,w,E,E,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let v=0,x=M.length/3-1;v<x;v+=3){const R=v+0,w=v+1,E=v+2;f.push(R,w,w,E,E,R)}}else return;const p=new(Wp(f)?Zp:Jp)(f,1);p.version=_;const m=s.get(h);m&&e.remove(m),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function IS(r,e,t,n){const i=n.isWebGL2;let s;function a(d){s=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function u(d,g){r.drawElements(s,g,o,d*l),t.update(g,s,1)}function h(d,g,_){if(_===0)return;let p,m;if(i)p=r,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,g,o,d*l,_),t.update(g,s,_)}function f(d,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(d[m]/l,g[m]);else{p.multiDrawElementsWEBGL(s,g,0,o,d,0,_);let m=0;for(let M=0;M<_;M++)m+=g[M];t.update(m,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function OS(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function FS(r,e){return r[0]-e[0]}function kS(r,e){return Math.abs(e[1])-Math.abs(r[1])}function BS(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,a=new Et,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(u);if(p===void 0||p.count!==_){let k=function(){J.dispose(),s.delete(u),u.removeEventListener("dispose",k)};var d=k;p!==void 0&&p.texture.dispose();const v=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],D=u.morphAttributes.color||[];let S=0;v===!0&&(S=1),x===!0&&(S=2),R===!0&&(S=3);let y=u.attributes.position.count*S,U=1;y>e.maxTextureSize&&(U=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const I=new Float32Array(y*U*4*_),J=new Yp(I,y,U,_);J.type=qi,J.needsUpdate=!0;const P=S*4;for(let H=0;H<_;H++){const V=w[H],q=E[H],$=D[H],C=y*U*4*H;for(let Q=0;Q<V.count;Q++){const ae=Q*P;v===!0&&(a.fromBufferAttribute(V,Q),I[C+ae+0]=a.x,I[C+ae+1]=a.y,I[C+ae+2]=a.z,I[C+ae+3]=0),x===!0&&(a.fromBufferAttribute(q,Q),I[C+ae+4]=a.x,I[C+ae+5]=a.y,I[C+ae+6]=a.z,I[C+ae+7]=0),R===!0&&(a.fromBufferAttribute($,Q),I[C+ae+8]=a.x,I[C+ae+9]=a.y,I[C+ae+10]=a.z,I[C+ae+11]=$.itemSize===4?a.w:1)}}p={count:_,texture:J,size:new xe(y,U)},s.set(u,p),u.addEventListener("dispose",k)}let m=0;for(let v=0;v<f.length;v++)m+=f[v];const M=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(r,"morphTargetBaseInfluence",M),h.getUniforms().setValue(r,"morphTargetInfluences",f),h.getUniforms().setValue(r,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let x=0;x<g;x++)_[x]=[x,0];n[u.id]=_}for(let x=0;x<g;x++){const R=_[x];R[0]=x,R[1]=f[x]}_.sort(kS);for(let x=0;x<8;x++)x<g&&_[x][1]?(o[x][0]=_[x][0],o[x][1]=_[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(FS);const p=u.morphAttributes.position,m=u.morphAttributes.normal;let M=0;for(let x=0;x<8;x++){const R=o[x],w=R[0],E=R[1];w!==Number.MAX_SAFE_INTEGER&&E?(p&&u.getAttribute("morphTarget"+x)!==p[w]&&u.setAttribute("morphTarget"+x,p[w]),m&&u.getAttribute("morphNormal"+x)!==m[w]&&u.setAttribute("morphNormal"+x,m[w]),i[x]=E,M+=E):(p&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),m&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const v=u.morphTargetsRelative?1:1-M;h.getUniforms().setValue(r,"morphTargetBaseInfluence",v),h.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function zS(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class im extends Bn{constructor(e,t,n,i,s,a,o,l,c,u){if(u=u!==void 0?u:Nr,u!==Nr&&u!==Is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Nr&&(n=Xi),n===void 0&&u===Is&&(n=Ur),super(null,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:mn,this.minFilter=l!==void 0?l:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const rm=new Bn,sm=new im(1,1);sm.compareFunction=Vp;const am=new Yp,om=new E0,lm=new em,Of=[],Ff=[],kf=new Float32Array(16),Bf=new Float32Array(9),zf=new Float32Array(4);function zs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Of[i];if(s===void 0&&(s=new Float32Array(i),Of[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Ht(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Gt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function fl(r,e){let t=Ff[e];t===void 0&&(t=new Int32Array(e),Ff[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function HS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function GS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;r.uniform2fv(this.addr,e),Gt(t,e)}}function VS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;r.uniform3fv(this.addr,e),Gt(t,e)}}function WS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;r.uniform4fv(this.addr,e),Gt(t,e)}}function XS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,n))return;zf.set(n),r.uniformMatrix2fv(this.addr,!1,zf),Gt(t,n)}}function qS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,n))return;Bf.set(n),r.uniformMatrix3fv(this.addr,!1,Bf),Gt(t,n)}}function YS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Ht(t,n))return;kf.set(n),r.uniformMatrix4fv(this.addr,!1,kf),Gt(t,n)}}function $S(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function KS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;r.uniform2iv(this.addr,e),Gt(t,e)}}function JS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;r.uniform3iv(this.addr,e),Gt(t,e)}}function ZS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;r.uniform4iv(this.addr,e),Gt(t,e)}}function jS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function QS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;r.uniform2uiv(this.addr,e),Gt(t,e)}}function ey(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;r.uniform3uiv(this.addr,e),Gt(t,e)}}function ty(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;r.uniform4uiv(this.addr,e),Gt(t,e)}}function ny(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?sm:rm;t.setTexture2D(e||s,i)}function iy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||om,i)}function ry(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||lm,i)}function sy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||am,i)}function ay(r){switch(r){case 5126:return HS;case 35664:return GS;case 35665:return VS;case 35666:return WS;case 35674:return XS;case 35675:return qS;case 35676:return YS;case 5124:case 35670:return $S;case 35667:case 35671:return KS;case 35668:case 35672:return JS;case 35669:case 35673:return ZS;case 5125:return jS;case 36294:return QS;case 36295:return ey;case 36296:return ty;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return iy;case 35680:case 36300:case 36308:case 36293:return ry;case 36289:case 36303:case 36311:case 36292:return sy}}function oy(r,e){r.uniform1fv(this.addr,e)}function ly(r,e){const t=zs(e,this.size,2);r.uniform2fv(this.addr,t)}function cy(r,e){const t=zs(e,this.size,3);r.uniform3fv(this.addr,t)}function uy(r,e){const t=zs(e,this.size,4);r.uniform4fv(this.addr,t)}function hy(r,e){const t=zs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function fy(r,e){const t=zs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function dy(r,e){const t=zs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function py(r,e){r.uniform1iv(this.addr,e)}function my(r,e){r.uniform2iv(this.addr,e)}function _y(r,e){r.uniform3iv(this.addr,e)}function gy(r,e){r.uniform4iv(this.addr,e)}function vy(r,e){r.uniform1uiv(this.addr,e)}function xy(r,e){r.uniform2uiv(this.addr,e)}function Sy(r,e){r.uniform3uiv(this.addr,e)}function yy(r,e){r.uniform4uiv(this.addr,e)}function My(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||rm,s[a])}function Ey(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||om,s[a])}function Ty(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||lm,s[a])}function by(r,e,t){const n=this.cache,i=e.length,s=fl(t,i);Ht(n,s)||(r.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||am,s[a])}function wy(r){switch(r){case 5126:return oy;case 35664:return ly;case 35665:return cy;case 35666:return uy;case 35674:return hy;case 35675:return fy;case 35676:return dy;case 5124:case 35670:return py;case 35667:case 35671:return my;case 35668:case 35672:return _y;case 35669:case 35673:return gy;case 5125:return vy;case 36294:return xy;case 36295:return Sy;case 36296:return yy;case 35678:case 36198:case 36298:case 36306:case 35682:return My;case 35679:case 36299:case 36307:return Ey;case 35680:case 36300:case 36308:case 36293:return Ty;case 36289:case 36303:case 36311:case 36292:return by}}class Ay{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ay(t.type)}}class Ry{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wy(t.type)}}class Cy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const lc=/(\w+)(\])?(\[|\.)?/g;function Hf(r,e){r.seq.push(e),r.map[e.id]=e}function Py(r,e,t){const n=r.name,i=n.length;for(lc.lastIndex=0;;){const s=lc.exec(n),a=lc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Hf(t,c===void 0?new Ay(o,r,e):new Ry(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new Cy(o),Hf(t,h)),t=h}}}class Oo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Py(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Gf(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Ly=37297;let Dy=0;function Uy(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Ny(r){const e=pt.getPrimaries(pt.workingColorSpace),t=pt.getPrimaries(r);let n;switch(e===t?n="":e===el&&t===Qo?n="LinearDisplayP3ToLinearSRGB":e===Qo&&t===el&&(n="LinearSRGBToLinearDisplayP3"),r){case Ui:case ul:return[n,"LinearTransferOETF"];case qt:case Pu:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Vf(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Uy(r.getShaderSource(e),a)}else return i}function Iy(r,e){const t=Ny(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Oy(r,e){let t;switch(e){case qg:t="Linear";break;case Yg:t="Reinhard";break;case $g:t="OptimizedCineon";break;case Kg:t="ACESFilmic";break;case Zg:t="AgX";break;case Jg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Fy(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(_s).join(`
`)}function ky(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(_s).join(`
`)}function By(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zy(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function _s(r){return r!==""}function Wf(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xf(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jc(r){return r.replace(Hy,Vy)}const Gy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Vy(r,e){let t=Ke[e];if(t===void 0){const n=Gy.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Jc(t)}const Wy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qf(r){return r.replace(Wy,Xy)}function Xy(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yf(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qy(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Lp?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Sg?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ei&&(e="SHADOWMAP_TYPE_VSM"),e}function Yy(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Us:case Ns:e="ENVMAP_TYPE_CUBE";break;case cl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function $y(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ns:e="ENVMAP_MODE_REFRACTION";break}return e}function Ky(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Dp:e="ENVMAP_BLENDING_MULTIPLY";break;case Wg:e="ENVMAP_BLENDING_MIX";break;case Xg:e="ENVMAP_BLENDING_ADD";break}return e}function Jy(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Zy(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=qy(t),c=Yy(t),u=$y(t),h=Ky(t),f=Jy(t),d=t.isWebGL2?"":Fy(t),g=ky(t),_=By(s),p=i.createProgram();let m,M,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(_s).join(`
`),m.length>0&&(m+=`
`),M=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(_s).join(`
`),M.length>0&&(M+=`
`)):(m=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),M=[d,Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qi?"#define TONE_MAPPING":"",t.toneMapping!==Qi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Qi?Oy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Iy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_s).join(`
`)),a=Jc(a),a=Wf(a,t),a=Xf(a,t),o=Jc(o),o=Wf(o,t),o=Xf(o,t),a=qf(a),o=qf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===hf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const x=v+m+a,R=v+M+o,w=Gf(i,i.VERTEX_SHADER,x),E=Gf(i,i.FRAGMENT_SHADER,R);i.attachShader(p,w),i.attachShader(p,E),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function D(I){if(r.debug.checkShaderErrors){const J=i.getProgramInfoLog(p).trim(),P=i.getShaderInfoLog(w).trim(),k=i.getShaderInfoLog(E).trim();let H=!0,V=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(H=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,p,w,E);else{const q=Vf(i,w,"vertex"),$=Vf(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+q+`
`+$)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(P===""||k==="")&&(V=!1);V&&(I.diagnostics={runnable:H,programLog:J,vertexShader:{log:P,prefix:m},fragmentShader:{log:k,prefix:M}})}i.deleteShader(w),i.deleteShader(E),S=new Oo(i,p),y=zy(i,p)}let S;this.getUniforms=function(){return S===void 0&&D(this),S};let y;this.getAttributes=function(){return y===void 0&&D(this),y};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(p,Ly)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dy++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=E,this}let jy=0;class Qy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new eM(e),t.set(e,n)),n}}class eM{constructor(e){this.id=jy++,this.code=e,this.usedTimes=0}}function tM(r,e,t,n,i,s,a){const o=new $p,l=new Qy,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,y,U,I,J){const P=I.fog,k=J.geometry,H=S.isMeshStandardMaterial?I.environment:null,V=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),q=V&&V.mapping===cl?V.image.height:null,$=g[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const C=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Q=C!==void 0?C.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let Y,j,le,ye;if($){const Te=ci[$];Y=Te.vertexShader,j=Te.fragmentShader}else Y=S.vertexShader,j=S.fragmentShader,l.update(S),le=l.getVertexShaderID(S),ye=l.getFragmentShaderID(S);const ce=r.getRenderTarget(),Ae=J.isInstancedMesh===!0,Ue=J.isBatchedMesh===!0,Ee=!!S.map,De=!!S.matcap,L=!!V,ee=!!S.aoMap,K=!!S.lightMap,se=!!S.bumpMap,Z=!!S.normalMap,F=!!S.displacementMap,me=!!S.emissiveMap,A=!!S.metalnessMap,T=!!S.roughnessMap,B=S.anisotropy>0,ie=S.clearcoat>0,re=S.iridescence>0,te=S.sheen>0,ve=S.transmission>0,_e=B&&!!S.anisotropyMap,he=ie&&!!S.clearcoatMap,Ce=ie&&!!S.clearcoatNormalMap,Be=ie&&!!S.clearcoatRoughnessMap,ne=re&&!!S.iridescenceMap,nt=re&&!!S.iridescenceThicknessMap,Ie=te&&!!S.sheenColorMap,We=te&&!!S.sheenRoughnessMap,Pe=!!S.specularMap,Me=!!S.specularColorMap,Xe=!!S.specularIntensityMap,Qe=ve&&!!S.transmissionMap,lt=ve&&!!S.thicknessMap,Se=!!S.gradientMap,ue=!!S.alphaMap,N=S.alphaTest>0,fe=!!S.alphaHash,de=!!S.extensions,ze=!!k.attributes.uv1,Fe=!!k.attributes.uv2,rt=!!k.attributes.uv3;let at=Qi;return S.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(at=r.toneMapping),{isWebGL2:u,shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:Y,fragmentShader:j,defines:S.defines,customVertexShaderID:le,customFragmentShaderID:ye,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Ue,instancing:Ae,instancingColor:Ae&&J.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ce===null?r.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Ui,map:Ee,matcap:De,envMap:L,envMapMode:L&&V.mapping,envMapCubeUVHeight:q,aoMap:ee,lightMap:K,bumpMap:se,normalMap:Z,displacementMap:f&&F,emissiveMap:me,normalMapObjectSpace:Z&&S.normalMapType===c0,normalMapTangentSpace:Z&&S.normalMapType===Gp,metalnessMap:A,roughnessMap:T,anisotropy:B,anisotropyMap:_e,clearcoat:ie,clearcoatMap:he,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Be,iridescence:re,iridescenceMap:ne,iridescenceThicknessMap:nt,sheen:te,sheenColorMap:Ie,sheenRoughnessMap:We,specularMap:Pe,specularColorMap:Me,specularIntensityMap:Xe,transmission:ve,transmissionMap:Qe,thicknessMap:lt,gradientMap:Se,opaque:S.transparent===!1&&S.blending===bs,alphaMap:ue,alphaTest:N,alphaHash:fe,combine:S.combine,mapUv:Ee&&_(S.map.channel),aoMapUv:ee&&_(S.aoMap.channel),lightMapUv:K&&_(S.lightMap.channel),bumpMapUv:se&&_(S.bumpMap.channel),normalMapUv:Z&&_(S.normalMap.channel),displacementMapUv:F&&_(S.displacementMap.channel),emissiveMapUv:me&&_(S.emissiveMap.channel),metalnessMapUv:A&&_(S.metalnessMap.channel),roughnessMapUv:T&&_(S.roughnessMap.channel),anisotropyMapUv:_e&&_(S.anisotropyMap.channel),clearcoatMapUv:he&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:We&&_(S.sheenRoughnessMap.channel),specularMapUv:Pe&&_(S.specularMap.channel),specularColorMapUv:Me&&_(S.specularColorMap.channel),specularIntensityMapUv:Xe&&_(S.specularIntensityMap.channel),transmissionMapUv:Qe&&_(S.transmissionMap.channel),thicknessMapUv:lt&&_(S.thicknessMap.channel),alphaMapUv:ue&&_(S.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Z||B),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:ze,vertexUv2s:Fe,vertexUv3s:rt,pointsUvs:J.isPoints===!0&&!!k.attributes.uv&&(Ee||ue),fog:!!P,useFog:S.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:J.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ae,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:at,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ee&&S.map.isVideoTexture===!0&&pt.getTransfer(S.map.colorSpace)===St,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ai,flipSided:S.side===bn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:de&&S.extensions.derivatives===!0,extensionFragDepth:de&&S.extensions.fragDepth===!0,extensionDrawBuffers:de&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:de&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:de&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function m(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)y.push(U),y.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(M(y,S),v(y,S),y.push(r.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function M(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){o.disableAll(),y.isWebGL2&&o.enable(0),y.supportsVertexTextures&&o.enable(1),y.instancing&&o.enable(2),y.instancingColor&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.useLegacyLights&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function x(S){const y=g[S.type];let U;if(y){const I=ci[y];U=F0.clone(I.uniforms)}else U=S.uniforms;return U}function R(S,y){let U;for(let I=0,J=c.length;I<J;I++){const P=c[I];if(P.cacheKey===y){U=P,++U.usedTimes;break}}return U===void 0&&(U=new Zy(r,y,S,s),c.push(U)),U}function w(S){if(--S.usedTimes===0){const y=c.indexOf(S);c[y]=c[c.length-1],c.pop(),S.destroy()}}function E(S){l.remove(S)}function D(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:x,acquireProgram:R,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:D}}function nM(){let r=new WeakMap;function e(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function t(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function iM(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function $f(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Kf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h,f,d,g,_,p){let m=r[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},r[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=p),e++,m}function o(h,f,d,g,_,p){const m=a(h,f,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(h,f,d,g,_,p){const m=a(h,f,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||iM),n.length>1&&n.sort(f||$f),i.length>1&&i.sort(f||$f)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function rM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Kf,r.set(n,[a])):i>=s.length?(a=new Kf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function sM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new ot};break;case"SpotLight":t={position:new O,direction:new O,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new O,halfWidth:new O,halfHeight:new O};break}return r[e.id]=t,t}}}function aM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let oM=0;function lM(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function cM(r,e){const t=new sM,n=aM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new O);const s=new O,a=new Ut,o=new Ut;function l(u,h){let f=0,d=0,g=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let _=0,p=0,m=0,M=0,v=0,x=0,R=0,w=0,E=0,D=0,S=0;u.sort(lM);const y=h===!0?Math.PI:1;for(let I=0,J=u.length;I<J;I++){const P=u[I],k=P.color,H=P.intensity,V=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=k.r*H*y,d+=k.g*H*y,g+=k.b*H*y;else if(P.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(P.sh.coefficients[$],H);S++}else if(P.isDirectionalLight){const $=t.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity*y),P.castShadow){const C=P.shadow,Q=n.get(P);Q.shadowBias=C.bias,Q.shadowNormalBias=C.normalBias,Q.shadowRadius=C.radius,Q.shadowMapSize=C.mapSize,i.directionalShadow[_]=Q,i.directionalShadowMap[_]=q,i.directionalShadowMatrix[_]=P.shadow.matrix,x++}i.directional[_]=$,_++}else if(P.isSpotLight){const $=t.get(P);$.position.setFromMatrixPosition(P.matrixWorld),$.color.copy(k).multiplyScalar(H*y),$.distance=V,$.coneCos=Math.cos(P.angle),$.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),$.decay=P.decay,i.spot[m]=$;const C=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,C.updateMatrices(P),P.castShadow&&D++),i.spotLightMatrix[m]=C.matrix,P.castShadow){const Q=n.get(P);Q.shadowBias=C.bias,Q.shadowNormalBias=C.normalBias,Q.shadowRadius=C.radius,Q.shadowMapSize=C.mapSize,i.spotShadow[m]=Q,i.spotShadowMap[m]=q,w++}m++}else if(P.isRectAreaLight){const $=t.get(P);$.color.copy(k).multiplyScalar(H),$.halfWidth.set(P.width*.5,0,0),$.halfHeight.set(0,P.height*.5,0),i.rectArea[M]=$,M++}else if(P.isPointLight){const $=t.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity*y),$.distance=P.distance,$.decay=P.decay,P.castShadow){const C=P.shadow,Q=n.get(P);Q.shadowBias=C.bias,Q.shadowNormalBias=C.normalBias,Q.shadowRadius=C.radius,Q.shadowMapSize=C.mapSize,Q.shadowCameraNear=C.camera.near,Q.shadowCameraFar=C.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=q,i.pointShadowMatrix[p]=P.shadow.matrix,R++}i.point[p]=$,p++}else if(P.isHemisphereLight){const $=t.get(P);$.skyColor.copy(P.color).multiplyScalar(H*y),$.groundColor.copy(P.groundColor).multiplyScalar(H*y),i.hemi[v]=$,v++}}M>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;const U=i.hash;(U.directionalLength!==_||U.pointLength!==p||U.spotLength!==m||U.rectAreaLength!==M||U.hemiLength!==v||U.numDirectionalShadows!==x||U.numPointShadows!==R||U.numSpotShadows!==w||U.numSpotMaps!==E||U.numLightProbes!==S)&&(i.directional.length=_,i.spot.length=m,i.rectArea.length=M,i.point.length=p,i.hemi.length=v,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=w+E-D,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=S,U.directionalLength=_,U.pointLength=p,U.spotLength=m,U.rectAreaLength=M,U.hemiLength=v,U.numDirectionalShadows=x,U.numPointShadows=R,U.numSpotShadows=w,U.numSpotMaps=E,U.numLightProbes=S,i.version=oM++)}function c(u,h){let f=0,d=0,g=0,_=0,p=0;const m=h.matrixWorldInverse;for(let M=0,v=u.length;M<v;M++){const x=u[M];if(x.isDirectionalLight){const R=i.directional[f];R.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(m),f++}else if(x.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(x.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(m),g++}else if(x.isRectAreaLight){const R=i.rectArea[_];R.position.setFromMatrixPosition(x.matrixWorld),R.position.applyMatrix4(m),o.identity(),a.copy(x.matrixWorld),a.premultiply(m),o.extractRotation(a),R.halfWidth.set(x.width*.5,0,0),R.halfHeight.set(0,x.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const R=i.point[d];R.position.setFromMatrixPosition(x.matrixWorld),R.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const R=i.hemi[p];R.direction.setFromMatrixPosition(x.matrixWorld),R.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function Jf(r,e){const t=new cM(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function uM(r,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Jf(r,e),t.set(s,[l])):a>=o.length?(l=new Jf(r,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class hM extends za{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=o0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fM extends za{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const dM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mM(r,e,t){let n=new Uu;const i=new xe,s=new xe,a=new Et,o=new hM({depthPacking:l0}),l=new fM,c={},u=t.maxTextureSize,h={[sr]:bn,[bn]:sr,[Ai]:Ai},f=new Hr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:dM,fragmentShader:pM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new ai;g.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new si(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lp;let m=this.type;this.render=function(w,E,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const S=r.getRenderTarget(),y=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),I=r.state;I.setBlending(ji),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const J=m!==Ei&&this.type===Ei,P=m===Ei&&this.type!==Ei;for(let k=0,H=w.length;k<H;k++){const V=w[k],q=V.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const $=q.getFrameExtents();if(i.multiply($),s.copy(q.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/$.x),i.x=s.x*$.x,q.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/$.y),i.y=s.y*$.y,q.mapSize.y=s.y)),q.map===null||J===!0||P===!0){const Q=this.type!==Ei?{minFilter:mn,magFilter:mn}:{};q.map!==null&&q.map.dispose(),q.map=new zr(i.x,i.y,Q),q.map.texture.name=V.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const C=q.getViewportCount();for(let Q=0;Q<C;Q++){const ae=q.getViewport(Q);a.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),I.viewport(a),q.updateMatrices(V,Q),n=q.getFrustum(),x(E,D,q.camera,V,this.type)}q.isPointLightShadow!==!0&&this.type===Ei&&M(q,D),q.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(S,y,U)};function M(w,E){const D=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new zr(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(E,null,D,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(E,null,D,d,_,null)}function v(w,E,D,S){let y=null;const U=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)y=U;else if(y=D.isPointLight===!0?l:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const I=y.uuid,J=E.uuid;let P=c[I];P===void 0&&(P={},c[I]=P);let k=P[J];k===void 0&&(k=y.clone(),P[J]=k,E.addEventListener("dispose",R)),y=k}if(y.visible=E.visible,y.wireframe=E.wireframe,S===Ei?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:h[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=r.properties.get(y);I.light=D}return y}function x(w,E,D,S,y){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Ei)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const J=e.update(w),P=w.material;if(Array.isArray(P)){const k=J.groups;for(let H=0,V=k.length;H<V;H++){const q=k[H],$=P[q.materialIndex];if($&&$.visible){const C=v(w,$,S,y);w.onBeforeShadow(r,w,E,D,J,C,q),r.renderBufferDirect(D,null,J,C,w,q),w.onAfterShadow(r,w,E,D,J,C,q)}}}else if(P.visible){const k=v(w,P,S,y);w.onBeforeShadow(r,w,E,D,J,k,null),r.renderBufferDirect(D,null,J,k,w,null),w.onAfterShadow(r,w,E,D,J,k,null)}}const I=w.children;for(let J=0,P=I.length;J<P;J++)x(I[J],E,D,S,y)}function R(w){w.target.removeEventListener("dispose",R);for(const D in c){const S=c[D],y=w.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}function _M(r,e,t){const n=t.isWebGL2;function i(){let N=!1;const fe=new Et;let de=null;const ze=new Et(0,0,0,0);return{setMask:function(Fe){de!==Fe&&!N&&(r.colorMask(Fe,Fe,Fe,Fe),de=Fe)},setLocked:function(Fe){N=Fe},setClear:function(Fe,rt,at,Le,Te){Te===!0&&(Fe*=Le,rt*=Le,at*=Le),fe.set(Fe,rt,at,Le),ze.equals(fe)===!1&&(r.clearColor(Fe,rt,at,Le),ze.copy(fe))},reset:function(){N=!1,de=null,ze.set(-1,0,0,0)}}}function s(){let N=!1,fe=null,de=null,ze=null;return{setTest:function(Fe){Fe?Ue(r.DEPTH_TEST):Ee(r.DEPTH_TEST)},setMask:function(Fe){fe!==Fe&&!N&&(r.depthMask(Fe),fe=Fe)},setFunc:function(Fe){if(de!==Fe){switch(Fe){case Fg:r.depthFunc(r.NEVER);break;case kg:r.depthFunc(r.ALWAYS);break;case Bg:r.depthFunc(r.LESS);break;case Zo:r.depthFunc(r.LEQUAL);break;case zg:r.depthFunc(r.EQUAL);break;case Hg:r.depthFunc(r.GEQUAL);break;case Gg:r.depthFunc(r.GREATER);break;case Vg:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}de=Fe}},setLocked:function(Fe){N=Fe},setClear:function(Fe){ze!==Fe&&(r.clearDepth(Fe),ze=Fe)},reset:function(){N=!1,fe=null,de=null,ze=null}}}function a(){let N=!1,fe=null,de=null,ze=null,Fe=null,rt=null,at=null,Le=null,Te=null;return{setTest:function(Oe){N||(Oe?Ue(r.STENCIL_TEST):Ee(r.STENCIL_TEST))},setMask:function(Oe){fe!==Oe&&!N&&(r.stencilMask(Oe),fe=Oe)},setFunc:function(Oe,oe,He){(de!==Oe||ze!==oe||Fe!==He)&&(r.stencilFunc(Oe,oe,He),de=Oe,ze=oe,Fe=He)},setOp:function(Oe,oe,He){(rt!==Oe||at!==oe||Le!==He)&&(r.stencilOp(Oe,oe,He),rt=Oe,at=oe,Le=He)},setLocked:function(Oe){N=Oe},setClear:function(Oe){Te!==Oe&&(r.clearStencil(Oe),Te=Oe)},reset:function(){N=!1,fe=null,de=null,ze=null,Fe=null,rt=null,at=null,Le=null,Te=null}}}const o=new i,l=new s,c=new a,u=new WeakMap,h=new WeakMap;let f={},d={},g=new WeakMap,_=[],p=null,m=!1,M=null,v=null,x=null,R=null,w=null,E=null,D=null,S=new ot(0,0,0),y=0,U=!1,I=null,J=null,P=null,k=null,H=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,$=0;const C=r.getParameter(r.VERSION);C.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(C)[1]),q=$>=1):C.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(C)[1]),q=$>=2);let Q=null,ae={};const Y=r.getParameter(r.SCISSOR_BOX),j=r.getParameter(r.VIEWPORT),le=new Et().fromArray(Y),ye=new Et().fromArray(j);function ce(N,fe,de,ze){const Fe=new Uint8Array(4),rt=r.createTexture();r.bindTexture(N,rt),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let at=0;at<de;at++)n&&(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)?r.texImage3D(fe,0,r.RGBA,1,1,ze,0,r.RGBA,r.UNSIGNED_BYTE,Fe):r.texImage2D(fe+at,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Fe);return rt}const Ae={};Ae[r.TEXTURE_2D]=ce(r.TEXTURE_2D,r.TEXTURE_2D,1),Ae[r.TEXTURE_CUBE_MAP]=ce(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ae[r.TEXTURE_2D_ARRAY]=ce(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ae[r.TEXTURE_3D]=ce(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(r.DEPTH_TEST),l.setFunc(Zo),me(!1),A(Ph),Ue(r.CULL_FACE),Z(ji);function Ue(N){f[N]!==!0&&(r.enable(N),f[N]=!0)}function Ee(N){f[N]!==!1&&(r.disable(N),f[N]=!1)}function De(N,fe){return d[N]!==fe?(r.bindFramebuffer(N,fe),d[N]=fe,n&&(N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=fe),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=fe)),!0):!1}function L(N,fe){let de=_,ze=!1;if(N)if(de=g.get(fe),de===void 0&&(de=[],g.set(fe,de)),N.isWebGLMultipleRenderTargets){const Fe=N.texture;if(de.length!==Fe.length||de[0]!==r.COLOR_ATTACHMENT0){for(let rt=0,at=Fe.length;rt<at;rt++)de[rt]=r.COLOR_ATTACHMENT0+rt;de.length=Fe.length,ze=!0}}else de[0]!==r.COLOR_ATTACHMENT0&&(de[0]=r.COLOR_ATTACHMENT0,ze=!0);else de[0]!==r.BACK&&(de[0]=r.BACK,ze=!0);ze&&(t.isWebGL2?r.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function ee(N){return p!==N?(r.useProgram(N),p=N,!0):!1}const K={[yr]:r.FUNC_ADD,[Mg]:r.FUNC_SUBTRACT,[Eg]:r.FUNC_REVERSE_SUBTRACT};if(n)K[Nh]=r.MIN,K[Ih]=r.MAX;else{const N=e.get("EXT_blend_minmax");N!==null&&(K[Nh]=N.MIN_EXT,K[Ih]=N.MAX_EXT)}const se={[Tg]:r.ZERO,[bg]:r.ONE,[wg]:r.SRC_COLOR,[Hc]:r.SRC_ALPHA,[Dg]:r.SRC_ALPHA_SATURATE,[Pg]:r.DST_COLOR,[Rg]:r.DST_ALPHA,[Ag]:r.ONE_MINUS_SRC_COLOR,[Gc]:r.ONE_MINUS_SRC_ALPHA,[Lg]:r.ONE_MINUS_DST_COLOR,[Cg]:r.ONE_MINUS_DST_ALPHA,[Ug]:r.CONSTANT_COLOR,[Ng]:r.ONE_MINUS_CONSTANT_COLOR,[Ig]:r.CONSTANT_ALPHA,[Og]:r.ONE_MINUS_CONSTANT_ALPHA};function Z(N,fe,de,ze,Fe,rt,at,Le,Te,Oe){if(N===ji){m===!0&&(Ee(r.BLEND),m=!1);return}if(m===!1&&(Ue(r.BLEND),m=!0),N!==yg){if(N!==M||Oe!==U){if((v!==yr||w!==yr)&&(r.blendEquation(r.FUNC_ADD),v=yr,w=yr),Oe)switch(N){case bs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Lh:r.blendFunc(r.ONE,r.ONE);break;case Dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case bs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Lh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}x=null,R=null,E=null,D=null,S.set(0,0,0),y=0,M=N,U=Oe}return}Fe=Fe||fe,rt=rt||de,at=at||ze,(fe!==v||Fe!==w)&&(r.blendEquationSeparate(K[fe],K[Fe]),v=fe,w=Fe),(de!==x||ze!==R||rt!==E||at!==D)&&(r.blendFuncSeparate(se[de],se[ze],se[rt],se[at]),x=de,R=ze,E=rt,D=at),(Le.equals(S)===!1||Te!==y)&&(r.blendColor(Le.r,Le.g,Le.b,Te),S.copy(Le),y=Te),M=N,U=!1}function F(N,fe){N.side===Ai?Ee(r.CULL_FACE):Ue(r.CULL_FACE);let de=N.side===bn;fe&&(de=!de),me(de),N.blending===bs&&N.transparent===!1?Z(ji):Z(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),o.setMask(N.colorWrite);const ze=N.stencilWrite;c.setTest(ze),ze&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),B(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Ue(r.SAMPLE_ALPHA_TO_COVERAGE):Ee(r.SAMPLE_ALPHA_TO_COVERAGE)}function me(N){I!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),I=N)}function A(N){N!==vg?(Ue(r.CULL_FACE),N!==J&&(N===Ph?r.cullFace(r.BACK):N===xg?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ee(r.CULL_FACE),J=N}function T(N){N!==P&&(q&&r.lineWidth(N),P=N)}function B(N,fe,de){N?(Ue(r.POLYGON_OFFSET_FILL),(k!==fe||H!==de)&&(r.polygonOffset(fe,de),k=fe,H=de)):Ee(r.POLYGON_OFFSET_FILL)}function ie(N){N?Ue(r.SCISSOR_TEST):Ee(r.SCISSOR_TEST)}function re(N){N===void 0&&(N=r.TEXTURE0+V-1),Q!==N&&(r.activeTexture(N),Q=N)}function te(N,fe,de){de===void 0&&(Q===null?de=r.TEXTURE0+V-1:de=Q);let ze=ae[de];ze===void 0&&(ze={type:void 0,texture:void 0},ae[de]=ze),(ze.type!==N||ze.texture!==fe)&&(Q!==de&&(r.activeTexture(de),Q=de),r.bindTexture(N,fe||Ae[N]),ze.type=N,ze.texture=fe)}function ve(){const N=ae[Q];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function _e(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ce(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Be(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function We(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Me(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Xe(N){le.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),le.copy(N))}function Qe(N){ye.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),ye.copy(N))}function lt(N,fe){let de=h.get(fe);de===void 0&&(de=new WeakMap,h.set(fe,de));let ze=de.get(N);ze===void 0&&(ze=r.getUniformBlockIndex(fe,N.name),de.set(N,ze))}function Se(N,fe){const ze=h.get(fe).get(N);u.get(fe)!==ze&&(r.uniformBlockBinding(fe,ze,N.__bindingPointIndex),u.set(fe,ze))}function ue(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},Q=null,ae={},d={},g=new WeakMap,_=[],p=null,m=!1,M=null,v=null,x=null,R=null,w=null,E=null,D=null,S=new ot(0,0,0),y=0,U=!1,I=null,J=null,P=null,k=null,H=null,le.set(0,0,r.canvas.width,r.canvas.height),ye.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ue,disable:Ee,bindFramebuffer:De,drawBuffers:L,useProgram:ee,setBlending:Z,setMaterial:F,setFlipSided:me,setCullFace:A,setLineWidth:T,setPolygonOffset:B,setScissorTest:ie,activeTexture:re,bindTexture:te,unbindTexture:ve,compressedTexImage2D:_e,compressedTexImage3D:he,texImage2D:Pe,texImage3D:Me,updateUBOMapping:lt,uniformBlockBinding:Se,texStorage2D:Ie,texStorage3D:We,texSubImage2D:Ce,texSubImage3D:Be,compressedTexSubImage2D:ne,compressedTexSubImage3D:nt,scissor:Xe,viewport:Qe,reset:ue}}function gM(r,e,t,n,i,s,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,T){return d?new OffscreenCanvas(A,T):nl("canvas")}function _(A,T,B,ie){let re=1;if((A.width>ie||A.height>ie)&&(re=ie/Math.max(A.width,A.height)),re<1||T===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const te=T?Kc:Math.floor,ve=te(re*A.width),_e=te(re*A.height);h===void 0&&(h=g(ve,_e));const he=B?g(ve,_e):h;return he.width=ve,he.height=_e,he.getContext("2d").drawImage(A,0,0,ve,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+ve+"x"+_e+")."),he}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function p(A){return ff(A.width)&&ff(A.height)}function m(A){return o?!1:A.wrapS!==ii||A.wrapT!==ii||A.minFilter!==mn&&A.minFilter!==Yn}function M(A,T){return A.generateMipmaps&&T&&A.minFilter!==mn&&A.minFilter!==Yn}function v(A){r.generateMipmap(A)}function x(A,T,B,ie,re=!1){if(o===!1)return T;if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let te=T;if(T===r.RED&&(B===r.FLOAT&&(te=r.R32F),B===r.HALF_FLOAT&&(te=r.R16F),B===r.UNSIGNED_BYTE&&(te=r.R8)),T===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(te=r.R8UI),B===r.UNSIGNED_SHORT&&(te=r.R16UI),B===r.UNSIGNED_INT&&(te=r.R32UI),B===r.BYTE&&(te=r.R8I),B===r.SHORT&&(te=r.R16I),B===r.INT&&(te=r.R32I)),T===r.RG&&(B===r.FLOAT&&(te=r.RG32F),B===r.HALF_FLOAT&&(te=r.RG16F),B===r.UNSIGNED_BYTE&&(te=r.RG8)),T===r.RGBA){const ve=re?jo:pt.getTransfer(ie);B===r.FLOAT&&(te=r.RGBA32F),B===r.HALF_FLOAT&&(te=r.RGBA16F),B===r.UNSIGNED_BYTE&&(te=ve===St?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(te=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(te=r.RGB5_A1)}return(te===r.R16F||te===r.R32F||te===r.RG16F||te===r.RG32F||te===r.RGBA16F||te===r.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function R(A,T,B){return M(A,B)===!0||A.isFramebufferTexture&&A.minFilter!==mn&&A.minFilter!==Yn?Math.log2(Math.max(T.width,T.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?T.mipmaps.length:1}function w(A){return A===mn||A===Oh||A===Ul?r.NEAREST:r.LINEAR}function E(A){const T=A.target;T.removeEventListener("dispose",E),S(T),T.isVideoTexture&&u.delete(T)}function D(A){const T=A.target;T.removeEventListener("dispose",D),U(T)}function S(A){const T=n.get(A);if(T.__webglInit===void 0)return;const B=A.source,ie=f.get(B);if(ie){const re=ie[T.__cacheKey];re.usedTimes--,re.usedTimes===0&&y(A),Object.keys(ie).length===0&&f.delete(B)}n.remove(A)}function y(A){const T=n.get(A);r.deleteTexture(T.__webglTexture);const B=A.source,ie=f.get(B);delete ie[T.__cacheKey],a.memory.textures--}function U(A){const T=A.texture,B=n.get(A),ie=n.get(T);if(ie.__webglTexture!==void 0&&(r.deleteTexture(ie.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(B.__webglFramebuffer[re]))for(let te=0;te<B.__webglFramebuffer[re].length;te++)r.deleteFramebuffer(B.__webglFramebuffer[re][te]);else r.deleteFramebuffer(B.__webglFramebuffer[re]);B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer[re])}else{if(Array.isArray(B.__webglFramebuffer))for(let re=0;re<B.__webglFramebuffer.length;re++)r.deleteFramebuffer(B.__webglFramebuffer[re]);else r.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&r.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let re=0;re<B.__webglColorRenderbuffer.length;re++)B.__webglColorRenderbuffer[re]&&r.deleteRenderbuffer(B.__webglColorRenderbuffer[re]);B.__webglDepthRenderbuffer&&r.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let re=0,te=T.length;re<te;re++){const ve=n.get(T[re]);ve.__webglTexture&&(r.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(T[re])}n.remove(T),n.remove(A)}let I=0;function J(){I=0}function P(){const A=I;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),I+=1,A}function k(A){const T=[];return T.push(A.wrapS),T.push(A.wrapT),T.push(A.wrapR||0),T.push(A.magFilter),T.push(A.minFilter),T.push(A.anisotropy),T.push(A.internalFormat),T.push(A.format),T.push(A.type),T.push(A.generateMipmaps),T.push(A.premultiplyAlpha),T.push(A.flipY),T.push(A.unpackAlignment),T.push(A.colorSpace),T.join()}function H(A,T){const B=n.get(A);if(A.isVideoTexture&&F(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const ie=A.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(B,A,T);return}}t.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+T)}function V(A,T){const B=n.get(A);if(A.version>0&&B.__version!==A.version){le(B,A,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+T)}function q(A,T){const B=n.get(A);if(A.version>0&&B.__version!==A.version){le(B,A,T);return}t.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+T)}function $(A,T){const B=n.get(A);if(A.version>0&&B.__version!==A.version){ye(B,A,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+T)}const C={[Xc]:r.REPEAT,[ii]:r.CLAMP_TO_EDGE,[qc]:r.MIRRORED_REPEAT},Q={[mn]:r.NEAREST,[Oh]:r.NEAREST_MIPMAP_NEAREST,[Ul]:r.NEAREST_MIPMAP_LINEAR,[Yn]:r.LINEAR,[jg]:r.LINEAR_MIPMAP_NEAREST,[Da]:r.LINEAR_MIPMAP_LINEAR},ae={[u0]:r.NEVER,[_0]:r.ALWAYS,[h0]:r.LESS,[Vp]:r.LEQUAL,[f0]:r.EQUAL,[m0]:r.GEQUAL,[d0]:r.GREATER,[p0]:r.NOTEQUAL};function Y(A,T,B){if(B?(r.texParameteri(A,r.TEXTURE_WRAP_S,C[T.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,C[T.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,C[T.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,Q[T.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,Q[T.minFilter])):(r.texParameteri(A,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(A,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(T.wrapS!==ii||T.wrapT!==ii)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(A,r.TEXTURE_MAG_FILTER,w(T.magFilter)),r.texParameteri(A,r.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==mn&&T.minFilter!==Yn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,ae[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ie=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===mn||T.minFilter!==Ul&&T.minFilter!==Da||T.type===qi&&e.has("OES_texture_float_linear")===!1||o===!1&&T.type===Ua&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||n.get(T).__currentAnisotropy)&&(r.texParameterf(A,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy)}}function j(A,T){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,T.addEventListener("dispose",E));const ie=T.source;let re=f.get(ie);re===void 0&&(re={},f.set(ie,re));const te=k(T);if(te!==A.__cacheKey){re[te]===void 0&&(re[te]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,B=!0),re[te].usedTimes++;const ve=re[A.__cacheKey];ve!==void 0&&(re[A.__cacheKey].usedTimes--,ve.usedTimes===0&&y(T)),A.__cacheKey=te,A.__webglTexture=re[te].texture}return B}function le(A,T,B){let ie=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ie=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ie=r.TEXTURE_3D);const re=j(A,T),te=T.source;t.bindTexture(ie,A.__webglTexture,r.TEXTURE0+B);const ve=n.get(te);if(te.version!==ve.__version||re===!0){t.activeTexture(r.TEXTURE0+B);const _e=pt.getPrimaries(pt.workingColorSpace),he=T.colorSpace===$n?null:pt.getPrimaries(T.colorSpace),Ce=T.colorSpace===$n||_e===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Be=m(T)&&p(T.image)===!1;let ne=_(T.image,Be,!1,i.maxTextureSize);ne=me(T,ne);const nt=p(ne)||o,Ie=s.convert(T.format,T.colorSpace);let We=s.convert(T.type),Pe=x(T.internalFormat,Ie,We,T.colorSpace,T.isVideoTexture);Y(ie,T,nt);let Me;const Xe=T.mipmaps,Qe=o&&T.isVideoTexture!==!0&&Pe!==zp,lt=ve.__version===void 0||re===!0,Se=R(T,ne,nt);if(T.isDepthTexture)Pe=r.DEPTH_COMPONENT,o?T.type===qi?Pe=r.DEPTH_COMPONENT32F:T.type===Xi?Pe=r.DEPTH_COMPONENT24:T.type===Ur?Pe=r.DEPTH24_STENCIL8:Pe=r.DEPTH_COMPONENT16:T.type===qi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===Nr&&Pe===r.DEPTH_COMPONENT&&T.type!==Cu&&T.type!==Xi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=Xi,We=s.convert(T.type)),T.format===Is&&Pe===r.DEPTH_COMPONENT&&(Pe=r.DEPTH_STENCIL,T.type!==Ur&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Ur,We=s.convert(T.type))),lt&&(Qe?t.texStorage2D(r.TEXTURE_2D,1,Pe,ne.width,ne.height):t.texImage2D(r.TEXTURE_2D,0,Pe,ne.width,ne.height,0,Ie,We,null));else if(T.isDataTexture)if(Xe.length>0&&nt){Qe&&lt&&t.texStorage2D(r.TEXTURE_2D,Se,Pe,Xe[0].width,Xe[0].height);for(let ue=0,N=Xe.length;ue<N;ue++)Me=Xe[ue],Qe?t.texSubImage2D(r.TEXTURE_2D,ue,0,0,Me.width,Me.height,Ie,We,Me.data):t.texImage2D(r.TEXTURE_2D,ue,Pe,Me.width,Me.height,0,Ie,We,Me.data);T.generateMipmaps=!1}else Qe?(lt&&t.texStorage2D(r.TEXTURE_2D,Se,Pe,ne.width,ne.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne.width,ne.height,Ie,We,ne.data)):t.texImage2D(r.TEXTURE_2D,0,Pe,ne.width,ne.height,0,Ie,We,ne.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Qe&&lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Pe,Xe[0].width,Xe[0].height,ne.depth);for(let ue=0,N=Xe.length;ue<N;ue++)Me=Xe[ue],T.format!==ri?Ie!==null?Qe?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ue,0,0,0,Me.width,Me.height,ne.depth,Ie,Me.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ue,Pe,Me.width,Me.height,ne.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?t.texSubImage3D(r.TEXTURE_2D_ARRAY,ue,0,0,0,Me.width,Me.height,ne.depth,Ie,We,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ue,Pe,Me.width,Me.height,ne.depth,0,Ie,We,Me.data)}else{Qe&&lt&&t.texStorage2D(r.TEXTURE_2D,Se,Pe,Xe[0].width,Xe[0].height);for(let ue=0,N=Xe.length;ue<N;ue++)Me=Xe[ue],T.format!==ri?Ie!==null?Qe?t.compressedTexSubImage2D(r.TEXTURE_2D,ue,0,0,Me.width,Me.height,Ie,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,ue,Pe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?t.texSubImage2D(r.TEXTURE_2D,ue,0,0,Me.width,Me.height,Ie,We,Me.data):t.texImage2D(r.TEXTURE_2D,ue,Pe,Me.width,Me.height,0,Ie,We,Me.data)}else if(T.isDataArrayTexture)Qe?(lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Pe,ne.width,ne.height,ne.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,Ie,We,ne.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Pe,ne.width,ne.height,ne.depth,0,Ie,We,ne.data);else if(T.isData3DTexture)Qe?(lt&&t.texStorage3D(r.TEXTURE_3D,Se,Pe,ne.width,ne.height,ne.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,Ie,We,ne.data)):t.texImage3D(r.TEXTURE_3D,0,Pe,ne.width,ne.height,ne.depth,0,Ie,We,ne.data);else if(T.isFramebufferTexture){if(lt)if(Qe)t.texStorage2D(r.TEXTURE_2D,Se,Pe,ne.width,ne.height);else{let ue=ne.width,N=ne.height;for(let fe=0;fe<Se;fe++)t.texImage2D(r.TEXTURE_2D,fe,Pe,ue,N,0,Ie,We,null),ue>>=1,N>>=1}}else if(Xe.length>0&&nt){Qe&&lt&&t.texStorage2D(r.TEXTURE_2D,Se,Pe,Xe[0].width,Xe[0].height);for(let ue=0,N=Xe.length;ue<N;ue++)Me=Xe[ue],Qe?t.texSubImage2D(r.TEXTURE_2D,ue,0,0,Ie,We,Me):t.texImage2D(r.TEXTURE_2D,ue,Pe,Ie,We,Me);T.generateMipmaps=!1}else Qe?(lt&&t.texStorage2D(r.TEXTURE_2D,Se,Pe,ne.width,ne.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ie,We,ne)):t.texImage2D(r.TEXTURE_2D,0,Pe,Ie,We,ne);M(T,nt)&&v(ie),ve.__version=te.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function ye(A,T,B){if(T.image.length!==6)return;const ie=j(A,T),re=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+B);const te=n.get(re);if(re.version!==te.__version||ie===!0){t.activeTexture(r.TEXTURE0+B);const ve=pt.getPrimaries(pt.workingColorSpace),_e=T.colorSpace===$n?null:pt.getPrimaries(T.colorSpace),he=T.colorSpace===$n||ve===_e?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ce=T.isCompressedTexture||T.image[0].isCompressedTexture,Be=T.image[0]&&T.image[0].isDataTexture,ne=[];for(let ue=0;ue<6;ue++)!Ce&&!Be?ne[ue]=_(T.image[ue],!1,!0,i.maxCubemapSize):ne[ue]=Be?T.image[ue].image:T.image[ue],ne[ue]=me(T,ne[ue]);const nt=ne[0],Ie=p(nt)||o,We=s.convert(T.format,T.colorSpace),Pe=s.convert(T.type),Me=x(T.internalFormat,We,Pe,T.colorSpace),Xe=o&&T.isVideoTexture!==!0,Qe=te.__version===void 0||ie===!0;let lt=R(T,nt,Ie);Y(r.TEXTURE_CUBE_MAP,T,Ie);let Se;if(Ce){Xe&&Qe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,lt,Me,nt.width,nt.height);for(let ue=0;ue<6;ue++){Se=ne[ue].mipmaps;for(let N=0;N<Se.length;N++){const fe=Se[N];T.format!==ri?We!==null?Xe?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N,0,0,fe.width,fe.height,We,fe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N,0,0,fe.width,fe.height,We,Pe,fe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N,Me,fe.width,fe.height,0,We,Pe,fe.data)}}}else{Se=T.mipmaps,Xe&&Qe&&(Se.length>0&&lt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,lt,Me,ne[0].width,ne[0].height));for(let ue=0;ue<6;ue++)if(Be){Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,ne[ue].width,ne[ue].height,We,Pe,ne[ue].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Me,ne[ue].width,ne[ue].height,0,We,Pe,ne[ue].data);for(let N=0;N<Se.length;N++){const de=Se[N].image[ue].image;Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N+1,0,0,de.width,de.height,We,Pe,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N+1,Me,de.width,de.height,0,We,Pe,de.data)}}else{Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,We,Pe,ne[ue]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Me,We,Pe,ne[ue]);for(let N=0;N<Se.length;N++){const fe=Se[N];Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N+1,0,0,We,Pe,fe.image[ue]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,N+1,Me,We,Pe,fe.image[ue])}}}M(T,Ie)&&v(r.TEXTURE_CUBE_MAP),te.__version=re.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function ce(A,T,B,ie,re,te){const ve=s.convert(B.format,B.colorSpace),_e=s.convert(B.type),he=x(B.internalFormat,ve,_e,B.colorSpace);if(!n.get(T).__hasExternalTextures){const Be=Math.max(1,T.width>>te),ne=Math.max(1,T.height>>te);re===r.TEXTURE_3D||re===r.TEXTURE_2D_ARRAY?t.texImage3D(re,te,he,Be,ne,T.depth,0,ve,_e,null):t.texImage2D(re,te,he,Be,ne,0,ve,_e,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),Z(T)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ie,re,n.get(B).__webglTexture,0,se(T)):(re===r.TEXTURE_2D||re>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ie,re,n.get(B).__webglTexture,te),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(A,T,B){if(r.bindRenderbuffer(r.RENDERBUFFER,A),T.depthBuffer&&!T.stencilBuffer){let ie=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(B||Z(T)){const re=T.depthTexture;re&&re.isDepthTexture&&(re.type===qi?ie=r.DEPTH_COMPONENT32F:re.type===Xi&&(ie=r.DEPTH_COMPONENT24));const te=se(T);Z(T)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,ie,T.width,T.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,te,ie,T.width,T.height)}else r.renderbufferStorage(r.RENDERBUFFER,ie,T.width,T.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,A)}else if(T.depthBuffer&&T.stencilBuffer){const ie=se(T);B&&Z(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,r.DEPTH24_STENCIL8,T.width,T.height):Z(T)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,r.DEPTH24_STENCIL8,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,A)}else{const ie=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let re=0;re<ie.length;re++){const te=ie[re],ve=s.convert(te.format,te.colorSpace),_e=s.convert(te.type),he=x(te.internalFormat,ve,_e,te.colorSpace),Ce=se(T);B&&Z(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,he,T.width,T.height):Z(T)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ce,he,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,he,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ue(A,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),H(T.depthTexture,0);const ie=n.get(T.depthTexture).__webglTexture,re=se(T);if(T.depthTexture.format===Nr)Z(T)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0,re):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0);else if(T.depthTexture.format===Is)Z(T)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0,re):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ee(A){const T=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!T.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ue(T.__webglFramebuffer,A)}else if(B){T.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ie]),T.__webglDepthbuffer[ie]=r.createRenderbuffer(),Ae(T.__webglDepthbuffer[ie],A,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=r.createRenderbuffer(),Ae(T.__webglDepthbuffer,A,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function De(A,T,B){const ie=n.get(A);T!==void 0&&ce(ie.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Ee(A)}function L(A){const T=A.texture,B=n.get(A),ie=n.get(T);A.addEventListener("dispose",D),A.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=r.createTexture()),ie.__version=T.version,a.memory.textures++);const re=A.isWebGLCubeRenderTarget===!0,te=A.isWebGLMultipleRenderTargets===!0,ve=p(A)||o;if(re){B.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(o&&T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer[_e]=[];for(let he=0;he<T.mipmaps.length;he++)B.__webglFramebuffer[_e][he]=r.createFramebuffer()}else B.__webglFramebuffer[_e]=r.createFramebuffer()}else{if(o&&T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer=[];for(let _e=0;_e<T.mipmaps.length;_e++)B.__webglFramebuffer[_e]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(te)if(i.drawBuffers){const _e=A.texture;for(let he=0,Ce=_e.length;he<Ce;he++){const Be=n.get(_e[he]);Be.__webglTexture===void 0&&(Be.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&Z(A)===!1){const _e=te?T:[T];B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<_e.length;he++){const Ce=_e[he];B.__webglColorRenderbuffer[he]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[he]);const Be=s.convert(Ce.format,Ce.colorSpace),ne=s.convert(Ce.type),nt=x(Ce.internalFormat,Be,ne,Ce.colorSpace,A.isXRRenderTarget===!0),Ie=se(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,nt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,B.__webglColorRenderbuffer[he])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(re){t.bindTexture(r.TEXTURE_CUBE_MAP,ie.__webglTexture),Y(r.TEXTURE_CUBE_MAP,T,ve);for(let _e=0;_e<6;_e++)if(o&&T.mipmaps&&T.mipmaps.length>0)for(let he=0;he<T.mipmaps.length;he++)ce(B.__webglFramebuffer[_e][he],A,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,he);else ce(B.__webglFramebuffer[_e],A,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);M(T,ve)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const _e=A.texture;for(let he=0,Ce=_e.length;he<Ce;he++){const Be=_e[he],ne=n.get(Be);t.bindTexture(r.TEXTURE_2D,ne.__webglTexture),Y(r.TEXTURE_2D,Be,ve),ce(B.__webglFramebuffer,A,Be,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,0),M(Be,ve)&&v(r.TEXTURE_2D)}t.unbindTexture()}else{let _e=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?_e=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(_e,ie.__webglTexture),Y(_e,T,ve),o&&T.mipmaps&&T.mipmaps.length>0)for(let he=0;he<T.mipmaps.length;he++)ce(B.__webglFramebuffer[he],A,T,r.COLOR_ATTACHMENT0,_e,he);else ce(B.__webglFramebuffer,A,T,r.COLOR_ATTACHMENT0,_e,0);M(T,ve)&&v(_e),t.unbindTexture()}A.depthBuffer&&Ee(A)}function ee(A){const T=p(A)||o,B=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ie=0,re=B.length;ie<re;ie++){const te=B[ie];if(M(te,T)){const ve=A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,_e=n.get(te).__webglTexture;t.bindTexture(ve,_e),v(ve),t.unbindTexture()}}}function K(A){if(o&&A.samples>0&&Z(A)===!1){const T=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],B=A.width,ie=A.height;let re=r.COLOR_BUFFER_BIT;const te=[],ve=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=n.get(A),he=A.isWebGLMultipleRenderTargets===!0;if(he)for(let Ce=0;Ce<T.length;Ce++)t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ce=0;Ce<T.length;Ce++){te.push(r.COLOR_ATTACHMENT0+Ce),A.depthBuffer&&te.push(ve);const Be=_e.__ignoreDepthValues!==void 0?_e.__ignoreDepthValues:!1;if(Be===!1&&(A.depthBuffer&&(re|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&(re|=r.STENCIL_BUFFER_BIT)),he&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,_e.__webglColorRenderbuffer[Ce]),Be===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ve]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ve])),he){const ne=n.get(T[Ce]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ne,0)}r.blitFramebuffer(0,0,B,ie,0,0,B,ie,re,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),he)for(let Ce=0;Ce<T.length;Ce++){t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.RENDERBUFFER,_e.__webglColorRenderbuffer[Ce]);const Be=n.get(T[Ce]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.TEXTURE_2D,Be,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}}function se(A){return Math.min(i.maxSamples,A.samples)}function Z(A){const T=n.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function F(A){const T=a.render.frame;u.get(A)!==T&&(u.set(A,T),A.update())}function me(A,T){const B=A.colorSpace,ie=A.format,re=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===Yc||B!==Ui&&B!==$n&&(pt.getTransfer(B)===St?o===!1?e.has("EXT_sRGB")===!0&&ie===ri?(A.format=Yc,A.minFilter=Yn,A.generateMipmaps=!1):T=Xp.sRGBToLinear(T):(ie!==ri||re!==er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),T}this.allocateTextureUnit=P,this.resetTextureUnits=J,this.setTexture2D=H,this.setTexture2DArray=V,this.setTexture3D=q,this.setTextureCube=$,this.rebindTextures=De,this.setupRenderTarget=L,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Z}function vM(r,e,t){const n=t.isWebGL2;function i(s,a=$n){let o;const l=pt.getTransfer(a);if(s===er)return r.UNSIGNED_BYTE;if(s===Ip)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Op)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Qg)return r.BYTE;if(s===e0)return r.SHORT;if(s===Cu)return r.UNSIGNED_SHORT;if(s===Np)return r.INT;if(s===Xi)return r.UNSIGNED_INT;if(s===qi)return r.FLOAT;if(s===Ua)return n?r.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===t0)return r.ALPHA;if(s===ri)return r.RGBA;if(s===n0)return r.LUMINANCE;if(s===i0)return r.LUMINANCE_ALPHA;if(s===Nr)return r.DEPTH_COMPONENT;if(s===Is)return r.DEPTH_STENCIL;if(s===Yc)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===r0)return r.RED;if(s===Fp)return r.RED_INTEGER;if(s===s0)return r.RG;if(s===kp)return r.RG_INTEGER;if(s===Bp)return r.RGBA_INTEGER;if(s===Nl||s===Il||s===Ol||s===Fl)if(l===St)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Nl)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Il)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ol)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Fl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Nl)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Il)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ol)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Fl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Fh||s===kh||s===Bh||s===zh)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Fh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===kh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Bh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===zh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===zp)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Hh||s===Gh)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Hh)return l===St?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Gh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Vh||s===Wh||s===Xh||s===qh||s===Yh||s===$h||s===Kh||s===Jh||s===Zh||s===jh||s===Qh||s===ef||s===tf||s===nf)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Vh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Xh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Yh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$h)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Kh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Jh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Zh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===jh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Qh)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ef)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===tf)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nf)return l===St?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===kl||s===rf||s===sf)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===kl)return l===St?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rf)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===a0||s===af||s===of||s===lf)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===kl)return o.COMPRESSED_RED_RGTC1_EXT;if(s===af)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===of)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===lf)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ur?n?r.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class xM extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class br extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const SM={type:"move"};class cc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new br,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new br,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new br,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(SM)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new br;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yM extends Fs{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=t.getContextAttributes();let p=null,m=null;const M=[],v=[],x=new xe;let R=null;const w=new Nn;w.layers.enable(1),w.viewport=new Et;const E=new Nn;E.layers.enable(2),E.viewport=new Et;const D=[w,E],S=new xM;S.layers.enable(1),S.layers.enable(2);let y=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let j=M[Y];return j===void 0&&(j=new cc,M[Y]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Y){let j=M[Y];return j===void 0&&(j=new cc,M[Y]=j),j.getGripSpace()},this.getHand=function(Y){let j=M[Y];return j===void 0&&(j=new cc,M[Y]=j),j.getHandSpace()};function I(Y){const j=v.indexOf(Y.inputSource);if(j===-1)return;const le=M[j];le!==void 0&&(le.update(Y.inputSource,Y.frame,c||a),le.dispatchEvent({type:Y.type,data:Y.inputSource}))}function J(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",P);for(let Y=0;Y<M.length;Y++){const j=v[Y];j!==null&&(v[Y]=null,M[Y].disconnect(j))}y=null,U=null,e.setRenderTarget(p),d=null,f=null,h=null,i=null,m=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",J),i.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(x),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,j),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new zr(d.framebufferWidth,d.framebufferHeight,{format:ri,type:er,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,le=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=_.stencil?Is:Nr,le=_.stencil?Ur:Xi);const ce={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(ce),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),m=new zr(f.textureWidth,f.textureHeight,{format:ri,type:er,depthTexture:new im(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ae=e.properties.get(m);Ae.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(Y){for(let j=0;j<Y.removed.length;j++){const le=Y.removed[j],ye=v.indexOf(le);ye>=0&&(v[ye]=null,M[ye].disconnect(le))}for(let j=0;j<Y.added.length;j++){const le=Y.added[j];let ye=v.indexOf(le);if(ye===-1){for(let Ae=0;Ae<M.length;Ae++)if(Ae>=v.length){v.push(le),ye=Ae;break}else if(v[Ae]===null){v[Ae]=le,ye=Ae;break}if(ye===-1)break}const ce=M[ye];ce&&ce.connect(le)}}const k=new O,H=new O;function V(Y,j,le){k.setFromMatrixPosition(j.matrixWorld),H.setFromMatrixPosition(le.matrixWorld);const ye=k.distanceTo(H),ce=j.projectionMatrix.elements,Ae=le.projectionMatrix.elements,Ue=ce[14]/(ce[10]-1),Ee=ce[14]/(ce[10]+1),De=(ce[9]+1)/ce[5],L=(ce[9]-1)/ce[5],ee=(ce[8]-1)/ce[0],K=(Ae[8]+1)/Ae[0],se=Ue*ee,Z=Ue*K,F=ye/(-ee+K),me=F*-ee;j.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(me),Y.translateZ(F),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const A=Ue+F,T=Ee+F,B=se-me,ie=Z+(ye-me),re=De*Ee/T*A,te=L*Ee/T*A;Y.projectionMatrix.makePerspective(B,ie,re,te,A,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function q(Y,j){j===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(j.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;S.near=E.near=w.near=Y.near,S.far=E.far=w.far=Y.far,(y!==S.near||U!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),y=S.near,U=S.far);const j=Y.parent,le=S.cameras;q(S,j);for(let ye=0;ye<le.length;ye++)q(le[ye],j);le.length===2?V(S,w,E):S.projectionMatrix.copy(w.projectionMatrix),$(Y,S,j)};function $(Y,j,le){le===null?Y.matrix.copy(j.matrixWorld):(Y.matrix.copy(le.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(j.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=$c*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)};let C=null;function Q(Y,j){if(u=j.getViewerPose(c||a),g=j,u!==null){const le=u.views;d!==null&&(e.setRenderTargetFramebuffer(m,d.framebuffer),e.setRenderTarget(m));let ye=!1;le.length!==S.cameras.length&&(S.cameras.length=0,ye=!0);for(let ce=0;ce<le.length;ce++){const Ae=le[ce];let Ue=null;if(d!==null)Ue=d.getViewport(Ae);else{const De=h.getViewSubImage(f,Ae);Ue=De.viewport,ce===0&&(e.setRenderTargetTextures(m,De.colorTexture,f.ignoreDepthValues?void 0:De.depthStencilTexture),e.setRenderTarget(m))}let Ee=D[ce];Ee===void 0&&(Ee=new Nn,Ee.layers.enable(ce),Ee.viewport=new Et,D[ce]=Ee),Ee.matrix.fromArray(Ae.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Ae.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),ce===0&&(S.matrix.copy(Ee.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ye===!0&&S.cameras.push(Ee)}}for(let le=0;le<M.length;le++){const ye=v[le],ce=M[le];ye!==null&&ce!==void 0&&ce.update(ye,j,c||a)}C&&C(Y,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const ae=new tm;ae.setAnimationLoop(Q),this.setAnimationLoop=function(Y){C=Y},this.dispose=function(){}}}function MM(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,jp(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,M,v,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===bn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===bn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=e.get(m).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===bn&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function EM(r,e,t,n){let i={},s={},a=[];const o=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const x=v.program;n.uniformBlockBinding(M,x)}function c(M,v){let x=i[M.id];x===void 0&&(g(M),x=u(M),i[M.id]=x,M.addEventListener("dispose",p));const R=v.program;n.updateUBOMapping(M,R);const w=e.render.frame;s[M.id]!==w&&(f(M),s[M.id]=w)}function u(M){const v=h();M.__bindingPointIndex=v;const x=r.createBuffer(),R=M.__size,w=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,R,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,x),x}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=i[M.id],x=M.uniforms,R=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let w=0,E=x.length;w<E;w++){const D=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,y=D.length;S<y;S++){const U=D[S];if(d(U,w,S,R)===!0){const I=U.__offset,J=Array.isArray(U.value)?U.value:[U.value];let P=0;for(let k=0;k<J.length;k++){const H=J[k],V=_(H);typeof H=="number"||typeof H=="boolean"?(U.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,I+P,U.__data)):H.isMatrix3?(U.__data[0]=H.elements[0],U.__data[1]=H.elements[1],U.__data[2]=H.elements[2],U.__data[3]=0,U.__data[4]=H.elements[3],U.__data[5]=H.elements[4],U.__data[6]=H.elements[5],U.__data[7]=0,U.__data[8]=H.elements[6],U.__data[9]=H.elements[7],U.__data[10]=H.elements[8],U.__data[11]=0):(H.toArray(U.__data,P),P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,v,x,R){const w=M.value,E=v+"_"+x;if(R[E]===void 0)return typeof w=="number"||typeof w=="boolean"?R[E]=w:R[E]=w.clone(),!0;{const D=R[E];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return R[E]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function g(M){const v=M.uniforms;let x=0;const R=16;for(let E=0,D=v.length;E<D;E++){const S=Array.isArray(v[E])?v[E]:[v[E]];for(let y=0,U=S.length;y<U;y++){const I=S[y],J=Array.isArray(I.value)?I.value:[I.value];for(let P=0,k=J.length;P<k;P++){const H=J[P],V=_(H),q=x%R;q!==0&&R-q<V.boundary&&(x+=R-q),I.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=V.storage}}}const w=x%R;return w>0&&(x+=R-w),M.__size=x,M.__cache={},this}function _(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function p(M){const v=M.target;v.removeEventListener("dispose",p);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const M in i)r.deleteBuffer(i[M]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class cm{constructor(e={}){const{canvas:t=v0(),context:n=null,depth:i=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this._useLegacyLights=!1,this.toneMapping=Qi,this.toneMappingExposure=1;const v=this;let x=!1,R=0,w=0,E=null,D=-1,S=null;const y=new Et,U=new Et;let I=null;const J=new ot(0);let P=0,k=t.width,H=t.height,V=1,q=null,$=null;const C=new Et(0,0,k,H),Q=new Et(0,0,k,H);let ae=!1;const Y=new Uu;let j=!1,le=!1,ye=null;const ce=new Ut,Ae=new xe,Ue=new O,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function De(){return E===null?V:1}let L=n;function ee(b,z){for(let X=0;X<b.length;X++){const W=b[X],G=t.getContext(W,z);if(G!==null)return G}return null}try{const b={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ru}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",N,!1),t.addEventListener("webglcontextcreationerror",fe,!1),L===null){const z=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&z.shift(),L=ee(z,b),L===null)throw ee(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&L instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),L.getShaderPrecisionFormat===void 0&&(L.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let K,se,Z,F,me,A,T,B,ie,re,te,ve,_e,he,Ce,Be,ne,nt,Ie,We,Pe,Me,Xe,Qe;function lt(){K=new US(L),se=new AS(L,K,e),K.init(se),Me=new vM(L,K,se),Z=new _M(L,K,se),F=new OS(L),me=new nM,A=new gM(L,K,Z,me,se,Me,F),T=new CS(v),B=new DS(v),ie=new W0(L,se),Xe=new bS(L,K,ie,se),re=new NS(L,ie,F,Xe),te=new zS(L,re,ie,F),Ie=new BS(L,se,A),Be=new RS(me),ve=new tM(v,T,B,K,se,Xe,Be),_e=new MM(v,me),he=new rM,Ce=new uM(K,se),nt=new TS(v,T,B,Z,te,f,l),ne=new mM(v,te,se),Qe=new EM(L,F,se,Z),We=new wS(L,K,F,se),Pe=new IS(L,K,F,se),F.programs=ve.programs,v.capabilities=se,v.extensions=K,v.properties=me,v.renderLists=he,v.shadowMap=ne,v.state=Z,v.info=F}lt();const Se=new yM(v,L);this.xr=Se,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=K.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=K.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(k,H,!1))},this.getSize=function(b){return b.set(k,H)},this.setSize=function(b,z,X=!0){if(Se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=b,H=z,t.width=Math.floor(b*V),t.height=Math.floor(z*V),X===!0&&(t.style.width=b+"px",t.style.height=z+"px"),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(k*V,H*V).floor()},this.setDrawingBufferSize=function(b,z,X){k=b,H=z,V=X,t.width=Math.floor(b*X),t.height=Math.floor(z*X),this.setViewport(0,0,b,z)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(C)},this.setViewport=function(b,z,X,W){b.isVector4?C.set(b.x,b.y,b.z,b.w):C.set(b,z,X,W),Z.viewport(y.copy(C).multiplyScalar(V).floor())},this.getScissor=function(b){return b.copy(Q)},this.setScissor=function(b,z,X,W){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,z,X,W),Z.scissor(U.copy(Q).multiplyScalar(V).floor())},this.getScissorTest=function(){return ae},this.setScissorTest=function(b){Z.setScissorTest(ae=b)},this.setOpaqueSort=function(b){q=b},this.setTransparentSort=function(b){$=b},this.getClearColor=function(b){return b.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor.apply(nt,arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha.apply(nt,arguments)},this.clear=function(b=!0,z=!0,X=!0){let W=0;if(b){let G=!1;if(E!==null){const pe=E.texture.format;G=pe===Bp||pe===kp||pe===Fp}if(G){const pe=E.texture.type,we=pe===er||pe===Xi||pe===Cu||pe===Ur||pe===Ip||pe===Op,Ge=nt.getClearColor(),Re=nt.getClearAlpha(),Ne=Ge.r,Ve=Ge.g,$e=Ge.b;we?(d[0]=Ne,d[1]=Ve,d[2]=$e,d[3]=Re,L.clearBufferuiv(L.COLOR,0,d)):(g[0]=Ne,g[1]=Ve,g[2]=$e,g[3]=Re,L.clearBufferiv(L.COLOR,0,g))}else W|=L.COLOR_BUFFER_BIT}z&&(W|=L.DEPTH_BUFFER_BIT),X&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",N,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),he.dispose(),Ce.dispose(),me.dispose(),T.dispose(),B.dispose(),te.dispose(),Xe.dispose(),Qe.dispose(),ve.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Te),Se.removeEventListener("sessionend",Oe),ye&&(ye.dispose(),ye=null),oe.stop()};function ue(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const b=F.autoReset,z=ne.enabled,X=ne.autoUpdate,W=ne.needsUpdate,G=ne.type;lt(),F.autoReset=b,ne.enabled=z,ne.autoUpdate=X,ne.needsUpdate=W,ne.type=G}function fe(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function de(b){const z=b.target;z.removeEventListener("dispose",de),ze(z)}function ze(b){Fe(b),me.remove(b)}function Fe(b){const z=me.get(b).programs;z!==void 0&&(z.forEach(function(X){ve.releaseProgram(X)}),b.isShaderMaterial&&ve.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,X,W,G,pe){z===null&&(z=Ee);const we=G.isMesh&&G.matrixWorld.determinant()<0,Ge=vt(b,z,X,W,G);Z.setMaterial(W,we);let Re=X.index,Ne=1;if(W.wireframe===!0){if(Re=re.getWireframeAttribute(X),Re===void 0)return;Ne=2}const Ve=X.drawRange,$e=X.attributes.position;let yt=Ve.start*Ne,kt=(Ve.start+Ve.count)*Ne;pe!==null&&(yt=Math.max(yt,pe.start*Ne),kt=Math.min(kt,(pe.start+pe.count)*Ne)),Re!==null?(yt=Math.max(yt,0),kt=Math.min(kt,Re.count)):$e!=null&&(yt=Math.max(yt,0),kt=Math.min(kt,$e.count));const ht=kt-yt;if(ht<0||ht===1/0)return;Xe.setup(G,W,Ge,X,Re);let ln,dt=We;if(Re!==null&&(ln=ie.get(Re),dt=Pe,dt.setIndex(ln)),G.isMesh)W.wireframe===!0?(Z.setLineWidth(W.wireframeLinewidth*De()),dt.setMode(L.LINES)):dt.setMode(L.TRIANGLES);else if(G.isLine){let qe=W.linewidth;qe===void 0&&(qe=1),Z.setLineWidth(qe*De()),G.isLineSegments?dt.setMode(L.LINES):G.isLineLoop?dt.setMode(L.LINE_LOOP):dt.setMode(L.LINE_STRIP)}else G.isPoints?dt.setMode(L.POINTS):G.isSprite&&dt.setMode(L.TRIANGLES);if(G.isBatchedMesh)dt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)dt.renderInstances(yt,ht,G.count);else if(X.isInstancedBufferGeometry){const qe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ml=Math.min(X.instanceCount,qe);dt.renderInstances(yt,ht,ml)}else dt.render(yt,ht)};function rt(b,z,X){b.transparent===!0&&b.side===Ai&&b.forceSinglePass===!1?(b.side=bn,b.needsUpdate=!0,gt(b,z,X),b.side=sr,b.needsUpdate=!0,gt(b,z,X),b.side=Ai):gt(b,z,X)}this.compile=function(b,z,X=null){X===null&&(X=b),p=Ce.get(X),p.init(),M.push(p),X.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),b!==X&&b.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights(v._useLegacyLights);const W=new Set;return b.traverse(function(G){const pe=G.material;if(pe)if(Array.isArray(pe))for(let we=0;we<pe.length;we++){const Ge=pe[we];rt(Ge,X,G),W.add(Ge)}else rt(pe,X,G),W.add(pe)}),M.pop(),p=null,W},this.compileAsync=function(b,z,X=null){const W=this.compile(b,z,X);return new Promise(G=>{function pe(){if(W.forEach(function(we){me.get(we).currentProgram.isReady()&&W.delete(we)}),W.size===0){G(b);return}setTimeout(pe,10)}K.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let at=null;function Le(b){at&&at(b)}function Te(){oe.stop()}function Oe(){oe.start()}const oe=new tm;oe.setAnimationLoop(Le),typeof self<"u"&&oe.setContext(self),this.setAnimationLoop=function(b){at=b,Se.setAnimationLoop(b),b===null?oe.stop():oe.start()},Se.addEventListener("sessionstart",Te),Se.addEventListener("sessionend",Oe),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(z),z=Se.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,z,E),p=Ce.get(b,M.length),p.init(),M.push(p),ce.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Y.setFromProjectionMatrix(ce),le=this.localClippingEnabled,j=Be.init(this.clippingPlanes,le),_=he.get(b,m.length),_.init(),m.push(_),He(b,z,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(q,$),this.info.render.frame++,j===!0&&Be.beginShadows();const X=p.state.shadowsArray;if(ne.render(X,b,z),j===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),nt.render(_,b),p.setupLights(v._useLegacyLights),z.isArrayCamera){const W=z.cameras;for(let G=0,pe=W.length;G<pe;G++){const we=W[G];ke(_,b,we,we.viewport)}}else ke(_,b,z);E!==null&&(A.updateMultisampleRenderTarget(E),A.updateRenderTargetMipmap(E)),b.isScene===!0&&b.onAfterRender(v,b,z),Xe.resetDefaultState(),D=-1,S=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function He(b,z,X,W){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){W&&Ue.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ce);const we=te.update(b),Ge=b.material;Ge.visible&&_.push(b,we,Ge,X,Ue.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const we=te.update(b),Ge=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ue.copy(b.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Ue.copy(we.boundingSphere.center)),Ue.applyMatrix4(b.matrixWorld).applyMatrix4(ce)),Array.isArray(Ge)){const Re=we.groups;for(let Ne=0,Ve=Re.length;Ne<Ve;Ne++){const $e=Re[Ne],yt=Ge[$e.materialIndex];yt&&yt.visible&&_.push(b,we,yt,X,Ue.z,$e)}}else Ge.visible&&_.push(b,we,Ge,X,Ue.z,null)}}const pe=b.children;for(let we=0,Ge=pe.length;we<Ge;we++)He(pe[we],z,X,W)}function ke(b,z,X,W){const G=b.opaque,pe=b.transmissive,we=b.transparent;p.setupLightsView(X),j===!0&&Be.setGlobalState(v.clippingPlanes,X),pe.length>0&&Ye(G,pe,z,X),W&&Z.viewport(y.copy(W)),G.length>0&&Tt(G,z,X),pe.length>0&&Tt(pe,z,X),we.length>0&&Tt(we,z,X),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function Ye(b,z,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const pe=se.isWebGL2;ye===null&&(ye=new zr(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")?Ua:er,minFilter:Da,samples:pe?4:0})),v.getDrawingBufferSize(Ae),pe?ye.setSize(Ae.x,Ae.y):ye.setSize(Kc(Ae.x),Kc(Ae.y));const we=v.getRenderTarget();v.setRenderTarget(ye),v.getClearColor(J),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const Ge=v.toneMapping;v.toneMapping=Qi,Tt(b,X,W),A.updateMultisampleRenderTarget(ye),A.updateRenderTargetMipmap(ye);let Re=!1;for(let Ne=0,Ve=z.length;Ne<Ve;Ne++){const $e=z[Ne],yt=$e.object,kt=$e.geometry,ht=$e.material,ln=$e.group;if(ht.side===Ai&&yt.layers.test(W.layers)){const dt=ht.side;ht.side=bn,ht.needsUpdate=!0,et(yt,X,W,kt,ht,ln),ht.side=dt,ht.needsUpdate=!0,Re=!0}}Re===!0&&(A.updateMultisampleRenderTarget(ye),A.updateRenderTargetMipmap(ye)),v.setRenderTarget(we),v.setClearColor(J,P),v.toneMapping=Ge}function Tt(b,z,X){const W=z.isScene===!0?z.overrideMaterial:null;for(let G=0,pe=b.length;G<pe;G++){const we=b[G],Ge=we.object,Re=we.geometry,Ne=W===null?we.material:W,Ve=we.group;Ge.layers.test(X.layers)&&et(Ge,z,X,Re,Ne,Ve)}}function et(b,z,X,W,G,pe){b.onBeforeRender(v,z,X,W,G,pe),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(v,z,X,W,b,pe),G.transparent===!0&&G.side===Ai&&G.forceSinglePass===!1?(G.side=bn,G.needsUpdate=!0,v.renderBufferDirect(X,z,W,G,b,pe),G.side=sr,G.needsUpdate=!0,v.renderBufferDirect(X,z,W,G,b,pe),G.side=Ai):v.renderBufferDirect(X,z,W,G,b,pe),b.onAfterRender(v,z,X,W,G,pe)}function gt(b,z,X){z.isScene!==!0&&(z=Ee);const W=me.get(b),G=p.state.lights,pe=p.state.shadowsArray,we=G.state.version,Ge=ve.getParameters(b,G.state,pe,z,X),Re=ve.getProgramCacheKey(Ge);let Ne=W.programs;W.environment=b.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(b.isMeshStandardMaterial?B:T).get(b.envMap||W.environment),Ne===void 0&&(b.addEventListener("dispose",de),Ne=new Map,W.programs=Ne);let Ve=Ne.get(Re);if(Ve!==void 0){if(W.currentProgram===Ve&&W.lightsStateVersion===we)return xt(b,Ge),Ve}else Ge.uniforms=ve.getUniforms(b),b.onBuild(X,Ge,v),b.onBeforeCompile(Ge,v),Ve=ve.acquireProgram(Ge,Re),Ne.set(Re,Ve),W.uniforms=Ge.uniforms;const $e=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&($e.clippingPlanes=Be.uniform),xt(b,Ge),W.needsLights=An(b),W.lightsStateVersion=we,W.needsLights&&($e.ambientLightColor.value=G.state.ambient,$e.lightProbe.value=G.state.probe,$e.directionalLights.value=G.state.directional,$e.directionalLightShadows.value=G.state.directionalShadow,$e.spotLights.value=G.state.spot,$e.spotLightShadows.value=G.state.spotShadow,$e.rectAreaLights.value=G.state.rectArea,$e.ltc_1.value=G.state.rectAreaLTC1,$e.ltc_2.value=G.state.rectAreaLTC2,$e.pointLights.value=G.state.point,$e.pointLightShadows.value=G.state.pointShadow,$e.hemisphereLights.value=G.state.hemi,$e.directionalShadowMap.value=G.state.directionalShadowMap,$e.directionalShadowMatrix.value=G.state.directionalShadowMatrix,$e.spotShadowMap.value=G.state.spotShadowMap,$e.spotLightMatrix.value=G.state.spotLightMatrix,$e.spotLightMap.value=G.state.spotLightMap,$e.pointShadowMap.value=G.state.pointShadowMap,$e.pointShadowMatrix.value=G.state.pointShadowMatrix),W.currentProgram=Ve,W.uniformsList=null,Ve}function Ft(b){if(b.uniformsList===null){const z=b.currentProgram.getUniforms();b.uniformsList=Oo.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function xt(b,z){const X=me.get(b);X.outputColorSpace=z.outputColorSpace,X.batching=z.batching,X.instancing=z.instancing,X.instancingColor=z.instancingColor,X.skinning=z.skinning,X.morphTargets=z.morphTargets,X.morphNormals=z.morphNormals,X.morphColors=z.morphColors,X.morphTargetsCount=z.morphTargetsCount,X.numClippingPlanes=z.numClippingPlanes,X.numIntersection=z.numClipIntersection,X.vertexAlphas=z.vertexAlphas,X.vertexTangents=z.vertexTangents,X.toneMapping=z.toneMapping}function vt(b,z,X,W,G){z.isScene!==!0&&(z=Ee),A.resetTextureUnits();const pe=z.fog,we=W.isMeshStandardMaterial?z.environment:null,Ge=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ui,Re=(W.isMeshStandardMaterial?B:T).get(W.envMap||we),Ne=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ve=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),$e=!!X.morphAttributes.position,yt=!!X.morphAttributes.normal,kt=!!X.morphAttributes.color;let ht=Qi;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(ht=v.toneMapping);const ln=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,dt=ln!==void 0?ln.length:0,qe=me.get(W),ml=p.state.lights;if(j===!0&&(le===!0||b!==S)){const Gn=b===S&&W.id===D;Be.setState(W,b,Gn)}let Ct=!1;W.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==ml.state.version||qe.outputColorSpace!==Ge||G.isBatchedMesh&&qe.batching===!1||!G.isBatchedMesh&&qe.batching===!0||G.isInstancedMesh&&qe.instancing===!1||!G.isInstancedMesh&&qe.instancing===!0||G.isSkinnedMesh&&qe.skinning===!1||!G.isSkinnedMesh&&qe.skinning===!0||G.isInstancedMesh&&qe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&qe.instancingColor===!1&&G.instanceColor!==null||qe.envMap!==Re||W.fog===!0&&qe.fog!==pe||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Be.numPlanes||qe.numIntersection!==Be.numIntersection)||qe.vertexAlphas!==Ne||qe.vertexTangents!==Ve||qe.morphTargets!==$e||qe.morphNormals!==yt||qe.morphColors!==kt||qe.toneMapping!==ht||se.isWebGL2===!0&&qe.morphTargetsCount!==dt)&&(Ct=!0):(Ct=!0,qe.__version=W.version);let or=qe.currentProgram;Ct===!0&&(or=gt(W,z,G));let Xu=!1,Hs=!1,_l=!1;const jt=or.getUniforms(),lr=qe.uniforms;if(Z.useProgram(or.program)&&(Xu=!0,Hs=!0,_l=!0),W.id!==D&&(D=W.id,Hs=!0),Xu||S!==b){jt.setValue(L,"projectionMatrix",b.projectionMatrix),jt.setValue(L,"viewMatrix",b.matrixWorldInverse);const Gn=jt.map.cameraPosition;Gn!==void 0&&Gn.setValue(L,Ue.setFromMatrixPosition(b.matrixWorld)),se.logarithmicDepthBuffer&&jt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&jt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Hs=!0,_l=!0)}if(G.isSkinnedMesh){jt.setOptional(L,G,"bindMatrix"),jt.setOptional(L,G,"bindMatrixInverse");const Gn=G.skeleton;Gn&&(se.floatVertexTextures?(Gn.boneTexture===null&&Gn.computeBoneTexture(),jt.setValue(L,"boneTexture",Gn.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(jt.setOptional(L,G,"batchingTexture"),jt.setValue(L,"batchingTexture",G._matricesTexture,A));const gl=X.morphAttributes;if((gl.position!==void 0||gl.normal!==void 0||gl.color!==void 0&&se.isWebGL2===!0)&&Ie.update(G,X,or),(Hs||qe.receiveShadow!==G.receiveShadow)&&(qe.receiveShadow=G.receiveShadow,jt.setValue(L,"receiveShadow",G.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(lr.envMap.value=Re,lr.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Hs&&(jt.setValue(L,"toneMappingExposure",v.toneMappingExposure),qe.needsLights&&ut(lr,_l),pe&&W.fog===!0&&_e.refreshFogUniforms(lr,pe),_e.refreshMaterialUniforms(lr,W,V,H,ye),Oo.upload(L,Ft(qe),lr,A)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Oo.upload(L,Ft(qe),lr,A),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&jt.setValue(L,"center",G.center),jt.setValue(L,"modelViewMatrix",G.modelViewMatrix),jt.setValue(L,"normalMatrix",G.normalMatrix),jt.setValue(L,"modelMatrix",G.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Gn=W.uniformsGroups;for(let vl=0,Am=Gn.length;vl<Am;vl++)if(se.isWebGL2){const qu=Gn[vl];Qe.update(qu,or),Qe.bind(qu,or)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return or}function ut(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function An(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(b,z,X){me.get(b.texture).__webglTexture=z,me.get(b.depthTexture).__webglTexture=X;const W=me.get(b);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=X===void 0,W.__autoAllocateDepthBuffer||K.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,z){const X=me.get(b);X.__webglFramebuffer=z,X.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(b,z=0,X=0){E=b,R=z,w=X;let W=!0,G=null,pe=!1,we=!1;if(b){const Re=me.get(b);Re.__useDefaultFramebuffer!==void 0?(Z.bindFramebuffer(L.FRAMEBUFFER,null),W=!1):Re.__webglFramebuffer===void 0?A.setupRenderTarget(b):Re.__hasExternalTextures&&A.rebindTextures(b,me.get(b.texture).__webglTexture,me.get(b.depthTexture).__webglTexture);const Ne=b.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(we=!0);const Ve=me.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ve[z])?G=Ve[z][X]:G=Ve[z],pe=!0):se.isWebGL2&&b.samples>0&&A.useMultisampledRTT(b)===!1?G=me.get(b).__webglMultisampledFramebuffer:Array.isArray(Ve)?G=Ve[X]:G=Ve,y.copy(b.viewport),U.copy(b.scissor),I=b.scissorTest}else y.copy(C).multiplyScalar(V).floor(),U.copy(Q).multiplyScalar(V).floor(),I=ae;if(Z.bindFramebuffer(L.FRAMEBUFFER,G)&&se.drawBuffers&&W&&Z.drawBuffers(b,G),Z.viewport(y),Z.scissor(U),Z.setScissorTest(I),pe){const Re=me.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+z,Re.__webglTexture,X)}else if(we){const Re=me.get(b.texture),Ne=z||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Re.__webglTexture,X||0,Ne)}D=-1},this.readRenderTargetPixels=function(b,z,X,W,G,pe,we){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=me.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Ge=Ge[we]),Ge){Z.bindFramebuffer(L.FRAMEBUFFER,Ge);try{const Re=b.texture,Ne=Re.format,Ve=Re.type;if(Ne!==ri&&Me.convert(Ne)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const $e=Ve===Ua&&(K.has("EXT_color_buffer_half_float")||se.isWebGL2&&K.has("EXT_color_buffer_float"));if(Ve!==er&&Me.convert(Ve)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===qi&&(se.isWebGL2||K.has("OES_texture_float")||K.has("WEBGL_color_buffer_float")))&&!$e){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-W&&X>=0&&X<=b.height-G&&L.readPixels(z,X,W,G,Me.convert(Ne),Me.convert(Ve),pe)}finally{const Re=E!==null?me.get(E).__webglFramebuffer:null;Z.bindFramebuffer(L.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(b,z,X=0){const W=Math.pow(2,-X),G=Math.floor(z.image.width*W),pe=Math.floor(z.image.height*W);A.setTexture2D(z,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,b.x,b.y,G,pe),Z.unbindTexture()},this.copyTextureToTexture=function(b,z,X,W=0){const G=z.image.width,pe=z.image.height,we=Me.convert(X.format),Ge=Me.convert(X.type);A.setTexture2D(X,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,X.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,X.unpackAlignment),z.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,W,b.x,b.y,G,pe,we,Ge,z.image.data):z.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,W,b.x,b.y,z.mipmaps[0].width,z.mipmaps[0].height,we,z.mipmaps[0].data):L.texSubImage2D(L.TEXTURE_2D,W,b.x,b.y,we,Ge,z.image),W===0&&X.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),Z.unbindTexture()},this.copyTextureToTexture3D=function(b,z,X,W,G=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const pe=b.max.x-b.min.x+1,we=b.max.y-b.min.y+1,Ge=b.max.z-b.min.z+1,Re=Me.convert(W.format),Ne=Me.convert(W.type);let Ve;if(W.isData3DTexture)A.setTexture3D(W,0),Ve=L.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)A.setTexture2DArray(W,0),Ve=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,W.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,W.unpackAlignment);const $e=L.getParameter(L.UNPACK_ROW_LENGTH),yt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),kt=L.getParameter(L.UNPACK_SKIP_PIXELS),ht=L.getParameter(L.UNPACK_SKIP_ROWS),ln=L.getParameter(L.UNPACK_SKIP_IMAGES),dt=X.isCompressedTexture?X.mipmaps[G]:X.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,dt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,dt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,b.min.x),L.pixelStorei(L.UNPACK_SKIP_ROWS,b.min.y),L.pixelStorei(L.UNPACK_SKIP_IMAGES,b.min.z),X.isDataTexture||X.isData3DTexture?L.texSubImage3D(Ve,G,z.x,z.y,z.z,pe,we,Ge,Re,Ne,dt.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),L.compressedTexSubImage3D(Ve,G,z.x,z.y,z.z,pe,we,Ge,Re,dt.data)):L.texSubImage3D(Ve,G,z.x,z.y,z.z,pe,we,Ge,Re,Ne,dt),L.pixelStorei(L.UNPACK_ROW_LENGTH,$e),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kt),L.pixelStorei(L.UNPACK_SKIP_ROWS,ht),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ln),G===0&&W.generateMipmaps&&L.generateMipmap(Ve),Z.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),Z.unbindTexture()},this.resetState=function(){R=0,w=0,E=null,Z.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Pu?"display-p3":"srgb",t.unpackColorSpace=pt.workingColorSpace===ul?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===qt?Ir:Hp}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ir?qt:Ui}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class TM extends cm{}TM.prototype.isWebGL1Renderer=!0;class bM extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class _i{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(a-u)/f;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new xe:new O);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new O,i=[],s=[],a=[],o=new O,l=new Ut;for(let d=0;d<=e;d++){const g=d/e;i[d]=this.getTangentAt(g,new O)}s[0]=new O,a[0]=new O;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(rn(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(rn(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ou extends _i{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const n=t||new xe,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class wM extends Ou{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Fu(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let f=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,d*=u,i(a,o,f,d)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const Eo=new O,uc=new Fu,hc=new Fu,fc=new Fu;class AM extends _i{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new O){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(Eo.subVectors(i[0],i[1]).add(i[0]),c=Eo);const h=i[o%s],f=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(Eo.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=Eo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),uc.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,_,p),hc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,_,p),fc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(uc.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),hc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),fc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(uc.calc(l),hc.calc(l),fc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new O().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Zf(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function RM(r,e){const t=1-r;return t*t*e}function CM(r,e){return 2*(1-r)*r*e}function PM(r,e){return r*r*e}function _a(r,e,t,n){return RM(r,e)+CM(r,t)+PM(r,n)}function LM(r,e){const t=1-r;return t*t*t*e}function DM(r,e){const t=1-r;return 3*t*t*r*e}function UM(r,e){return 3*(1-r)*r*r*e}function NM(r,e){return r*r*r*e}function ga(r,e,t,n,i){return LM(r,e)+DM(r,t)+UM(r,n)+NM(r,i)}class um extends _i{constructor(e=new xe,t=new xe,n=new xe,i=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new xe){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ga(e,i.x,s.x,a.x,o.x),ga(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class IM extends _i{constructor(e=new O,t=new O,n=new O,i=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new O){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ga(e,i.x,s.x,a.x,o.x),ga(e,i.y,s.y,a.y,o.y),ga(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hm extends _i{constructor(e=new xe,t=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new xe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new xe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class OM extends _i{constructor(e=new O,t=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new O){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new O){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fm extends _i{constructor(e=new xe,t=new xe,n=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new xe){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(_a(e,i.x,s.x,a.x),_a(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class FM extends _i{constructor(e=new O,t=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new O){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(_a(e,i.x,s.x,a.x),_a(e,i.y,s.y,a.y),_a(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dm extends _i{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new xe){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(Zf(o,l.x,c.x,u.x,h.x),Zf(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new xe().fromArray(i))}return this}}var Zc=Object.freeze({__proto__:null,ArcCurve:wM,CatmullRomCurve3:AM,CubicBezierCurve:um,CubicBezierCurve3:IM,EllipseCurve:Ou,LineCurve:hm,LineCurve3:OM,QuadraticBezierCurve:fm,QuadraticBezierCurve3:FM,SplineCurve:dm});class kM extends _i{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Zc[i.type]().fromJSON(i))}return this}}class jf extends kM{constructor(e){super(),this.type="Path",this.currentPoint=new xe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new hm(this.currentPoint.clone(),new xe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new fm(this.currentPoint.clone(),new xe(e,t),new xe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new um(this.currentPoint.clone(),new xe(e,t),new xe(n,i),new xe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new dm(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new Ou(e,t,n,i,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ku extends ai{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],p=n/2;let m=0;M(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Yt(h,3)),this.setAttribute("normal",new Yt(f,3)),this.setAttribute("uv",new Yt(d,2));function M(){const x=new O,R=new O;let w=0;const E=(t-e)/n;for(let D=0;D<=s;D++){const S=[],y=D/s,U=y*(t-e)+e;for(let I=0;I<=i;I++){const J=I/i,P=J*l+o,k=Math.sin(P),H=Math.cos(P);R.x=U*k,R.y=-y*n+p,R.z=U*H,h.push(R.x,R.y,R.z),x.set(k,E,H).normalize(),f.push(x.x,x.y,x.z),d.push(J,1-y),S.push(g++)}_.push(S)}for(let D=0;D<i;D++)for(let S=0;S<s;S++){const y=_[S][D],U=_[S+1][D],I=_[S+1][D+1],J=_[S][D+1];u.push(y,U,J),u.push(U,I,J),w+=6}c.addGroup(m,w,0),m+=w}function v(x){const R=g,w=new xe,E=new O;let D=0;const S=x===!0?e:t,y=x===!0?1:-1;for(let I=1;I<=i;I++)h.push(0,p*y,0),f.push(0,y,0),d.push(.5,.5),g++;const U=g;for(let I=0;I<=i;I++){const P=I/i*l+o,k=Math.cos(P),H=Math.sin(P);E.x=S*H,E.y=p*y,E.z=S*k,h.push(E.x,E.y,E.z),f.push(0,y,0),w.x=k*.5+.5,w.y=H*.5*y+.5,d.push(w.x,w.y),g++}for(let I=0;I<i;I++){const J=R+I,P=U+I;x===!0?u.push(P,P+1,J):u.push(P+1,P,J),D+=3}c.addGroup(m,D,x===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ku(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bu extends ai{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Yt(s,3)),this.setAttribute("normal",new Yt(s.slice(),3)),this.setAttribute("uv",new Yt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const v=new O,x=new O,R=new O;for(let w=0;w<t.length;w+=3)d(t[w+0],v),d(t[w+1],x),d(t[w+2],R),l(v,x,R,M)}function l(M,v,x,R){const w=R+1,E=[];for(let D=0;D<=w;D++){E[D]=[];const S=M.clone().lerp(x,D/w),y=v.clone().lerp(x,D/w),U=w-D;for(let I=0;I<=U;I++)I===0&&D===w?E[D][I]=S:E[D][I]=S.clone().lerp(y,I/U)}for(let D=0;D<w;D++)for(let S=0;S<2*(w-D)-1;S++){const y=Math.floor(S/2);S%2===0?(f(E[D][y+1]),f(E[D+1][y]),f(E[D][y])):(f(E[D][y+1]),f(E[D+1][y+1]),f(E[D+1][y]))}}function c(M){const v=new O;for(let x=0;x<s.length;x+=3)v.x=s[x+0],v.y=s[x+1],v.z=s[x+2],v.normalize().multiplyScalar(M),s[x+0]=v.x,s[x+1]=v.y,s[x+2]=v.z}function u(){const M=new O;for(let v=0;v<s.length;v+=3){M.x=s[v+0],M.y=s[v+1],M.z=s[v+2];const x=p(M)/2/Math.PI+.5,R=m(M)/Math.PI+.5;a.push(x,1-R)}g(),h()}function h(){for(let M=0;M<a.length;M+=6){const v=a[M+0],x=a[M+2],R=a[M+4],w=Math.max(v,x,R),E=Math.min(v,x,R);w>.9&&E<.1&&(v<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),R<.2&&(a[M+4]+=1))}}function f(M){s.push(M.x,M.y,M.z)}function d(M,v){const x=M*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function g(){const M=new O,v=new O,x=new O,R=new O,w=new xe,E=new xe,D=new xe;for(let S=0,y=0;S<s.length;S+=9,y+=6){M.set(s[S+0],s[S+1],s[S+2]),v.set(s[S+3],s[S+4],s[S+5]),x.set(s[S+6],s[S+7],s[S+8]),w.set(a[y+0],a[y+1]),E.set(a[y+2],a[y+3]),D.set(a[y+4],a[y+5]),R.copy(M).add(v).add(x).divideScalar(3);const U=p(R);_(w,y+0,M,U),_(E,y+2,v,U),_(D,y+4,x,U)}}function _(M,v,x,R){R<0&&M.x===1&&(a[v]=M.x-1),x.x===0&&x.z===0&&(a[v]=R/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bu(e.vertices,e.indices,e.radius,e.details)}}class pm extends jf{constructor(e){super(e),this.uuid=ks(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new jf().fromJSON(i))}return this}}const BM={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=mm(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,h,f,d;if(n&&(s=WM(r,e,s,t)),r.length>80*t){o=c=r[0],l=u=r[1];for(let g=t;g<i;g+=t)h=r[g],f=r[g+1],h<o&&(o=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-o,u-l),d=d!==0?32767/d:0}return Na(s,a,t,o,l,d,0),a}};function mm(r,e,t,n,i){let s,a;if(i===tE(r,e,t,n)>0)for(s=e;s<t;s+=n)a=Qf(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=Qf(s,r[s],r[s+1],a);return a&&dl(a,a.next)&&(Oa(a),a=a.next),a}function Gr(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(dl(t,t.next)||Rt(t.prev,t,t.next)===0)){if(Oa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Na(r,e,t,n,i,s,a){if(!r)return;!a&&s&&KM(r,n,i,s);let o=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?HM(r,n,i,s):zM(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),Oa(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=GM(Gr(r),e,t),Na(r,e,t,n,i,s,2)):a===2&&VM(r,e,t,n,i,s):Na(Gr(r),e,t,n,i,s,1);break}}}function zM(r){const e=r.prev,t=r,n=r.next;if(Rt(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=i<s?i<a?i:a:s<a?s:a,h=o<l?o<c?o:c:l<c?l:c,f=i>s?i>a?i:a:s>a?s:a,d=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&gs(i,o,s,l,a,c,g.x,g.y)&&Rt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function HM(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Rt(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,u=i.y,h=s.y,f=a.y,d=o<l?o<c?o:c:l<c?l:c,g=u<h?u<f?u:f:h<f?h:f,_=o>l?o>c?o:c:l>c?l:c,p=u>h?u>f?u:f:h>f?h:f,m=jc(d,g,e,t,n),M=jc(_,p,e,t,n);let v=r.prevZ,x=r.nextZ;for(;v&&v.z>=m&&x&&x.z<=M;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=p&&v!==i&&v!==a&&gs(o,u,l,h,c,f,v.x,v.y)&&Rt(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&gs(o,u,l,h,c,f,x.x,x.y)&&Rt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=p&&v!==i&&v!==a&&gs(o,u,l,h,c,f,v.x,v.y)&&Rt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&gs(o,u,l,h,c,f,x.x,x.y)&&Rt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function GM(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!dl(i,s)&&_m(i,n,n.next,s)&&Ia(i,s)&&Ia(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Oa(n),Oa(n.next),n=r=s),n=n.next}while(n!==r);return Gr(n)}function VM(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&jM(a,o)){let l=gm(a,o);a=Gr(a,a.next),l=Gr(l,l.next),Na(a,e,t,n,i,s,0),Na(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function WM(r,e,t,n){const i=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=mm(r,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(ZM(c));for(i.sort(XM),s=0;s<i.length;s++)t=qM(i[s],t);return t}function XM(r,e){return r.x-e.x}function qM(r,e){const t=YM(r,e);if(!t)return e;const n=gm(t,r);return Gr(n,n.next),Gr(t,t.next)}function YM(r,e){let t=e,n=-1/0,i;const s=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const f=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=s&&f>n&&(n=f,i=t.x<t.next.x?t:t.next,f===s))return i}t=t.next}while(t!==e);if(!i)return null;const o=i,l=i.x,c=i.y;let u=1/0,h;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&gs(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(h=Math.abs(a-t.y)/(s-t.x),Ia(t,r)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&$M(i,t)))&&(i=t,u=h)),t=t.next;while(t!==o);return i}function $M(r,e){return Rt(r.prev,r,e.prev)<0&&Rt(e.next,r,r.next)<0}function KM(r,e,t,n){let i=r;do i.z===0&&(i.z=jc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,JM(i)}function JM(r){let e,t,n,i,s,a,o,l,c=1;do{for(t=r,r=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(a>1);return r}function jc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function ZM(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function gs(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function jM(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!QM(r,e)&&(Ia(r,e)&&Ia(e,r)&&eE(r,e)&&(Rt(r.prev,r,e.prev)||Rt(r,e.prev,e))||dl(r,e)&&Rt(r.prev,r,r.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function dl(r,e){return r.x===e.x&&r.y===e.y}function _m(r,e,t,n){const i=bo(Rt(r,e,t)),s=bo(Rt(r,e,n)),a=bo(Rt(t,n,r)),o=bo(Rt(t,n,e));return!!(i!==s&&a!==o||i===0&&To(r,t,e)||s===0&&To(r,n,e)||a===0&&To(t,r,n)||o===0&&To(t,e,n))}function To(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function bo(r){return r>0?1:r<0?-1:0}function QM(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&_m(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Ia(r,e){return Rt(r.prev,r,r.next)<0?Rt(r,e,r.next)>=0&&Rt(r,r.prev,e)>=0:Rt(r,e,r.prev)<0||Rt(r,r.next,e)<0}function eE(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function gm(r,e){const t=new Qc(r.i,r.x,r.y),n=new Qc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Qf(r,e,t,n){const i=new Qc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Oa(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Qc(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function tE(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class va{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return va.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];ed(e),td(n,e);let a=e.length;t.forEach(ed);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,td(n,t[l]);const o=BM.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ed(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function td(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class zu extends ai{constructor(e=new pm([new xe(.5,.5),new xe(-.5,.5),new xe(-.5,-.5),new xe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Yt(i,3)),this.setAttribute("uv",new Yt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:nE;let v,x=!1,R,w,E,D;m&&(v=m.getSpacedPoints(u),x=!0,f=!1,R=m.computeFrenetFrames(u,!1),w=new O,E=new O,D=new O),f||(p=0,d=0,g=0,_=0);const S=o.extractPoints(c);let y=S.shape;const U=S.holes;if(!va.isClockWise(y)){y=y.reverse();for(let L=0,ee=U.length;L<ee;L++){const K=U[L];va.isClockWise(K)&&(U[L]=K.reverse())}}const J=va.triangulateShape(y,U),P=y;for(let L=0,ee=U.length;L<ee;L++){const K=U[L];y=y.concat(K)}function k(L,ee,K){return ee||console.error("THREE.ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(ee,K)}const H=y.length,V=J.length;function q(L,ee,K){let se,Z,F;const me=L.x-ee.x,A=L.y-ee.y,T=K.x-L.x,B=K.y-L.y,ie=me*me+A*A,re=me*B-A*T;if(Math.abs(re)>Number.EPSILON){const te=Math.sqrt(ie),ve=Math.sqrt(T*T+B*B),_e=ee.x-A/te,he=ee.y+me/te,Ce=K.x-B/ve,Be=K.y+T/ve,ne=((Ce-_e)*B-(Be-he)*T)/(me*B-A*T);se=_e+me*ne-L.x,Z=he+A*ne-L.y;const nt=se*se+Z*Z;if(nt<=2)return new xe(se,Z);F=Math.sqrt(nt/2)}else{let te=!1;me>Number.EPSILON?T>Number.EPSILON&&(te=!0):me<-Number.EPSILON?T<-Number.EPSILON&&(te=!0):Math.sign(A)===Math.sign(B)&&(te=!0),te?(se=-A,Z=me,F=Math.sqrt(ie)):(se=me,Z=A,F=Math.sqrt(ie/2))}return new xe(se/F,Z/F)}const $=[];for(let L=0,ee=P.length,K=ee-1,se=L+1;L<ee;L++,K++,se++)K===ee&&(K=0),se===ee&&(se=0),$[L]=q(P[L],P[K],P[se]);const C=[];let Q,ae=$.concat();for(let L=0,ee=U.length;L<ee;L++){const K=U[L];Q=[];for(let se=0,Z=K.length,F=Z-1,me=se+1;se<Z;se++,F++,me++)F===Z&&(F=0),me===Z&&(me=0),Q[se]=q(K[se],K[F],K[me]);C.push(Q),ae=ae.concat(Q)}for(let L=0;L<p;L++){const ee=L/p,K=d*Math.cos(ee*Math.PI/2),se=g*Math.sin(ee*Math.PI/2)+_;for(let Z=0,F=P.length;Z<F;Z++){const me=k(P[Z],$[Z],se);ce(me.x,me.y,-K)}for(let Z=0,F=U.length;Z<F;Z++){const me=U[Z];Q=C[Z];for(let A=0,T=me.length;A<T;A++){const B=k(me[A],Q[A],se);ce(B.x,B.y,-K)}}}const Y=g+_;for(let L=0;L<H;L++){const ee=f?k(y[L],ae[L],Y):y[L];x?(E.copy(R.normals[0]).multiplyScalar(ee.x),w.copy(R.binormals[0]).multiplyScalar(ee.y),D.copy(v[0]).add(E).add(w),ce(D.x,D.y,D.z)):ce(ee.x,ee.y,0)}for(let L=1;L<=u;L++)for(let ee=0;ee<H;ee++){const K=f?k(y[ee],ae[ee],Y):y[ee];x?(E.copy(R.normals[L]).multiplyScalar(K.x),w.copy(R.binormals[L]).multiplyScalar(K.y),D.copy(v[L]).add(E).add(w),ce(D.x,D.y,D.z)):ce(K.x,K.y,h/u*L)}for(let L=p-1;L>=0;L--){const ee=L/p,K=d*Math.cos(ee*Math.PI/2),se=g*Math.sin(ee*Math.PI/2)+_;for(let Z=0,F=P.length;Z<F;Z++){const me=k(P[Z],$[Z],se);ce(me.x,me.y,h+K)}for(let Z=0,F=U.length;Z<F;Z++){const me=U[Z];Q=C[Z];for(let A=0,T=me.length;A<T;A++){const B=k(me[A],Q[A],se);x?ce(B.x,B.y+v[u-1].y,v[u-1].x+K):ce(B.x,B.y,h+K)}}}j(),le();function j(){const L=i.length/3;if(f){let ee=0,K=H*ee;for(let se=0;se<V;se++){const Z=J[se];Ae(Z[2]+K,Z[1]+K,Z[0]+K)}ee=u+p*2,K=H*ee;for(let se=0;se<V;se++){const Z=J[se];Ae(Z[0]+K,Z[1]+K,Z[2]+K)}}else{for(let ee=0;ee<V;ee++){const K=J[ee];Ae(K[2],K[1],K[0])}for(let ee=0;ee<V;ee++){const K=J[ee];Ae(K[0]+H*u,K[1]+H*u,K[2]+H*u)}}n.addGroup(L,i.length/3-L,0)}function le(){const L=i.length/3;let ee=0;ye(P,ee),ee+=P.length;for(let K=0,se=U.length;K<se;K++){const Z=U[K];ye(Z,ee),ee+=Z.length}n.addGroup(L,i.length/3-L,1)}function ye(L,ee){let K=L.length;for(;--K>=0;){const se=K;let Z=K-1;Z<0&&(Z=L.length-1);for(let F=0,me=u+p*2;F<me;F++){const A=H*F,T=H*(F+1),B=ee+se+A,ie=ee+Z+A,re=ee+Z+T,te=ee+se+T;Ue(B,ie,re,te)}}}function ce(L,ee,K){l.push(L),l.push(ee),l.push(K)}function Ae(L,ee,K){Ee(L),Ee(ee),Ee(K);const se=i.length/3,Z=M.generateTopUV(n,i,se-3,se-2,se-1);De(Z[0]),De(Z[1]),De(Z[2])}function Ue(L,ee,K,se){Ee(L),Ee(ee),Ee(se),Ee(ee),Ee(K),Ee(se);const Z=i.length/3,F=M.generateSideWallUV(n,i,Z-6,Z-3,Z-2,Z-1);De(F[0]),De(F[1]),De(F[3]),De(F[1]),De(F[2]),De(F[3])}function Ee(L){i.push(l[L*3+0]),i.push(l[L*3+1]),i.push(l[L*3+2])}function De(L){s.push(L.x),s.push(L.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return iE(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Zc[i.type]().fromJSON(i)),new zu(n,e.options)}}const nE={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new xe(s,a),new xe(o,l),new xe(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[i*3],d=e[i*3+1],g=e[i*3+2],_=e[s*3],p=e[s*3+1],m=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new xe(a,1-l),new xe(c,1-h),new xe(f,1-g),new xe(_,1-m)]:[new xe(o,1-l),new xe(u,1-h),new xe(d,1-g),new xe(p,1-m)]}};function iE(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Hu extends Bu{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Hu(e.radius,e.detail)}}class Gu extends ai{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],u=new O,h=new O,f=new O;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*s,p=d/n*Math.PI*2;h.x=(e+t*Math.cos(p))*Math.cos(_),h.y=(e+t*Math.cos(p))*Math.sin(_),h.z=t*Math.sin(p),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,p=(i+1)*(d-1)+g-1,m=(i+1)*(d-1)+g,M=(i+1)*d+g;a.push(_,p,M),a.push(p,m,M)}this.setIndex(a),this.setAttribute("position",new Yt(o,3)),this.setAttribute("normal",new Yt(l,3)),this.setAttribute("uv",new Yt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class xa extends za{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gp,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vu extends Zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class rE extends Vu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const dc=new Ut,nd=new O,id=new O;class vm{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uu,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;nd.setFromMatrixPosition(e.matrixWorld),t.position.copy(nd),id.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(id),t.updateMatrixWorld(),dc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const rd=new Ut,Js=new O,pc=new O;class sE extends vm{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new Et(2,1,1,1),new Et(0,1,1,1),new Et(3,1,1,1),new Et(1,1,1,1),new Et(3,0,1,1),new Et(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Js.setFromMatrixPosition(e.matrixWorld),n.position.copy(Js),pc.copy(n.position),pc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(pc),n.updateMatrixWorld(),i.makeTranslation(-Js.x,-Js.y,-Js.z),rd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rd)}}class aE extends Vu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new sE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class oE extends vm{constructor(){super(new nm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lE extends Vu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new oE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ru}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ru);const Yi={ivory:16513010,white:16777215,red:15024429,yellow:16758311,blush:16770010,warm:14998995},cE=matchMedia("(hover: none)").matches,Or=matchMedia("(max-width: 767px)").matches;function sd(){const r=new pm;r.moveTo(0,1.65),r.lineTo(1.1,1.1),r.lineTo(.93,-.35),r.quadraticCurveTo(.68,-1.25,0,-1.65),r.quadraticCurveTo(-.68,-1.25,-.93,-.35),r.lineTo(-1.1,1.1),r.closePath();const e=new zu(r,{depth:.32,bevelEnabled:!0,bevelSegments:Or?2:3,bevelSize:.08,bevelThickness:.08});return e.center(),new si(e,new xa({color:Yi.ivory,roughness:.22,metalness:.05}))}function uE(r){const e=[],t=Or?4:8,n=[new xa({color:Yi.red,roughness:.3}),new xa({color:Yi.yellow,roughness:.3}),new xa({color:Yi.white,roughness:.28})];for(let i=0;i<t;i++){const s=new br,a=i%3===0?new Bs(.33,.52,.25):i%3===1?new ku(.16,.16,.09,Or?10:16):new Hu(.18,0),o=new si(a,n[i%n.length]);o.rotation.set(Math.random(),Math.random(),Math.random()),s.add(o);const l=i/t*Math.PI*2,c=Or?1.9:2.1+i%2*.35;s.position.set(Math.cos(l)*c,Math.sin(l)*c*.62,(i%3-1)*.3),s.userData={angle:l,radius:c,speed:.18+i*.012,yScale:.62},r.add(s),e.push(s)}return e}function mc(r,e=!1){const t=new bM,n=new Nn(32,1,.1,100);n.position.set(0,.15,e?7:7.4);const i=new cm({canvas:r,alpha:!0,antialias:!Or});i.setPixelRatio(Math.min(window.devicePixelRatio,Or?1.5:2)),i.outputColorSpace=qt;const s=new br;t.add(s);const a=sd();s.add(a);const o=sd();o.scale.setScalar(.72),o.position.z=.2,o.material=new xa({color:Yi.red,roughness:.25}),s.add(o);const l=new br;s.add(l);const c=uE(l),u=new si(new Gu(2.13,.012,8,Or?48:96),new Du({color:Yi.warm,transparent:!0,opacity:.8}));u.rotation.x=Math.PI/2.18,s.add(u),t.add(new rE(16777215,Yi.blush,2.2));const h=new lE(16777215,3.2);h.position.set(3,5,6),t.add(h);const f=new aE(Yi.yellow,2.2,8);f.position.set(-3,1,3),t.add(f);let d={x:0,y:0},g={x:0,y:0},_=0,p=!1,m=0;const M=()=>{const y=r.parentElement.getBoundingClientRect(),U=Math.max(y.width,1),I=Math.max(y.height,1);i.setSize(U,I,!1),n.aspect=U/I,n.updateProjectionMatrix()},v=new ResizeObserver(M);v.observe(r.parentElement),M();const x=(y,U)=>{d.x=y,d.y=U};addEventListener("pointermove",y=>{cE||x((y.clientX/innerWidth-.5)*2,(y.clientY/innerHeight-.5)*2)},{passive:!0}),r.addEventListener("touchmove",y=>{const U=y.touches[0];x((U.clientX/innerWidth-.5)*2,(U.clientY/innerHeight-.5)*2)},{passive:!0});const R=()=>{_=Math.min(1,Math.max(0,(scrollY-window.innerHeight*.25)/(window.innerHeight*1.35)))};addEventListener("scroll",R,{passive:!0});const w=(y=0)=>{p&&(g.x+=(d.x-g.x)*.045,g.y+=(d.y-g.y)*.045,s.rotation.y=g.x*.22+_*Math.PI*.42,s.rotation.x=-g.y*.12,s.position.y=Math.sin(y*7e-4)*.06-_*.18,s.scale.setScalar((e?.86:1)+_*.13),c.forEach(U=>{U.userData.angle+=U.userData.speed*.006,U.position.x=Math.cos(U.userData.angle)*U.userData.radius,U.position.y=Math.sin(U.userData.angle)*U.userData.radius*U.userData.yScale,U.rotation.y+=.004}),u.rotation.z+=.0015,i.render(t,n),m=requestAnimationFrame(w))},E=()=>{p||(p=!0,m=requestAnimationFrame(w))},D=()=>{p=!1,cancelAnimationFrame(m)},S=new IntersectionObserver(([y])=>y.isIntersecting?E():D(),{threshold:.01});return S.observe(r),{setValue(y){const U=.72+y*.5;o.scale.setScalar(U)},dispose(){D(),S.disconnect(),v.disconnect(),i.dispose()}}}function hE(){const r=document.querySelector("#hero-canvas"),e=document.querySelector("#mini-canvas"),t=document.querySelector("#calc-canvas");return{hero:r?mc(r):null,mini:e?mc(e,!0):null,calc:t?mc(t,!0):null}}ol.registerPlugin(it);const ad=[["01","Kesehatan Karyawan","Group health yang menjaga tim tetap fokus, produktif, dan merasa dihargai.",["Rawat inap","Rawat jalan","Telemedis"]],["02","Jiwa Kumpulan","Perlindungan finansial yang bermakna bagi karyawan dan keluarga mereka.",["Santunan jiwa","Kecelakaan","Fleksibel"]],["03","Properti & Kebakaran","Lindungi aset penting dan operasional dari risiko yang tidak terduga.",["Gedung","Mesin","Gangguan usaha"]],["04","Kendaraan Armada","Solusi fleet insurance yang membuat mobilitas perusahaan tetap berjalan.",["Comprehensive","Tanggung jawab","Bantuan 24/7"]],["05","Marine Cargo","Kepastian untuk setiap pengiriman, dari titik keberangkatan hingga tujuan.",["All risk","Door to door","Global"]],["06","Tanggung Gugat","Percaya diri menjalankan bisnis dengan perlindungan atas tuntutan pihak ketiga.",["Public liability","Product liability","Professional"]],["07","Konstruksi CAR/EAR","Menjaga proyek besar tetap on-track sejak groundbreaking hingga serah terima.",["Contractor","Erection","Delay start-up"]]],fE=document.querySelector("#app");fE.innerHTML=`
<a class="skip-link" href="#main-content">Lewati ke konten</a>
<header class="nav-wrap">
  <nav class="nav" aria-label="Navigasi utama">
    <a class="brand" href="#top" aria-label="Demo Lux Dev beranda">Demo <em>Lux Dev</em></a>
    <div class="nav-links">
      <a class="nav-link active" href="#tentang">Tentang</a><a class="nav-link" href="#layanan">Layanan</a><a class="nav-link" href="#simulasi">Simulasi</a><a class="nav-link" href="#konsultasi">Konsultasi</a>
    </div>
    <a class="button primary nav-cta magnetic" href="#konsultasi">Konsultasi Gratis <span class="arrow">↗</span></a>
    <button class="hamburger" aria-label="Buka menu" aria-expanded="false"><i></i><i></i></button>
    <div class="progress"></div>
  </nav>
  <div class="mobile-menu" aria-hidden="true"><div class="mobile-links"><a href="#tentang">Tentang</a><a href="#layanan">Layanan</a><a href="#simulasi">Simulasi</a><a href="#konsultasi">Konsultasi</a></div><div class="mobile-menu-bottom"><a class="button primary" href="#konsultasi">Konsultasi Gratis <span class="arrow">↗</span></a><div class="mobile-contact">hello@demoluxdev.id &nbsp; / &nbsp; +62 21 555 0198</div></div></div>
</header>
<main id="main-content">
  <section class="hero" id="top">
    <div class="hero-copy"><div class="eyebrow reveal">Mitra risiko untuk bisnis yang bergerak</div><h1 class="reveal delay-1">Bisnis Anda berjalan. <em>Risikonya</em> kami tanggung.</h1><p class="hero-intro reveal delay-2">Kami membantu perusahaan Indonesia melindungi orang, aset, dan ambisi mereka — dengan solusi asuransi yang jernih dan terasa personal.</p><div class="hero-actions reveal delay-3"><a class="button primary magnetic" href="#simulasi">Hitung Premi <span class="arrow">↗</span></a><a class="button outline" href="#konsultasi">Bicara dengan kami <span class="arrow">→</span></a></div></div>
    <div class="hero-art reveal delay-2"><div class="canvas-wrap"><canvas id="hero-canvas" aria-label="Perisai 3D perlindungan korporasi"></canvas></div><div class="badge"><i></i> Berizin & diawasi OJK</div></div>
    <div class="hero-stats reveal delay-3"><div class="stat"><strong data-count="18">0</strong><span class="stat-label">tahun pengalaman</span></div><div class="stat"><strong data-count="480">0</strong><span class="stat-label">klien korporasi</span></div><div class="stat"><strong data-count="96">0</strong><span class="stat-label">klaim dibayar</span><span class="stat-label">dalam 30 hari</span></div><div class="stat"><strong>24/7</strong><span class="stat-label">dukungan ahli</span></div></div>
  </section>
  <div class="marquee" aria-label="Mitra pilihan"><div class="marquee-track"><span>ASTRA</span><i>·</i><span>GARUDAFOOD</span><i>·</i><span>PARAMOUNT</span><i>·</i><span>ARUNA</span><i>·</i><span>MERDEKA</span><i>·</i><span>ASTRA</span><i>·</i><span>GARUDAFOOD</span><i>·</i><span>PARAMOUNT</span><i>·</i><span>ARUNA</span><i>·</i><span>MERDEKA</span></div></div>
  <section class="section" id="tentang"><div class="section-head"><div class="eyebrow">01 / Tentang kami</div><p class="section-lede">Bukan sekadar menjual polis. Kami menerjemahkan risiko menjadi keputusan yang bisa dipahami dan dijalankan.</p></div><div class="about-grid"><div class="about-callout">Yang kami lindungi bukan hanya <mark>aset.</mark><br> Tapi juga keberanian untuk terus maju.</div><div class="about-copy"><p>Demo Lux Dev adalah konsultan dan broker asuransi korporasi yang berdiri di antara kompleksitas risiko dan kejernihan keputusan. Tim kami mendengarkan konteks bisnis Anda sebelum merancang perlindungan.</p><p>Kami bekerja bersama underwriter terbaik, melakukan review berkala, dan tetap hadir ketika Anda paling membutuhkan — terutama saat klaim.</p><a class="button outline" href="#konsultasi">Kenali pendekatan kami <span class="arrow">→</span></a></div><div><div class="eyebrow">Legalitas</div><div class="legal-list"><div class="legal-item"><span>OJK</span><span>Terdaftar</span></div><div class="legal-item"><span>AAUI</span><span>Anggota</span></div><div class="legal-item"><span>ISO 9001</span><span>Tersertifikasi</span></div></div></div></div><div class="timeline"><div class="timeline-item"><span class="timeline-year">2006</span><h3>Dimulai dari kepercayaan</h3><p>Melayani bisnis keluarga dan perusahaan bertumbuh.</p></div><div class="timeline-item"><span class="timeline-year">2012</span><h3>Masuk korporasi</h3><p>Memperluas ke employee benefit dan aset komersial.</p></div><div class="timeline-item"><span class="timeline-year">2019</span><h3>Digital, tetap dekat</h3><p>Memudahkan akses tanpa menghilangkan sentuhan manusia.</p></div><div class="timeline-item"><span class="timeline-year">Hari ini</span><h3>Partner jangka panjang</h3><p>Mendampingi 480+ perusahaan di Indonesia.</p></div></div></section>
  <section class="section section-tint services" id="layanan"><div class="section-head"><div class="eyebrow">02 / Yang kami lindungi</div><h2 class="section-title">Perlindungan yang <em>mengerti</em> cara bisnis bekerja.</h2></div><div class="service-track">${ad.map(([r,e,t,n])=>`<article class="service-card"><div><span class="service-num">${r} / 07</span><div class="service-icon" aria-hidden="true"></div><h3>${e}</h3><p>${t}</p></div><div><ul class="benefits">${n.map(i=>`<li>${i}</li>`).join("")}</ul><a href="#konsultasi" class="button outline" style="margin-top:24px">Pelajari <span class="arrow">→</span></a></div></article>`).join("")}</div><div class="service-dots" aria-label="Navigasi layanan">${ad.map((r,e)=>`<i class="${e===0?"is-active":""}" aria-hidden="true"></i>`).join("")}</div></section>
  <section class="section" id="simulasi"><div class="section-head"><div class="eyebrow">03 / Simulasi premi</div><h2 class="section-title">Mulai dari angka. <em>Berakhir dengan rasa aman.</em></h2></div><div class="calculator-grid"><div class="calc-panel"><div class="field"><div class="field-label"><span>Jenis perlindungan</span></div><div class="segmented" id="insurance-type"><button class="is-active" data-type="health">Kesehatan</button><button data-type="property">Properti</button><button data-type="fleet">Armada</button></div></div><div class="field"><div class="field-label"><span>Jumlah karyawan / unit</span><strong id="people-value">120</strong></div><input id="people" type="range" min="10" max="1000" value="120"><div class="range-marks"><span>10</span><span>500</span><span>1.000</span></div></div><div class="field"><div class="field-label"><span>Nilai pertanggungan</span><strong id="coverage-value">Rp 5 M</strong></div><input id="coverage" type="range" min="1" max="50" value="5"><div class="range-marks"><span>Rp 1 M</span><span>Rp 25 M</span><span>Rp 50 M</span></div></div><div class="field"><div class="field-label"><span>Tingkat risiko industri</span></div><select class="select" id="risk"><option value="0.9">Rendah — kantor & jasa</option><option value="1" selected>Sedang — retail & manufaktur ringan</option><option value="1.25">Tinggi — konstruksi & logistik</option></select></div><div class="field"><div class="field-label"><span>Plan</span></div><div class="segmented" id="plan"><button class="is-active" data-plan="0.85">Basic</button><button data-plan="1">Plus</button><button data-plan="1.25">Premium</button></div></div></div><div class="result"><div class="calc-scene"><canvas id="calc-canvas" aria-label="Perisai 3D simulasi premi"></canvas></div><div class="eyebrow">Estimasi indikatif</div><div class="result-number" id="premium">Rp 86,7 jt</div><p class="result-note">Per tahun · belum termasuk pajak dan dapat berubah setelah analisis risiko.</p><div class="bars" aria-label="Grafik komposisi premi"><i class="bar" style="height:54%"></i><i class="bar" style="height:80%"></i><i class="bar" style="height:32%"></i><i class="bar" style="height:45%"></i></div><div class="breakdown"><div class="break-row"><span>Premi dasar</span><span id="base-premium">Rp 102 jt</span></div><div class="break-row"><span>Faktor risiko</span><span id="risk-premium">+ Rp 0 jt</span></div><div class="break-row"><span>Diskon volume</span><span id="discount-premium">− Rp 15,3 jt</span></div></div><a class="button primary" href="#pendaftaran" style="margin-top:25px;width:100%">Lanjutkan ke pendaftaran <span class="arrow">↗</span></a></div></div></section>
  <section class="section section-tint" id="pendaftaran"><div class="mobile-step-label">Langkah 1 dari 3</div><div class="section-head"><div class="eyebrow">04 / Mulai terlindungi</div><p class="section-lede">Isi data awal. Konsultan kami akan menyiapkan rekomendasi yang relevan, bukan sekadar daftar produk.</p></div><div class="form-shell"><div class="form-progress"><div class="step is-active"><span>01</span><div>Data perusahaan</div></div><div class="step"><span>02</span><div>Kebutuhan & cakupan</div></div><div class="step"><span>03</span><div>Dokumen & konfirmasi</div></div></div><form class="form-card" id="registration-form"><div class="form-step is-active"><h3>Ceritakan tentang perusahaan Anda.</h3><div class="input-grid"><div class="input-field"><input required placeholder=" " id="company" /><label for="company">Nama perusahaan</label></div><div class="input-field"><input required type="email" placeholder=" " id="email" /><label for="email">Email kerja</label></div></div><div class="input-grid"><div class="input-field"><input placeholder=" " id="contact" /><label for="contact">Nama kontak</label></div><div class="input-field"><input placeholder=" " id="phone" /><label for="phone">Nomor telepon</label></div></div><div class="form-actions"><span></span><button class="button primary" type="button" data-next>Berikutnya <span class="arrow">→</span></button></div></div><div class="form-step"><h3>Apa yang ingin Anda lindungi?</h3><div class="input-field"><textarea placeholder=" " id="needs"></textarea><label for="needs">Ceritakan kebutuhan atau tantangan Anda</label></div><div class="input-field"><select class="select" id="plan-form"><option>Basic</option><option>Plus</option><option>Premium</option></select></div><div class="form-actions"><button class="button outline" type="button" data-prev>← Kembali</button><button class="button primary" type="button" data-next>Berikutnya <span class="arrow">→</span></button></div></div><div class="form-step"><h3>Satu langkah lagi.</h3><div class="dropzone" tabindex="0">Tarik dokumen ke sini atau <u>pilih file</u><br><small>PDF, XLSX, DOCX · simulasi frontend</small></div><div class="form-actions"><button class="button outline" type="button" data-prev>← Kembali</button><button class="button primary" type="submit">Kirim permintaan <span class="arrow">↗</span></button></div></div><div class="success"><div class="success-check">✓</div><h3>Terima kasih.</h3><p class="result-note">Permintaan Anda sudah kami terima. Konsultan kami akan menghubungi dalam 1 hari kerja.</p><div class="mono">REF / NMA-2026-0814</div></div></form></div></section>
  <section class="section consultation-section" id="konsultasi"><div class="section-head"><div class="eyebrow">05 / Konsultasi online</div><h2 class="section-title">Mari bicara tentang yang <em>penting.</em></h2></div><div class="consult-grid"><div class="calendar"><div class="calendar-head"><h3>Agustus 2026</h3><span class="mono">Pilih tanggal</span></div><div class="calendar-grid"><span class="day">SEN</span><span class="day">SEL</span><span class="day">RAB</span><span class="day">KAM</span><span class="day">JUM</span><span class="day">SAB</span><span class="day">MIN</span>${["27","28","29","30","31","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"].map((r,e)=>`<button class="${r==="14"?"is-selected":""}" type="button">${r}</button>`).join("")}</div><div class="eyebrow" style="margin-top:30px">Slot tersedia</div><div class="slots"><button class="slot is-selected">09:00</button><button class="slot">11:30</button><button class="slot">14:00</button><button class="slot">16:30</button></div><button class="button primary" style="margin-top:28px;width:100%" id="book-slot">Pilih waktu konsultasi <span class="arrow">→</span></button></div><div class="consultant"><div class="portrait" aria-hidden="true"></div><div class="eyebrow">Konsultan pilihan Anda</div><h3>Raka Pradipta</h3><p>Spesialis employee benefits & corporate risk · 12 tahun pengalaman mendampingi perusahaan skala menengah dan besar.</p><div class="rating">★★★★★ &nbsp; 4.9 / 5 dari 80+ klien</div><div class="consult-actions"><a class="button outline" href="mailto:hello@demoluxdev.id">Tanya Raka <span class="arrow">↗</span></a><a class="button primary whatsapp" href="https://wa.me/62215550198" target="_blank" rel="noreferrer">WhatsApp <span class="arrow">↗</span></a></div></div></div></section>
  <section class="section testimonial-section" id="testimoni"><div class="testimonial-inner"><div class="eyebrow">06 / Kata mereka</div><div class="quote"><span class="quote-mark">“</span><blockquote>Demo Lux Dev membuat proses yang biasanya rumit menjadi terasa manusiawi. Kami bisa fokus membangun bisnis, karena tahu ada partner yang menjaga dari belakang.</blockquote><cite>— Direktur HR, perusahaan consumer goods nasional</cite></div><div class="testimonial-controls"><button class="button outline" type="button" aria-label="Testimoni sebelumnya">←</button><span class="mono">01 / 03</span><button class="button outline" type="button" aria-label="Testimoni berikutnya">→</button></div><div class="testimonial-person"><div class="testimonial-avatar">DK</div><div><strong>Direktur HR</strong><span>Perusahaan consumer goods nasional</span></div></div></div></section>
  <section class="section section-tint faq-section" id="faq"><div class="faq-grid"><div class="faq-intro"><div class="eyebrow">07 / Pertanyaan umum</div><h2 class="section-title">Jawaban yang <em>jernih.</em></h2><p class="section-lede">Hal-hal penting yang sering ingin diketahui sebelum memilih partner perlindungan korporasi.</p></div><div class="faq-list"><div class="faq-item is-open"><button class="faq-q">Apa perbedaan broker dan agen? <span>+</span></button><div class="faq-a" style="max-height:100px"><p>Broker mewakili kepentingan klien untuk membandingkan dan merancang perlindungan dari beberapa perusahaan asuransi.</p></div></div><div class="faq-item"><button class="faq-q">Berapa lama proses mendapatkan penawaran? <span>+</span></button><div class="faq-a"><p>Rekomendasi indikatif biasanya siap dalam 1–3 hari kerja setelah data awal lengkap.</p></div></div><div class="faq-item"><button class="faq-q">Apakah bisa membantu proses klaim? <span>+</span></button><div class="faq-a"><p>Tim claims advocacy kami mendampingi sejak notifikasi hingga penyelesaian dengan pihak asuransi.</p></div></div><div class="faq-item"><button class="faq-q">Apakah konsultasi ini berbayar? <span>+</span></button><div class="faq-a"><p>Konsultasi awal untuk memahami kebutuhan perusahaan Anda tidak dipungut biaya.</p></div></div><div class="faq-item"><button class="faq-q">Bisakah perlindungan disesuaikan dengan industri kami? <span>+</span></button><div class="faq-a"><p>Ya. Kami memulai dari profil risiko dan konteks operasional perusahaan Anda.</p></div></div><div class="faq-item"><button class="faq-q">Bagaimana cara memulai? <span>+</span></button><div class="faq-a"><p>Jadwalkan konsultasi gratis atau mulai dari simulasi premi untuk gambaran awal.</p></div></div></div></div></section>
  <section class="cta-section"><div class="cta-inner"><div><div class="eyebrow" style="color:var(--yellow)">Siap melangkah?</div><h2>Risiko boleh datang. Anda tetap <em>siap.</em></h2><a class="button dark" href="#konsultasi">Jadwalkan konsultasi <span class="arrow">↗</span></a></div><div class="mini-art"><canvas id="mini-canvas" aria-label="Perisai 3D kecil"></canvas></div></div></section>
</main>
<footer class="footer"><div class="footer-brand">DEMO LUX DEV</div><div class="footer-grid"><div><h3>Jaga yang penting.</h3><p>Partner risiko korporasi untuk bisnis yang ingin bergerak dengan percaya diri.</p></div><div><h4>Hubungi</h4><a href="mailto:hello@demoluxdev.id">hello@demoluxdev.id</a><a href="tel:+62215550198">+62 21 555 0198</a><p>Senin–Jumat, 08.30–17.30 WIB</p></div><div><h4>Kantor</h4><p>Menara Arunika, Lantai 12<br>Jl. Jend. Sudirman Kav. 52–53<br>Jakarta Selatan 12190</p></div><div><h4>Jelajah</h4><a href="#tentang">Tentang</a><a href="#layanan">Layanan</a><a href="#simulasi">Simulasi</a><a href="#konsultasi">Konsultasi</a></div></div><div class="footer-bottom"><span>© 2026 Demo Lux Dev. Hak cipta dilindungi.</span><span>Privasi &nbsp; / &nbsp; Syarat penggunaan</span></div></footer>
<button class="chat-toggle" aria-label="Buka chat">CHAT</button><div class="chat-box" aria-live="polite"><div class="chat-head"><span>Asisten Demo Lux Dev</span><span>● Online</span></div><div class="chat-body"><div class="chat-msg">Halo! Saya bisa membantu menjawab pertanyaan awal seputar perlindungan korporasi.</div></div><div class="chat-input"><input aria-label="Pesan chat" placeholder="Tulis pesan..." /><button>Kirim</button></div></div>`;const dE=new Um({duration:1.1,smoothWheel:!0});function xm(r){dE.raf(r),requestAnimationFrame(xm)}requestAnimationFrame(xm);const _c=document.querySelector(".loader");setTimeout(()=>{_c==null||_c.classList.add("is-done"),document.body.classList.add("is-ready")},950);const od=document.querySelector(".nav");let ld=0;addEventListener("scroll",()=>{const r=scrollY;od.classList.toggle("is-scrolled",r>60),od.classList.toggle("is-hidden",r>ld&&r>180),ld=r,document.querySelector(".progress").style.width=`${Math.min(100,r/(document.body.scrollHeight-innerHeight)*100)}%`},{passive:!0});document.querySelectorAll(".magnetic").forEach(r=>{r.addEventListener("pointermove",e=>{const t=r.getBoundingClientRect();r.style.transform=`translate(${(e.clientX-t.left-t.width/2)*.12}px, ${(e.clientY-t.top-t.height/2)*.12}px)`}),r.addEventListener("pointerleave",()=>{r.style.transform=""})});const Sa=document.querySelector(".cursor");addEventListener("pointermove",r=>{Sa.style.left=`${r.clientX}px`,Sa.style.top=`${r.clientY}px`});document.querySelectorAll("a,button").forEach(r=>{r.addEventListener("mouseenter",()=>{Sa.classList.add("is-hover"),Sa.querySelector("span").textContent=r.matches("a")?"Buka":"Lihat"}),r.addEventListener("mouseleave",()=>Sa.classList.remove("is-hover"))});const Fo=document.querySelector(".hamburger"),eu=document.querySelector(".mobile-menu");Fo.addEventListener("click",()=>{const r=Fo.classList.toggle("is-open");Fo.setAttribute("aria-expanded",r),eu.classList.toggle("is-open",r),eu.setAttribute("aria-hidden",!r),document.body.classList.toggle("is-locked",r)});eu.querySelectorAll("a").forEach(r=>r.addEventListener("click",()=>Fo.click()));document.querySelectorAll("[data-count]").forEach(r=>{new IntersectionObserver(([t],n)=>{if(!t.isIntersecting)return;const i=Number(r.dataset.count);ol.to({value:0},{value:i,duration:1.5,ease:"power2.out",onUpdate(){r.textContent=Math.round(this.targets()[0].value)+(i===96?"%":"+")}}),n.disconnect()},{threshold:.5}).observe(r)});const mr=document.querySelector(".service-track"),gc=document.querySelector(".service-dots"),pE=()=>{matchMedia("(min-width: 1024px)").matches?ol.to(mr,{x:()=>-(mr.scrollWidth-innerWidth+120),ease:"none",scrollTrigger:{trigger:mr,start:"top 75%",end:()=>`+=${mr.scrollWidth-innerWidth+180}`,scrub:1,pin:!1}}):mr.addEventListener("scroll",()=>{const r=Math.round(mr.scrollLeft/(mr.clientWidth*.85));gc==null||gc.querySelectorAll("i").forEach((e,t)=>e.classList.toggle("is-active",t===r))},{passive:!0})};pE();document.querySelectorAll(".faq-q").forEach(r=>r.addEventListener("click",()=>{const e=r.parentElement,t=e.querySelector(".faq-a"),n=e.classList.toggle("is-open");t.style.maxHeight=n?`${t.scrollHeight}px`:"0px"}));let il=0;const Wu=[...document.querySelectorAll(".form-step")],mE=[...document.querySelectorAll(".form-progress .step")];function Sm(r){il=r,Wu.forEach((t,n)=>t.classList.toggle("is-active",n===r)),mE.forEach((t,n)=>t.classList.toggle("is-active",n<=r));const e=document.querySelector(".mobile-step-label");e&&(e.textContent=`Langkah ${r+1} dari 3`)}document.querySelectorAll("[data-next]").forEach(r=>r.addEventListener("click",()=>{var t;const e=[...Wu[il].querySelectorAll("[required]")];if(e.some(n=>!n.checkValidity())){(t=e.find(n=>!n.checkValidity()))==null||t.focus();return}Sm(Math.min(2,il+1))}));document.querySelectorAll("[data-prev]").forEach(r=>r.addEventListener("click",()=>Sm(Math.max(0,il-1))));document.querySelector("#registration-form").addEventListener("submit",r=>{r.preventDefault(),Wu.forEach(e=>e.style.display="none"),document.querySelector(".success").classList.add("is-visible")});document.querySelectorAll(".calendar-grid button,.slot").forEach(r=>r.addEventListener("click",()=>{const e=r.classList.contains("slot")?".slot":".calendar-grid button";document.querySelectorAll(e).forEach(t=>t.classList.remove("is-selected")),r.classList.add("is-selected")}));document.querySelector("#book-slot").addEventListener("click",()=>alert("Terima kasih. Slot konsultasi Anda sudah dipilih (simulasi demo)."));const ym=document.querySelector("#people"),Mm=document.querySelector("#coverage"),Em=document.querySelector("#risk");let Tm=1,bm=.85;const wo=r=>`Rp ${(r/1e6).toLocaleString("id-ID",{maximumFractionDigits:1})} jt`;function pl(){var o;const r=Number(ym.value),e=Number(Mm.value),t=Number(Em.value),n=(r*41e4+e*125e4)*Tm,i=n*t*bm,s=n*(t-1),a=Math.max(0,n-i-s);document.querySelector("#people-value").textContent=r.toLocaleString("id-ID"),document.querySelector("#coverage-value").textContent=`Rp ${e} M`,document.querySelector("#premium").textContent=wo(i),document.querySelector("#base-premium").textContent=wo(n),document.querySelector("#risk-premium").textContent=`${s>=0?"+":"−"} ${wo(Math.abs(s))}`,document.querySelector("#discount-premium").textContent=`− ${wo(a)}`,(o=vc==null?void 0:vc.hero)==null||o.setValue(Math.min(1,e/50))}[ym,Mm,Em].forEach(r=>r.addEventListener("input",pl));document.querySelectorAll("#insurance-type button").forEach(r=>r.addEventListener("click",()=>{document.querySelectorAll("#insurance-type button").forEach(e=>e.classList.remove("is-active")),r.classList.add("is-active"),Tm=r.dataset.type==="property"?1.35:r.dataset.type==="fleet"?1.15:1,pl()}));document.querySelectorAll("#plan button").forEach(r=>r.addEventListener("click",()=>{document.querySelectorAll("#plan button").forEach(e=>e.classList.remove("is-active")),r.classList.add("is-active"),bm=Number(r.dataset.plan),pl()}));const _E=document.querySelector(".chat-toggle"),gE=document.querySelector(".chat-box");_E.addEventListener("click",()=>gE.classList.toggle("is-open"));const tu=document.querySelector(".chat-input input"),vE=document.querySelector(".chat-input button");function wm(){const r=tu.value.trim();if(!r)return;const e=document.querySelector(".chat-body");e.insertAdjacentHTML("beforeend",`<div class="chat-msg you">${r.replace(/[<>]/g,"")}</div>`),tu.value="",setTimeout(()=>e.insertAdjacentHTML("beforeend",'<div class="chat-msg">Terima kasih! Tim kami siap membantu. Pilih konsultasi gratis untuk percakapan yang lebih personal.</div>'),550)}vE.addEventListener("click",wm);tu.addEventListener("keydown",r=>{r.key==="Enter"&&wm()});const vc=hE();pl();
