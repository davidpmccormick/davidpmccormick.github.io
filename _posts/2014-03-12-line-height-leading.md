---
layout: post
title: Line-height and leading
---

Designers favour the concept of leading to describe the desired spacing between two lines of text. Leading (Photoshop's version of it, at least) is the amount of space between the baselines of two lines of text.

CSS, on the other hand, uses line-height. Line-height is the amount of space between the top and bottom of a line within which text is vertically centered.

CSS line-height can accept units, but in order to allow type to scale well, it's advisable to keep it unitless. Without units, the line-height property describes the scale of the line relative to the font-size property. So, with a font-size of 16px and a line-height of 1, the computed line-height will be 16px. And with a font-size of 16px and a line-height of 1.5, the computed line-height will be 24px.

Given a font-size and a leading value, we can convert a design's leading to a line-height with a mixin:

{% highlight scss %}
@mixin line-height($fontsize, $leading) {
  line-height: ($leading/$fontsize);
}
{% endhighlight %}

This will give us a unitless line-height that will be equivalent to the correct amount of pixels between two lines as described by the leading value in the design.

A problem remains, though. Each line of text styled with CSS sits vertically centred within that line. So half of the difference between the line-height and the font-size &ndash; (line-height - font-size)/2 &ndash; sits above and below each line. As a result, if the line-height is larger than 1, the first line of text will be shifted down by this extra space.

Another mixin can kill of this pesky space with some negative top margin:

{% highlight scss %}
@mixin font-size-and-leading($fontsize, $leading) {
  font-size: #{$fontsize}px;;
  $leadingcompensation: ($leading - $fontsize)/2;
  $topmargin: -($leadingcompensation);
  margin-top: #{$topmargin}px;
  @include line-height($fontsize, $leading);
}{% endhighlight %}

And with that, you can always be confident where each line begins and how much space there is between two baselines.