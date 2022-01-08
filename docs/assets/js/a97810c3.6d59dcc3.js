/*! For license information please see a97810c3.6d59dcc3.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[843],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return m},kt:function(){return u}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=c(n),u=i,h=p["".concat(l,".").concat(u)]||p[u]||d[u]||o;return n?a.createElement(h,r(r({ref:t},m),{},{components:n})):a.createElement(h,r({ref:t},m))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var c=2;c<o;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5002:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(7462),i=n(3366),o=n(7294),r=n(3616),s=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function l(e){var t=e.toc,n=e.className,a=e.linkClassName,i=e.isChild;return t.length?o.createElement("ul",{className:i?void 0:n},t.map((function(e){return o.createElement("li",{key:e.id},o.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(l,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function c(e){var t=e.toc,n=e.className,c=void 0===n?"table-of-contents table-of-contents__left-border":n,m=e.linkClassName,d=void 0===m?"table-of-contents__link":m,p=e.linkActiveClassName,u=void 0===p?void 0:p,h=e.minHeadingLevel,v=e.maxHeadingLevel,g=(0,i.Z)(e,s),f=(0,r.LU)(),k=null!=h?h:f.tableOfContents.minHeadingLevel,N=null!=v?v:f.tableOfContents.maxHeadingLevel,y=(0,r.DA)({toc:t,minHeadingLevel:k,maxHeadingLevel:N}),b=(0,o.useMemo)((function(){if(d&&u)return{linkClassName:d,linkActiveClassName:u,minHeadingLevel:k,maxHeadingLevel:N}}),[d,u,k,N]);return(0,r.Si)(b),o.createElement(l,(0,a.Z)({toc:y,className:c,linkClassName:d},g))}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var a=n(7462),i=n(3366),o=n(7294),r=n(4184),s=n.n(r),l=n(7037),c=n.n(l),m=n(5350),d=n(8767);var p=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function u(e){var t=e.src,n=e.title,r=e.zoomable,l=e.darkLight,u=e.screen,h=e.concept,v=e.className,g=e.maxWidth,f=e.mb,k=e.style,N=(0,i.Z)(e,p);h&&(t.startsWith("concept")||t.startsWith("/")||t.includes("://")||(t="concepts/"+t)),u&&(t.startsWith("screen")||t.startsWith("/")||t.includes("://")||(t="screens/"+t));var y=h||u;y&&void 0===r&&(r=!0);var b=function(e){var t=e.src,n=e.darkLight,a=(0,m.Z)().isDarkTheme;return(0,d.Z)()+(n?a?"dark/":"light/":"")+t}({src:t,darkLight:l}),w=n=n||t;v=s()(v,{"border-screen":y,zoomable:r});var x=o.createElement("img",(0,a.Z)({className:v,style:k,src:b,alt:w,title:n},N));if(g){g=c()(g)?g:g+"px",f=void 0===f?"mb-2":f;var C=s()(f),O={display:"inline-block",maxWidth:g,lineHeight:0};x=o.createElement("div",{className:C,style:O},x)}return x}},8640:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(7294),i="tableOfContentsInline_0DDH",o=n(5002);var r=function(e){var t=e.toc,n=e.minHeadingLevel,r=e.maxHeadingLevel;return a.createElement("div",{className:i},a.createElement(o.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:r,className:"table-of-contents",linkClassName:null}))},s={display:"none"};function l(e){var t=e.toc;return a.createElement("div",{style:s},a.createElement(r,{toc:t}))}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var a=n(2263);function i(){return(0,a.Z)().siteConfig.baseUrl}},6981:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return m},metadata:function(){return d},toc:function(){return p},default:function(){return h}});var a=n(7462),i=n(3366),o=(n(7294),n(3905)),r=n(633),s=n(8640),l=["components"],c={},m="Installation",d={unversionedId:"runtime-analysis/installation",id:"runtime-analysis/installation",title:"Installation",description:"1. Install the Dbux VSCode Extension from the VSCode Marketplace.",source:"@site/content/runtime-analysis/01-installation.mdx",sourceDirName:"runtime-analysis",slug:"/runtime-analysis/installation",permalink:"/dbux/runtime-analysis/installation",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/runtime-analysis/01-installation.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/dbux/runtime-analysis"},next:{title:"Enable Dbux",permalink:"/dbux/runtime-analysis/enable-dbux"}},p=[{value:"System Requirements",id:"system-requirements",children:[],level:2},{value:"Node Version Nightmare",id:"node-version",children:[{value:"Changing Node Management Systems",id:"changing-node-management-systems",children:[],level:3},{value:"Changing Node Versions",id:"changing-node-versions",children:[],level:3}],level:2}],u={toc:p};function h(e){var t=e.components,n=(0,i.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"installation"},"Installation"),(0,o.kt)(s.Z,{toc:p,mdxType:"TOC"}),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://marketplace.visualstudio.com/items?itemName=Domi.dbux-code"},"Install the Dbux VSCode Extension")," from the VSCode Marketplace."),(0,o.kt)("li",{parentName:"ol"},'Select the Dbux Extension on the VS sidebar -> Click the "Start Dbux" button',(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)(r.Z,{src:"screens/start_dbux.png",zoomable:!0,width:"300px",mdxType:"Img"})))),(0,o.kt)("li",{parentName:"ol"},"When necessary (e.g. after installation), wait for dependencies to update.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)(r.Z,{src:"screens/installing_dependencies.png",zoomable:!0,width:"300px",mdxType:"Img"})))),(0,o.kt)("li",{parentName:"ol"},"The Dbux VSCode Extension is now ready ",(0,o.kt)("a",{parentName:"li",href:"../runtime-analysis"},"to use"),"!",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)(r.Z,{src:"screens/dbux-ready.png",zoomable:!0,width:"150px",mdxType:"Img"}))))),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Currently, ",(0,o.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code"},"Dbux VSCode Extension")," is Dbux's only GUI implementation."))),(0,o.kt)("h2",{id:"system-requirements"},"System Requirements"),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"As of Jan. 2022, Dbux at least requires ",(0,o.kt)("inlineCode",{parentName:"p"},"Node@16")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"npm"),"."),(0,o.kt)("p",{parentName:"div"},"If you don't have the right Node version, ",(0,o.kt)("a",{parentName:"p",href:"#node-version"},"please read this"),"."))),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code"},"Dbux VSCode Extension")," requires several command line tools to be installed."),(0,o.kt)("p",null,"It automatically tries to determine whether those tools are installed.\nIf it is missing anything, it should warn you upon start-up.\nIf nothing is missing, it leaves a positive message in the Dbux Output Channel. E.g.:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'Dbux requires the following programs to be installed and available on your system in order to run smoothly. Please make sure, you have all of them installed.\n\n\u2713  node\n    found at "C:/PROGRAM FILES/VOLTA/NODE.EXE" (v16.13.1 satisfies 16)\n\u2713  npm\n    found at "C:/PROGRAM FILES/VOLTA/NPM.EXE"\n\nSUCCESS! All system dependencies seem to be in order.\n')),(0,o.kt)("p",null,"When working through ",(0,o.kt)("a",{parentName:"p",href:"/dbux/dbux-practice/"},"Dbux Practice")," exercises, more tools might be required for each project. As of Jan. 2022, it at least requires ",(0,o.kt)("inlineCode",{parentName:"p"},"git")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"bash")," to be installed:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'\u2713  node\n    found at "C:/PROGRAM FILES/VOLTA/NODE.EXE" (v16.13.1 satisfies 16)\n\u2713  npm\n    found at "C:/PROGRAM FILES/VOLTA/NPM.EXE"\n\u2713  bash\n    found at "C:/PROGRAM FILES/GIT/USR/BIN/BASH.EXE"\n\u2713  git\n    found at "C:/PROGRAM FILES/GIT/CMD/GIT.EXE"\n')),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Caution: Windows Users")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"git")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"bash")," might not be installed, or otherwise not available as command-line tools on Windows."),(0,o.kt)("p",{parentName:"div"},"The trick here is that you only need ",(0,o.kt)("inlineCode",{parentName:"p"},"git")," for Windows to get both (",(0,o.kt)("inlineCode",{parentName:"p"},"git")," automatically installs ",(0,o.kt)("inlineCode",{parentName:"p"},"bash"),'). However, it must make sure to select the "Add UNIX tools to path" option when installing.'),(0,o.kt)("p",{parentName:"div"},"If you use ",(0,o.kt)("inlineCode",{parentName:"p"},"git"),"'s GUI installer, ",(0,o.kt)("a",{parentName:"p",href:"https://www.google.com/search?q=git+add+unix+tools+to+path+windows&tbm=isch"},'select the "Add UNIX tools to path" option in the installer'),"."),(0,o.kt)("p",{parentName:"div"},(0,o.kt)("a",{parentName:"p",href:"https://www.google.com/search?q=choco+windows+git"},"If you use ",(0,o.kt)("inlineCode",{parentName:"a"},"choco")),", add the corresponding command-line parameter, i.e.:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre"},'choco install git.install --params "/GitAndUnixToolsOnPath"\n')))),(0,o.kt)("h2",{id:"node-version"},"Node Version Nightmare"),(0,o.kt)("h3",{id:"changing-node-management-systems"},"Changing Node Management Systems"),(0,o.kt)("p",null,"We strongly recommend using ",(0,o.kt)("a",{parentName:"p",href:"https://volta.sh/"},"Volta")," for managing your Node versions. Unlike ",(0,o.kt)("inlineCode",{parentName:"p"},"nvm")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"n"),", it is cross-platform. It also allows to locally require specific node versions. This way, different projects on your computer can easily run at a different version of node without messing with each other."),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Caution: Uninstall First")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Note that when changing Node management systems, make sure to first uninstall all previously installed managers and versions of node."))),(0,o.kt)("h3",{id:"changing-node-versions"},"Changing Node Versions"),(0,o.kt)("p",null,"Even if you are not changing Node management systems: changing your system-wide Node version can still become a bit of a ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("em",{parentName:"strong"},"nightmare")),"."),(0,o.kt)("p",null,"That is because when changing Node versions, ",(0,o.kt)("strong",{parentName:"p"},"it might uninstall or forget all your globally installed node packages"),". If you are using globally installed packages, please consult your current Node installer/manager on how they manage them, before taking the big step. If you change your Node installer/manager, then you will most definitely lose all globally installed packages."),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Caution: Global Packages")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This is a ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Public_service_announcement"},"PSA"),": ",(0,o.kt)("a",{parentName:"p",href:"https://www.google.com/search?q=dont+install+node+packages+globally&hl=en"},"Don't Install Node Packages Globally"),"!"),(0,o.kt)("p",{parentName:"div"},"Like ",(0,o.kt)("a",{parentName:"p",href:"https://www.google.com/search?q=dont+install+node+packages+globally&hl=en"},"many others"),", we recommend to never install packages globally (even if the module authors recommend otherwise). Maintaining globally installed packages is always a lot more painful, because they might affect all projects on your system, and, unlike locally installed packages, they don't have proper dependency management which easily leads to dependency conflicts."),(0,o.kt)("p",{parentName:"div"},"If you already have globally installed Node packages, that is of course also Ok. It just needs some careful attention when you want to move to a different Node version."))))}h.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var a={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var r=i.apply(null,n);r&&e.push(r)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var s in n)a.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var a=n(5639).Symbol;e.exports=a},4239:function(e,t,n){var a=n(2705),i=n(9607),o=n(2333),r=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":r&&r in Object(e)?i(e):o(e)}},1957:function(e,t,n){var a="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=a},9607:function(e,t,n){var a=n(2705),i=Object.prototype,o=i.hasOwnProperty,r=i.toString,s=a?a.toStringTag:void 0;e.exports=function(e){var t=o.call(e,s),n=e[s];try{e[s]=void 0;var a=!0}catch(l){}var i=r.call(e);return a&&(t?e[s]=n:delete e[s]),i}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var a=n(1957),i="object"==typeof self&&self&&self.Object===Object&&self,o=a||i||Function("return this")();e.exports=o},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var a=n(4239),i=n(1469),o=n(7005);e.exports=function(e){return"string"==typeof e||!i(e)&&o(e)&&"[object String]"==a(e)}}}]);