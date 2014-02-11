---
layout: post
title: Transitioning CSS3 linear gradients
---

It turns out that you can't transition CSS3 linear-gradients. A simple hack is to have a linear-gradient as a semi-transparent mask, and transition the `background-color` property instead.

Using Compass, this looks something like:

{% highlight scss %}
.btn {
  @include transition(background-color .7s ease);
  @include background-image( // gradient 'mask'
    linear-gradient(
      top,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.1) 30%,
      rgba(0, 0, 0, 0.1) 60%,
      rgba(0, 0, 0, 0.2)
    )
  );

  &.btn-primary {
    background-color: adjust-lightness(#ccc, -10%);

    &:hover {
      background-color: adject-lightness(#ccc, 10%);
    }
  }
{% endhighlight %}