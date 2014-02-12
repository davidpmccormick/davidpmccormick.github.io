---
layout: post
title: Transitioning background-image gradients
---

It turns out that you can't transition the CSS background-image property between two gradients. A simple workaraound is to set a background-image gradient as a semi-transparent mask, and transition the `background-color` property instead.

Using sass, this looks something like:

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
    background-color: darken(#ccc, -10%);

    &:hover {
      background-color: lighten(#ccc, 10%);
    }
  }
{% endhighlight %}
