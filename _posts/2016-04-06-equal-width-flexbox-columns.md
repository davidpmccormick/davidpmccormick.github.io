---
layout: post
title: Always equal flexbox columns
---

<p class="lead">Assigning equal <code>flex-grow</code> values to flex-items will ensure those items are of equal width up to the point that their inner text content is larger than that width.</p>

It's pretty easy to get an [equal-width column grid layout going using flexbox](http://output.jsbin.com/ziyetaf):

{% highlight html %}
<div class="flex-container">
  <div class="flex-item"></div>
  <div class="flex-item"></div>
  <div class="flex-item"></div>
</div>
{% endhighlight %}

{% highlight scss %}
.flex-container {
  display: flex;
}

.flex-item {
  flex: 1;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
}
{% endhighlight %}

However, the preferred width of a flex-item containing text seems to be the text without line breaks, so one long word can [ruin your whole day](http://output.jsbin.com/holahaz).

To prevent this from happening, [just add `width: 0` to the flex-items](http://output.jsbin.com/muyiwi). It's then obviously up to you to handle how the text should flow, but at least the layout behaves consistently.

