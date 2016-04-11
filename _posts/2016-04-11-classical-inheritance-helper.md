---
layout: post
title: A classical JavaScript inheritance helper
---

<p class="lead">Setting up inheritance in JavaScript, you have to do a couple of not-particularly-intuitive steps with the prototype.</p>

I'ma add this guy to my TextExpander snippets:

{% highlight js %}
// Extend the Function object to simplify inheritance
Function.prototype.inheritsFrom = function(parentClass) {
  this.prototype = new parentClass();
  this.prototype.constructor = this;

  // Add a friendly name for the parent class
  this.prototype._super = parentClass.prototype;

  return this;
};
{% endhighlight %}

You have to remember to call this method directly after the constructor, before you do anything else with the extending object's prototype.
