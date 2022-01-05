/*! For license information please see 55b9e914.9a99ff58.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[985],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return c},kt:function(){return p}});var i=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var d=i.createContext({}),s=function(e){var n=i.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=s(e.components);return i.createElement(d.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(t),p=a,k=m["".concat(d,".").concat(p)]||m[p]||u[p]||o;return t?i.createElement(k,r(r({ref:n},c),{},{components:t})):i.createElement(k,r({ref:n},c))}));function p(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=m;var l={};for(var d in n)hasOwnProperty.call(n,d)&&(l[d]=n[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var s=2;s<o;s++)r[s]=t[s];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5002:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var i=t(7462),a=t(3366),o=t(7294),r=t(3616),l=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function d(e){var n=e.toc,t=e.className,i=e.linkClassName,a=e.isChild;return n.length?o.createElement("ul",{className:a?void 0:t},n.map((function(e){return o.createElement("li",{key:e.id},o.createElement("a",{href:"#"+e.id,className:null!=i?i:void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(d,{isChild:!0,toc:e.children,className:t,linkClassName:i}))}))):null}function s(e){var n=e.toc,t=e.className,s=void 0===t?"table-of-contents table-of-contents__left-border":t,c=e.linkClassName,u=void 0===c?"table-of-contents__link":c,m=e.linkActiveClassName,p=void 0===m?void 0:m,k=e.minHeadingLevel,g=e.maxHeadingLevel,f=(0,a.Z)(e,l),b=(0,r.LU)(),v=null!=k?k:b.tableOfContents.minHeadingLevel,h=null!=g?g:b.tableOfContents.maxHeadingLevel,N=(0,r.DA)({toc:n,minHeadingLevel:v,maxHeadingLevel:h}),y=(0,o.useMemo)((function(){if(u&&p)return{linkClassName:u,linkActiveClassName:p,minHeadingLevel:v,maxHeadingLevel:h}}),[u,p,v,h]);return(0,r.Si)(y),o.createElement(d,(0,i.Z)({toc:N,className:s,linkClassName:u},f))}},633:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var i=t(7462),a=t(3366),o=t(7294),r=t(4184),l=t.n(r),d=t(7037),s=t.n(d),c=t(5350),u=t(8767);var m=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","style"];function p(e){var n=e.src,t=e.title,r=e.zoomable,d=e.darkLight,p=e.screen,k=e.concept,g=e.className,f=e.maxWidth,b=e.style,v=(0,a.Z)(e,m);k&&(n.startsWith("concept")||n.startsWith("/")||n.includes("://")||(n="concepts/"+n)),p&&(n.startsWith("screen")||n.startsWith("/")||n.includes("://")||(n="screens/"+n));var h=k||p;h&&void 0===r&&(r=!0);var N=function(e){var n=e.src,t=e.darkLight,i=(0,c.Z)().isDarkTheme;return(0,u.Z)()+(t?i?"dark/":"light/":"")+n}({src:n,darkLight:d}),y=t=t||n;g=l()(g,{"border-screen":h,zoomable:r});var C=o.createElement("img",(0,i.Z)({className:g,style:b,src:N,alt:y,title:t},v));if(f){var x={display:"inline-block",maxWidth:f=s()(f)?f:f+"px"};C=o.createElement("div",{style:x},C)}return C}},8640:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var i=t(7294),a="tableOfContentsInline_0DDH",o=t(5002);var r=function(e){var n=e.toc,t=e.minHeadingLevel,r=e.maxHeadingLevel;return i.createElement("div",{className:a},i.createElement(o.Z,{toc:n,minHeadingLevel:t,maxHeadingLevel:r,className:"table-of-contents",linkClassName:null}))},l={display:"none"};function d(e){var n=e.toc;return i.createElement("div",{style:l},i.createElement(r,{toc:n}))}},8767:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}});var i=t(2263);function a(){return(0,i.Z)().siteConfig.baseUrl}},1447:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return m},default:function(){return k}});var i=t(7462),a=t(3366),o=(t(7294),t(3905)),r=t(633),l=t(8640),d=["components"],s={},c="Contributing",u={unversionedId:"advanced/contributing",id:"advanced/contributing",title:"Contributing",description:"Code of Conduct",source:"@site/content/advanced/03-contributing.md",sourceDirName:"advanced",slug:"/advanced/contributing",permalink:"/dbux/advanced/contributing",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/advanced/03-contributing.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Known Limitations and Future Work",permalink:"/dbux/advanced/future-work"},next:{title:"Terminology",permalink:"/dbux/advanced/terminology"}},m=[{value:"Code of Conduct",id:"code-of-conduct",children:[],level:2},{value:"Development + Contributing: Getting Started",id:"development--contributing-getting-started",children:[{value:"Prerequisites",id:"prerequisites",children:[],level:3},{value:"Setup",id:"setup",children:[],level:3},{value:"Start development",id:"start-development",children:[],level:3},{value:"Adding dependencies",id:"adding-dependencies",children:[],level:3},{value:"Using Dbux Local Development Build",id:"using-dbux-local-development-build",children:[],level:3}],level:2},{value:"Joining the Community",id:"joining-the-community",children:[],level:2},{value:"Dealing with Documentation",id:"dealing-with-documentation",children:[],level:2},{value:"Unsorted Notes",id:"unsorted-notes",children:[{value:"VSCode extension development",id:"vscode-extension-development",children:[{value:"Adding a command/button",id:"adding-a-commandbutton",children:[],level:4}],level:3}],level:2}],p={toc:m};function k(e){var n=e.components,t=(0,a.Z)(e,d);return(0,o.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"contributing"},"Contributing"),(0,o.kt)(l.Z,{toc:m,mdxType:"TOC"}),(0,o.kt)("h2",{id:"code-of-conduct"},"Code of Conduct"),(0,o.kt)("p",null,"TODO"),(0,o.kt)("h2",{id:"development--contributing-getting-started"},"Development + Contributing: Getting Started"),(0,o.kt)("h3",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"bash"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"On Windows, you can get this via cygwin or ",(0,o.kt)("inlineCode",{parentName:"li"},"git")," (which also installs cygwin)"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://docs.volta.sh/guide/getting-started"},"Volta"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Volta"),", unlike ",(0,o.kt)("inlineCode",{parentName:"li"},"n")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"nvm"),", is fully cross-platform."),(0,o.kt)("li",{parentName:"ul"},"We recommend using volta to manage ",(0,o.kt)("inlineCode",{parentName:"li"},"node"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"npm")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn"),". It is a breeze to work with, and makes version management child's play."),(0,o.kt)("li",{parentName:"ul"},"Make sure to delete ",(0,o.kt)("inlineCode",{parentName:"li"},"node"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn")," (and possibly ",(0,o.kt)("inlineCode",{parentName:"li"},"n")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"nvm")," if you have it) first"),(0,o.kt)("li",{parentName:"ul"},"Use ",(0,o.kt)("inlineCode",{parentName:"li"},"volta")," to install ",(0,o.kt)("inlineCode",{parentName:"li"},"node")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"node",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"we recommend ",(0,o.kt)("inlineCode",{parentName:"li"},"node@16")," or higher for better support of source maps (node source map support used to be very slow before ",(0,o.kt)("inlineCode",{parentName:"li"},"node@16"),")."))),(0,o.kt)("li",{parentName:"ul"},"yarn")))))),(0,o.kt)("h3",{id:"setup"},"Setup"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"git clone https://github.com/Domiii/dbux.git\ncd dbux\ncode dbux.code-workspace # open project in vscode\nyarn install && yarn i # install dependencies\n")),(0,o.kt)("p",null,"Finally, you might want to enable Dbux auto start by default:"),(0,o.kt)(r.Z,{src:"screens/dbux-auto-start-workspace-setting.png",mdxType:"Img"}),(0,o.kt)("p",null,"If dependencies bug out, sometimes running the (very aggressive) clean-up command can help: ",(0,o.kt)("inlineCode",{parentName:"p"},"npm run dbux-reinstall")," (of course we don't recommend this)."),(0,o.kt)("h3",{id:"start-development"},"Start development"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Open project + start webpack",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"code dbux.code-workspace # open project in vscode\nnpm start # start webpack development build of all projects in watch mode\n"))),(0,o.kt)("li",{parentName:"ol"},"Go to your debug tab, select the ",(0,o.kt)("inlineCode",{parentName:"li"},"dbux-code")," configuration and press F5 (runs dbux-code (VSCode extension) in debug mode)"),(0,o.kt)("li",{parentName:"ol"},"Inside of the new window, you can then use the development version of ",(0,o.kt)("inlineCode",{parentName:"li"},"dbux-code"))),(0,o.kt)("h3",{id:"adding-dependencies"},"Adding dependencies"),(0,o.kt)("p",null,"We use Lerna with Yarn workspaces, so instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"npm i pkg"),", we can do the following:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Adding ",(0,o.kt)("inlineCode",{parentName:"li"},"pkg")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"@dbux/something")," (where ",(0,o.kt)("inlineCode",{parentName:"li"},"dbux-something")," is the folder containing the package ",(0,o.kt)("inlineCode",{parentName:"li"},"@dbux/something"),"):\n",(0,o.kt)("inlineCode",{parentName:"li"},"npx lerna add --scope=@dbux/something pkg"),(0,o.kt)("inlineCode",{parentName:"li"},"npx lerna add --scope=@dbux/common pkg"),(0,o.kt)("inlineCode",{parentName:"li"},"npx lerna add --scope=dbux-code pkg      # note: dbux-code's package name has a dash (-), not a slash (/)!"))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Adding ",(0,o.kt)("inlineCode",{parentName:"li"},"pkg")," as devDependency to the root:\n",(0,o.kt)("inlineCode",{parentName:"li"},"yarn add --dev -W pkg"))),(0,o.kt)("h3",{id:"using-dbux-local-development-build"},"Using Dbux Local Development Build"),(0,o.kt)("p",null,"If you want to use the local development build of Dbux in other folders, make sure to hard-link them."),(0,o.kt)("p",null,"E.g. on Windows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ps"},"mkdir ..\\..\\node_modules\\@dbux\nmklink /J ..\\..\\node_modules\\@dbux\\babel-plugin ..\\..\\..\\dbux\\dbux-babel-plugin\nmklink /J ..\\..\\node_modules\\@dbux\\runtime ..\\..\\..\\dbux\\dbux-runtime\n")),(0,o.kt)("h2",{id:"joining-the-community"},"Joining the Community"),(0,o.kt)("p",null,"While you can certainly try to get started on your own, you probably make your life a lot easier by ",(0,o.kt)("a",{parentName:"p",href:"https://discord.gg/8kR2a7h"},"join the dev team on Discord")," first :)"),(0,o.kt)("h2",{id:"dealing-with-documentation"},"Dealing with Documentation"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"react")," followed by ",(0,o.kt)("inlineCode",{parentName:"li"},"md")," in the same line does not format correctly: ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/mdx-js/mdx/discussions/1876"},"https://github.com/mdx-js/mdx/discussions/1876"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Add ",(0,o.kt)("inlineCode",{parentName:"li"},"&#8203")," in front of the line.")))),(0,o.kt)("h2",{id:"unsorted-notes"},"Unsorted Notes"),(0,o.kt)("h3",{id:"vscode-extension-development"},"VSCode extension development"),(0,o.kt)("h4",{id:"adding-a-commandbutton"},"Adding a command/button"),(0,o.kt)("p",null,"(VSCode's buttons are representation of commands, you must add a command before adding a button)"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Register command in ",(0,o.kt)("inlineCode",{parentName:"p"},"contributes.commands")," section of package.json as following(title and icon are optional):"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "commands": [\n    {\n      "command": "<COMMAND_ID>",\n      "title": "<TITLE>",\n      "icon": {\n        "light": "<PATH_TO_YOUR_ICON>",\n        "dark": "<PATH_TO_YOUR_ICON>"\n      }\n    }\n  ]\n}\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Bind the command with a callback function in js file:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { registerCommand } from './commands/commandUtil';\nregisterCommand(context, '<COMMAND_ID>', callback);\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Depends on whether the command should be shown in command palette, add the following to ",(0,o.kt)("inlineCode",{parentName:"p"},"contributes.menus.commandPalette")," section in package.json:"),(0,o.kt)("p",{parentName:"li"},"Show command in command palette\n(use ",(0,o.kt)("inlineCode",{parentName:"p"},'"when": "!dbux.context.activated"')," instead if you want show it before dbux has been activated)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "commantPalette": [\n    {\n      "command": "<COMMAND_ID>",\n      "when": "dbux.context.activated"\n    }\n  ]\n}\n')),(0,o.kt)("p",{parentName:"li"},"Hide command from command palette"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "commantPalette": [\n    {\n      "command": "<COMMAND_ID>",\n      "when": "false"\n    }\n  ]\n}\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Finally, configure where the button should be shown(skip this step if you don't want a button):"),(0,o.kt)("p",{parentName:"li"},"To show button in..."),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"navigation bar(upper-right corner), add the following to ",(0,o.kt)("inlineCode",{parentName:"li"},"contributes.menus.editor/title"))),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "editor/title": [\n    {\n      "command": "<COMMAND_ID>",\n      "when": "dbux.context.activated",\n      "group": "navigation"\n    } \n  ] \n}\n')),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"tree view title, add the following to ",(0,o.kt)("inlineCode",{parentName:"li"},"contributes.menus.view/title"),"\n( ",(0,o.kt)("inlineCode",{parentName:"li"},"<VIEW_ID>")," is defined in ",(0,o.kt)("inlineCode",{parentName:"li"},"contributes.views.dbuxViewContainer")," section)")),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "view/title": [\n    {\n      "command": "<COMMAND_ID>",\n      "when": "view == <VIEW_ID>",\n      "group": "navigation"\n    } \n  ] \n}\n')),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"tree view item, add the following to ",(0,o.kt)("inlineCode",{parentName:"li"},"contributes.menus.view/item/context"),"\n( ",(0,o.kt)("inlineCode",{parentName:"li"},"<VIEW_ID>")," is defined in ",(0,o.kt)("inlineCode",{parentName:"li"},"contributes.views.dbuxViewContainer")," section and ",(0,o.kt)("inlineCode",{parentName:"li"},"<NODE_CONTEXT_ID>")," is defined programmatically in ",(0,o.kt)("inlineCode",{parentName:"li"},"TreeItem.contextValue")," )")),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "view/item/context": [\n    {\n      "command": "<COMMAND_ID>",\n      "when": "view == <VIEW_ID> && viewItem == <NODE_CONTEXT_ID>",\n      "group": "inline"\n    }\n  ]\n}\n')),(0,o.kt)("p",{parentName:"li"},"NOTES:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"You can sort buttons by adding suffix ",(0,o.kt)("inlineCode",{parentName:"li"},"@<number>")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"group")," property. e.g. ",(0,o.kt)("inlineCode",{parentName:"li"},'"group": "inline@5"')),(0,o.kt)("li",{parentName:"ul"},"If you remove ",(0,o.kt)("inlineCode",{parentName:"li"},'"group": "navigation"')," , the button will be listed in a dropdown menu, see ",(0,o.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/api/references/contribution-points#Sorting-of-groups"},"Sorting of groups")," for more information"),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("inlineCode",{parentName:"li"},"when")," property defines when should the button be visible, see ",(0,o.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts"},"'when' clause contexts")," for more available condition")))),(0,o.kt)("p",null,"TODO: more to be said here in the future (consider ",(0,o.kt)("a",{parentName:"p",href:"https://gist.github.com/PurpleBooth/b24679402957c63ec426"},"https://gist.github.com/PurpleBooth/b24679402957c63ec426"),")"))}k.isMDXComponent=!0},4184:function(e,n){var t;!function(){"use strict";var i={}.hasOwnProperty;function a(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var o=typeof t;if("string"===o||"number"===o)e.push(t);else if(Array.isArray(t)){if(t.length){var r=a.apply(null,t);r&&e.push(r)}}else if("object"===o)if(t.toString===Object.prototype.toString)for(var l in t)i.call(t,l)&&t[l]&&e.push(l);else e.push(t.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(t=function(){return a}.apply(n,[]))||(e.exports=t)}()},2705:function(e,n,t){var i=t(5639).Symbol;e.exports=i},4239:function(e,n,t){var i=t(2705),a=t(9607),o=t(2333),r=i?i.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":r&&r in Object(e)?a(e):o(e)}},1957:function(e,n,t){var i="object"==typeof t.g&&t.g&&t.g.Object===Object&&t.g;e.exports=i},9607:function(e,n,t){var i=t(2705),a=Object.prototype,o=a.hasOwnProperty,r=a.toString,l=i?i.toStringTag:void 0;e.exports=function(e){var n=o.call(e,l),t=e[l];try{e[l]=void 0;var i=!0}catch(d){}var a=r.call(e);return i&&(n?e[l]=t:delete e[l]),a}},2333:function(e){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},5639:function(e,n,t){var i=t(1957),a="object"==typeof self&&self&&self.Object===Object&&self,o=i||a||Function("return this")();e.exports=o},1469:function(e){var n=Array.isArray;e.exports=n},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,n,t){var i=t(4239),a=t(1469),o=t(7005);e.exports=function(e){return"string"==typeof e||!a(e)&&o(e)&&"[object String]"==i(e)}}}]);