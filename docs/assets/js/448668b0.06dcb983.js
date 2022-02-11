/*! For license information please see 448668b0.06dcb983.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[474],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=c(n),f=a,b=d["".concat(l,".").concat(f)]||d[f]||p[f]||i;return n?r.createElement(b,o(o({ref:t},s),{},{components:n})):r.createElement(b,o({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:a,o[1]=u;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5679:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7294),a=n(633);function i(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),r.createElement(a.Z,t)}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var r=n(7462),a=n(3366),i=n(7294),o=n(4184),u=n.n(o),l=n(7037),c=n.n(l),s=n(5350),p=n(8767);var d=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function f(e){return e.startsWith("/")||e.includes("://")}function b(e){var t=e.src,n=e.title,o=e.zoomable,l=e.darkLight,b=e.screen,m=e.concept,y=e.className,h=e.maxWidth,g=e.mb,v=e.style,x=(0,a.Z)(e,d);m&&(t.startsWith("concept")||f(t)||(t="concepts/"+t)),b&&(t.startsWith("screen")||f(t)||(t="screens/"+t));var k=m||b||o;k&&void 0===o&&(o=!0);var O=function(e){var t=e.src,n=e.darkLight,r=(0,s.Z)().isDarkTheme;return(0,p.Z)()+(n?r?"dark/":"light/":"")+t}({src:t,darkLight:l}),j=n=n||t;y=u()(y,{"border-screen":k,"img-crisp":k,zoomable:o});var w=i.createElement("img",(0,r.Z)({className:y,style:v,src:O,alt:j,title:n},x));if(h){h=c()(h)?h:h+"px",g=void 0===g?"mb-2":g;var N=u()(g),T={display:"inline-block",maxWidth:h,lineHeight:0};w=i.createElement("div",{className:N,style:T},w)}return w}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(2263);function a(){return(0,r.Z)().siteConfig.baseUrl}},5674:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return p},default:function(){return f}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=n(5679),u=["components"],l={},c="Enable Dbux",s={unversionedId:"runtime-analysis/enable-dbux",id:"runtime-analysis/enable-dbux",title:"Enable Dbux",description:"\x3c!-- import TOC from '@src/components/TOC';",source:"@site/content/runtime-analysis/02-enable-dbux.mdx",sourceDirName:"runtime-analysis",slug:"/runtime-analysis/enable-dbux",permalink:"/dbux/runtime-analysis/enable-dbux",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/runtime-analysis/02-enable-dbux.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/dbux/runtime-analysis/installation"},next:{title:"The Run Button",permalink:"/dbux/runtime-analysis/the-run-button"}},p=[],d={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,u);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"enable-dbux"},"Enable Dbux"),(0,i.kt)("p",null,"Before you can ",(0,i.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis#runtime-analysis"},"analyze")," an application, you must first execute it with Dbux enabled. This means, the application must be instrumented by ",(0,i.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-babel-plugin"},"@dbux/babel-plugin")," and injected with the ",(0,i.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-runtime"},"@dbux/runtime"),"."),(0,i.kt)("p",null,"These are the different ways for achieving that:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/the-run-button"},"The Run Button")," ",(0,i.kt)(o.Z,{src:"play.svg",mdxType:"DarkLightImg"})," allows you to easily run a simple Node application with Dbux enabled."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("a",{parentName:"li",href:"/dbux/tools-and-configuration/dbux-cli"},"Dbux CLI")," provides the magic behind ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/the-run-button"},"The Run Button"),". You can use it directly in order to run Node applications from a terminal or command-line window."),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"../dbux-practice"},"Dbux Practice")," allows the user to execute a curated list of real-world applications (some with real-world bugs) at the click of a single button."),(0,i.kt)("li",{parentName:"ol"},"In order to enable Dbux for frontend and other bundled applications, the developer needs to manually ",(0,i.kt)("a",{parentName:"li",href:"/dbux/guides/build-pipeline-integration"},"integrate Dbux into the project's build pipeline"),".")),(0,i.kt)("p",null,"Once running, an instrumented target application will try to record and send all runtime data to the ",(0,i.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code#runtime-server"},"runtime server")," where the developer can commence with ",(0,i.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis#runtime-analysis"},"runtime analysis"),"."))}f.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=a.apply(null,n);o&&e.push(o)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var u in n)r.call(n,u)&&n[u]&&e.push(u);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var r=n(5639).Symbol;e.exports=r},4239:function(e,t,n){var r=n(2705),a=n(9607),i=n(2333),o=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":o&&o in Object(e)?a(e):i(e)}},1957:function(e,t,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},9607:function(e,t,n){var r=n(2705),a=Object.prototype,i=a.hasOwnProperty,o=a.toString,u=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(l){}var a=o.call(e);return r&&(t?e[u]=n:delete e[u]),a}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var r=n(1957),a="object"==typeof self&&self&&self.Object===Object&&self,i=r||a||Function("return this")();e.exports=i},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var r=n(4239),a=n(1469),i=n(7005);e.exports=function(e){return"string"==typeof e||!a(e)&&i(e)&&"[object String]"==r(e)}}}]);