---
layout: post
title: Generating a styleguide colour palette
---

### Sass

{% highlight scss %}
$red: #dc0011;
$grey: #cccccc;

$brand-colours:
  $red "red",
  $grey "grey";

.styleguide__colour {
  width: 100px;
  height: 100px;
  float: left;

  &:before {
    color: #ffffff;
    display: block;
    padding: 10px;
  }
}

@each $brand-colour in $brand-colours {
  $value: nth($brand-colour, 1);
  $name: nth($brand-colour, 2);

  .styleguide__colour--#{$name} {
    background: $value;

    &:before {
      content: "#{$name}: #{$value}";
    }
  }
}

@function listtostring($list) {
  $string: null;
  @each $item in $list {
    $string: append($string, unquote(nth($item, 2)));
  }
  @return "#{$string}";
}

body:before {
  visibility: hidden;
  display: inline-block;
  height: 0;
  content: listtostring($brand-colours);
}
{% endhighlight %}

### JQuery

{% highlight js %}
$(function() {
  color_list = (window.getComputedStyle(document.body, ':before')).content;
  color_array = (color_list.substring(1, color_list.length-1)).split(' ');
  $.each(colour_array, function(index, value) {
    $('body').append('<div class="styleguide__colour styleguide__colour--' + value + '"></div>');
  });
});
{% endhighlight %}

### In action

<p data-height="331" data-theme-id="0" data-slug-hash="wamgI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/davidpmccormick/pen/wamgI'>wamgI</a> by David McCormick (<a href='http://codepen.io/davidpmccormick'>@davidpmccormick</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>