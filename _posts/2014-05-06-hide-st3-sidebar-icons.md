---
layout: post
title: Hide ST3 sidebar icons
---



1. Create a [theme-name].sublime-theme file in 'packages/User/'
2. Add the following to that file

{% highlight json %}
[
  {
    "class": "icon_file_type",
    "content_margin": [0,0]
  },
  {
    "class": "icon_folder",
    "content_margin": [0,0]
  },
  {
    "class": "icon_folder_loading",
    "content_margin": [0,0]
  }
]
{% endhighlight %}