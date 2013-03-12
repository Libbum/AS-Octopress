---
layout: post
title: "Intricacies of the pushState"
date: 2013-03-12 19:06
comments: true
categories: HTML5 Ajax jQuery 
---

Octopress generates a static site, and most of it doesn't change from page to page (for example my     header, footer, navigation and sidebar don't differ); thus to me it seems the natural thing to only    load __new__ content on each mouse click. 

Ajax has been around for many years, but there's still a major amount of hacking needed to really      support a website that uses it. My current gripe with [Disqus](http://www.disqus.com) is that they     removed (well, "have not yet implimented") Ajax support in their 2012 version - making a full Ajax     solution impossible presently if one wants the Disqus commenting system.

One thing that is moving along though is HTML5's \`history' capability: no longer are we only capable  of sending someone back a page; we can now tell the browser where we are (even though we're not really there)...

[Talk about pop/pushState() etc using http://html5.gingerhost.com/ if you can get it to work.]
