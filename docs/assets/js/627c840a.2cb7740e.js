/*! For license information please see 627c840a.2cb7740e.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[127],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(r),m=a,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},5679:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(7294),a=r(633);function o(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),n.createElement(a.Z,t)}},633:function(e,t,r){"use strict";r.d(t,{Z:function(){return m}});var n=r(7462),a=r(3366),o=r(7294),i=r(4184),c=r.n(i),s=r(7037),l=r.n(s),u=r(5350),d=r(8767);var p=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","style"];function m(e){var t=e.src,r=e.title,i=e.zoomable,s=e.darkLight,m=e.screen,f=e.concept,h=e.className,g=e.maxWidth,v=e.style,b=(0,a.Z)(e,p);f&&(t.startsWith("concept")||t.startsWith("/")||t.includes("://")||(t="concepts/"+t)),m&&(t.startsWith("screen")||t.startsWith("/")||t.includes("://")||(t="screens/"+t));var y=f||m;y&&void 0===i&&(i=!0);var k=function(e){var t=e.src,r=e.darkLight,n=(0,u.Z)().isDarkTheme;return(0,d.Z)()+(r?n?"dark/":"light/":"")+t}({src:t,darkLight:s}),x=r=r||t;h=c()(h,{"border-screen":y,zoomable:i});var N=o.createElement("img",(0,n.Z)({className:h,style:v,src:k,alt:x,title:r},b));if(g){var O={display:"inline-block",maxWidth:g=l()(g)?g:g+"px"};N=o.createElement("div",{style:O},N)}return N}},1333:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(7294),a=r(8767),o="TODO",i={cgr:"cgr",trace:"trace",staticTrace:"trace",context:"context",acg:"TODO","call graph":"call-graph",ae:o,aes:o,"asynchronous event":o,"asynchronous events":o,"dynamic runtime analysis":"dynamic-runtime-analysis",idbe:"idbe"};function c(e){var t=e.term,r=e.children,o=void 0===r?t:r,c=function(e){var t=i[e.toLowerCase()];return t?(0,a.Z)()+"advanced/terminology#"+t:null}(t);return c?n.createElement("a",{href:c,title:'lookup term: "'+t+'"'},o,n.createElement("sup",null,"\u2754")):n.createElement(n.Fragment,null,"$",o,n.createElement("span",{className:"color-gray border-gray round",title:'(could not look up "'+o+'")'},n.createElement("sup",null,"\u2753")))}},8767:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(2263);function a(){return(0,n.Z)().siteConfig.baseUrl}},2901:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return u},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return m},default:function(){return h}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=r(633),c=r(5679),s=r(1333),l=["components"],u={sidebar_class_name:"sidebar-select-trace"},d="Select Trace",p={unversionedId:"using-dbux/select-trace",id:"using-dbux/select-trace",title:"Select Trace",description:"You can investigate a trace record (short",source:"@site/content/using-dbux/05-select-trace.mdx",sourceDirName:"using-dbux",slug:"/using-dbux/select-trace",permalink:"/dbux/using-dbux/select-trace",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/using-dbux/05-select-trace.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_class_name:"sidebar-select-trace"},sidebar:"tutorialSidebar",previous:{title:"Code Decorations",permalink:"/dbux/using-dbux/code-decorations"},next:{title:"Application View",permalink:"/dbux/using-dbux/applications"}},m=[],f={toc:m};function h(e){var t=e.components,r=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"select-trace"},"Select Trace"),(0,o.kt)("p",null,"You can investigate a trace record (short: ",(0,o.kt)(s.Z,{term:"trace",mdxType:"Term"}),') of executed code using the "Select Trace" ',(0,o.kt)(c.Z,{src:"crosshair_red.svg",mdxType:"DarkLightImg"})," button:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Place the keyboard cursor on a piece of code that has executed.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"You should see the red crosshair ",(0,o.kt)(c.Z,{src:"crosshair_red.svg",mdxType:"DarkLightImg"})," show up in two places: the top right of the editor window and in the ",(0,o.kt)("a",{parentName:"li",href:"./trace-details"},"Trace Details View"),(0,o.kt)("sup",{parentName:"li",id:"fnref-1"},(0,o.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),"."),(0,o.kt)("li",{parentName:"ul"},"If there is no red crosshair, the selected code has not executed (or its execution has not been recorded)."),(0,o.kt)("li",{parentName:"ul"},"NOTE: Most executed code is ",(0,o.kt)("a",{parentName:"li",href:"/dbux/using-dbux/code-decorations"},"decorated")," ",(0,o.kt)("span",{className:"color-red"}," \u21b3 \u21b1 "),(0,o.kt)("span",{className:"color-gray"},"\u21b3")," ",(0,o.kt)("span",{className:"color-orange"},"\u0192"),"."),(0,o.kt)("li",{parentName:"ul"},"Keywords like ",(0,o.kt)("inlineCode",{parentName:"li"},"if")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"return")," cannot currently be selected, however their conditions/arguments can."))),(0,o.kt)("li",{parentName:"ul"},"Click the crosshair ",(0,o.kt)(c.Z,{src:"crosshair_red.svg",mdxType:"DarkLightImg"})," or use the ",(0,o.kt)("inlineCode",{parentName:"li"},"Dbux: Select Trace at Cursor")," command to select."),(0,o.kt)("li",{parentName:"ul"},"Use repeatedly to select surrounding traces (as shown in the gif above).")),(0,o.kt)("p",null,"Once a ",(0,o.kt)(s.Z,{term:"trace",mdxType:"Term"})," is selected, the ",(0,o.kt)("a",{parentName:"p",href:"./trace-details"},"Trace Details View")," should offer a wide array of relevant information regarding the selected piece of code:"),(0,o.kt)(i.Z,{screen:!0,src:"select-trace.gif",mdxType:"Img"}),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"A piece of code might have ",(0,o.kt)("a",{parentName:"p",href:"./trace-details#executions"},"executed multiple times"),". Make sure you know which execution is selected before drawing conclusions."))),(0,o.kt)("div",{className:"footnotes"},(0,o.kt)("hr",{parentName:"div"}),(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol",id:"fn-1"},"You might need to hover over the ",(0,o.kt)("inlineCode",{parentName:"li"},"Trace Details View")," for buttons to show up. This is a ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/microsoft/vscode/issues/78829"},"limitation of the VSCode Extension API"),".",(0,o.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}h.isMDXComponent=!0},4184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var c in r)n.call(r,c)&&r[c]&&e.push(c);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},2705:function(e,t,r){var n=r(5639).Symbol;e.exports=n},4239:function(e,t,r){var n=r(2705),a=r(9607),o=r(2333),i=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?a(e):o(e)}},1957:function(e,t,r){var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=n},9607:function(e,t,r){var n=r(2705),a=Object.prototype,o=a.hasOwnProperty,i=a.toString,c=n?n.toStringTag:void 0;e.exports=function(e){var t=o.call(e,c),r=e[c];try{e[c]=void 0;var n=!0}catch(s){}var a=i.call(e);return n&&(t?e[c]=r:delete e[c]),a}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,r){var n=r(1957),a="object"==typeof self&&self&&self.Object===Object&&self,o=n||a||Function("return this")();e.exports=o},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,r){var n=r(4239),a=r(1469),o=r(7005);e.exports=function(e){return"string"==typeof e||!a(e)&&o(e)&&"[object String]"==n(e)}}}]);