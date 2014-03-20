---
layout: post
title: Responsive images with BBC Imager
---

I've not used the [full spectrum](https://docs.google.com/spreadsheet/ccc?key=0Al0lI17fOl9DdDgxTFVoRzFpV3VCdHk2NTBmdVI2OXc#gid=0) of responsive image solutions available, but [BBC Imager](https://github.com/BBC-News/Imager.js/) (not even mentioned in that spreadsheet) is pretty rad. Resize your browser to see it in action.

<div>
  <div class="delayed-image-load" data-src="/public/assets/images/140319/{width}/blinky{pixel_ratio}.png" data-alt="PacMan ghost"></div>
</div>

<script>
  new Imager({ availableWidths: [200, 400, 600, 800], availablePixelRatios: [1, 2] });
</script>

##Markup

To get it working, you add an element with a class of `delayed-image-load`, that has a `data-src` attribute containing a path to your image. Imager gives you a `{width}` placeholder, the value of which gets swapped out with the closest (upper) size in the `availableWidths` array you provide (shown below). You can then use this `{width}` value to reference the directories in which you store different sizes of the same responsive image.

{% highlight html %}
<div>
  <div class="delayed-image-load" data-src="path/to/images/{width}/test.png" data-alt="alternative text"></div>
</div>
{% endhighlight %}

##JS

Create an `Imager` object, and populate its `availableWidths` property with an array of widths of the images you have.

{% highlight html %}
<script>
  new Imager({ availableWidths: [200, 400, 600, 800] });
</script>
{% endhighlight %}

##Retina

You can optionally add an array of pixel-density ratios, too, in order to reference paths to images to be displayed on higher pixel-density screens:

{% highlight html %}
<script>
  new Imager({ availableWidths: [200, 400, 600, 800], availablePixelRatios: [1, 2] });
</script>
{% endhighlight %}

Imager gives you a `{pixel_ratio}` placeholder to deal with handling assets for high pixel-density screens. If you have an image that should be displayed at 100px wide, called `test.png`, you can save out a 'retina' version of that image, 200px across, called `test-2x.png` in the same directory. Then, use `data-src="path/to/images/{width}/test{pixel_ratio}.png"` in your markup, and Imager will select the correct version, depending on the screen being used (`{pixel_ratio}` doesn't output anything for screens with 1:1 pixel-density ratios).

By taking advantage of this, the blue dude above will have black eyes on a regular pixel-density screen, but yellow eyes on a 'retina' screen. Woo.