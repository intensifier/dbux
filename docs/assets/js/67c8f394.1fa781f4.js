/*! For license information please see 67c8f394.1fa781f4.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[618],{9176:function(e,n,t){var a={"./async-send-file-await":8665,"./async-send-file-await.js":8665,"./async-send-file-cb":3638,"./async-send-file-cb.js":3638,"./async-send-file-promise":9407,"./async-send-file-promise.js":9407,"./async-sleep":3923,"./async-sleep.js":3923};function r(e){var n=i(e);return t(n)}function i(e){if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id=9176},5002:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var a=t(7462),r=t(3366),i=t(7294),o=t(3616),s=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function l(e){var n=e.toc,t=e.className,a=e.linkClassName,r=e.isChild;return n.length?i.createElement("ul",{className:r?void 0:t},n.map((function(e){return i.createElement("li",{key:e.id},i.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),i.createElement(l,{isChild:!0,toc:e.children,className:t,linkClassName:a}))}))):null}function c(e){var n=e.toc,t=e.className,c=void 0===t?"table-of-contents table-of-contents__left-border":t,p=e.linkClassName,u=void 0===p?"table-of-contents__link":p,d=e.linkActiveClassName,m=void 0===d?void 0:d,h=e.minHeadingLevel,f=e.maxHeadingLevel,k=(0,r.Z)(e,s),v=(0,o.LU)(),y=null!=h?h:v.tableOfContents.minHeadingLevel,g=null!=f?f:v.tableOfContents.maxHeadingLevel,N=(0,o.DA)({toc:n,minHeadingLevel:y,maxHeadingLevel:g}),b=(0,i.useMemo)((function(){if(u&&m)return{linkClassName:u,linkActiveClassName:m,minHeadingLevel:y,maxHeadingLevel:g}}),[u,m,y,g]);return(0,o.Si)(b),i.createElement(l,(0,a.Z)({toc:N,className:c,linkClassName:u},k))}},633:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var a=t(7462),r=t(3366),i=t(7294),o=t(4184),s=t.n(o),l=t(7037),c=t.n(l),p=t(5350),u=t(8767);var d=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","style"];function m(e){var n=e.src,t=e.title,o=e.zoomable,l=e.darkLight,m=e.screen,h=e.concept,f=e.className,k=e.maxWidth,v=e.style,y=(0,r.Z)(e,d);h&&(n.startsWith("concept")||n.startsWith("/")||n.includes("://")||(n="concepts/"+n)),m&&(n.startsWith("screen")||n.startsWith("/")||n.includes("://")||(n="screens/"+n));var g=h||m;g&&void 0===o&&(o=!0);var N=function(e){var n=e.src,t=e.darkLight,a=(0,p.Z)().isDarkTheme;return(0,u.Z)()+(t?a?"dark/":"light/":"")+n}({src:n,darkLight:l}),b=t=t||n;f=s()(f,{"border-screen":g,zoomable:o});var C=i.createElement("img",(0,a.Z)({className:f,style:v,src:N,alt:b,title:t},y));if(k){var x={display:"inline-block",maxWidth:k=c()(k)?k:k+"px"};C=i.createElement("div",{style:x},C)}return C}},8640:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var a=t(7294),r="tableOfContentsInline_0DDH",i=t(5002);var o=function(e){var n=e.toc,t=e.minHeadingLevel,o=e.maxHeadingLevel;return a.createElement("div",{className:r},a.createElement(i.Z,{toc:n,minHeadingLevel:t,maxHeadingLevel:o,className:"table-of-contents",linkClassName:null}))},s={display:"none"};function l(e){var n=e.toc;return a.createElement("div",{style:s},a.createElement(o,{toc:n}))}},1333:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var a=t(7294),r=t(8767),i="TODO",o={cgr:"cgr",trace:"trace",staticTrace:"trace",context:"context",acg:"TODO","call graph":"call-graph",ae:i,aes:i,"asynchronous event":i,"asynchronous events":i,"dynamic runtime analysis":"dynamic-runtime-analysis",idbe:"idbe"};function s(e){var n=e.term,t=e.children,i=void 0===t?n:t,s=function(e){var n=o[e.toLowerCase()];return n?(0,r.Z)()+"advanced/terminology#"+n:null}(n);return s?a.createElement("a",{href:s,title:'lookup term: "'+n+'"'},i,a.createElement("sup",null,"\u2754")):a.createElement(a.Fragment,null,"$",i,a.createElement("span",{className:"color-gray border-gray round",title:'(could not look up "'+i+'")'},a.createElement("sup",null,"\u2753")))}},8767:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var a=t(2263);function r(){return(0,a.Z)().siteConfig.baseUrl}},6884:function(e,n,t){"use strict";t.r(n),t.d(n,{contentTitle:function(){return N},default:function(){return w},frontMatter:function(){return g},metadata:function(){return b},toc:function(){return C}});var a=t(7462),r=t(3366),i=t(7294),o=t(3905),s=t(3899),l=t(4184),c=t.n(l),p=t(7037),u=t.n(p),d=["src","lang","minWidth","className","style","children"];function m(e){var n,a=e.src,o=e.lang,l=e.minWidth,p=e.className,m=e.style,h=e.children,f=(0,r.Z)(e,d);if(void 0===o&&(o="js"),f.className=c()(p,"code-block",((n={})["language-"+o]=!!o,n)),m||(m={}),l&&(l=u()(l)?l:l+"px",Object.assign(m,{minWidth:l})),a){var k=t(9176)("./"+a);k.default&&(k=k.default),h=h||"",h+=k}return u()(h)&&(h=h.trim()),i.createElement(s.Z,f,h)}function h(e){var n=e.space;return n?(n=u()(n)?n:n+"px",i.createElement("div",{style:{marginRight:n}})):i.createElement("div",{className:"mr-05"})}var f=t(1333),k=t(633),v=t(8640),y=["components"],g={},N="Asynchronous JavaScript",b={unversionedId:"background/asynchronous-javascript",id:"background/asynchronous-javascript",title:"Asynchronous JavaScript",description:"This page goes into the basics and the nitty-gritty of asynchronous JavaScript. It also covers the concepts as well as implementation details of Dbux's Asynchronous Call Graph (ACG).",source:"@site/content/background/03-asynchronous-javascript.mdx",sourceDirName:"background",slug:"/background/asynchronous-javascript",permalink:"/dbux/background/asynchronous-javascript",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/background/03-asynchronous-javascript.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Debugging",permalink:"/dbux/background/debugging"},next:{title:"FAQ",permalink:"/dbux/faq"}},C=[{value:"JavaScript Execution Semantics",id:"javascript-execution-semantics",children:[],level:2},{value:"Call Graph Roots (CGR)",id:"cgr",children:[],level:2},{value:"Asynchronous Events (AE)",id:"ae",children:[],level:2},{value:"Execution Patterns: CHAINs vs. FORKs",id:"chain-fork",children:[{value:"First await/then",id:"first-awaitthen",children:[],level:4},{value:"More Example Graphs",id:"more-example-graphs",children:[],level:4}],level:2},{value:"Promise Creation and Promise Nesting",id:"promise-nesting",children:[{value:"Example",id:"example",children:[],level:4}],level:2}],x={toc:C};function w(e){var n=e.components,t=(0,r.Z)(e,y);return(0,o.kt)("wrapper",(0,a.Z)({},x,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"asynchronous-javascript"},"Asynchronous JavaScript"),(0,o.kt)(v.Z,{toc:C,mdxType:"TOC"}),(0,o.kt)("p",null,"This page goes into the basics and the nitty-gritty of asynchronous JavaScript. It also covers the concepts as well as implementation details of Dbux's ",(0,o.kt)(f.Z,{term:"acg",mdxType:"Term"},"Asynchronous Call Graph (ACG)"),"."),(0,o.kt)("h2",{id:"javascript-execution-semantics"},"JavaScript Execution Semantics"),(0,o.kt)("p",null,"Modern JavaScript engines are driven by a single-threaded event loop dispatching events from multiple queues",(0,o.kt)("sup",null,(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop"},"1"))," ",(0,o.kt)("sup",null,(0,o.kt)("a",{parentName:"p",href:"https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/"},"2")),". These queued events include all user-requested JavaScript events, such as the program's entry point, event handler callbacks and asynchronous continuations (i.e. continuations of ",(0,o.kt)("inlineCode",{parentName:"p"},"async")," function stacks interrupted by ",(0,o.kt)("inlineCode",{parentName:"p"},"await"),")."),(0,o.kt)("p",null,"JavaScript is non-preemptive and single-threaded, thereby guaranteeing that once dequeued, a script keeps executing until the call stack has no more user code on it, or until it interrupts itself with a root-level ",(0,o.kt)("inlineCode",{parentName:"p"},"await"),", before another event is dequeued."),(0,o.kt)("p",null,"The Dbux ",(0,o.kt)(f.Z,{term:"ACG",mdxType:"Term"})," supports most asynchronous features of ES2022, sans ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports"},"dynamic imports"),". In order to be accurate, it requires Promises to adhere to the ",(0,o.kt)("a",{parentName:"p",href:"https://promisesaplus.com/"},"A+ specification"),", as modern browsers, Node and other JS engines do."),(0,o.kt)("h2",{id:"cgr"},"Call Graph Roots (CGR)"),(0,o.kt)("p",null,"A CGR represents the invocation of a piece of code from outside our visible (recorded) runtime, i.e. on an empty stack",(0,o.kt)("sup",{parentName:"p",id:"fnref-3"},(0,o.kt)("a",{parentName:"sup",href:"#fn-3",className:"footnote-ref"},"3")),"."),(0,o.kt)("p",null,"Call Graph Roots (CGRs) are the ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("em",{parentName:"strong"},"nodes"))," of Dbux's ",(0,o.kt)("a",{parentName:"p",href:"/dbux/using-dbux/call-graph#async"},"Asynchronous Call Graph (ACG)"),". By comparison, in the ",(0,o.kt)("inlineCode",{parentName:"p"},"synchronous")," ",(0,o.kt)("a",{parentName:"p",href:"/dbux/using-dbux/call-graph"},"call graph")," lists all CGRs on a linear timeline."),(0,o.kt)("p",null,"Examples include:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The application's entry point."),(0,o.kt)("li",{parentName:"ul"},"A promise handler callback."),(0,o.kt)("li",{parentName:"ul"},"Continuation of an async function."),(0,o.kt)("li",{parentName:"ul"},"Execution of a JavaScript file, often called by ",(0,o.kt)("inlineCode",{parentName:"li"},"node")," or by the webpack bundle (which in turn is called by the underlying JS runtime environment)."),(0,o.kt)("li",{parentName:"ul"},"Browser executing a ","<","script> tag."),(0,o.kt)("li",{parentName:"ul"},"Execution of a callback supplied to ",(0,o.kt)("inlineCode",{parentName:"li"},"setTimeout"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"setInterval"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"setIntermediate"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"Process.nextTick"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.then")," etc. These callbacks are scheduled and, at a later point in time, executed by the underlying JS runtime environment."),(0,o.kt)("li",{parentName:"ul"},"DOM, OS or other types of event handler callbacks."),(0,o.kt)("li",{parentName:"ul"},"and more...")),(0,o.kt)("p",null,"In order to better understand CGRs and the relationships between them, we define asynchronous events:"),(0,o.kt)("h2",{id:"ae"},"Asynchronous Events (AE)"),(0,o.kt)("p",null,"Asynchronous Events (AEs) are the ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("em",{parentName:"strong"},"edges"))," in Dbux's ",(0,o.kt)("a",{parentName:"p",href:"/dbux/using-dbux/call-graph#async"},"Asynchronous Call Graph (ACG)"),". They connect pieces of executed code that can never appear together in the same (non-asynchronous) call stack. Any AE ",(0,o.kt)("inlineCode",{parentName:"p"},"e")," has at least three properties:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"scheduler")," - the event (",(0,o.kt)(f.Z,{term:"trace",mdxType:"Term"}),") that created it and its ",(0,o.kt)("a",{parentName:"li",href:"#cgr"},"CGR")," ",(0,o.kt)("inlineCode",{parentName:"li"},"fromRoot"),", and"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"toRoot")," - the ",(0,o.kt)("a",{parentName:"li",href:"#cgr"},"CGR")," that executes upon its completion.")),(0,o.kt)("p",null,"We define three types of asynchronous events in JavaScript:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"AWAIT")," ","- Scheduled by an ",(0,o.kt)("inlineCode",{parentName:"li"},"await")," expression. ",(0,o.kt)("inlineCode",{parentName:"li"},"toRoot(e)"),' is the root of the continuation\'s virtual context or "resume context/root".'),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"THEN")," ","- Scheduled by ",(0,o.kt)("inlineCode",{parentName:"li"},"q = p.THEN(f[, g])")," for some promise ",(0,o.kt)("inlineCode",{parentName:"li"},"p"),". For brevity, we use ",(0,o.kt)("inlineCode",{parentName:"li"},"THEN")," to represent ",(0,o.kt)("inlineCode",{parentName:"li"},"then"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"catch")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"finally"),". ",(0,o.kt)("inlineCode",{parentName:"li"},"toRoot(e)")," is that of ",(0,o.kt)("inlineCode",{parentName:"li"},"e"),"'s fulfillment or rejection handler, which we also call ",(0,o.kt)("inlineCode",{parentName:"li"},"thenCb"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"CB")," ","- Asynchronous callbacks scheduled by a call to an uninstrumented function which takes at least one argument ",(0,o.kt)("inlineCode",{parentName:"li"},"f")," of type ",(0,o.kt)("inlineCode",{parentName:"li"},"function"),".")),(0,o.kt)("p",null,"The following three pieces of code illustrate the three types of Asynchronous Events (AE). In all three cases, the resulting Asynchronous Call Graph (ACG) should feature three nodes, connected by two edges."),(0,o.kt)("div",{className:"flex flex-row flex-wrap"},(0,o.kt)(m,{className:"border-purple",lang:"js",src:"async-send-file-await.js",mdxType:"CodeBlock"}),(0,o.kt)(h,{mdxType:"HSpace"}),(0,o.kt)(m,{className:"border-purple",lang:"js",src:"async-send-file-promise.js",mdxType:"CodeBlock"}),(0,o.kt)(h,{mdxType:"HSpace"}),(0,o.kt)(m,{className:"border-purple",lang:"js",src:"async-send-file-cb.js",mdxType:"CodeBlock"})),(0,o.kt)("p",null,"Note that asynchronous event can be one-shot (one ",(0,o.kt)("inlineCode",{parentName:"p"},"toRoot")," per ",(0,o.kt)("inlineCode",{parentName:"p"},"scheduler"),") and repeating (multiple ",(0,o.kt)("inlineCode",{parentName:"p"},"toRoot")," per ",(0,o.kt)("inlineCode",{parentName:"p"},"scheduler"),"). ",(0,o.kt)("inlineCode",{parentName:"p"},"THEN")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"AWAIT")," type of events are always one-shot, while asynchronous callbacks can be executed multiple times, e.g. when scheduled via ",(0,o.kt)("inlineCode",{parentName:"p"},"setInterval"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"addEventListener")," etc."),(0,o.kt)("h2",{id:"chain-fork"},"Execution Patterns: CHAINs vs. FORKs"),(0,o.kt)("p",null,"In order to capture and visualize degree of concurrency of JavaScript applications, Dbux further classifies ",(0,o.kt)(f.Z,{term:"AEs",mdxType:"Term"})," (i.e. the edges of the ",(0,o.kt)(f.Z,{term:"ACG",mdxType:"Term"}),") into CHAINs and FORKs.\nMaking that distinction is the same as asking: are the events of the ",(0,o.kt)("inlineCode",{parentName:"p"},"toRoot")," a logical continuation of the events of the ",(0,o.kt)("inlineCode",{parentName:"p"},"fromRoot")," (CHAIN)? Or are they the start of something new (FORK)?"),(0,o.kt)("p",null,"NOTE: CHAINs between AWAIT and THEN event roots propagate errors, while CBs have no automatic error propagation mechanism."),(0,o.kt)("h4",{id:"first-awaitthen"},"First await/then"),(0,o.kt)("p",null,"This example illustrates one of the difficulties involved in trying to determine CHAIN vs. FORK for the first ",(0,o.kt)("inlineCode",{parentName:"p"},"await")," in an async function (similar logic applies to the first ",(0,o.kt)("inlineCode",{parentName:"p"},"then")," in a promise chain): ",(0,o.kt)("inlineCode",{parentName:"p"},"f")," has two AEs ",(0,o.kt)("inlineCode",{parentName:"p"},"E1")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"E2"),". ",(0,o.kt)("inlineCode",{parentName:"p"},"E2")," is always a CHAIN, but ",(0,o.kt)("inlineCode",{parentName:"p"},"E1")," might be CHAIN or FORK, depending on the caller. Assume that the example codes ex1-ex4 are all at root-level:"),(0,o.kt)("div",{className:"border-purple mb-05"},(0,o.kt)("div",{className:"mb-05"},(0,o.kt)(m,{lang:"js",mdxType:"CodeBlock"},"\nasync function f() {\n  FA\n  await 0;  // E1\n  FB\n  await 0;  // E2\n  FC\n}\n  ")),(0,o.kt)("div",{className:"grid-2-col"},(0,o.kt)(m,{lang:"js",mdxType:"CodeBlock"},"\n// ex1: E1 is FORK\nA; f(); B;\n  "),(0,o.kt)(m,{lang:"js",mdxType:"CodeBlock"},"\n// ex2: E1 is CHAIN\nA; await f(); B;\n  "),(0,o.kt)(m,{lang:"js",mdxType:"CodeBlock"},"\n// ex3: E1 is FORK\nawait g();\nfunction g() { f(); }\n  "),(0,o.kt)(m,{lang:"js",mdxType:"CodeBlock"},"\n// ex4: E1 is CHAIN\nlet p; h(); await p;\nfunction h() { p = f(); }\n  "))),(0,o.kt)("h4",{id:"more-example-graphs"},"More Example Graphs"),(0,o.kt)("p",null,"Below are several illustrations of asynchronous programs and their expected conceptual ACG with CHAINs (blue) and FORKs (purple):"),(0,o.kt)("div",{className:"flex flex-row w-full"},(0,o.kt)("div",{className:"flex-col w-half"},(0,o.kt)(k.Z,{concept:!0,src:"chain_fork_1.png",mdxType:"Img"}),(0,o.kt)(k.Z,{concept:!0,src:"chain_fork_3.png",mdxType:"Img"})),(0,o.kt)("div",{className:"flex-col w-half"},(0,o.kt)(k.Z,{concept:!0,src:"chain_fork_2.png",mdxType:"Img"}))),(0,o.kt)("h2",{id:"promise-nesting"},"Promise Creation and Promise Nesting"),(0,o.kt)("p",null,"Certain types of promises can be nested dynamically. Nested promises are always ",(0,o.kt)("a",{parentName:"p",href:"#chain-fork"},"chained"),"."),(0,o.kt)("p",null,"In JavaScript, promises can be created in five ways, some allow promise nesting:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"The Promise constructor takes an executor function which in turn is provided two parameters: the ",(0,o.kt)("inlineCode",{parentName:"li"},"resolve")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"reject"),' functions which are to be called to settle the promise. The executor function is called synchronously from the constructor. The Promise constructor is commonly used to wrap asynchronous callbacks into promises. This process is commonly referred to as "promisification".'),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"Promise.resolve(x)")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.reject(x)")," are equivalent to using the (i) Promise constructor and synchronously calling ",(0,o.kt)("inlineCode",{parentName:"li"},"resolve")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"reject")," respectively. ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.all")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.race")," work similar to ",(0,o.kt)("inlineCode",{parentName:"li"},"resolve")," but allow nesting multiple promises. ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.all")," fulfills once all nested promises fulfill and rejects once any promise rejects. ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.race")," fulfills once any nested promise fulfills and rejects if any promise rejects before any other fulfills."),(0,o.kt)("li",{parentName:"ol"},"When an async function is called, the runtime environment creates a new promise. Its call expression value is set to that promise. Async functions execute synchronously until the first ",(0,o.kt)("inlineCode",{parentName:"li"},"await")," is encountered. This means that if an async function concluded without explicitly invoking an ",(0,o.kt)("inlineCode",{parentName:"li"},"await")," expression or any of the three other types of events, it does not trigger an asynchronous event. Await expressions can nest promises. Furthermore, promises can be nested by returning them from an async function."),(0,o.kt)("li",{parentName:"ol"},"Promise chaining (",(0,o.kt)("inlineCode",{parentName:"li"},"then"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"catch"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"finally"),") allows for promise nesting by returning a promise from their respective fulfillment and rejection handler callbacks."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports"},"Dynamic imports")," and other native functions create and return promises.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"NOTE: The first dynamic import of a file can be seen as nesting top-level ",(0,o.kt)("inlineCode",{parentName:"li"},"awaits")," of the imported files, but the ",(0,o.kt)(f.Z,{term:"ACG",mdxType:"Term"})," does not yet capture asynchronous events related to dynamic imports.")))),(0,o.kt)("p",null,"Somewhat counter-intuitively, (1), (2) and (3) do ",(0,o.kt)("em",{parentName:"p"},"not")," cause an asynchronous event on their own.\nHowever, all of them can nest promises. Most of these nesting relationships are captured by Dbux's ",(0,o.kt)("a",{parentName:"p",href:"/dbux/using-dbux/call-graph#async"},"asynchronous call graph"),"."),(0,o.kt)("h4",{id:"example"},"Example"),(0,o.kt)("p",null,"The following example implements ",(0,o.kt)("inlineCode",{parentName:"p"},"sleep")," using ",(0,o.kt)("inlineCode",{parentName:"p"},"setTimeout"),". The Promise constructor itself does not trigger an asynchronous event but ",(0,o.kt)("inlineCode",{parentName:"p"},"setTimeout")," does."),(0,o.kt)("div",{className:"flex flex-row flex-center"},(0,o.kt)(m,{className:"border-screen",lang:"js",src:"async-sleep.js",mdxType:"CodeBlock"}),(0,o.kt)("div",{className:"font-size-3"},"\u2192"),(0,o.kt)("div",null,(0,o.kt)(k.Z,{screen:!0,src:"sample-async-sleep.png",mdxType:"Img"}))),(0,o.kt)("div",{className:"footnotes"},(0,o.kt)("hr",{parentName:"div"}),(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol",id:"fn-3"},"In terms of the ",(0,o.kt)("a",{parentName:"li",href:"https://promisesaplus.com/"},"Promises/A+"),' terminology, this is equivalent to executing a piece of code when the stack "contains only platform code".',(0,o.kt)("a",{parentName:"li",href:"#fnref-3",className:"footnote-backref"},"\u21a9")))))}w.isMDXComponent=!0},4184:function(e,n){var t;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var i=typeof t;if("string"===i||"number"===i)e.push(t);else if(Array.isArray(t)){if(t.length){var o=r.apply(null,t);o&&e.push(o)}}else if("object"===i)if(t.toString===Object.prototype.toString)for(var s in t)a.call(t,s)&&t[s]&&e.push(s);else e.push(t.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(t=function(){return r}.apply(n,[]))||(e.exports=t)}()},2705:function(e,n,t){var a=t(5639).Symbol;e.exports=a},4239:function(e,n,t){var a=t(2705),r=t(9607),i=t(2333),o=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":o&&o in Object(e)?r(e):i(e)}},1957:function(e,n,t){var a="object"==typeof t.g&&t.g&&t.g.Object===Object&&t.g;e.exports=a},9607:function(e,n,t){var a=t(2705),r=Object.prototype,i=r.hasOwnProperty,o=r.toString,s=a?a.toStringTag:void 0;e.exports=function(e){var n=i.call(e,s),t=e[s];try{e[s]=void 0;var a=!0}catch(l){}var r=o.call(e);return a&&(n?e[s]=t:delete e[s]),r}},2333:function(e){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},5639:function(e,n,t){var a=t(1957),r="object"==typeof self&&self&&self.Object===Object&&self,i=a||r||Function("return this")();e.exports=i},1469:function(e){var n=Array.isArray;e.exports=n},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,n,t){var a=t(4239),r=t(1469),i=t(7005);e.exports=function(e){return"string"==typeof e||!r(e)&&i(e)&&"[object String]"==a(e)}},8665:function(e,n,t){"use strict";t.r(n),n.default="async function send(fpath) {\r\n  const file = await openFile(fpath);\r\n\r\n  const cont = await readFile(file);\r\n\r\n\r\n  await sendFile(cont);\r\n\r\n\r\n  console.log('File sent!');\r\n}"},3638:function(e,n,t){"use strict";t.r(n),n.default="function send(fpath, cb) {\r\n  openFile(fpath, function (file) {\r\n\r\n    readFile(file, function (cont) {\r\n\r\n\r\n      sendFile(cont, function () {\r\n        cb && cb();\r\n\r\n        console.log('File sent!');\r\n      });\r\n    });\r\n  });\r\n}"},9407:function(e,n,t){"use strict";t.r(n),n.default="function send(fpath) {\r\n  return openFile(fpath).\r\n    then(function (file) {\r\n      return readFile(file);\r\n    }).\r\n    then(function (cont) {\r\n      return sendFile(cont);\r\n    }).\r\n    then(function () {\r\n      console.log('File sent!');\r\n    });\r\n}"},3923:function(e,n,t){"use strict";t.r(n),n.default="function sleep(ms) {\r\n  return new Promise((resolve) => setTimeout(resolve, ms));\r\n}\r\n\r\n(async function f() {\r\n  console.log(1);\r\n  await sleep(100);\r\n  console.log(2);\r\n  await sleep(200);\r\n  console.log(3);\r\n  await sleep(300);\r\n  console.log(4);\r\n})();"}}]);