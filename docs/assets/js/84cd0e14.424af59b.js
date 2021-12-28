"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[55],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,f=p["".concat(u,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(f,o(o({ref:t},s),{},{components:n})):r.createElement(f,o({ref:t},s))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=p;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3755:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(7462),i=n(3366),a=n(7294),o=["path","children","title"],l={"dbux-code":"Dbux VSCode Extension"};function u(e){var t=e.path,n=e.children,u=e.title,c=(0,i.Z)(e,o);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var s=function(e){return l[e]||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}(t);n=n||s,u=u||n;var d="https://github.com/Domiii/dbux/"+t;return a.createElement("a",(0,r.Z)({title:u,href:d},c),n)}},1280:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return d},default:function(){return m}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),o=n(3755),l=["components"],u={},c="Performance",s={unversionedId:"advanced/performance",id:"advanced/performance",title:"Performance",description:"There are many performance considerations in tracing and recording all activity of a program.",source:"@site/content/04-advanced/01-performance.mdx",sourceDirName:"04-advanced",slug:"/advanced/performance",permalink:"/dbux/advanced/performance",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/content/04-advanced/01-performance.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Build Pipeline Integration",permalink:"/dbux/tools-and-configuration/build-pipeline-integration"},next:{title:"Known Limitations and Future Work",permalink:"/dbux/advanced/future-work"}},d=[],p={toc:d};function m(e){var t=e.components,n=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"performance"},"Performance"),(0,a.kt)("p",null,"There are many performance considerations in tracing and recording ",(0,a.kt)("em",{parentName:"p"},"all")," activity of a program."),(0,a.kt)("p",null,"Main considerations include:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Instrumentation can be slow.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"@dbux/cli")," uses ",(0,a.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-register"},(0,a.kt)("inlineCode",{parentName:"a"},"@babel/register"))," with custom caching. That caching currently has limited configuration, but we hope for more in the future."),(0,a.kt)("li",{parentName:"ul"},"If you use a bundler, make sure to configure caching for it."))),(0,a.kt)("li",{parentName:"ul"},"When executing ",(0,a.kt)("em",{parentName:"li"},"a lot of stuff")," (e.g. long loops or high FPS games etc), things will get slow",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"For example: Dbux probably won't really work at all if you run it on a 30+FPS game.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"In that case, we might want to be very strategic in telling Dbux to only record: (i) initialization, (ii) a select few other functions and then (iii) several frames of the gameloop for our analysis."))),(0,a.kt)("li",{parentName:"ul"},"Again, adaptive tracing is something we want to do in the future."))),(0,a.kt)("li",{parentName:"ul"},"When running a program with Dbux enabled, and also running it in debug mode in Node (i.e. ",(0,a.kt)("inlineCode",{parentName:"li"},"--inspect")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"--inspect-brk"),"), things slow down even worse. When things get too slow, you might want to consider using the ",(0,a.kt)("inlineCode",{parentName:"li"},"Run")," button instead of the ",(0,a.kt)("inlineCode",{parentName:"li"},"Debug")," button, and use the Dbux built-in features for debugging; unless there are some features in the traditional debugger that you just cannot live without in some specific circumstances."),(0,a.kt)("li",{parentName:"ul"},"Recording of large arrays and objects is limited, according to some (currently hardcoded) ",(0,a.kt)("inlineCode",{parentName:"li"},"SerializationLimits"),", to be found in ",(0,a.kt)(o.Z,{path:"dbux-runtime/src/data/valueCollection.js",mdxType:"CodeLink"}),".")),(0,a.kt)("p",null,'TODO(fix this up; also link to "trace filters" and more relevant articles.)'))}m.isMDXComponent=!0}}]);