---
layout: post
title: Generating a styleguide colour palette
---

<p class="lead">In order to be able to output brand palette colours to a styleguide without then having to duplicate Sass variables for use in production, you can create a list of lists and a lookup function. This technique allows you to circumvent the absence of variable interpolation in Sass.</p>

With Sass lists, you can target individual list items using `nth($list, $index)`, so if you have a list `$colour-name: colour-string #base-colour-hex #light-tint-hex #dark-tint-hex`, you can get light-tint of the colour with `nth($colour-name, 3)` (lists are indexed from one, not zero).

In [this post](http://scriptogr.am/jimniels/post/workarounds-to-variable-interpolation-in-sass) Jim Nielsen explains the principle behind creating two separate lists; one for the name, and one for the hex value. Provided the indices of the items in the two lists line up, you can create a function that takes the colour name as an argument and, based on its index in the colour name list, returns the corresponding hex code in the colour values list.

This is cool, but it necessitates the maintenance of two lists, manually.

Instead, I make and maintain just the one list-of-lists, then use Sass itself to generate the individual lists it needs in order to perform the lookup.

Once this is set up, I can get any of the brand colours (and tints) set to a property's value by calling the `brandcolour()` function, e.g. `background: brandcolour(graphite, dark);`.

Using an `@each` loop, I create a list of classes and subclasses that contain information about each colour in the palette. Each of these classes has the colour's name (e.g. `primary-red`) as a suffix.

Using another `@each` loop, I add each colour name to a list that is contained in the `body:before` pseudo-element's `content` property.

Finally, I use JavaScript to read each value from the `body:before` list (`var colour_list = (window.getComputedStyle(document.body, ':before')).content;`) and generate an element for each of the colour blocks I defined using the `@each` loop above.



### Sass

{% highlight scss %}
$brand-colours:
// colour-name   base    light   dark
'primary-red'    #de0011 #e05963 #b1000e,
'dark-red'       #83000a #84262f #5e0009,
'black'          #000000 #404040 #000000,
'white'          #ffffff #ffffff #d9d9d9,
'graphite'       #404040 #505050 #272727,
'pewter'         #929292 #999999 #6d6d6d,
'silver'         #d7d8d6 #e2e2e1 #afb0ae,
'pearl'          #ededed #fdfdfd #c6c6c6,
'light-slate'    #4d6474 #5a6b79 #344553,
'slate'          #3e505d #4f5c66 #26323c,
'dark-slate'     #253038 #3e454a #0e1215,
'jade'           #00928d #34948e #0e6e68,
'dark-jade'      #005e59 #2f6862 #09423c,
'gold'           #e9a115 #e8a642 #c07b10,
'antique-gold'   #ba8111 #b88434 #925e0e,
'violet'         #37166d #5a487f #312054,
'premier-indigo' #261452 #3e305d #0e0620;


// create individual lists to use with lookup function
$namecolourlist: null;
$basecolourlist: null;
$lightcolourlist: null;
$darkcolourlist: null;

@each $brand-colour in $brand-colours {
  $namecolourlist: append($namecolourlist, nth($brand-colour, 1));
}
@each $brand-colour in $brand-colours {
  $basecolourlist: append($basecolourlist, nth($brand-colour, 2));
}
@each $brand-colour in $brand-colours {
  $lightcolourlist: append($lightcolourlist, nth($brand-colour, 3));
}
@each $brand-colour in $brand-colours {
  $darkcolourlist: append($darkcolourlist, nth($brand-colour, 4));
}

// lookup function
@function brandcolour($search, $tint:null) {
  $index: index($namecolourlist, $search);
  $colour: null;
  @if ($tint == null) {
    $colour: nth($basecolourlist, $index);
  } @else if ($tint == 'light') {
    $colour: nth($lightcolourlist, $index);
  } @else if ($tint == 'dark') {
    $colour: nth($darkcolourlist, $index);
  } @else { // fallback to base colour
    $colour: nth($basecolourlist, $index);
  }
  @return $colour;
}

// get all brand colours into the dom so the palette can be built with JS
@function brandcolorlist($brand-colours) {
  $list: null;
  @each $brand-colour in $brand-colours {
    $list: append($list, unquote(nth($brand-colour, 1)));
  }
  @return '#{$list}';
}

body:before {
  visibility: hidden;
  display: inline-block;
  height: 0;
  content: brandcolorlist($brand-colours);
}

.styleguide__colour-block {
  float: left;
  margin: 0 20px 20px 0;
  width: 200px;
}

// generate styleguide classes
@each $brand-colour in $brand-colours {
  $name: nth($brand-colour, 1);
  $value: nth($brand-colour, 2);
  $tint-light: nth($brand-colour, 3);
  $tint-dark: nth($brand-colour, 4);

  .styleguide__colour--#{$name} {
    padding: 30px 0;
    background: $value;

    &:before {
      display: block;
      padding: 10px;
      color: #aaa;
      content: '#{$name}: #{$value}';
    }

    &.styleguide__colour--#{$name}--light,
    &.styleguide__colour--#{$name}--dark {
      padding: 10px 0;
    }

    &.styleguide__colour--#{$name}--light {
      background: $tint-light;

      &:before {
        content: 'Light: #{$tint-light}';
      }
    }

    &.styleguide__colour--#{$name}--dark {
      background: $tint-dark;

      &:before {
        content: 'Dark: #{$tint-dark}';
      }
    }
  }
}
{% endhighlight %}

### JQuery

{% highlight js %}
$(function() {
  var colour_list = (window.getComputedStyle(document.body, ':before')).content;
  var colour_array = (colour_list.substring(1, colour_list.length-1)).split(' ');
  $.each(colour_array, function(index, value) {
    $('body').append('\
      <div class="styleguide__colour-block">\
        <div class="styleguide__colour--' + value + '"></div>\
        <div class="styleguide__colour--' + value + ' styleguide__colour styleguide__colour--' + value + '--light"></div>\
        <div class="styleguide__colour--' + value + ' styleguide__colour styleguide__colour--' + value + '--dark"></div>\
      </div>\
    ');
  });
});
{% endhighlight %}

### In action

<p data-height="600" data-theme-id="0" data-slug-hash="tgveC" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/davidpmccormick/pen/tgveC'>tgveC</a> by David McCormick (<a href='http://codepen.io/davidpmccormick'>@davidpmccormick</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>