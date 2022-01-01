"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[857],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return b}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,u=e.originalType,c=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),d=l(n),b=o,f=d["".concat(c,".").concat(b)]||d[b]||p[b]||u;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var u=n.length,i=new Array(u);i[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var l=2;l<u;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5679:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(7294),o=n(633);function u(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),r.createElement(o.Z,t)}},633:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(7462),o=n(3366),u=n(7294),i=n(5350),a=n(8767);var c=["src","title","zoomable","darkLight"];function l(e){var t=e.src,n=e.title,l=e.zoomable,s=e.darkLight,p=(0,o.Z)(e,c),d=function(e){var t=e.src,n=e.darkLight,r=(0,i.Z)().isDarkTheme;return(0,a.Z)()+(n?r?"dark/":"light/":"")+t}({src:t,darkLight:s}),b=l?"zoomable":"",f=n=n||t;return u.createElement("img",(0,r.Z)({className:b,src:d,alt:f,title:n},p))}},8767:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(2263);function o(){return(0,r.Z)().siteConfig.baseUrl}},2134:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return b}});var r=n(7462),o=n(3366),u=(n(7294),n(3905)),i=n(5679),a=["components"],c={sidebar_class_name:"run-button"},l="The Run Button",s={unversionedId:"using-dbux/the-run-button",id:"using-dbux/the-run-button",title:"The Run Button",description:"The Run Button  allows the user to easily run a simple Node application with Dbux enabled. Simply open a *.js file and press it, e.g.:",source:"@site/content/02-using-dbux/03-the-run-button.mdx",sourceDirName:"02-using-dbux",slug:"/using-dbux/the-run-button",permalink:"/dbux/using-dbux/the-run-button",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/content/02-using-dbux/03-the-run-button.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_class_name:"run-button"},sidebar:"tutorialSidebar",previous:{title:"Enable Dbux",permalink:"/dbux/using-dbux/"},next:{title:"Code Augmentation",permalink:"/dbux/using-dbux/code-augmentation"}},p=[],d={toc:p};function b(e){var t=e.components,n=(0,o.Z)(e,a);return(0,u.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"the-run-button"},"The Run Button"),(0,u.kt)("p",null,"The Run Button ",(0,u.kt)(i.Z,{src:"play.svg",mdxType:"DarkLightImg"})," allows the user to easily run a simple Node application ",(0,u.kt)("a",{parentName:"p",href:"./"},"with Dbux enabled"),". Simply open a ",(0,u.kt)("inlineCode",{parentName:"p"},"*.js")," file and press it, e.g.:"),(0,u.kt)("p",null,"TODO(gif)"))}b.isMDXComponent=!0}}]);