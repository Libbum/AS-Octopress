---
layout: post
title: "Octopress and jQuery"
date: 2013-03-11 11:45
comments: true
categories: Octopress 
---

In the process of theming [Axiomatic Semantics](http://axiomatic.neophilus.net), I came across a virtually undocumented (in the Octopress sphere) caveat when including jQuery elements. A number of javascript functions in the Octopress source use `$` as a variable. This is not uncommon; although `jQuery` aliases to `$` - which causes some confusion in the processing of Octopress' functions. My issue was the GitHub aside constantly being stuck at the _Status Updating..._ phase. I assume the twitter aside would also be affected by this as well, but I don't use it. 

The fix is quite simple:

{% codeblock lang:javascript %}
$.noConflict()
{% endcodeblock %}

will return control of `$` back to Octopress as old references of `$` are saved during jQuery initialization; `noConflict()` simply restores them for use again. You can read more about it in the [jQuery documentation](http://api.jquery.com/jQuery.noConflict/).

__Note:__ This is not to be confused with the _Status Updating..._ bug that was rectified in Octopress 2.1 when GitHub updated their API to v3. If you're using an older Octopress version, a `rake update_source` should take care of that problem.
