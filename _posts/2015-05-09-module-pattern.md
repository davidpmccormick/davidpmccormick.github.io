---
layout: post
title: Module pattern
---

<p class="lead">The module pattern allows us to keep related bits of functionality together, and provides a straightforward means to emulate privacy.</p>

The key to the pattern is a self-invoking anonymous function (or immediately invoked function expression, if you prefer), which acts as a closure around the variables and functions it contains.

This self-invoking function can then return an object containing any methods we'd like to be accessible from outside of the module.

Here's some pretty useless code to demonstrate the point:

{% highlight JS %}
var dom = (function() {
  // Private variable
  var counter = 1;

  // Private function (with access to
  // the private variable)
  function createUniqueElement(tag) {
    var el = document.createElement(tag);

    el.id = 'unique_id_' + counter++;

    return el;
  }

  // Object returned from the module contains
  // the methods/properties we want to be accessible
  // from outside
  return {
    createUniqueElement: createUniqueElement
  };
})();

var el_1 = dom.createUniqueElement('div');
var el_2 = dom.createUniqueElement('div');
var el_3 = dom.createUniqueElement('div');

console.log(el_1.id); // "unique_id_1"
console.log(el_2.id); // "unique_id_2"
console.log(el_3.id); // "unique_id_3"

console.log(dom.counter); // undefined
{% endhighlight %}

The fact that the `counter` variable can't be accessed from outsode the module is a good thing. No means for modifying it was provided in the return object, so it can't accidentally be updated. This ensures the element IDs will always remain unique.

In the return object, returning pointers to functions, rather than the anonymous functions themselves keeps the code a bit cleaner and allows for more flexibility, because it means the named functions can be used elsewhere within the module if needed.
