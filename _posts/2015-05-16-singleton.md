---
layout: post
title: Singleton pattern
---

<p class="lead">Classically described, the intent of a singleton is to ensure a class (or an object in JavaScript) only has one instance, and to provide a global point of access to that instance.</p>

Using the [module pattern](/2015/05/09/module-pattern/), we create only one instance, so a module gets some of the way towards being a singleton, but modules don't explicitly require the creation of a 'global point of access' to their instances.

The purpose of the module pattern is to separate code into into related units. So the difference between the two is subtle (and as far as I can tell, possibly not very important) -- a singleton object in JavaScript utilises a module, but the reason for doing so is not primarily for keeping code modular.

Looking at if the other way round, the fact a JavaScript module ensures only a single object is created is not integral to the purpose of the module pattern, but merely a by-product of the methodology.

I think.

Either that, or I'm totally missing the point, still.

{% highlight JS %}
var singleton = (function() {
  var
    counter = 0,
    instance;

  function incCounter() {
    counter++;
  }

  function getCounter() {
    return counter;
  }

  function createInstance() {
    instance = {
      incCounter: incCounter,
      getCounter: getCounter
    };

    return instance;
  }

  // The key to the singleton pattern is the returning of
  // a function that always returns the same one instance
  // of the requested object. If the object already exists,
  // it gives you the pre-existing object; if it doesn't
  // yet exist, it creates it then returns it.
  return {
    getInstance: function() {
      return instance || (instance = createInstance());
    }
  };
})();

var thing = singleton.getInstance();
thing.incCounter();

var same_thing = singleton.getInstance();
same_thing.incCounter();

console.log(thing.getCounter()); // 2
console.log(same_thing.getCounter()); // 2

console.log(thing === same_thing); // true
{% endhighlight %}
