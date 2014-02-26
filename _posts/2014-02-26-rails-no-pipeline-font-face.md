---
layout: post
title: font-face without the asset-pipeline
---

When you're splitting up with the Rails asset pipeline and you can't figure out why your @font-face fonts aren't loading (or even 404-ing), check that you've removed the 'font' argument when you change `asset-url` to `url`.

{% highlight scss %}
@font-face {
  font-family: 'sickfontyo';
    src: asset-url('sickfontyo.eot?#iefix', 'font');
    src: asset-url('sickfontyo.eot?#iefix', 'font') format('eot'),
          asset-url('sickfontyo.woff') format('woff', 'font'),
          asset-url('sickfontyo.ttf', 'font') format('truetype'),
          asset-url('sickfontyo.svg#xxx-xxx-xxx', 'font') format('svg');
}
{% endhighlight %}

becomes

{% highlight scss %}
@font-face {
  font-family: 'sickfontyo';
    src: url('sickfontyo.eot?#iefix');
    src: url('sickfontyo.eot?#iefix') format('eot'),
          url('sickfontyo.woff') format('woff'),
          url('sickfontyo.ttf') format('truetype'),
          url('sickfontyo.svg#xxx-xxx-xxx') format('svg');
}
{% endhighlight %}

Probably should have taken me less than two hours to figure that out.