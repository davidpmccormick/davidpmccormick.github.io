---
layout: post
title: Custom select boxes
---

<p class="lead">I've often heard that it's a Very Bad Idea to try to emulate a browser's native select box using JavaScipt, so I thought I'd give it a go to see what the fuss is all about.</p>

Here's a far from exhaustive list of things I found to describe how browsers seem to handle their native select boxes:

* Trigger open/close by pressing space on header
* Trigger open by pressing cursor keys on header
* Trigger open/close by clicking on header
* Focus currently selected item on open
* No dropdown focus if currently selected item is disabled
* Navigate from top/bottom if currently selected item is disabled
* Navigate from currently selected item using cursor keys
* Select focused item on pressing return/space
* Close (without updating) on pressing escape
* Select hovered option (unless cursor key pressed since initial hover) on pressing return/space
* Close (without updating) on pressing return/space when hovered over disabled option
* Navigate using cursor keys from most recently hovered option
* Skip over disabled options when navigating with cursor keys
* A disabled select doesn't respond to events
* A disabled optgroup has all of its child options disabled

And [here's a JS Bin with my best shot](http://output.jsbin.com/jagamu).

I feel like I've had a fairly good run at it – I think I'm relatively close to having implemented the keyboard and mouse driven idiosyncrasies.

It's not even close to being acceptable for screenreader use, though. And I couldn't even face attempting to handle the `multiple` attribute.

In any event, it's been an interesting exercise – I'll feel better able to defend against a custom select requirement in future.
