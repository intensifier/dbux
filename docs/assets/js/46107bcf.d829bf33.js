"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[88],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=d(n),m=r,f=p["".concat(s,".").concat(m)]||p[m]||c[m]||o;return n?a.createElement(f,i(i({ref:t},u),{},{components:n})):a.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5002:function(e,t,n){n.d(t,{Z:function(){return d}});var a=n(7462),r=n(3366),o=n(7294),i=n(3616),l=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function s(e){var t=e.toc,n=e.className,a=e.linkClassName,r=e.isChild;return t.length?o.createElement("ul",{className:r?void 0:n},t.map((function(e){return o.createElement("li",{key:e.id},o.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(s,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function d(e){var t=e.toc,n=e.className,d=void 0===n?"table-of-contents table-of-contents__left-border":n,u=e.linkClassName,c=void 0===u?"table-of-contents__link":u,p=e.linkActiveClassName,m=void 0===p?void 0:p,f=e.minHeadingLevel,k=e.maxHeadingLevel,v=(0,r.Z)(e,l),h=(0,i.LU)(),y=null!=f?f:h.tableOfContents.minHeadingLevel,b=null!=k?k:h.tableOfContents.maxHeadingLevel,g=(0,i.DA)({toc:t,minHeadingLevel:y,maxHeadingLevel:b}),x=(0,o.useMemo)((function(){if(c&&m)return{linkClassName:c,linkActiveClassName:m,minHeadingLevel:y,maxHeadingLevel:b}}),[c,m,y,b]);return(0,i.Si)(x),o.createElement(s,(0,a.Z)({toc:g,className:d,linkClassName:c},v))}},3755:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7462),r=n(3366),o=n(7294),i=["path","children","title"],l={"dbux-code":"Dbux VSCode Extension"};function s(e){var t=e.path,n=e.children,s=e.title,d=(0,r.Z)(e,i);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var u=function(e){return l[e]||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}(t);n=n||u,s=s||n;var c="https://github.com/Domiii/dbux/tree/master/"+t;return o.createElement("a",(0,a.Z)({title:s,href:c},d),n)}},8640:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7294),r="tableOfContentsInline_0DDH",o=n(5002);var i=function(e){var t=e.toc,n=e.minHeadingLevel,i=e.maxHeadingLevel;return a.createElement("div",{className:r},a.createElement(o.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:i,className:"table-of-contents",linkClassName:null}))},l={display:"none"};function s(e){var t=e.toc;return a.createElement("div",{style:l},a.createElement(i,{toc:t}))}},9661:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return d},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return p},default:function(){return f}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=n(3755),l=n(8640),s=["components"],d={},u="Dbux Data Analysis",c={unversionedId:"advanced/data-analysis",id:"advanced/data-analysis",title:"Dbux Data Analysis",description:"Dbux provides several tools for manual data analysis. However, this page explains how to use advanced data analysis tools and techniques.",source:"@site/content/advanced/05-data-analysis.mdx",sourceDirName:"advanced",slug:"/advanced/data-analysis",permalink:"/dbux/advanced/data-analysis",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/advanced/05-data-analysis.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Terminology",permalink:"/dbux/advanced/terminology"},next:{title:"Who is Using Dbux?",permalink:"/dbux/advanced/dbux-uses"}},p=[{value:"Python Experiments",id:"python-experiments",children:[],level:2}],m={toc:p};function f(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"dbux-data-analysis"},"Dbux Data Analysis"),(0,o.kt)(l.Z,{toc:p,mdxType:"TOC"}),(0,o.kt)("p",null,"Dbux provides several tools for manual data analysis. However, this page explains how to use ",(0,o.kt)("strong",{parentName:"p"},"advanced data analysis tools and techniques"),"."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"You probably want to start by exporting the data, using the ",(0,o.kt)("inlineCode",{parentName:"li"},'"Dbux: Export Application Data"')," command",(0,o.kt)("sup",{parentName:"li",id:"fnref-1"},(0,o.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),"."),(0,o.kt)("li",{parentName:"ol"},"\u200b",(0,o.kt)(i.Z,{path:"dbux-data",mdxType:"CodeLink"})," is our main data processing JavaScript package. We use it to preprocess and manage all runtime data. ",(0,o.kt)(i.Z,{path:"dbux-code",mdxType:"CodeLink"})," uses ",(0,o.kt)(i.Z,{path:"dbux-data",mdxType:"CodeLink"}),"'s preprocessed data for visualization and user interactions."),(0,o.kt)("li",{parentName:"ol"},"\u200b",(0,o.kt)(i.Z,{path:"analysis",mdxType:"CodeLink"})," contains a few Python functions and example notebooks that use extracted data for testing and development purposes. NOTE: This package is not matured and, unlike ",(0,o.kt)("inlineCode",{parentName:"li"},"@dbux/data"),", has almost no Dbux-specific data processing utilities. More details ",(0,o.kt)("a",{parentName:"li",href:"#python-experiments"},"below"),".")),(0,o.kt)("p",null,"Make sure to give it a good try, and feel free to complain or otherwise report back to us on the ",(0,o.kt)("a",{parentName:"p",href:"https://discord.gg/QKgq9ZE"},"Dbux DISCORD"),"."),(0,o.kt)("h2",{id:"python-experiments"},"Python Experiments"),(0,o.kt)("p",null,"In the ",(0,o.kt)("inlineCode",{parentName:"p"},"analyze/")," folder, you find several example notebooks that allow you to analyze the data that ",(0,o.kt)("inlineCode",{parentName:"p"},"dbux")," generates. Here is how you set that up:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Run some program with Dbux enabled (e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"samples/[...]/oop1.js"),")"),(0,o.kt)("li",{parentName:"ol"},"In VSCode ",(0,o.kt)("inlineCode",{parentName:"li"},"Run Command")," (",(0,o.kt)("inlineCode",{parentName:"li"},"CTRL/Command + SHIFT + P"),") -> ",(0,o.kt)("inlineCode",{parentName:"li"},"Dbux: Export Application Data")),(0,o.kt)("li",{parentName:"ol"},"Make sure you have Python + Jupyter setup",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Windows",(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://chocolatey.org/packages/anaconda3"},"Install ",(0,o.kt)("inlineCode",{parentName:"a"},"Anaconda")," with ",(0,o.kt)("inlineCode",{parentName:"a"},"chocolatey"))),(0,o.kt)("li",{parentName:"ol"},"Set your ",(0,o.kt)("inlineCode",{parentName:"li"},"%PYTHONPATH%")," in system config to your Anaconda ",(0,o.kt)("inlineCode",{parentName:"li"},"Lib")," + ",(0,o.kt)("inlineCode",{parentName:"li"},"DLLs")," folders (e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},"C:\\tools\\Anaconda3\\Lib;C:\\tools\\Anaconda3\\DLLs;"),")"),(0,o.kt)("li",{parentName:"ol"},"Done!"))),(0,o.kt)("li",{parentName:"ul"},"TODO: Other OS'es"))),(0,o.kt)("li",{parentName:"ol"},"Run one of the notebooks, load the file, and analyze.")),(0,o.kt)("p",null,"NOTE: this is not currently well maintained. Make sure to ",(0,o.kt)("a",{parentName:"p",href:"https://discord.gg/QKgq9ZE"},"reach out"),", if things go wrong."),(0,o.kt)("p",null,"PS: If you want more/better support for automatic data analysis, please let us know on Discord and also feel free to up-vote ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/issues/208"},"this issue"),"."),(0,o.kt)("div",{className:"footnotes"},(0,o.kt)("hr",{parentName:"div"}),(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol",id:"fn-1"},(0,o.kt)(i.Z,{path:"dbux-data/src/applications/importExport.js",mdxType:"CodeLink"}),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"#fnref-1",className:"footnote-backref"},"\u21a9"))))))}f.isMDXComponent=!0}}]);