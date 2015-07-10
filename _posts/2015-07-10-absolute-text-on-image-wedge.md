---
layout: post
title: Static wedge for absolute content
---

<p class="lead">When I was given a design that had text absolutely positioned over an image, and I knew that I had to allow for that text to be of variable lengths, my initial conclusion was that it would be tricky to make it work with any degree of robustness in a responsive build. Then I remembered a nifty, if <em>slightly</em> nasty trick my good buddy <a href="https://twitter.com/andypearson">Andy P III</a> slipped into my toolbelt a little while ago.</p>

[Here's an illustration of the problem](http://output.jsbin.com/papiro) – if you resize your browser to be narrow, the text over the image runs off the top of the page.

The absolutely positioned text is taken out of document flow, so it doesn't have a bearing on the size of its containing `div` (so the background image in that element doesn't change size).

To get around this, we clone the absolutely positioned element (with JavaScript) and insert it directly before that element, setting its `visibility` property to `hidden`, and adding `aria-hidden="true"` to keep it sane for screen-readers.

Then the key is changing the cloned element's `position` property to be `static`, which keeps it in document flow, ensuring it is able to influence the size of its container.

[Here's the final result](http://output.jsbin.com/jilini/3).

Of course, this should almost certainly be done with flexbox. Maybe there'll be a part two for this post.
