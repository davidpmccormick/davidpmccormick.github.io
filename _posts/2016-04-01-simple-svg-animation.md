---
layout: post
title: Simple SVG line animation
---

<style>
.shape {
  width: 100%;
}

.shape__path {
  fill: transparent;
  stroke: hotpink;
  stroke-width: .1;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: spiral 3s ease-in-out alternate infinite;
}

@keyframes spiral {
  from {
    stroke-dashoffset: 30;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

<p class="lead">A fairly straightforward way to animate an SVG shape involves manipulating its <code>stroke-dasharray</code> and <code>stroke-dashoffset</code> properties.</p>

SVG shapes with a defined stroke can have that stroke segmented into equal-length dashed parts using the `stroke-dasharray` CSS property.

We start by making a 'dash' that covers the total length of the shape (so it appears as a solid line, rather than a dash). Then we offset that by the shape's total length, using the `stroke-dashoffset` property. This has the effect of pushing the filled dash out of the viewable space, rendering the empty segment (of equal length) instead. Nothing is visible at this point.

Finally, we can use CSS animation to alter the `stroke-dashoffset` property back to `0`, which creates the impression that the stroke is drawing itself on the screen.

{% highlight SCSS %}
.shape__path {
  fill: transparent;
  stroke: hotpink;
  stroke-width: .1;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: spiral 3s ease-in-out alternate infinite;
}

@keyframes spiral {
  from {
    stroke-dashoffset: 30;
  }
  to {
    stroke-dashoffset: 0;
  }
}
{% endhighlight %}

<svg class="shape" xmlns="http://www.w3.org/2000/svg"
	version="1.0"
	viewBox="-3 -2.75 6.5 6">
<path	class="shape__path" style=""
	d="
	M 0 0
	C 0.043 0 0.082 -0.035 0.088 -0.088
	C 0.095 -0.145 0.064 -0.209 0 -0.25
	C -0.07 -0.295 -0.169 -0.304 -0.265 -0.265
	C -0.371 -0.222 -0.459 -0.127 -0.5 0
	C -0.544 0.139 -0.526 0.3 -0.442 0.442
	C -0.351 0.595 -0.192 0.709 0 0.75
	C 0.206 0.794 0.431 0.749 0.619 0.619
	C 0.819 0.48 0.959 0.258 1 0
	C 1.043 -0.273 0.972 -0.561 0.795 -0.795
	C 0.61 -1.043 0.324 -1.209 0 -1.25
	C -0.339 -1.293 -0.691 -1.195 -0.972 -0.972
	C -1.266 -0.739 -1.459 -0.390 -1.5 0
	C -1.543 0.406 -1.419 0.821 -1.149 1.149
	C -0.869 1.49 -0.456 1.709 0 1.75
	C 0.472 1.793 0.95 1.642 1.326 1.326
	C 1.713 0.999 1.958 0.522 2 0
	C 2.043 -0.538 1.866 -1.08 1.503 -1.503
	C 1.129 -1.937 0.589 -2.208 0 -2.25
	C -0.605 -2.293 -1.21 -2.09 -1.679 -1.679
	C -2.161 -1.259 -2.458 -0.655 -2.5 0
	C -2.543 0.671 -2.313 1.34 -1.856 1.856
	C -1.388 2.384 -0.721 2.708 0 2.75
	C 0.737 2.793 1.47 2.537 2.033 2.033
	C 2.608 1.518 2.958 0.788 3 0"/>
</svg>

[Manipulating the offset on scroll is fun, too](http://output.jsbin.com/boyevi/34).