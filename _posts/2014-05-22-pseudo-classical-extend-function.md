---
layout: post
title: Pseudo-classical JavaScript inheritance by way of an extend function
---

This `extend` function, lifted from [*Pro JavaScript Design Patterns*](http://jsdesignpatterns.com/), very nearly makes complete sense to me <small>(after the c. 60th reading)</small>.

Progress!

{% highlight JS %}

function extend(subClass, superClass) {
  // Empty object constructor, F
  var F = function() {};

  // Make F's prototype equal to the superClass's prototype.
  // Using an intermediary object like this, you don't have to
  // instantiate the superClass itself, so you don't have to
  // keep any unnecessary properties in memory, or risk
  // performing any class level methods (e.g. incrementing a
  // total object counter) at an inappropriate time.
  F.prototype = superClass.prototype;

  // Instantiate F, to provide the subClass with the
  // superClass's prototype.
  subClass.prototype = new F();

  // Reset the subClass prototype constructor that gets wiped out
  // in the previous step.
  subClass.prototype.constructor = subClass;

  // Provide straightforward way to call the superClass's methods
  // from the subClass.
  subClass.superclass = superClass.prototype;

  // Make sure the constructor attribute is set correctly on the
  // superClass, even if the superClass is `Object`
  if(superClass.prototype.constructor === Object.prototype.constructor) {
    superClass.prototype.constructor = superclass;
  }
}

{% endhighlight %}
