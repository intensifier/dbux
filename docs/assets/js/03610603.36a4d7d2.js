"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[486],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=r.createContext({}),d=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=d(e.components);return r.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},s=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,l=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=d(t),m=i,b=s["".concat(u,".").concat(m)]||s[m]||p[m]||l;return t?r.createElement(b,a(a({ref:n},c),{},{components:t})):r.createElement(b,a({ref:n},c))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=t.length,a=new Array(l);a[0]=s;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,a[1]=o;for(var d=2;d<l;d++)a[d]=t[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}s.displayName="MDXCreateElement"},5002:function(e,n,t){t.d(n,{Z:function(){return d}});var r=t(7462),i=t(3366),l=t(7294),a=t(3616),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function u(e){var n=e.toc,t=e.className,r=e.linkClassName,i=e.isChild;return n.length?l.createElement("ul",{className:i?void 0:t},n.map((function(e){return l.createElement("li",{key:e.id},l.createElement("a",{href:"#"+e.id,className:null!=r?r:void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(u,{isChild:!0,toc:e.children,className:t,linkClassName:r}))}))):null}function d(e){var n=e.toc,t=e.className,d=void 0===t?"table-of-contents table-of-contents__left-border":t,c=e.linkClassName,p=void 0===c?"table-of-contents__link":c,s=e.linkActiveClassName,m=void 0===s?void 0:s,b=e.minHeadingLevel,f=e.maxHeadingLevel,v=(0,i.Z)(e,o),g=(0,a.LU)(),h=null!=b?b:g.tableOfContents.minHeadingLevel,k=null!=f?f:g.tableOfContents.maxHeadingLevel,x=(0,a.DA)({toc:n,minHeadingLevel:h,maxHeadingLevel:k}),O=(0,l.useMemo)((function(){if(p&&m)return{linkClassName:p,linkActiveClassName:m,minHeadingLevel:h,maxHeadingLevel:k}}),[p,m,h,k]);return(0,a.Si)(O),l.createElement(u,(0,r.Z)({toc:x,className:d,linkClassName:p},v))}},3755:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(7462),i=t(3366),l=t(7294),a=["path","children","title"],o={"dbux-code":"Dbux VSCode Extension"};function u(e){var n=e.path,t=e.children,u=e.title,d=(0,i.Z)(e,a);if(!n)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var c=function(e){return o[e]||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}(n);t=t||c,u=u||t;var p="https://github.com/Domiii/dbux/tree/master/"+n;return l.createElement("a",(0,r.Z)({title:u,href:p},d),t)}},8640:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(7294),i="tableOfContentsInline_0DDH",l=t(5002);var a=function(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return r.createElement("div",{className:i},r.createElement(l.Z,{toc:n,minHeadingLevel:t,maxHeadingLevel:a,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function u(e){var n=e.toc;return r.createElement("div",{style:o},r.createElement(a,{toc:n}))}},3306:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return d},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return b}});var r=t(7462),i=t(3366),l=(t(7294),t(3905)),a=t(3755),o=t(8640),u=["components"],d={},c="Build Pipeline Integration",p={unversionedId:"guides/build-pipeline-integration",id:"guides/build-pipeline-integration",title:"Build Pipeline Integration",description:'As explained in the Using Dbux Chapter you need to "babel your program" with @dbux/babel-plugin enabled).',source:"@site/content/guides/02-build-pipeline-integration.mdx",sourceDirName:"guides",slug:"/guides/build-pipeline-integration",permalink:"/dbux/guides/build-pipeline-integration",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/guides/02-build-pipeline-integration.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Which Files are Traced?",permalink:"/dbux/guides/which-files-are-traced"},next:{title:"Performance",permalink:"/dbux/guides/performance"}},s=[{value:"Setup",id:"setup",children:[],level:2},{value:"Config",id:"config",children:[],level:2},{value:"Node Applications (unbundled)",id:"node-applications-unbundled",children:[],level:2},{value:"Webpack",id:"webpack",children:[],level:2},{value:"Rollup",id:"rollup",children:[],level:2},{value:"Create-React-App",id:"create-react-app",children:[],level:2},{value:"Next.js",id:"nextjs",children:[],level:2},{value:"Other Bundlers or Bundler Wrappers",id:"other-bundlers-or-bundler-wrappers",children:[],level:2}],m={toc:s};function b(e){var n=e.components,t=(0,i.Z)(e,u);return(0,l.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"build-pipeline-integration"},"Build Pipeline Integration"),(0,l.kt)(o.Z,{toc:s,mdxType:"TOC"}),(0,l.kt)("p",null,"As explained in ",(0,l.kt)("a",{parentName:"p",href:"../using-dbux"},"the Using Dbux Chapter"),": For Dbux to work, it first needs to record JavaScript application behavior. To that end, your program must be instrumented with ",(0,l.kt)(a.Z,{path:"dbux-babel-plugin",mdxType:"CodeLink"}),' (i.e.: you need to "',(0,l.kt)("a",{parentName:"p",href:"https://babeljs.io/"},"babel"),' your program" with ',(0,l.kt)("inlineCode",{parentName:"p"},"@dbux/babel-plugin")," enabled)."),(0,l.kt)("p",null,"Once running, the injected ",(0,l.kt)("inlineCode",{parentName:"p"},"@dbux/runtime")," will send collected data to the ",(0,l.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code#runtime-server"},"runtime server"),"."),(0,l.kt)("h2",{id:"setup"},"Setup"),(0,l.kt)("p",null,"TODO: add relevant dbux dependencies (",(0,l.kt)("inlineCode",{parentName:"p"},"npm install -D"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"yarn add --dev"),")"),(0,l.kt)("h2",{id:"config"},"Config"),(0,l.kt)("p",null,"TODO: ",(0,l.kt)("inlineCode",{parentName:"p"},"moduleFilter"),", blacklist, whitelist etc.\nTODO: more config stuff"),(0,l.kt)("h2",{id:"node-applications-unbundled"},"Node Applications (unbundled)"),(0,l.kt)("p",null,"For Node applications that do not need bundling or building, use ",(0,l.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-cli"},"the Dbux CLI")," instead."),(0,l.kt)("h2",{id:"webpack"},"Webpack"),(0,l.kt)("p",null,"TODO"),(0,l.kt)("h2",{id:"rollup"},"Rollup"),(0,l.kt)("p",null,"TODO"),(0,l.kt)("h2",{id:"create-react-app"},"Create-React-App"),(0,l.kt)("p",null,"TODO"),(0,l.kt)("h2",{id:"nextjs"},"Next.js"),(0,l.kt)("p",null,"TODO"),(0,l.kt)("h2",{id:"other-bundlers-or-bundler-wrappers"},"Other Bundlers or Bundler Wrappers"),(0,l.kt)("p",null,"TODO"))}b.isMDXComponent=!0}}]);