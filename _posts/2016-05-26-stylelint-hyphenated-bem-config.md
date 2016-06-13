---
layout: post
title: Stylelint hyphenated BEM config
---

<p class="lead"><a href="http://stylelint.io">Stylelint.io</a> is flavour of the Sass-linting month (replacing <a href="https://github.com/brigade/scss-lint">scss-lint</a> as my Sass linter of choice). Scss-lint caters to the Harry Roberts approved variant, calling it <a href="http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/">'hyphenated BEM'</a>. There is a <a href="https://github.com/davidtheclark/stylelint-selector-bem-pattern">BEM pattern plugin</a> for Stylelint, but out of the box, it doesn't support this flavour.</p>

In order to validate your hyphenated BEM selectors with Stylelint, add the BEM plugin – `npm install stylelint-selector-bem-pattern` – then add these regexes to the Stylelint plugin config:

{% highlight json %}
{
  "plugins": [
    "stylelint-selector-bem-pattern"
  ],
  "rules": {
    "plugin/selector-bem-pattern": {
      "componentName": "(([a-z0-9]+(?!-$)-?)+)",
      "componentSelectors": {
        "initial": "\\.{componentName}(((__|--)(([a-z0-9\\[\\]'=]+(?!-$)-?)+))+)?$"
      },
      "ignoreSelectors": [
        ".*\\.no-js.*",
        ".*\\.js-.*",
        ".*\\.lt-ie.*"
      ]
    },
    "//...rules": "continue"
  }
}
{% endhighlight %}

Then add `//* @define component-name-here; weak` to the top of each Sass partial and liberally pepper the file with `// stylelint-disable plugin/selector-bem-pattern` before any lines on which you don't care that you're not being BEMmy enough (you can start caring again with `// stylelint-enable plugin/selector-bem-pattern` below). The `weak` flag ensures that while *initial* selector sequences (before combinators) must match the defined convention, sequences after combinators don't. This helps to keep things relatively sane, so you don't have to reach for `stylelint-disable` too often.

The `ignoreSelectors` array included above is just what seemed to work well for me on one project – your mileage may vary, depending on what kind of utility classes make their way into your components.
