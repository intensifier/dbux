"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[246],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return b}});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=i.createContext({}),s=function(e){var n=i.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=s(e.components);return i.createElement(u.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},p=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=s(t),b=r,m=p["".concat(u,".").concat(b)]||p[b]||c[b]||a;return t?i.createElement(m,l(l({ref:n},d),{},{components:t})):i.createElement(m,l({ref:n},d))}));function b(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,l=new Array(a);l[0]=p;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<a;s++)l[s]=t[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,t)}p.displayName="MDXCreateElement"},5002:function(e,n,t){t.d(n,{Z:function(){return s}});var i=t(7462),r=t(3366),a=t(7294),l=t(3616),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function u(e){var n=e.toc,t=e.className,i=e.linkClassName,r=e.isChild;return n.length?a.createElement("ul",{className:r?void 0:t},n.map((function(e){return a.createElement("li",{key:e.id},a.createElement("a",{href:"#"+e.id,className:null!=i?i:void 0,dangerouslySetInnerHTML:{__html:e.value}}),a.createElement(u,{isChild:!0,toc:e.children,className:t,linkClassName:i}))}))):null}function s(e){var n=e.toc,t=e.className,s=void 0===t?"table-of-contents table-of-contents__left-border":t,d=e.linkClassName,c=void 0===d?"table-of-contents__link":d,p=e.linkActiveClassName,b=void 0===p?void 0:p,m=e.minHeadingLevel,f=e.maxHeadingLevel,h=(0,r.Z)(e,o),g=(0,l.LU)(),k=null!=m?m:g.tableOfContents.minHeadingLevel,v=null!=f?f:g.tableOfContents.maxHeadingLevel,x=(0,l.DA)({toc:n,minHeadingLevel:k,maxHeadingLevel:v}),y=(0,a.useMemo)((function(){if(c&&b)return{linkClassName:c,linkActiveClassName:b,minHeadingLevel:k,maxHeadingLevel:v}}),[c,b,k,v]);return(0,l.Si)(y),a.createElement(u,(0,i.Z)({toc:x,className:s,linkClassName:c},h))}},3755:function(e,n,t){t.d(n,{Z:function(){return u}});var i=t(7462),r=t(3366),a=t(7294),l=t(9700),o=["path","children","title"];function u(e){var n=e.path,t=e.children,u=e.title,s=(0,r.Z)(e,o);if(!n)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var d=(0,l.B)(n);t=t||d,u=u||t;var c="https://github.com/Domiii/dbux/tree/master/"+n;return a.createElement("a",(0,i.Z)({title:u,href:c},s),t)}},8640:function(e,n,t){t.d(n,{Z:function(){return u}});var i=t(7294),r="tableOfContentsInline_0DDH",a=t(5002);var l=function(e){var n=e.toc,t=e.minHeadingLevel,l=e.maxHeadingLevel;return i.createElement("div",{className:r},i.createElement(a.Z,{toc:n,minHeadingLevel:t,maxHeadingLevel:l,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function u(e){var n=e.toc;return i.createElement("div",{style:o},i.createElement(l,{toc:n}))}},5479:function(e,n,t){t.d(n,{Z:function(){return s}});var i=t(7462),r=t(3366),a=t(7294),l=t(9700),o=t(8767),u=["name","children","title"];function s(e){var n=e.name,t=e.children,s=e.title,d=(0,r.Z)(e,u);if(null==n||!n.includes)throw new Error('Invalid ToolLink does not have a "name" of type string. - props: '+JSON.stringify(e,null,2));if(n.includes("/"))throw new Error('ToolLink\'s "name" must not be a path. - props: '+JSON.stringify(e,null,2));if(!n)throw new Error('invalid <ToolLink /> missing "name". - props: '+JSON.stringify(e,null,2));var c=(0,l.B)(n);t=t||c,s=s||t;var p=(0,o.Z)()+"tools-and-configuration/"+n;return a.createElement("a",(0,i.Z)({title:s,href:p},d),t)}},8767:function(e,n,t){t.d(n,{Z:function(){return r}});var i=t(2263);function r(){return(0,i.Z)().siteConfig.baseUrl}},9700:function(e,n,t){t.d(n,{B:function(){return r}});var i={"dbux-code":"Dbux VSCode Extension"};function r(e){var n=i[e];return n||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},4771:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return d},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return b},default:function(){return f}});var i=t(7462),r=t(3366),a=(t(7294),t(3905)),l=t(5479),o=t(3755),u=t(8640),s=["components"],d={},c="Build Pipeline Integration",p={unversionedId:"guides/build-pipeline-integration",id:"guides/build-pipeline-integration",title:"Build Pipeline Integration",description:'As explained in the "Runtime Analysis" chapter you need to "babel your program" with @dbux/babel-plugin enabled).',source:"@site/content/guides/03-build-pipeline-integration.mdx",sourceDirName:"guides",slug:"/guides/build-pipeline-integration",permalink:"/dbux/guides/build-pipeline-integration",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/guides/03-build-pipeline-integration.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Performance",permalink:"/dbux/guides/performance"},next:{title:"Tools and Configuration Overview",permalink:"/dbux/tools-and-configuration"}},b=[{value:"Setup",id:"setup",children:[],level:2},{value:"Config",id:"config",children:[],level:2},{value:"Node Applications",id:"node-applications",children:[],level:2},{value:"Webpack",id:"webpack",children:[],level:2},{value:"Rollup",id:"rollup",children:[],level:2},{value:"Storybook",id:"storybook",children:[],level:2},{value:"Create-React-App",id:"create-react-app",children:[],level:2},{value:"Next.js",id:"nextjs",children:[],level:2},{value:"ng",id:"ng",children:[],level:2},{value:"Other Bundlers or Bundler Wrappers",id:"other-bundlers-or-bundler-wrappers",children:[],level:2}],m={toc:b};function f(e){var n=e.components,t=(0,r.Z)(e,s);return(0,a.kt)("wrapper",(0,i.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"build-pipeline-integration"},"Build Pipeline Integration"),(0,a.kt)(u.Z,{toc:b,mdxType:"TOC"}),(0,a.kt)("p",null,"As explained in ",(0,a.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis/enable-dbux"},'the "Runtime Analysis" chapter'),": for Dbux to work, it first needs to record JavaScript application behavior. To that end, your program must be instrumented with ",(0,a.kt)(o.Z,{path:"dbux-babel-plugin",mdxType:"CodeLink"}),' (i.e.: you need to "',(0,a.kt)("a",{parentName:"p",href:"https://babeljs.io/"},"babel"),' your program" with ',(0,a.kt)("inlineCode",{parentName:"p"},"@dbux/babel-plugin")," enabled)."),(0,a.kt)("p",null,"Once running, the injected ",(0,a.kt)("inlineCode",{parentName:"p"},"@dbux/runtime")," will send collected data to the ",(0,a.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code#runtime-server"},"runtime server"),"."),(0,a.kt)("h2",{id:"setup"},"Setup"),(0,a.kt)("p",null,"First ",(0,a.kt)("inlineCode",{parentName:"p"},"npm install")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn add")," the necessary ",(0,a.kt)("inlineCode",{parentName:"p"},"@dbux")," packages to the project you want to trace:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"@dbux/babel-plugin")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"@dbux/runtime"))),(0,a.kt)("p",null,"Alternatively, simply install ",(0,a.kt)(l.Z,{name:"dbux-cli",mdxType:"ToolLink"}),". That will also install the other necessary dependencies."),(0,a.kt)("p",null,"Important: Make sure, that they match the version of ",(0,a.kt)(l.Z,{name:"dbux-code",mdxType:"ToolLink"})," that you installed."),(0,a.kt)("h2",{id:"config"},"Config"),(0,a.kt)("p",null,"You can find configuration options for the different tools in the ",(0,a.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration"},'"Tools and Configuration" chapter'),"."),(0,a.kt)("p",null,"In addition to configuring the individual tools, you want to make sure you ",(0,a.kt)("a",{parentName:"p",href:"/dbux/guides/runtime-trace-filtering"},"configure the module filter to trace the right files"),"."),(0,a.kt)("h2",{id:"node-applications"},"Node Applications"),(0,a.kt)("p",null,"For Node applications that do not need bundling or building, refer to ",(0,a.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-cli"},"the Dbux CLI")," documentation."),(0,a.kt)("h2",{id:"webpack"},"Webpack"),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const shouldInclude = require('@dbux/babel-plugin/dist/include').default;\n\nconst moduleFilterOptions = {\n  packageWhitelist: 'interestingPackage1,@interesting/package2',\n  // packageBlacklist: '',\n  fileBlacklist: '.*bad_file1\\.js,.*/unwanted_dir1/.*'\n};\n\n// ...\n\nmodule.exports = {\n  // ...\n  module: {\n    rules: [\n      // ...\n      {\n        test: /\\.jsx?$/,\n        include: [\n          shouldInclude(moduleFilterOptions)\n        ],\n        use: {\n          loader: 'babel-loader',\n          options: {\n            plugins: [\n              // other plugins, running **after** Dbux...\n              '@dbux/babel-plugin'\n              // other plugins, running **before** Dbux...\n            ]\n          }\n        }\n      }\n    ]\n  }\n};\n")),(0,a.kt)("p",null,"NOTE: We use the (configurable/flexible/complicated) ",(0,a.kt)(o.Z,{path:"dbux-projects/assets/sharedAssets/webpack/dbux.webpack.config.base.js",mdxType:"CodeLink"},"dbux.webpack.config.base.js")," for ",(0,a.kt)("a",{parentName:"p",href:"/dbux/dbux-practice/"},"Dbux Practice")," projects."),(0,a.kt)("h2",{id:"rollup"},"Rollup"),(0,a.kt)("p",null,"TODO: We have not tested this in a while. Need to verify and set it in stone. Test with the previously working ",(0,a.kt)("inlineCode",{parentName:"p"},"Chart.js")," practice exercises (which uses Rollup)."),(0,a.kt)("p",null,"Rollup requires use of ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@rollup/plugin-babel"},"@rollup/plugin-babel"),"."),(0,a.kt)("p",null,"Example - something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const shouldInclude = require('@dbux/common-node/dist/filters/makeInclude').default;\n\nconst moduleFilterOptions = {\n  packageWhitelist: 'interestingPackage1,@interesting/package2',\n  // packageBlacklist: '',\n  fileBlacklist: '.*bad_file1\\.js,.*/unwanted_dir1/.*'\n};\n\nconst config = {\n  ...\n  plugins: [\n    babel({\n      babelHelpers: 'inline',\n      filter: shouldInclude(moduleFilterOptions),\n      /**\n       * WARNING: if not skipped, we saw some serious memory leaks (in 2020), but might already be fixed in 2022.\n       * TODO: we need to test this again.\n       */\n      skipPreflightCheck: true\n    })\n  ]\n};\n")),(0,a.kt)("h2",{id:"storybook"},"Storybook"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"create-react-app"},"Create-React-App"),(0,a.kt)("p",null,"TODO: Clean this up"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"install ",(0,a.kt)("inlineCode",{parentName:"p"},"CRACO")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ yarn add --dev @craco/craco\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Fix ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")," to use ",(0,a.kt)("inlineCode",{parentName:"p"},"craco")," instead of ",(0,a.kt)("inlineCode",{parentName:"p"},"react-scripts"),":"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},'/* package.json */\n\n"scripts": {\n  "start": "craco start",\n  "build": "craco build",\n  "test": "craco test"\n}\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Customize webpack config with ",(0,a.kt)("inlineCode",{parentName:"p"},"CRACO"),":\nExample - something like this:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// craco.config.js\n\nconst { getLoaders, loaderByName } = require('@craco/craco');\n\nconst dbuxOptions = {\n  moduleFilter: {\n    packageWhitelist: '.*',\n    /**\n     * NOTE: these libraries might run before dbux is initialized, so they must be blacklisted.\n     * 1. Some hook themsleves into webpack.\n     * 2. The later ones are polyfills (probably brought in by CRA) and their libraries; loaded when first requiring things,    and before `@dbux/runtime`.\n     */\n    packageBlacklist: 'react-dev-utils,react-refresh,react-error-overlay,process,buffer,isarray,ieee754,base64-js',\n    fileWhitelist: '.*',\n    // we generally do not want to mess with production or webpack code\n    fileBlacklist: '.*production.*,.*[wW]ebpack.*'\n  }\n};\n\nmodule.exports = {\n  webpack: {\n    configure: (webpackConfig, { env, paths }) => {\n      const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName(\"babel-loader\"));\n\n\n      // // TODO: write output files (this won't work, `devServer` does not exit)\n      // webpackConfig.devServer.devMiddleware.writeToDisk = true;\n\n      // // exclude dbux from all rules\n      // const reported = new Set();\n      // webpackConfig.module.rules.forEach(rule => {\n      //   if (rule.exclude && !Array.isArray(rule.exclude)) {\n      //     rule.exclude = [rule.exclude];\n      //   }\n      //   if (!rule.exclude) {\n      //     rule.exclude = [];\n      //   }\n      //   rule.exclude.push((modulePath) => {\n      //     const exclude = modulePath.includes('@dbux');\n      //     if (!reported.has(modulePath)) {\n      //       reported.add(modulePath);\n      //       console.debug(`[WEBPACK]`, modulePath, !exclude);\n      //     }\n      //     return exclude;\n      //   });\n      // });\n\n      // add dbux to loader\n      if (hasFoundAny) {\n        matches.forEach(match => {\n          const babelOptions = match.loader.options;\n          if (!babelOptions.plugins) {\n            babelOptions.plugins = [];\n          }\n          // NOTE: weird bug with a class having public fields (in @dbux/runtime) that Babel complains about\n          babelOptions.plugins.push(['@babel/plugin-proposal-class-properties', { loose: true }]);\n          babelOptions.plugins.push(['@dbux/babel-plugin', dbuxOptions]);\n        });\n        console.debug(`Added @dbux/babel-plugin to babel-loaders.`);\n      }\n      else {\n        throw new Error(`Could not inject Dbux: 'babel-loader' found`);\n      }\n\n      return webpackConfig;\n    }\n  },\n};\n")))),(0,a.kt)("h2",{id:"nextjs"},"Next.js"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"ng"},"ng"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"other-bundlers-or-bundler-wrappers"},"Other Bundlers or Bundler Wrappers"),(0,a.kt)("p",null,"TODO"))}f.isMDXComponent=!0}}]);