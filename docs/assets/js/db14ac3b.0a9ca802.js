"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[263],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),h=o,f=d["".concat(s,".").concat(h)]||d[h]||p[h]||i;return n?r.createElement(f,a(a({ref:t},c),{},{components:n})):r.createElement(f,a({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6031:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={},s="FAQ",u={unversionedId:"faq",id:"faq",title:"FAQ",description:"TODO",source:"@site/content/05-faq.mdx",sourceDirName:".",slug:"/faq",permalink:"/dbux/faq",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/content/05-faq.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Who is Using Dbux?",permalink:"/dbux/advanced/dbux-uses"}},c=[{value:"It Just Won&#39;t Work!",id:"it-just-wont-work",children:[],level:2},{value:"My Applications don&#39;t Show Up!?",id:"my-applications-dont-show-up",children:[],level:2},{value:"Which files will be traced?",id:"which-files-will-be-traced",children:[],level:2}],p={toc:c};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"faq"},"FAQ"),(0,i.kt)("p",null,"TODO"),(0,i.kt)("h2",{id:"it-just-wont-work"},"It Just Won't Work!"),(0,i.kt)("p",null,"While technically not a question, this is certainly a frustrating experience to encounter. Please don't hesitate to reach out. We recommend using ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/issues"},"our GitHub Issues Page")," to file well-written complaints, or ",(0,i.kt)("a",{parentName:"p",href:"https://discord.gg/QKgq9ZE"},"join us on Discord")," to ask questions or discuss anything you feel like."),(0,i.kt)("h2",{id:"my-applications-dont-show-up"},"My Applications don't Show Up!?"),(0,i.kt)("p",null,"There is a multitude of possible reasons for things to not quite work out:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"You did not instrument the application. Make sure to use one of the four methods of ",(0,i.kt)("a",{parentName:"li",href:"./using-dbux"},"Running a JavaScript Application w/ Dbux Enabled"),"."),(0,i.kt)("li",{parentName:"ol"},"Your application exited prematurely due to a crash or ",(0,i.kt)("inlineCode",{parentName:"li"},"process.exit")," being called. In that case, Dbux might not have been able to send out the data on time. Usually, this is accompanied by a console message that reads a little like ",(0,i.kt)("inlineCode",{parentName:"li"},'"Process exiting but not all data has been sent out. Analysis will be incomplete. This is probably because of a crash or because process.exit was called manually."'),".",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Note that some environments (such as ",(0,i.kt)("inlineCode",{parentName:"li"},"Jest"),") might swallow important console messages, which would explain why you were not able to see the message."),(0,i.kt)("li",{parentName:"ul"},"In order to prevent this situation, Dbux tries (rather aggressively) to keep an instrumented application alive. If it does, it would accompany its moves with further log messages. Look for the hints."))),(0,i.kt)("li",{parentName:"ol"},"Your application has an infinite loop or otherwise starves the network queue.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Since Dbux relies on the network queue to send data back to the mothership, it requires the code to give up control for that to happen first. Thus, Dbux is not (currently) a good tool to help in dealing with infinite loops or starvation.")))),(0,i.kt)("h2",{id:"which-files-will-be-traced"},"Which files will be traced?"),(0,i.kt)("p",null,"TODO"))}d.isMDXComponent=!0}}]);