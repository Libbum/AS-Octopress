---
layout: post
title: "Using datatool and TikZ to generate figures from data"
date: 2013-03-16 15:21
comments: true
categories: Latex TikZ 
---

If you're not already using [PGF and TikZ](http://sourceforge.net/projects/pgf/) for figures in your $\LaTeX$ documents, I suggest you take a few evenings and get acquainted with a number of [examples](http://texample.net/tikz/), so you can grasp the magnitude of its' capability - you certainly won't be disappointed.

Building static diagrams and graphs (adding [PGFPlots](http://pgfplots.sourceforge.net/) into the mix) is fine, but I find myself constantly wanting decent plots from real data, that don't fit the usual line/surface paradigm. The [datatool](http://www.ctan.org/pkg/datatool) package is perfect for this kind of work.

Something I'm working on currently is the classification of voids in amorphous solids, voronoi networks seem to be a great way of expressing the arrangement of atoms in these systems. The following example uses an amorphous aluminium oxide and is represented in 2D so as not to complicate the problem too much. 

To simplify things further, I've separated my input data into three csv files that look something like this:

{% codeblock %}
1,Al,10.331817,36.323166,1.250000
2,Al,5.092404,21.862188,1.250000
3,Al,2.332884,23.765770,1.250000
4,Al,13.550237,30.676344,1.250000
5,Al,0.676694,28.555687,1.250000
6,Al,14.927469,33.200344,1.250000
7,Al,4.266311,33.304264,1.250000
8,Al,7.634949,33.187614,1.250000
...
{% endcodeblock %}

The `datatool` package reads this information in through its _load database_ command `\DTLloaddb`

{% codeblock lang:tex %}
\DTLloaddb[noheader,keys={idx,species,x,y,r}]{data}{data2Dtest.csv}
{% endcodeblock %}

pulling the file into the `data` variable, and assigning `keys` to each column. Now using a `foreach` command to loop over all rows in `data`,

{% codeblock lang:tex %}
\DTLforeach*{data}{\idx=idx, \species=species, \x=x, \y=y, \r=r}
{% endcodeblock %}

I can draw a circle of radius `\r` at position (`\x`,`\y`); as well as color each circle depending on its associated `\species` key [lines 23--30 in the [full code](#code) below].

Two other functions of `datatool` that I use in this example are extremely useful:

{% codeblock lang:tex %}
\DTLcomputebounds{data}{x}{y}{\minX}{\maxX}{\minY}{\maxY}
{% endcodeblock %}

computes the bounds of the (x,y) data, which I use to draw a bounding box;

{% codeblock lang:tex %}
\DTLgetvalueforkey{\oneX}{x}{data}{idx}{\one}
{% endcodeblock %}

grabs the location of `x` from `data` at `idx`, where that index value equals `\one` from another data set. 

If you include all of this with some TikZ trickery, it's fairly simple to generate a number of figures like this incredibly fast with a myriad of different data sets.

{% img center /images/voronoi.png Voronoi Diagram of amorphous aluminium oxide %}

The entire code-set for this project is below. The in-line comments expand on the syntax I outline above and should answer most questions you may have about each functions purpose. 

<a name="code" />

{% include_code voronoi2D.tex lang:tex %}


*[csv]: Comma Separated Value
