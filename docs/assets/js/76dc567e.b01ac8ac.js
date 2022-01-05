/*! For license information please see 76dc567e.b01ac8ac.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[454],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||i;return n?a.createElement(m,l(l({ref:t},u),{},{components:n})):a.createElement(m,l({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5002:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(7462),r=n(3366),i=n(7294),l=n(3616),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function s(e){var t=e.toc,n=e.className,a=e.linkClassName,r=e.isChild;return t.length?i.createElement("ul",{className:r?void 0:n},t.map((function(e){return i.createElement("li",{key:e.id},i.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),i.createElement(s,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function c(e){var t=e.toc,n=e.className,c=void 0===n?"table-of-contents table-of-contents__left-border":n,u=e.linkClassName,p=void 0===u?"table-of-contents__link":u,d=e.linkActiveClassName,h=void 0===d?void 0:d,m=e.minHeadingLevel,g=e.maxHeadingLevel,f=(0,r.Z)(e,o),v=(0,l.LU)(),k=null!=m?m:v.tableOfContents.minHeadingLevel,y=null!=g?g:v.tableOfContents.maxHeadingLevel,b=(0,l.DA)({toc:t,minHeadingLevel:k,maxHeadingLevel:y}),x=(0,i.useMemo)((function(){if(p&&h)return{linkClassName:p,linkActiveClassName:h,minHeadingLevel:k,maxHeadingLevel:y}}),[p,h,k,y]);return(0,l.Si)(x),i.createElement(s,(0,a.Z)({toc:b,className:c,linkClassName:p},f))}},3755:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(7462),r=n(3366),i=n(7294),l=["path","children","title"],o={"dbux-code":"Dbux VSCode Extension"};function s(e){var t=e.path,n=e.children,s=e.title,c=(0,r.Z)(e,l);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var u=function(e){return o[e]||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}(t);n=n||u,s=s||n;var p="https://github.com/Domiii/dbux/tree/master/"+t;return i.createElement("a",(0,a.Z)({title:s,href:p},c),n)}},5679:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var a=n(7294),r=n(633);function i(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),a.createElement(r.Z,t)}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var a=n(7462),r=n(3366),i=n(7294),l=n(4184),o=n.n(l),s=n(7037),c=n.n(s),u=n(5350),p=n(8767);var d=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","style"];function h(e){var t=e.src,n=e.title,l=e.zoomable,s=e.darkLight,h=e.screen,m=e.concept,g=e.className,f=e.maxWidth,v=e.style,k=(0,r.Z)(e,d);m&&(t.startsWith("concept")||t.startsWith("/")||t.includes("://")||(t="concepts/"+t)),h&&(t.startsWith("screen")||t.startsWith("/")||t.includes("://")||(t="screens/"+t));var y=m||h;y&&void 0===l&&(l=!0);var b=function(e){var t=e.src,n=e.darkLight,a=(0,u.Z)().isDarkTheme;return(0,p.Z)()+(n?a?"dark/":"light/":"")+t}({src:t,darkLight:s}),x=n=n||t;g=o()(g,{"border-screen":y,zoomable:l});var N=i.createElement("img",(0,a.Z)({className:g,style:v,src:b,alt:x,title:n},k));if(f){var w={display:"inline-block",maxWidth:f=c()(f)?f:f+"px"};N=i.createElement("div",{style:w},N)}return N}},8640:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(7294),r="tableOfContentsInline_0DDH",i=n(5002);var l=function(e){var t=e.toc,n=e.minHeadingLevel,l=e.maxHeadingLevel;return a.createElement("div",{className:r},a.createElement(i.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:l,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function s(e){var t=e.toc;return a.createElement("div",{style:o},a.createElement(l,{toc:t}))}},1333:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var a=n(7294),r=n(8767),i="TODO",l={cgr:"cgr",trace:"trace",staticTrace:"trace",context:"context",acg:"TODO","call graph":"call-graph",ae:i,aes:i,"asynchronous event":i,"asynchronous events":i,"dynamic runtime analysis":"dynamic-runtime-analysis",idbe:"idbe"};function o(e){var t=e.term,n=e.children,i=void 0===n?t:n,o=function(e){var t=l[e.toLowerCase()];return t?(0,r.Z)()+"advanced/terminology#"+t:null}(t);return o?a.createElement("a",{href:o,title:'lookup term: "'+t+'"'},i,a.createElement("sup",null,"\u2754")):a.createElement(a.Fragment,null,"$",i,a.createElement("span",{className:"color-gray border-gray round",title:'(could not look up "'+i+'")'},a.createElement("sup",null,"\u2753")))}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(2263);function r(){return(0,a.Z)().siteConfig.baseUrl}},2835:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return d},contentTitle:function(){return h},metadata:function(){return m},toc:function(){return g},default:function(){return v}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=n(3755),o=n(1333),s=n(633),c=n(5679),u=n(8640),p=["components"],d={title:"Call Graph",sidebar_class_name:"sidebar-call-graph"},h='Call Graph <DarkLightImg src="tree.svg" width=',m={unversionedId:"using-dbux/call-graph",id:"using-dbux/call-graph",title:"Call Graph",description:'The call graph serves as a "map of your runtime execution": it provides a bird\'s eye overview of all file and function executions.',source:"@site/content/using-dbux/08-call-graph.mdx",sourceDirName:"using-dbux",slug:"/using-dbux/call-graph",permalink:"/dbux/using-dbux/call-graph",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/using-dbux/08-call-graph.mdx",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"Call Graph",sidebar_class_name:"sidebar-call-graph"},sidebar:"tutorialSidebar",previous:{title:"Global View",permalink:"/dbux/using-dbux/global"},next:{title:"Trace Details",permalink:"/dbux/using-dbux/trace-details"}},g=[{value:"Why do we need a Call Graph?",id:"why-do-we-need-a-call-graph",children:[{value:"Call Graph vs. Call Stack",id:"call-graph-vs-call-stack",children:[],level:3}],level:2},{value:"The Synchronous Call Graph",id:"the-synchronous-call-graph",children:[],level:2},{value:"Asynchronouse Call Graph",id:"async",children:[],level:2},{value:"Toolbar",id:"toolbar",children:[{value:"value",id:"value",children:[],level:3},{value:"loc",id:"loc",children:[],level:3},{value:"call",id:"call",children:[],level:3},{value:"details",id:"details",children:[],level:3},{value:"Call Graph: pause/resume/clear",id:"call-graph-pauseresumeclear",children:[{value:'<span className="color-red">\ud83d\udd34</span> pause/resume',id:"-pauseresume",children:[],level:4},{value:"<code>x</code> Clear (show/hide already recorded traces)",id:"x-clear-showhide-already-recorded-traces",children:[],level:4}],level:3}],level:2},{value:"Call Graph Implementation Details",id:"call-graph-implementation-details",children:[],level:2}],f={toc:g};function v(e){var t=e.components,n=(0,r.Z)(e,p);return(0,i.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"call-graph-"},"Call Graph ",(0,i.kt)(c.Z,{src:"tree.svg",width:56,mdxType:"DarkLightImg"})),(0,i.kt)(u.Z,{toc:g,mdxType:"TOC"}),(0,i.kt)("p",null,'The call graph serves as a "map of your runtime execution": it provides a bird\'s eye overview of all file and function executions.'),(0,i.kt)("h2",{id:"why-do-we-need-a-call-graph"},"Why do we need a Call Graph?"),(0,i.kt)("p",null,"Call graph visualizations have many uses, e.g.:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Overview the complex system that is our application."),(0,i.kt)("li",{parentName:"ul"},"Identify all ",(0,i.kt)(o.Z,{term:"ae",mdxType:"Term"},"asynchronous events")," and their connections."),(0,i.kt)("li",{parentName:"ul"},"Visualize ",(0,i.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=recursion+trees"},"recursion trees"),", like in the screenshot of the ",(0,i.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=fibonacci+algorithm"},"fibbonacci number")," generator below:",(0,i.kt)(s.Z,{screen:!0,src:"call-graph-fib-1.png",maxWidth:600,mdxType:"Img"})),(0,i.kt)("li",{parentName:"ul"},"...and more...")),(0,i.kt)("p",null,'As an analogy, the call graph can be seen as a (rather crude) "Google Maps" while the ',(0,i.kt)("a",{parentName:"p",href:"#trace-details"},"trace details view"),' is (a rather crude) "Google Street View" of our applications\' execution. Together, they offer a multi-resolutional interactive tool to investigate most aspects of runtime behavior.'),(0,i.kt)("h3",{id:"call-graph-vs-call-stack"},"Call Graph vs. Call Stack"),(0,i.kt)("p",null,"The ",(0,i.kt)("strong",{parentName:"p"},"call stack")," is the list of all executed functions that have not yet concluded, and are not currently suspended (e.g. by ",(0,i.kt)("inlineCode",{parentName:"p"},"await")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"yield"),"), at a specific point in time. While useful, the call stack only represents a small fraction of our application. In fact, the call stack is a small slice of the call graph during its ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Depth-first_search"},"depth-first traversal"),", at a specific point in time."),(0,i.kt)("h2",{id:"the-synchronous-call-graph"},"The Synchronous Call Graph"),(0,i.kt)("p",null,"When investigating an application without any ",(0,i.kt)(o.Z,{term:"ae",mdxType:"Term"},"asynchronous events"),", the call graph is best viewed in ",(0,i.kt)("inlineCode",{parentName:"p"},"Sync")," mode."),(0,i.kt)(s.Z,{screen:!0,src:"dbux-all-longest-word.png",mdxType:"Img"}),(0,i.kt)("p",null,"The synchronous call graph has the following properties:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Roots"),": By default, the synchronous call graph shows a list of all ",(0,i.kt)(o.Z,{term:"CGR",mdxType:"Term"},"call graph roots"),": the entry point of the application, as well as the starting point of any ",(0,i.kt)(o.Z,{term:"ae",mdxType:"Term"}),", vertically sorted by time of recording (later is lower)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Nodes"),": ",(0,i.kt)(o.Z,{term:"CGR",mdxType:"Term"},"CGRs")," can have children and entire ",(0,i.kt)("strong",{parentName:"li"},"subtrees"),'. Each child node represents the execution of a file or function that was called by its parent node. Conventionally, each node is referred to as a "stack frame", but we felt that that terminology is confusing in the context of the more general call graph. We usually refer to these nodes as ',(0,i.kt)(o.Z,{term:"context",mdxType:"Term"},"contexts")," instead."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Real-time"),": The call graph updates in real-time. A new ",(0,i.kt)(o.Z,{term:"CGR",mdxType:"Term"},"CGR")," is added to the graph, for each newly recorded asynchronous event.")),(0,i.kt)("div",{className:"flex flex-col flex-center font-size-3"},(0,i.kt)(s.Z,{screen:!0,src:"call_graph_1_one_root.png",maxWidth:300,mdxType:"Img"}),(0,i.kt)("div",{className:""},"\u2193"),(0,i.kt)(s.Z,{screen:!0,src:"call_graph_2_expanded.png",maxWidth:400,mdxType:"Img"})),(0,i.kt)("p",null,"Non-empty nodes have two (of three) buttons to their left:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"TODO(icon) one to only expand immediate children of the node. These are functions that were called directly by this context."),(0,i.kt)("li",{parentName:"ul"},"TODO(icon) one to expand the entire subtree."),(0,i.kt)("li",{parentName:"ul"},"TODO(icon) one to collapse the node.")),(0,i.kt)("h2",{id:"async"},"Asynchronouse Call Graph"),(0,i.kt)("p",null,"TODO"),(0,i.kt)("p",null,"TODO(virtual contexts + async explanations)"),(0,i.kt)("p",null,"TODO: Sync graph children exclude ",(0,i.kt)("a",{parentName:"p",href:"#asynchronous-continuation"},"asynchronous continuations"),"."),(0,i.kt)("h2",{id:"toolbar"},"Toolbar"),(0,i.kt)("h3",{id:"value"},"value"),(0,i.kt)("p",null,"Show/hide value in context nodes."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Sync"),": In synchronous mode, it shows ",(0,i.kt)("inlineCode",{parentName:"p"},"(arguments) -> returnValue")," of the context's call expression."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Async"),": In asynchronous mode, it shows the value of the first trace of the currently selected trace in each root. Among other uses, this allows you identifying the roots that executed the selected trace's code."),(0,i.kt)("h3",{id:"loc"},"loc"),(0,i.kt)("p",null,"Show/hide locations in context nodes."),(0,i.kt)("p",null,"Clicking the location takes you there."),(0,i.kt)("h3",{id:"call"},"call"),(0,i.kt)("p",null,"Show/hide caller traces of all contexts that are function invocations."),(0,i.kt)("p",null,"You can click the call trace to go there. You can ",(0,i.kt)("inlineCode",{parentName:"p"},"CTRL/Command")," + ",(0,i.kt)("inlineCode",{parentName:"p"},"Click")," it to select it."),(0,i.kt)("h3",{id:"details"},"details"),(0,i.kt)("p",null,"In ",(0,i.kt)("inlineCode",{parentName:"p"},"async")," mode, disabling ",(0,i.kt)("inlineCode",{parentName:"p"},"Details")," visually compacts the graph. This is used to better expose high-level patterns between ",(0,i.kt)(o.Z,{term:"CGR",mdxType:"Term"},"CGRs"),'. One can probably best see the "big picture" by disabling ',(0,i.kt)("inlineCode",{parentName:"p"},"Details")," and then zooming out."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Details")," currently does nothing in ",(0,i.kt)("a",{parentName:"p",href:"#sync-call-graph"},"sync")," mode."),(0,i.kt)("h3",{id:"call-graph-pauseresumeclear"},"Call Graph: pause/resume/clear"),(0,i.kt)("p",null,"These features lets you isolate the part of the call graph responsible for executing specific events (such as clicking a buggy button), while removing (hiding) all kinds of unrelated clutter."),(0,i.kt)("h4",{id:"-pauseresume"},(0,i.kt)("span",{className:"color-red"},"\ud83d\udd34")," pause/resume"),(0,i.kt)("p",null,"Use the \ud83d\udd34 button to pause/resume the rendering of new incoming data, so we can focus on what we already have.\nThis is useful to prevent cluttering the call graph with events that get recorded once we have recorded the bug (or other event of interest)."),(0,i.kt)("p",null,'For example, when investigating a bug that happens after pressing some button (a "buggy button" if you will) in your application, you can:'),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},'Wait for the application to finish initialization and for the "buggy button" to show up.'),(0,i.kt)("li",{parentName:"ol"},"Press ",(0,i.kt)("inlineCode",{parentName:"li"},"x"),"."),(0,i.kt)("li",{parentName:"ol"},"Press a buggy button."),(0,i.kt)("li",{parentName:"ol"},"(if necessary) Wait until the bug occurs."),(0,i.kt)("li",{parentName:"ol"},"Press \ud83d\udd34 (pause).")),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},'You might be tempted into thinking that pausing with this button will stop all recording, however that is not what happens. Currently, Dbux keeps on recording for as long as the application is running. This button only hides that new data behind a single "Hidden Node". That inability to completely pause recording, can make things very slow and thus make debugging of games and other kinds of high performance applications very difficult. ',(0,i.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/tree/master/#performance"},"You can read more about performance considerations here"),"."))),(0,i.kt)("h4",{id:"x-clear-showhide-already-recorded-traces"},(0,i.kt)("inlineCode",{parentName:"h4"},"x")," Clear (show/hide already recorded traces)"),(0,i.kt)("p",null,"The clear button (",(0,i.kt)("inlineCode",{parentName:"p"},"x"),") is useful for removing clutter when investigating a bug that does not appear immediately, or is not part of the initialization routine."),(0,i.kt)("h2",{id:"call-graph-implementation-details"},"Call Graph Implementation Details"),(0,i.kt)("p",null,"A few more notes on the Call Graph GUI implementation:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The Call Graph is implemented as a ",(0,i.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/api/extension-guides/webview"},"VSCode WebView"),".",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Inside of ",(0,i.kt)("inlineCode",{parentName:"li"},"dbux-code"),", the graph is defined in ",(0,i.kt)(l.Z,{path:"dbux-code/src/webViews/graphWebView.js",mdxType:"CodeLink"})))),(0,i.kt)("li",{parentName:"ul"},"The Call Graph consists of three modules:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)(l.Z,{path:"dbux-graph-common",mdxType:"CodeLink"})),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)(l.Z,{path:"dbux-graph-client",mdxType:"CodeLink"})),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)(l.Z,{path:"dbux-graph-host",mdxType:"CodeLink"})))),(0,i.kt)("li",{parentName:"ul"},"Client and host are running in separate runtimes. They share the ",(0,i.kt)("inlineCode",{parentName:"li"},"graph-common")," module.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"For a better call graph experience, we developed an IPC-first component system to easily render things on the client, while allowing us to control it from the host. Its implementation can be found in the three modules' ",(0,i.kt)("inlineCode",{parentName:"li"},"src/componentLib")," folders."),(0,i.kt)("li",{parentName:"ul"},"Theoretically, the client can also be rendered independent of VSCode, on a website, in an iframe etc.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"client")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"host")," communicate via a ",(0,i.kt)("inlineCode",{parentName:"li"},"IpcAdapter")," which must provide two functions (whose implementation depends on the environment that they run in): ",(0,i.kt)("inlineCode",{parentName:"li"},"onMessage")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"postMessage"),"."),(0,i.kt)("li",{parentName:"ul"},"The custom client would require its own ",(0,i.kt)("inlineCode",{parentName:"li"},"IpcAdapter")," implementation. ",(0,i.kt)("inlineCode",{parentName:"li"},"dbux-code"),"'s can be found in ",(0,i.kt)(l.Z,{path:"dbux-code/src/codeUtil/WebviewWrapper.js",mdxType:"CodeLink"}),".")))))))}v.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var l=r.apply(null,n);l&&e.push(l)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var o in n)a.call(n,o)&&n[o]&&e.push(o);else e.push(n.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var a=n(5639).Symbol;e.exports=a},4239:function(e,t,n){var a=n(2705),r=n(9607),i=n(2333),l=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":l&&l in Object(e)?r(e):i(e)}},1957:function(e,t,n){var a="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=a},9607:function(e,t,n){var a=n(2705),r=Object.prototype,i=r.hasOwnProperty,l=r.toString,o=a?a.toStringTag:void 0;e.exports=function(e){var t=i.call(e,o),n=e[o];try{e[o]=void 0;var a=!0}catch(s){}var r=l.call(e);return a&&(t?e[o]=n:delete e[o]),r}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var a=n(1957),r="object"==typeof self&&self&&self.Object===Object&&self,i=a||r||Function("return this")();e.exports=i},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var a=n(4239),r=n(1469),i=n(7005);e.exports=function(e){return"string"==typeof e||!r(e)&&i(e)&&"[object String]"==a(e)}}}]);