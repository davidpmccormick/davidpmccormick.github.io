---
layout: post
title: Better link underlining
---

<p class="lead">By setting the CSS property, <code>text-decoration</code>, to <code>underline</code> on a text element, you will reliably get that element underlined in some way. The problem is that you have very little control over properties of this underline; you're stuck with the width and position of line that the browser deems appropriate, and the colour of the line will necessarilly be the colour of the text element itself.</p>

Marchin Wichary recently wrote up [the technique that Medium use](https://medium.com/p/7c03a9274f9) to circumvent these problems on their platform.

The post outlines six options:

1. Live with the `text-decoration: underline` property as it is
2. Use advanced underline CSS properties
3. Use `border-bottom`/`box-shadow` at the bottom
4. Use a bespoke underlined font
5. Drawing with `<canvas>`
6. Use `background-image`s with gradients

Ultimately, using `background-image` in conjunction with linear-gradients, they were able to achieve their desired effect (with the exception of being able to have the underline clear the type's descenders).

Here's a Sass (with Compass) mixin to press this technique into service:

{% highlight scss %}
@mixin underline($colour:$themecolour, $line-offset:1, $line-size:0.1) {
  background-repeat: repeat-x;
  background-size: #{$line-size}em #{$line-size}em;
  background-position: 0 #{$line-offset}em;
  text-decoration: none;
  @include background-image(linear-gradient(top, transparent 50%, $colour 50%));

  .lt-ie10 & { // because old IE can't handle it
    background: none;
    text-decoration: underline;
  }
}
{% endhighlight %}

<small>Note: the `.lt-ie10` declaration works with <a href="http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/">Paul Irish's html conditional classes trick</a>.</small>

This gives the underline a default colour (`$themecolour`), which can be overridden in the mixin's first argument:
{% highlight scss %}
a:hover {
  @include underline(#aa0000);
}
{% endhighlight }

By using ems instead of pixels, we can keep the background position of the line reliably positioned beneath the text without having to know the pixel value for `font-size`. The correct `$line-offset` value will vary from typeface to typeface, but 1 em should be in the right area.

--------

##Animating
As I've mentioned here previously, [browsers can't transition the background-image property](/2014/02/11/transition-linear-gradients), which means that it isn't straightforward to have the underline fade in, but if that's what you're after, here's a massively hacky solution (which requires the use of [this Compass animation plugin](https://github.com/ericam/compass-animation):

{% highlight scss %}
@include keyframes(fadeline) {
  // count up from -100 to 0, then use abs() to hack counting down
  @for $i from -100 through 0 {
    // use * 1% instead of #{$i}%, so Sass doesn't expect a placeholder class and break
    #{($i+100) * 1%} { @include background-image(linear-gradient(top, transparent 50%, transparentize($themecolour, (abs($i)/100)) 50%)); }
  }
}
{% endhighlight %}

This creates 100 keyframes, each with an underline slightly reduced in `$themecolour` transparency, using Sass's `transparentize()` function.

With this in place, you can add `@include animation(fadeline);` (a mixin from the Compass animation plugin) to the `underline()` mixin above and have the underline fade in (but not fade out, unfortunately).

{% highlight scss %}
@mixin underline($colour:$themecolour, $line-offset:1, $line-size:0.1) {
  background-repeat: repeat-x;
  background-size: #{$line-size}em #{$line-size}em;
  background-position: 0 #{$line-offset}em;
  text-decoration: none;
  @include animation(fadeline);
  // keep the background-image in here directly for browsers that don't animate
  @include background-image(linear-gradient(top, transparent 50%, $colour 50%));

  .lt-ie10 & { // because old IE can't handle it
    background: none;
    text-decoration: underline;
  }
}
{% endhighlight %}

I probably wouldn't recommend this, though; that `keyframes()` mixin will add > 2000 lines of CSS to your stylesheet(!) &ndash; arguably not *quite* worth it just to fade in some underlines. Of course, it doesn't need 100 steps (if you wanted to fade it in for e.g. 0.3 seconds, you could use 8 steps to keep the fade perceptually smooth with a frame-rate of c. 25fps), but still, it would be hard to argue that it's worthwhile from a performance stand-point. Furthermore, I couldn't get it working in anything other than Chrome and Safari.

Final considerations (not problems when you're using `text-decoration: underline`) are that the `underline()` mixin will only work when applied to elements that are `display: inline` and that any padding or margins should be applied to a parent container rather than to the element itself.

Links on this blog are now rockin' Medium's technique. Thanks, Medium.