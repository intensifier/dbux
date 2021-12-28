"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[344],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return m}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),f=u(t),m=i,p=f["".concat(c,".").concat(m)]||f[m]||d[m]||o;return t?r.createElement(p,a(a({ref:n},s),{},{components:t})):r.createElement(p,a({ref:n},s))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=f;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},7783:function(e,n,t){t.d(n,{Z:function(){return a}});var r=t(7294),i="tableOfContentsInline_0DDH",o=t(5002);var a=function(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return r.createElement("div",{className:i},r.createElement(o.Z,{toc:n,minHeadingLevel:t,maxHeadingLevel:a,className:"table-of-contents",linkClassName:null}))}},5002:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(7462),i=t(3366),o=t(7294),a=t(3616),l=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function c(e){var n=e.toc,t=e.className,r=e.linkClassName,i=e.isChild;return n.length?o.createElement("ul",{className:i?void 0:t},n.map((function(e){return o.createElement("li",{key:e.id},o.createElement("a",{href:"#"+e.id,className:null!=r?r:void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(c,{isChild:!0,toc:e.children,className:t,linkClassName:r}))}))):null}function u(e){var n=e.toc,t=e.className,u=void 0===t?"table-of-contents table-of-contents__left-border":t,s=e.linkClassName,d=void 0===s?"table-of-contents__link":s,f=e.linkActiveClassName,m=void 0===f?void 0:f,p=e.minHeadingLevel,b=e.maxHeadingLevel,v=(0,i.Z)(e,l),g=(0,a.LU)(),x=null!=p?p:g.tableOfContents.minHeadingLevel,y=null!=b?b:g.tableOfContents.maxHeadingLevel,O=(0,a.DA)({toc:n,minHeadingLevel:x,maxHeadingLevel:y}),h=(0,o.useMemo)((function(){if(d&&m)return{linkClassName:d,linkActiveClassName:m,minHeadingLevel:x,maxHeadingLevel:y}}),[d,m,x,y]);return(0,a.Si)(h),o.createElement(c,(0,r.Z)({toc:O,className:u,linkClassName:d},v))}},4264:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return d},default:function(){return m}});var r=t(7462),i=t(3366),o=(t(7294),t(3905)),a=t(7783),l=["components"],c={title:"Dbux CLI"},u="Dbux CLI",s={unversionedId:"tools-and-configuration/dbux-cli",id:"tools-and-configuration/dbux-cli",title:"Dbux CLI",description:"The Dbux CLI package @dbux/cli is a convinience tool for running Node applications with Dbux enabled.",source:"@site/content/04-tools-and-configuration/02-dbux-cli.mdx",sourceDirName:"04-tools-and-configuration",slug:"/tools-and-configuration/dbux-cli",permalink:"/dbux/tools-and-configuration/dbux-cli",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/content/04-tools-and-configuration/02-dbux-cli.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Dbux CLI"},sidebar:"tutorialSidebar",previous:{title:"Dbux VSCode Extension",permalink:"/dbux/tools-and-configuration/dbux-code"},next:{title:"Dbux Babel Plugin",permalink:"/dbux/tools-and-configuration/dbux-babel-plugin"}},d=[{value:"hi",id:"hi",children:[],level:2},{value:"Config",id:"config",children:[],level:2}],f={toc:d};function m(e){var n=e.components,t=(0,i.Z)(e,l);return(0,o.kt)("wrapper",(0,r.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"dbux-cli"},"Dbux CLI"),(0,o.kt)("p",null,"The Dbux CLI package ",(0,o.kt)("inlineCode",{parentName:"p"},"@dbux/cli")," is a convinience tool for running Node applications with Dbux enabled."),(0,o.kt)("div",{style:{display:"none"}},(0,o.kt)(a.Z,{toc:d,mdxType:"TOCInline"})),(0,o.kt)("h2",{id:"hi"},"hi"),(0,o.kt)("p",null,"TODO"),(0,o.kt)("h2",{id:"config"},"Config"),(0,o.kt)("p",null,"TODO"))}m.isMDXComponent=!0}}]);