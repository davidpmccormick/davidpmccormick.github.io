---
layout: post
title: Recursion
---

I've been trying to get to grips with recursion lately and I think I might be on the verge of a mini breakthrough.

A recursive function must have two things:

- A 'base case' from which it finally returns.
- A statement in which it calls itself if the base case condition isn't met.

The function below takes `n` arguments and adds them using recursion.
{% highlight js %}
const addRecursive = (...args) => {
  if (args.length <= 2) {
    return args[0] + args[1]
  }

  return args[0] + addRecursive(...args.slice(1))
}
{% endhighlight %}

If there are only two arguments – the base case – the function returns the sum of those two arguments and does nothing else.

When there are three arguments, initially the function skips the base case. It takes the first of the three arguments and adds it to the result of running itself with the remaining two arguments (which, as we've seen, will satisfy the base case and just return a number).

For example, with two arguments the base case is met here:

`addRecursive(1, 1) // 2`

Adding a third argument – `addRecursive(1, 1, 1)` – we miss the base case on the first time round, effectively getting to

`return 1 + addRecursive(1, 1)`

As we saw above, the right side of that statement
equates to 2, so it is equivalent to

`return 1 + 2 // 3`

At this point I can wrap my head around this single recursive call, because I can keep all the necessary logic in my brain at once – ultimately I can see that two numbers are going to be added together. Adding more recursive calls, I can just about figure out what's going on conceptually, but it's tricky. It's the recognition that each of the recursive functions will finally return a value out to the point from where they were called that is most brain-melting for me. A bit like *Inception*.

For now I'm satisfied that I can convince myself logically of how recursion works. I think I'm a way off knowing when to use it in anger.
