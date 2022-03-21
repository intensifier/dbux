/*! For license information please see cc5d6d71.bd9cdfa5.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[391],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),h=r,m=p["".concat(l,".").concat(h)]||p[h]||d[h]||i;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3755:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(7462),r=n(3366),i=n(7294),o=n(9700),s=["path","children","title"];function l(e){var t=e.path,n=e.children,l=e.title,c=(0,r.Z)(e,s);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var u=(0,o.B)(t);n=n||u,l=l||n;var d="https://github.com/Domiii/dbux/tree/master/"+t;return i.createElement("a",(0,a.Z)({title:l,href:d},c),n)}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var a=n(7462),r=n(3366),i=n(7294),o=n(4184),s=n.n(o),l=n(7037),c=n.n(l),u=n(5350),d=n(8767);var p=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function h(e){return e.startsWith("/")||e.includes("://")}function m(e){var t=e.src,n=e.title,o=e.zoomable,l=e.darkLight,m=e.screen,g=e.concept,f=e.className,b=e.maxWidth,v=e.mb,y=e.style,k=(0,r.Z)(e,p);g&&(t.startsWith("concept")||h(t)||(t="concepts/"+t)),m&&(t.startsWith("screen")||h(t)||(t="screens/"+t));var x=g||m||o;x&&void 0===o&&(o=!0);var w=function(e){var t=e.src,n=e.darkLight,a=(0,u.Z)().isDarkTheme;return(0,d.Z)()+(n?a?"dark/":"light/":"")+t}({src:t,darkLight:l}),N=n=n||t;f=s()(f,{"border-screen":x,"img-crisp":x,zoomable:o});var D=i.createElement("img",(0,a.Z)({className:f,style:y,src:w,alt:N,title:n},k));if(b){b=c()(b)?b:b+"px",v=void 0===v?"mb-2":v;var j=s()(v),O={display:"inline-block",maxWidth:b,lineHeight:0};D=i.createElement("div",{className:j,style:O},D)}return D}},1333:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var a=n(7294),r=n(8767),i="acg",o="background/debugging",s={cgrs:"cgr","call graph root":"cgr","call graph roots":"cgr",aes:"ae","asynchronous event":"ae","asynchronous events":"ae","asynchronous call graph":"acg","race conditions":"race condition"},l={"call graph":"runtime-analysis/call-graph",acg:i,cgr:i,ae:i,"dynamic runtime analysis":o,idbe:o,"race condition":"https://www.google.com/search?q=race+condition&hl=en"},c={trace:"trace",statictrace:"trace",context:"context",staticcontext:"staticContext","call graph":"call-graph",acg:"",cgr:"cgr",ae:"ae","dynamic runtime analysis":"",idbe:""};function u(e){var t=e.term,n=e.children,i=void 0===n?t:n,o=function(e){var t=e.toLowerCase(),n=l[t=s[t]||t]||"advanced/terminology",a=c[t];return n||a?(a=a?"#"+a:"",""+(0,r.Z)()+n+a):null}(t);return o?a.createElement("a",{href:o,title:'lookup term: "'+t+'"'},i,a.createElement("sup",null,"\u2754")):a.createElement(a.Fragment,null,"$",i,a.createElement("span",{className:"color-gray border-gray round",title:'(could not look up "'+i+'")'},a.createElement("sup",null,"\u2753")))}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(2263);function r(){return(0,a.Z)().siteConfig.baseUrl}},9700:function(e,t,n){"use strict";n.d(t,{B:function(){return r}});var a={"dbux-code":"Dbux VSCode Extension"};function r(e){var t=a[e];return t||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},5716:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return d},toc:function(){return p},default:function(){return m}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=n(633),s=(n(1333),n(3755)),l=["components"],c={slug:"/"},u="Dbux: What and Why?",d={unversionedId:"why-dbux",id:"why-dbux",title:"Dbux: What and Why?",description:"Dbux is an integrated debugging environment (IDbE) and omniscient debugger for JavaScript runtime analysis. We hope to help developers (i) improve program comprehension and (ii) increase debugging efficiency. To that end, Dbux records an application's runtime data, visualizes it and makes it interactive.",source:"@site/content/01-why-dbux.md",sourceDirName:".",slug:"/",permalink:"/dbux/",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/01-why-dbux.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/"},sidebar:"tutorialSidebar",next:{title:"Overview",permalink:"/dbux/runtime-analysis"}},p=[{value:"Video Introduction",id:"video-introduction",children:[],level:2},{value:"Why Dbux?",id:"why-dbux",children:[],level:2},{value:"Dbux Features",id:"dbux-features",children:[],level:2},{value:"Word of Caution: ALPHA Phase!",id:"word-of-caution-alpha-phase",children:[],level:2}],h={toc:p};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"dbux-what-and-why"},"Dbux: What and Why?"),(0,i.kt)("p",null,"Dbux is an integrated debugging environment (IDbE) and omniscient debugger for JavaScript runtime analysis. We hope to help developers (i) improve program comprehension and (ii) increase debugging efficiency. To that end, Dbux records an application's runtime data, visualizes it and makes it interactive."),(0,i.kt)(o.Z,{screen:!0,src:"dbux-all-async1.png",mdxType:"Img"}),(0,i.kt)("p",null,"The screenshot above demonstrates several of Dbux's features, including:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Left: ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/trace-details"},"omni-directional navigation, values, executions")," and ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/data-flow"},"data flow"),"."),(0,i.kt)("li",{parentName:"ul"},"Middle: ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/code-decorations"},"code decorations")," and ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/select-trace"},"trace selection"),"."),(0,i.kt)("li",{parentName:"ul"},"Right: ",(0,i.kt)("a",{parentName:"li",href:"/dbux/acg"},"asynchronous call graph"),".")),(0,i.kt)("h2",{id:"video-introduction"},"Video Introduction"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=N9W6rhHMKbA"},(0,i.kt)("img",{parentName:"a",src:"https://img.youtube.com/vi/N9W6rhHMKbA/0.jpg",alt:"Video Introduction"}))),(0,i.kt)("h2",{id:"why-dbux"},"Why Dbux?"),(0,i.kt)("p",null,"I (Dominik) started this project on 11/16/2019 because I felt that after programming/designing software, and debugging for 20 years, I have not fully mastered my craft. This became particularly apparent during problem solving sessions with clients, when I'm rather, or at least quite, unfamiliar with the code. Being stuck for 30 minutes or longer to locate a single bug was not a rare occasion. I felt like I was lacking something, lacking an approach, lacking strategy, and also lacking a sufficiently deep understanding of the semantics of the program at hand. It was this frustration that lead me on the journey to build Dbux."),(0,i.kt)("p",null,"I started to realize that I wanted to be able to answer (seemingly always the same type of) questions, like: How did THAT happen? Where did THAT data come from? Where did the execution take THAT turn?"),(0,i.kt)("p",null,"I wanted to be able to more easily ",(0,i.kt)("strong",{parentName:"p"},"see")," (not just ",(0,i.kt)("a",{parentName:"p",href:"https://www.thesaurus.com/browse/guess"},"guess/assume/theorize/conjecture/suppose/opine/test/prod/verify"),") what is going on. I wanted to interact more with the runtime structure, not just indirectly through print statements, or one single small step at a time. I wanted to see the whole thing, zoom in and out, whenever necessary be able to zoom in real close, and then interact with it in order to investigate some of the non-obvious connections from where I am to where the bug is."),(0,i.kt)("p",null,"The goal was clear: collect all relevant run-time data, record it and make it easily accessible. And thus, Dbux was born. "),(0,i.kt)("p",null,"We (Dominik and Michael) believe that Dbux does NOT make someone good at debugging. However, it can help better see (and appreciate?) what is going on in our applications by revealing the hidden structures beneath it. What you do with that information, is up to you! Luckily, it is (speaking from a rather biased position) kinda fun to interact with Dbux to poke around the actual recorded behavior of the code, navigating along the connections, and uncovering interesting little insights into what is actually going on in our applications. It is at least more fun (or so we feel) than just staring at the code guessing, more fun than adding/removing print/console statements, and more fun than waiting for the debugging session to re-start for the 5th time, after overshooting a crucial line of code yet again."),(0,i.kt)("h2",{id:"dbux-features"},"Dbux Features"),(0,i.kt)("p",null,"Once an application has executed with ",(0,i.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis/enable-dbux"},"Dbux enabled"),", a collection of analytical tools is available via the ",(0,i.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code"},"Dbux VSCode Extension"),", including:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Dbux's ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/global"},"global view")," lists third-party modules, files and console log events. Takes user to the relevant code in a single click.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'NOTE: While this eliminates the need for most of "',(0,i.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=print-based+debugging&hl=en"},"print-based debugging"),'", it does not replace use of ',(0,i.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=logging+programming+best+practices"},"proper logging"),"."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/select-trace"},"Trace selection")," and the ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/trace-details"},"Trace Details view")," allow overviewing and investigating all executions of any piece of code and their respective values."),(0,i.kt)("li",{parentName:"ul"},"Instead of only a call stack, Dbux presents us with the entire ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/call-graph"},"call graph"),".",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"A complete ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/call-graph#stack"},"asynchronous call stack")," is also available."))),(0,i.kt)("li",{parentName:"ul"},'Instead of using the traditional debugger as a "magnifying glass" to slowly crawl along the execution timeline, Dbux offers random-access ',(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/trace-details#navigation"},"navigation"),", in both directions of the timeline."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/code-decorations"},"Code decorations")," can make it a lot more obvious what code executed at all, and how."),(0,i.kt)("li",{parentName:"ul"},"Executed files, functions and values ",(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/search"},"can be searched")," for/through (culls a lot of noise when compared to code-based search)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/dbux/runtime-analysis/data-flow"},"Data flow analysis")," allows us to quickly trace the reads, writes and creation of a selected value. This can also take us to the place of creation of a value in a single click.")),(0,i.kt)("h2",{id:"word-of-caution-alpha-phase"},"Word of Caution: ALPHA Phase!"),(0,i.kt)("p",null,"Dbux is currently still in ALPHA. While we have been testing it on many small ",(0,i.kt)(s.Z,{path:"samples",mdxType:"CodeLink"})," and ",(0,i.kt)(s.Z,{path:"dbux-projects/src/projects",mdxType:"CodeLink"},"several real-world projects"),", there is always a chance, that the next one does not exactly work the way it should. For example, tracing the internals of ",(0,i.kt)("inlineCode",{parentName:"p"},"react")," is currently (01/2022) ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/issues/640"},"bugged"),"."),(0,i.kt)("p",null,"If you run into any problems when using Dbux, please ",(0,i.kt)("a",{parentName:"p",href:"https://discord.gg/8kR2a7h"},"let us know"),"."),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Dbux has a bit of a learning curve. We recommend programming beginners to start with the ",(0,i.kt)("a",{parentName:"p",href:"/dbux/dbux-practice/tutorial"},"interactive tutorials"),"."),(0,i.kt)("p",{parentName:"div"},"While you can certainly try to get started on your own, you are welcome to join us on ",(0,i.kt)("a",{parentName:"p",href:"https://discord.gg/8kR2a7h"},"DISCORD"),", ask questions and complain as you go along."))))}m.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=r.apply(null,n);o&&e.push(o)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var s in n)a.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var a=n(5639).Symbol;e.exports=a},4239:function(e,t,n){var a=n(2705),r=n(9607),i=n(2333),o=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":o&&o in Object(e)?r(e):i(e)}},1957:function(e,t,n){var a="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=a},9607:function(e,t,n){var a=n(2705),r=Object.prototype,i=r.hasOwnProperty,o=r.toString,s=a?a.toStringTag:void 0;e.exports=function(e){var t=i.call(e,s),n=e[s];try{e[s]=void 0;var a=!0}catch(l){}var r=o.call(e);return a&&(t?e[s]=n:delete e[s]),r}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var a=n(1957),r="object"==typeof self&&self&&self.Object===Object&&self,i=a||r||Function("return this")();e.exports=i},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var a=n(4239),r=n(1469),i=n(7005);e.exports=function(e){return"string"==typeof e||!r(e)&&i(e)&&"[object String]"==a(e)}}}]);