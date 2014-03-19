---
layout: post
title: Responsive images with BBC Imager
---

I've not used the [full spectrum](https://docs.google.com/spreadsheet/ccc?key=0Al0lI17fOl9DdDgxTFVoRzFpV3VCdHk2NTBmdVI2OXc#gid=0) of responsive image solutions available, but [BBC Imager](https://github.com/BBC-News/Imager.js/) is pretty rad. Resize your browser to see it in action.

<div>
  <div class="delayed-image-load" data-src="http://placehold.it/{width}" data-alt="alternative text"></div>
</div>

<script>
  new Imager({ availableWidths: [200, 400, 600, 800, 1000] });
</script>

Add an element with a `delayed-image-load` class, that has a `data-src` attribute containing a path to the image. Imager gives you a `{width}` placeholder, the value of which will be swapped out with the closest upper size available in the `availableWidths` array.

{% highlight html %}
<div>
  <div class="delayed-image-load" data-src="http://placehold.it/{width}" data-alt="alternative text"></div>
</div>
{% endhighlight %}

Then create a new `Imager` object, and populate its `availableWidths` property with an array of widths of the images you have available.

{% highlight html %}
<script>
  new Imager({ availableWidths: [200, 400, 600, 800, 1000] });
</script>
{% endhighlight %}

You can optionally add an array of pixel-density ratios, too, in order to reference paths to images on higher density screens:

{% highlight html %}
<script>
  new Imager({ availableWidths: [200, 400, 600, 800, 1000], availablePixelRatios: [1, 2] });
</script>
{% endhighlight %}

For this, Imager gives you a `{pixel_ratio}` placeholder that, for the above example, would output `-2x` if a screen with a pixel-density ratio of 2:1 or higher was in use.

So, if you have an image that should be displayed at 100px wide, called `test.png`, you can save out a 'retina' version of that image, 200px across, called `test-2x.png` in the same directory. Then, use `data-src="path/to/image/test{pixel_ratio}.png"` in your markup, and Imager will select the correct version, depending on the screen being used (`{pixel_ratio}` doesn't output anything for screens with 1:1 pixel-density ratios).