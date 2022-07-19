/*! For license information please see 562b6eb9.7670dd77.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[365],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(n),m=a,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5679:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7294),a=n(633);function i(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),r.createElement(a.Z,t)}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(7462),a=n(3366),i=n(7294),o=n(4184),c=n.n(o),s=n(7037),l=n.n(s),p=n(5350),u=n(8767);var d=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function m(e){return e.startsWith("/")||e.includes("://")}function f(e){var t=e.src,n=e.title,o=e.zoomable,s=e.darkLight,f=e.screen,g=e.concept,h=e.className,v=e.maxWidth,y=e.mb,b=e.style,k=(0,a.Z)(e,d);g&&(t.startsWith("concept")||m(t)||(t="concepts/"+t)),f&&(t.startsWith("screen")||m(t)||(t="screens/"+t));var w=g||f||o;w&&void 0===o&&(o=!0);var x=function(e){var t=e.src,n=e.darkLight,r=(0,p.Z)().isDarkTheme;return(0,u.Z)()+(n?r?"dark/":"light/":"")+t}({src:t,darkLight:s}),N=n=n||t;h=c()(h,{"border-screen":w,"img-crisp":w,zoomable:o});var O=i.createElement("img",(0,r.Z)({className:h,style:b,src:x,alt:N,title:n},k));if(v){v=l()(v)?v:v+"px",y=void 0===y?"mb-2":y;var j=c()(y),T={display:"inline-block",maxWidth:v,lineHeight:0};O=i.createElement("div",{className:j,style:T},O)}return O}},1333:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(7294),a=n(8767),i="acg",o="background/debugging",c={cgrs:"cgr","call graph root":"cgr","call graph roots":"cgr",aes:"ae","asynchronous event":"ae","asynchronous events":"ae","asynchronous call graph":"acg","race conditions":"race condition"},s={"call graph":"features/call-graph",acg:i,cgr:i,ae:i,"dynamic dynamic analysis":o,idbe:o,"race condition":"https://www.google.com/search?q=race+condition&hl=en"},l={trace:"trace",statictrace:"trace",context:"context",staticcontext:"staticContext","call graph":"call-graph",acg:"",cgr:"cgr",ae:"ae","dynamic dynamic analysis":"",idbe:""};function p(e){var t=e.term,n=e.children,i=void 0===n?t:n,o=function(e){var t=e.toLowerCase(),n=s[t=c[t]||t]||"advanced/terminology",r=l[t];return n||r?(r=r?"#"+r:"",""+(0,a.Z)()+n+r):null}(t);return o?r.createElement("a",{href:o,title:'lookup term: "'+t+'"'},i,r.createElement("sup",null,"\u2754")):r.createElement(r.Fragment,null,"$",i,r.createElement("span",{className:"color-gray border-gray round",title:'(could not look up "'+i+'")'},r.createElement("sup",null,"\u2753")))}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(2263);function a(){return(0,r.Z)().siteConfig.baseUrl}},1395:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return u},metadata:function(){return d},toc:function(){return m},default:function(){return g}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=n(1333),c=n(633),s=n(5679),l=["components"],p={},u="Application View",d={unversionedId:"features/applications",id:"features/applications",title:"Application View",description:"This view lists all recorded applications. Applications of the same entry point are grouped together:",source:"@site/content/features/05-applications.mdx",sourceDirName:"features",slug:"/features/applications",permalink:"/dbux/features/applications",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/features/05-applications.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Code Decorations",permalink:"/dbux/features/code-decorations"},next:{title:"Select Trace",permalink:"/dbux/features/select-trace"}},m=[],f={toc:m};function g(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"application-view"},"Application View"),(0,i.kt)("p",null,"This view lists all recorded applications. Applications of the same entry point are grouped together:"),(0,i.kt)(c.Z,{screen:!0,src:"sample-applications-view.png",mdxType:"Img"}),(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("p",null,"You can use this view in several ways:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Use the ",(0,i.kt)(s.Z,{src:"nextTrace.svg",mdxType:"DarkLightImg"})," button to the right of an application to go to its entry point."),(0,i.kt)("li",{parentName:"ul"},"Click an application to enable/disable it.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"If an application is disabled (no checkmark), you cannot interact with it: its code is not augmented, its traces cannot be selected or searched, and it does not show up in the call graph."),(0,i.kt)("li",{parentName:"ul"},"NOTE: Activating multiple applications at once can be useful for full-stack debugging purposes.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"When multiple applications are enabled at the same time, their ",(0,i.kt)(o.Z,{term:"cgr",mdxType:"Term"},"call graph roots")," are merged onto a single timeline, allowing their data to be inspected together.")))))),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"If your application does not show up here, you cannot analyze it. If that happens to you, please ",(0,i.kt)("a",{parentName:"p",href:"/dbux/faq#my-applications-dont-show-up"},"refer to our FAQ"),"."))),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This view is not crucial for most analysis tasks. We recommend minimizing it when you don't need it."))))}g.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=a.apply(null,n);o&&e.push(o)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var c in n)r.call(n,c)&&n[c]&&e.push(c);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var r=n(5639).Symbol;e.exports=r},4239:function(e,t,n){var r=n(2705),a=n(9607),i=n(2333),o=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":o&&o in Object(e)?a(e):i(e)}},1957:function(e,t,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},9607:function(e,t,n){var r=n(2705),a=Object.prototype,i=a.hasOwnProperty,o=a.toString,c=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,c),n=e[c];try{e[c]=void 0;var r=!0}catch(s){}var a=o.call(e);return r&&(t?e[c]=n:delete e[c]),a}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var r=n(1957),a="object"==typeof self&&self&&self.Object===Object&&self,i=r||a||Function("return this")();e.exports=i},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var r=n(4239),a=n(1469),i=n(7005);e.exports=function(e){return"string"==typeof e||!a(e)&&i(e)&&"[object String]"==r(e)}}}]);