---
layout: post
title: "Unveiling some Makefile Black Magic"
date: 2013-03-26 22:33
published: false
comments: true
categories: C++ 
---

Whilst my higher education started off in the Computer Science realm, I quickly became dissolusioned and, excluding a decent temporal shift, moved more into the physical sciences. This gave me an adequate understanding of development life cycles, program design and sufficient compotency in __c++__ to get shit done. When I started heavily coding again, forces shunted me towards __Matlab__ and higher level, quick and dirty rapid prototyping. As we all know; you can only go so far in this world and I've recently found myself back to the depths with __c__, __fortran__ and even a little __assembly__.

Ultimately though, my __c++__ programs never needed to link to external libraries or worry about machine specific configurations; the `-o` switch was the only one I needed when calling `gcc` pretty much. Now I'm building MPI tools to run on supercomputing clusters that need the highly optimised linear algebra routines; written down by our forefathers in a more civilised age. 

I need a Makefile, the file filled with dark arts known only to those with neck beards and ghostly white skin.

[Ash](http://tuxdude.github.com/)

*[MPI]: Message Passing Interface
