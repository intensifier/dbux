"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[53],{1109:function(e){e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Dbux: What and Why?","href":"/dbux/","docId":"why-dbux"},{"type":"category","label":"Runtime Analysis","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Overview","href":"/dbux/runtime-analysis","docId":"runtime-analysis/dbux-overview"},{"type":"link","label":"Installation","href":"/dbux/runtime-analysis/installation","docId":"runtime-analysis/installation"},{"type":"link","label":"Enable Dbux","href":"/dbux/runtime-analysis/enable-dbux","docId":"runtime-analysis/enable-dbux"},{"type":"link","label":"The Run Button","href":"/dbux/runtime-analysis/the-run-button","className":"run-button","docId":"runtime-analysis/the-run-button"},{"type":"link","label":"Code Decorations","href":"/dbux/runtime-analysis/code-decorations","className":"sidebar-code-decorations","docId":"runtime-analysis/code-decorations"},{"type":"link","label":"Select Trace","href":"/dbux/runtime-analysis/select-trace","className":"sidebar-select-trace","docId":"runtime-analysis/select-trace"},{"type":"link","label":"Application View","href":"/dbux/runtime-analysis/applications","docId":"runtime-analysis/applications"},{"type":"link","label":"Global View","href":"/dbux/runtime-analysis/global","docId":"runtime-analysis/global"},{"type":"link","label":"Call Graph","href":"/dbux/runtime-analysis/call-graph","className":"sidebar-call-graph","docId":"runtime-analysis/call-graph"},{"type":"link","label":"Asynchronous Call Graph","href":"/dbux/acg","className":"sidebar-call-graph","docId":"runtime-analysis/asynchronous-call-graph"},{"type":"link","label":"Trace Details View","href":"/dbux/runtime-analysis/trace-details","docId":"runtime-analysis/trace-details"},{"type":"link","label":"Search","href":"/dbux/runtime-analysis/search","className":"sidebar-search","docId":"runtime-analysis/search"},{"type":"link","label":"Data Flow View","href":"/dbux/runtime-analysis/data-flow","docId":"runtime-analysis/data-flow"}]},{"type":"category","label":"Dbux Practice + Tutorials","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Introduction","href":"/dbux/dbux-practice/","docId":"dbux-practice/overview"},{"type":"link","label":"Tutorial","href":"/dbux/dbux-practice/tutorial","docId":"dbux-practice/tutorial"}]},{"type":"category","label":"Guides","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Runtime Trace Filtering","href":"/dbux/guides/runtime-trace-filtering","docId":"guides/runtime-trace-filtering"},{"type":"link","label":"Performance","href":"/dbux/guides/performance","docId":"guides/performance"},{"type":"link","label":"Build Pipeline Integration","href":"/dbux/guides/build-pipeline-integration","docId":"guides/build-pipeline-integration"}]},{"type":"category","label":"Tools and Configuration","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Tools and Configuration Overview","href":"/dbux/tools-and-configuration","docId":"tools-and-configuration/overview"},{"type":"link","label":"Dbux VSCode Extension","href":"/dbux/tools-and-configuration/dbux-code","docId":"tools-and-configuration/dbux-code"},{"type":"link","label":"Dbux CLI","href":"/dbux/tools-and-configuration/dbux-cli","docId":"tools-and-configuration/dbux-cli"},{"type":"link","label":"Dbux Babel Plugin","href":"/dbux/tools-and-configuration/dbux-babel-plugin","docId":"tools-and-configuration/dbux-babel-plugin"},{"type":"link","label":"Dbux Runtime","href":"/dbux/tools-and-configuration/dbux-runtime","docId":"tools-and-configuration/dbux-runtime"}]},{"type":"category","label":"Advanced","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Known Limitations and Future Work","href":"/dbux/advanced/future-work","docId":"advanced/future-work"},{"type":"link","label":"Contributing","href":"/dbux/advanced/contributing","docId":"advanced/contributing"},{"type":"link","label":"Terminology","href":"/dbux/advanced/terminology","docId":"advanced/terminology"},{"type":"link","label":"Dbux Data Analysis","href":"/dbux/advanced/data-analysis","docId":"advanced/data-analysis"},{"type":"link","label":"Who is Using Dbux?","href":"/dbux/advanced/dbux-uses","docId":"advanced/dbux-uses"}]},{"type":"category","label":"Background","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Background and Related Work","href":"/dbux/background/","docId":"background/overview"},{"type":"link","label":"Debugging","href":"/dbux/background/debugging","docId":"background/debugging"}]},{"type":"link","label":"FAQ","href":"/dbux/faq","docId":"faq"}]},"docs":{"advanced/contributing":{"id":"advanced/contributing","title":"Contributing","description":"Code of Conduct","sidebar":"tutorialSidebar"},"advanced/data-analysis":{"id":"advanced/data-analysis","title":"Dbux Data Analysis","description":"Dbux provides several tools for manual data analysis. However, this page explains how to use advanced data analysis tools and techniques.","sidebar":"tutorialSidebar"},"advanced/dbux-uses":{"id":"advanced/dbux-uses","title":"Who is Using Dbux?","description":"List:","sidebar":"tutorialSidebar"},"advanced/future-work":{"id":"advanced/future-work","title":"Known Limitations and Future Work","description":"Syntax Limitations","sidebar":"tutorialSidebar"},"advanced/terminology":{"id":"advanced/terminology","title":"Terminology","description":"This page lists some of Dbux\'s own terminology. More relevant background information can be found in the Background and Related Work chapter.","sidebar":"tutorialSidebar"},"background/debugging":{"id":"background/debugging","title":"Debugging","description":"Debugging, Debuggers and Dbux","sidebar":"tutorialSidebar"},"background/overview":{"id":"background/overview","title":"Background and Related Work","description":"This chapter establishes background, related work and technical terms to help explain where Dbux is coming from.","sidebar":"tutorialSidebar"},"dbux-practice/overview":{"id":"dbux-practice/overview","title":"Introduction","description":"Why?","sidebar":"tutorialSidebar"},"dbux-practice/tutorial":{"id":"dbux-practice/tutorial","title":"Tutorial","description":"We have prepared a first set of slides to guide you through some \\"Dbux Practice\\" exercises: Tutorial Slides.","sidebar":"tutorialSidebar"},"faq":{"id":"faq","title":"FAQ","description":"Why don\'t My Applications Show Up?","sidebar":"tutorialSidebar"},"guides/build-pipeline-integration":{"id":"guides/build-pipeline-integration","title":"Build Pipeline Integration","description":"As explained in the \\"Runtime Analysis\\" chapter you need to \\"babel your program\\" with @dbux/babel-plugin enabled).","sidebar":"tutorialSidebar"},"guides/performance":{"id":"guides/performance","title":"Performance","description":"There are many performance considerations in tracing and recording all activity of a program.","sidebar":"tutorialSidebar"},"guides/runtime-trace-filtering":{"id":"guides/runtime-trace-filtering","title":"Runtime Trace Filtering","description":"This article explains how Dbux determines which files and lines of code to trace.","sidebar":"tutorialSidebar"},"runtime-analysis/applications":{"id":"runtime-analysis/applications","title":"Application View","description":"This view lists all recorded applications. Applications of the same entry point are grouped together:","sidebar":"tutorialSidebar"},"runtime-analysis/asynchronous-call-graph":{"id":"runtime-analysis/asynchronous-call-graph","title":"Asynchronous Call Graph","description":"\\"Asynchronous Programming be like...\\"","sidebar":"tutorialSidebar"},"runtime-analysis/call-graph":{"id":"runtime-analysis/call-graph","title":"Call Graph","description":"The call graph serves as a \\"map of your runtime execution\\": it provides a bird\'s eye overview of all file and function executions.","sidebar":"tutorialSidebar"},"runtime-analysis/code-decorations":{"id":"runtime-analysis/code-decorations","title":"Code Decorations","description":"After executing an application with Dbux enabled, all executed code is decorated with \u21b3 \u21b1 \u21b3 \u0192 etc.","sidebar":"tutorialSidebar"},"runtime-analysis/data-flow":{"id":"runtime-analysis/data-flow","title":"Data Flow View","description":"data-flow}","sidebar":"tutorialSidebar"},"runtime-analysis/dbux-overview":{"id":"runtime-analysis/dbux-overview","title":"Overview","description":"This page introduces Dbux at the high level, while the next few pages explain the \'s runtime analysis features.","sidebar":"tutorialSidebar"},"runtime-analysis/enable-dbux":{"id":"runtime-analysis/enable-dbux","title":"Enable Dbux","description":"\x3c!-- import TOC from \'@src/components/TOC\';","sidebar":"tutorialSidebar"},"runtime-analysis/global":{"id":"runtime-analysis/global","title":"Global View","description":"The Global View allows quickly navigating global events and their data, including:","sidebar":"tutorialSidebar"},"runtime-analysis/installation":{"id":"runtime-analysis/installation","title":"Installation","description":"1. Install the Dbux VSCode Extension from the VSCode Marketplace.","sidebar":"tutorialSidebar"},"runtime-analysis/search":{"id":"runtime-analysis/search","title":"Search","description":"* TODO: search UI","sidebar":"tutorialSidebar"},"runtime-analysis/select-trace":{"id":"runtime-analysis/select-trace","title":"Select Trace","description":"You can investigate a trace record (short","sidebar":"tutorialSidebar"},"runtime-analysis/the-run-button":{"id":"runtime-analysis/the-run-button","title":"The Run Button","description":"The Run Button  allows the user to easily run a simple Node application with Dbux enabled.","sidebar":"tutorialSidebar"},"runtime-analysis/trace-details":{"id":"runtime-analysis/trace-details","title":"Trace Details View","description":"trace-details}","sidebar":"tutorialSidebar"},"tools-and-configuration/dbux-babel-plugin":{"id":"tools-and-configuration/dbux-babel-plugin","title":"Dbux Babel Plugin","description":"&#8203; instruments JavaScript applications and injects the @dbux/runtime.","sidebar":"tutorialSidebar"},"tools-and-configuration/dbux-cli":{"id":"tools-and-configuration/dbux-cli","title":"Dbux CLI","description":"is a tool for easily running Node applications with Dbux enabled.","sidebar":"tutorialSidebar"},"tools-and-configuration/dbux-code":{"id":"tools-and-configuration/dbux-code","title":"Dbux VSCode Extension","description":"The Dbux VSCode Extension is available on the VSCode Marketplace. It is currently the only GUI implementation for Dbux.","sidebar":"tutorialSidebar"},"tools-and-configuration/dbux-runtime":{"id":"tools-and-configuration/dbux-runtime","title":"Dbux Runtime","description":"is injected by the  in order to record a JavaScript application\'s runtime trace log.","sidebar":"tutorialSidebar"},"tools-and-configuration/overview":{"id":"tools-and-configuration/overview","title":"Tools and Configuration Overview","description":"The Dbux Overview explains Dbux\'s tools and architecture at the higher level.","sidebar":"tutorialSidebar"},"why-dbux":{"id":"why-dbux","title":"Dbux: What and Why?","description":"Dbux is an integrated debugging environment (IDbE) and omniscient debugger for JavaScript runtime analysis. We hope to help developers (i) improve program comprehension and (ii) increase debugging efficiency. To that end, Dbux records an application\'s runtime data, visualizes it and makes it interactive.","sidebar":"tutorialSidebar"}}}')}}]);