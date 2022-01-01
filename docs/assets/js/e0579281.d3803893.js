"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[499],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return s}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=p(n),s=a,h=m["".concat(c,".").concat(s)]||m[s]||d[s]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function s(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},59:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return u},default:function(){return m}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={},c="Terminology",p={unversionedId:"advanced/terminology",id:"advanced/terminology",title:"Terminology",description:"Terminology regarding the JavaScript runtime is either not well defined in general, or we have just not yet spent enough time finding all the definitions. That is why we try to explain some of the terminology that we came up with here (feel free to help us improve):",source:"@site/content/04-advanced/04-terminology.mdx",sourceDirName:"04-advanced",slug:"/advanced/terminology",permalink:"/dbux/advanced/terminology",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/content/04-advanced/04-terminology.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Contributing",permalink:"/dbux/advanced/contributing"},next:{title:"Dbux Data Analysis",permalink:"/dbux/advanced/data-analysis"}},u=[{value:"Trace",id:"trace",children:[],level:2},{value:"Context",id:"context",children:[],level:2},{value:"Call Graph Root (CGR)",id:"cgr",children:[],level:2},{value:"Call Graph",id:"call-graph",children:[],level:2}],d={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"terminology"},"Terminology"),(0,i.kt)("p",null,"Terminology regarding the JavaScript runtime is either not well defined in general, or we have just not yet spent enough time finding all the definitions. That is why we try to explain some of the terminology that we came up with here (feel free to help us improve):"),(0,i.kt)("h2",{id:"trace"},"Trace"),(0,i.kt)("p",null,"We use (i) the name ",(0,i.kt)("inlineCode",{parentName:"p"},"staticTrace")," to represent a piece of code (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"f(x)"),"), and (ii) the name ",(0,i.kt)("inlineCode",{parentName:"p"},"trace")," to represent a recorded execution of that code; meaning that one ",(0,i.kt)("inlineCode",{parentName:"p"},"staticTrace")," (piece of code) has 0 or more ",(0,i.kt)("inlineCode",{parentName:"p"},"traces")," (executions)."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},'In runtime analysis research, the term "trace" usually refers to the entire runtime log. We, on the other hand, use it as a shorthand for "trace record" (or "trace entry"), referring to an individual log entry, rather than all entries.'))),(0,i.kt)("h2",{id:"context"},"Context"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A ",(0,i.kt)("inlineCode",{parentName:"li"},"static context")," can be a ",(0,i.kt)("inlineCode",{parentName:"li"},"function")," declaration or a ",(0,i.kt)("inlineCode",{parentName:"li"},"Program")," (",(0,i.kt)("inlineCode",{parentName:"li"},"Program"),' is Babel\'s word for "JavaScript file").'),(0,i.kt)("li",{parentName:"ul"},"A ",(0,i.kt)("inlineCode",{parentName:"li"},"context")," (sometimes also called ",(0,i.kt)("inlineCode",{parentName:"li"},"executionContext"),") is any execution of such function or Program."),(0,i.kt)("li",{parentName:"ul"},"In many ways, a ",(0,i.kt)("inlineCode",{parentName:"li"},"context"),' can also be considered a "stack frame", but it is not quite the same.'),(0,i.kt)("li",{parentName:"ul"},"On file contexts:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"While functions can be executed many times, JavaScript files usually only execute once, that is the first time they are ",(0,i.kt)("inlineCode",{parentName:"li"},"require"),"'d or ",(0,i.kt)("inlineCode",{parentName:"li"},"import"),"'ed."),(0,i.kt)("li",{parentName:"ul"},"After that first time, their ",(0,i.kt)("inlineCode",{parentName:"li"},"exports")," are cached, and returned to any following caller of ",(0,i.kt)("inlineCode",{parentName:"li"},"require")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"import"),"."),(0,i.kt)("li",{parentName:"ul"},"That is why you will only see a single trace in the file scope, even if you require them many times."))),(0,i.kt)("li",{parentName:"ul"},"TODO: explain virtual and async contexts")),(0,i.kt)("h2",{id:"cgr"},"Call Graph Root (CGR)"),(0,i.kt)("p",null,'A "call graph root" (CGR) is an invocation of code from outside our visible (recorded) runtime. Examples include:'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Your application's entry point."),(0,i.kt)("li",{parentName:"ul"},"Execution of a JavaScript file, often called by ",(0,i.kt)("inlineCode",{parentName:"li"},"node")," or by the webpack bundle (which in turn is called by the underlying JS runtime environment)."),(0,i.kt)("li",{parentName:"ul"},"Browser executing a ","<","script> tag."),(0,i.kt)("li",{parentName:"ul"},"Execution of a callback supplied to ",(0,i.kt)("inlineCode",{parentName:"li"},"setTimeout"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"setInterval"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"setIntermediate"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"Process.nextTick"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"Promise.then")," etc. These callbacks are scheduled and then, at a later point in time, executed by the underlying JS runtime environment."),(0,i.kt)("li",{parentName:"ul"},"DOM or OS event handler callbacks."),(0,i.kt)("li",{parentName:"ul"},"and more...")),(0,i.kt)("p",null,"The nodes of the async call graph only comprises these call graph roots."),(0,i.kt)("h2",{id:"call-graph"},"Call Graph"),(0,i.kt)("p",null,"Dbux records and visualizes the ",(0,i.kt)("strong",{parentName:"p"},"Dynamic Call Graph")," of JavaScript applications."),(0,i.kt)("p",null,"TODO: a lot more to be said here."))}m.isMDXComponent=!0}}]);