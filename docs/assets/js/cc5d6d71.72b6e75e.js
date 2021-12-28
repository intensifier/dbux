"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[391],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=u(n),h=o,p=c["".concat(l,".").concat(h)]||c[h]||g[h]||i;return n?a.createElement(p,r(r({ref:t},d),{},{components:n})):a.createElement(p,r({ref:t},d))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var u=2;u<i;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5716:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var a=n(7462),o=n(3366),i=(n(7294),n(3905)),r=["components"],s={slug:"/"},l="Dbux: What and Why?",u={unversionedId:"why-dbux",id:"why-dbux",title:"Dbux: What and Why?",description:"Dbux aims at helping analyze the execution of JavaScript programs by recording (almost) all runtime data, visualizing it and making it interactive, thereby (hopefully) helping developers (i) improve program comprehension and (ii) reduce time spent on finding bugs.",source:"@site/content/01-why-dbux.md",sourceDirName:".",slug:"/",permalink:"/dbux/",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/content/01-why-dbux.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/"},sidebar:"tutorialSidebar",next:{title:"Installation",permalink:"/dbux/using-dbux/installation"}},d=[{value:"On Debugging",id:"on-debugging",children:[],level:2},{value:"How is Dbux Different?",id:"how-is-dbux-different",children:[],level:2},{value:"Advantages of Dbux:",id:"advantages-of-dbux",children:[],level:2},{value:"Concluding Remarks: &quot;Dbux vs. Debugging&quot;",id:"concluding-remarks-dbux-vs-debugging",children:[],level:2},{value:"Joining the Community",id:"joining-the-community",children:[],level:2}],g={toc:d};function c(e){var t=e.components,n=(0,o.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"dbux-what-and-why"},"Dbux: What and Why?"),(0,i.kt)("p",null,"Dbux aims at helping analyze the execution of JavaScript programs by recording (almost) all runtime data, visualizing it and making it interactive, thereby (hopefully) helping developers (i) improve program comprehension and (ii) reduce time spent on finding bugs."),(0,i.kt)("p",null,"This (too long) video explains what Dbux is and features two examples of how to use the Dbux VSCode extension:"),(0,i.kt)("a",{href:"https://www.youtube.com/watch?v=m1ANEuZJFT8",target:"_blank",alt:"video"},(0,i.kt)("img",{width:"150px",src:"https://img.youtube.com/vi/m1ANEuZJFT8/0.jpg"})),(0,i.kt)("p",null,"If you have any questions, feel free to ",(0,i.kt)("a",{parentName:"p",href:"https://discord.gg/QKgq9ZE"},"join us on DISCORD"),"."),(0,i.kt)("h2",{id:"on-debugging"},"On Debugging"),(0,i.kt)("p",null,'"Debugging is just plain hard." "Real programmers don\'t need debugging tools," skeptics say, according to Henry Lieberman',(0,i.kt)("sup",{parentName:"p",id:"fnref-1"},(0,i.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),". Back in 1997, in a heart-warming, informal call to arms, Lieberman envisions a future where new innovative debugging tools like his ZStep 95",(0,i.kt)("sup",{parentName:"p",id:"fnref-2"},(0,i.kt)("a",{parentName:"sup",href:"#fn-2",className:"footnote-ref"},"2")),' omniscient LISP debugger will surely become a staple of developer tool boxes around the world. 24 years later, the skeptics seem to have been proven right, and him wrong. While a lot of progress has been made in domain-specific debugging tools, commonly available general purpose debuggers are still mostly the same as back then. We also agree with Lieberman on modern computational resources, in that we can "use some of that speed and storage to process information that the programmer needs to understand what\'s going on in the program". '),(0,i.kt)("p",null,'On the plus side, some strides have been made. Coverage reporting, for example, has become standard industry practice. It uses some of that "speed and storage" to record code execution metrics in order to help developers with an important aspect of automated testing. Another example is the wide range of browser tools that especially frontend developers enjoy. Examples include the DOM inspector, the trusty network tab and many domain-specific tools that caring framework developers put in our hands, such as the React and Redux Developer tools',(0,i.kt)("sup",{parentName:"p",id:"fnref-3"},(0,i.kt)("a",{parentName:"sup",href:"#fn-3",className:"footnote-ref"},"3")),"."),(0,i.kt)("p",null,'Imagine the manager of a large factory, running the factory based on observations from inputs and outputs, a "fax machine" and a "blueprint" alone. That is what is still happening in software development. Debugging is still commonly performed by correlating input and output events, and sometimes specialized logs (the "fax machine"), interleaved with reading and re-reading the code (the "blueprint"). To us this makes no sense. We believe that the 2020s shall finally be the time for the "next generation of debugging tools".'),(0,i.kt)("h2",{id:"how-is-dbux-different"},"How is Dbux Different?"),(0,i.kt)("p",null,"Debugging is an investigative process that requires the developer to spend most time making (more or less well-educated) guesses, and then spend time looking for clues, i.e. gathering and sifting data from the ill-behaved application.\nWhen facing down most non-trivial bugs, we usually start by looking at available data (e.g. logs), followed by guessing potential places that might be at fault, before moving on to gathering more relevant data. We then sift through the gathered data in search for clues, then change our angle of attack and the data gathering to better zoom in on where we think the root cause might lie, rinse and repeat, until we figure it all out."),(0,i.kt)("p",null,"The traditional debugger has a special place in our hearts. It can be a fantastic tool, ",(0,i.kt)("strong",{parentName:"p"},"if")," you know where to look, and ",(0,i.kt)("strong",{parentName:"p"},"if")," the root cause is downstream from observed symptoms. Sadly, most bugs don't work like that. Often times when we observe a failure, we have to backtrack, in order to find the root cause. The traditional debugger cannot go back in time, only with it. It also does not record runtime data, only presents us with highly localized data, most prominently: surrounding expression and variable values, as well as the call-stack."),(0,i.kt)("p",null,"We argue: this approach to debugging is of course ",(0,i.kt)("strong",{parentName:"p"},"not bad"),". Our goal is not to denounce. Rather, we sought out to look for new ways of approaching debugging, with the hope of making parts of it ",(0,i.kt)("em",{parentName:"p"},"more efficient"),"."),(0,i.kt)("p",null,"Dbux is an ",(0,i.kt)("a",{parentName:"p",href:"https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=omniscient+debugger"},"omniscient debugger"),', meaning it automatically gathers and visualizes your application\'s runtime behavior, and makes it interactive. The term "omniscient" (meaning "',(0,i.kt)("strong",{parentName:"p"},"all-knowing"),"\") is a quirky exaggeration (it does not know your grandma's birthday). The things that it does know can be configured. By default, it records the beginning and end of all executed files and functions, all asynchronous events and the entire trace log, meaning (almost) all statements and expressions and their values."),(0,i.kt)("p",null,"All that data is then available for use to the developer, as explained in the ",(0,i.kt)("a",{parentName:"p",href:"./using-dbux"},"Using Dbux")," chapter."),(0,i.kt)("h2",{id:"advantages-of-dbux"},"Advantages of Dbux:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Instead of only a call stack, Dbux presents us with the entire ",(0,i.kt)("a",{parentName:"li",href:"./using-dbux/call-graph"},"call graph"),". A complete asynchronous call stack is also available when needed."),(0,i.kt)("li",{parentName:"ul"},"Instead of guessing which files, third-party modules, console log statements executed and how, one can overview all that in Dbux's ",(0,i.kt)("a",{parentName:"li",href:"./using-dbux/global"},"global view"),"."),(0,i.kt)("li",{parentName:"ul"},'Instead of using the traditional debugger as a "magnifying glass" to slowly crawl along the execution timeline, Dbux\'s ',(0,i.kt)("a",{parentName:"li",href:"./using-dbux/select-trace"},"trace selection"),", ",(0,i.kt)("a",{parentName:"li",href:"./using-dbux/trace-details"},"trace details and navigation")," allow random-access investigation of any piece of code and all its executions. We also threw in ",(0,i.kt)("a",{parentName:"li",href:"./using-dbux/code-augmentation"},"code augmentation")," to help us quickly see which code executed and how."),(0,i.kt)("li",{parentName:"ul"},'Dbux eliminates the need for most of "',(0,i.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=print-based+debugging&hl=en"},"print-based debugging"),'", because it logs for us, allowing to quickly overview. It even offers ',(0,i.kt)("a",{parentName:"li",href:"./using-dbux/search"},"searching for executed files, functions, values and more"),". Note that it is not built to replace ",(0,i.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=logging+programming+best+practices"},"logging"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"./using-dbux/data-flow"},"Data flow analysis")," allows us to quickly trace the reads, writes and creation of a selected value.")),(0,i.kt)("h2",{id:"concluding-remarks-dbux-vs-debugging"},'Concluding Remarks: "Dbux vs. Debugging"'),(0,i.kt)("p",null,"I started this project on 11/16/2019 because I felt that, after programming and designing software, and debugging for 20 years, I have not fully mastered my craft. I would sometimes be stuck for 30 minutes or longer to ",(0,i.kt)("strong",{parentName:"p"},"locate")," a single bug. This frustration has not only led to the invention of Dbux, but to an exciting journey which brought about greater appreciation and many newly gained insights into the structures of the dynamic runtime execution of a program."),(0,i.kt)("p",null,'These days, even when I debug without Dbux, I feel I start by strategizing, rather than "going with my gut". I am much more likely to reason about and even visualize many aspects of the structures hidden beneath each statement, including its dynamic call sub-graph and the asynchronous events it was likely to have triggered or is affected by. It is my biased opinion that Dbux can be beneficial to many developers, not just by aiding runtime analysis, but also helping us re-evaluate our approach to debugging.'),(0,i.kt)("h2",{id:"joining-the-community"},"Joining the Community"),(0,i.kt)("p",null,"While you can certainly try to get started on your own, you probably make your life a lot easier by joining us on\n",(0,i.kt)("a",{parentName:"p",href:"https://discord.gg/8kR2a7h"},"DISCORD")," and ask questions as you go along."),(0,i.kt)("div",{className:"footnotes"},(0,i.kt)("hr",{parentName:"div"}),(0,i.kt)("ol",{parentName:"div"},(0,i.kt)("li",{parentName:"ol",id:"fn-1"},'Lieberman, Henry. "The debugging scandal and what to do about it." Communications of the ACM 40.4 (1997): 26-30.',(0,i.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")),(0,i.kt)("li",{parentName:"ol",id:"fn-2"},'Lieberman, Henry, and Christopher Fry. "ZStep 95: A reversible, animated source code stepper." (1997).',(0,i.kt)("a",{parentName:"li",href:"#fnref-2",className:"footnote-backref"},"\u21a9")),(0,i.kt)("li",{parentName:"ol",id:"fn-3"},"Redux Developer Tools. ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/zalmoxisus/redux-devtools-extension"},"https://github.com/zalmoxisus/redux-devtools-extension"),(0,i.kt)("a",{parentName:"li",href:"#fnref-3",className:"footnote-backref"},"\u21a9")))))}c.isMDXComponent=!0}}]);