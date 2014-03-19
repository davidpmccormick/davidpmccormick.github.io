!function(e,t){"use strict";function i(e,t){for(var i=0,s=e.length,a=[];s>i;i++)a[i]=t(e[i],i);return a}function s(e){return e}function a(e,l){var h=this,c=t;l=l||{},void 0!==e&&("string"==typeof e?(l.selector=e,e=void 0):"undefined"==typeof e.length&&(l=e,e=void 0)),this.imagesOffScreen=[],this.viewportHeight=c.documentElement.clientHeight,this.selector=l.selector||".delayed-image-load",this.className=l.className||"image-replace",this.gif=c.createElement("img"),this.gif.src="data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7",this.gif.className=this.className,this.gif.alt="",this.scrollDelay=l.scrollDelay||250,this.onResize=l.hasOwnProperty("onResize")?l.onResize:!0,this.lazyload=l.hasOwnProperty("lazyload")?l.lazyload:!1,this.scrolled=!1,this.availablePixelRatios=l.availablePixelRatios||[1,2],this.availableWidths=l.availableWidths||n,this.onImagesReplaced=l.onImagesReplaced||function(){},this.widthsMap={},this.refreshPixelRatio(),this.widthInterpolator=l.widthInterpolator||s,"function"!=typeof this.availableWidths&&("number"==typeof this.availableWidths.length?this.widthsMap=a.createWidthsMap(this.availableWidths,this.widthInterpolator):(this.widthsMap=this.availableWidths,this.availableWidths=o(this.availableWidths)),this.availableWidths=this.availableWidths.sort(function(e,t){return e-t})),e?(this.divs=i(e,s),this.selector=null):this.divs=i(c.querySelectorAll(this.selector),s),this.changeDivsToEmptyImages(),r(function(){h.init()})}var n,o,r,l;r=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},l=function(){return t.addEventListener?function(e,t,i){return e.addEventListener(t,i,!1)}:function(e,t,i){return e.attachEvent("on"+t,i)}}(),n=[96,130,165,200,235,270,304,340,375,410,445,485,520,555,590,625,660,695,736],o="function"==typeof Object.keys?Object.keys:function(e){var t,i=[];for(t in e)i.push(t);return i},a.prototype.scrollCheck=function(){this.scrolled&&(this.imagesOffScreen.length||e.clearInterval(this.interval),this.divs=this.imagesOffScreen.slice(0),this.imagesOffScreen.length=0,this.changeDivsToEmptyImages(),this.scrolled=!1)},a.prototype.init=function(){this.initialized=!0,this.checkImagesNeedReplacing(this.divs),this.onResize&&this.registerResizeEvent(),this.lazyload&&this.registerScrollEvent()},a.prototype.createGif=function(e){if(e.className.match(new RegExp("(^| )"+this.className+"( |$)")))return e;var t=this.gif.cloneNode(!1);return t.width=e.getAttribute("data-width"),t.setAttribute("data-src",e.getAttribute("data-src")),t.setAttribute("alt",e.getAttribute("data-alt")||this.gif.alt),e.parentNode.replaceChild(t,e),t},a.prototype.changeDivsToEmptyImages=function(){var e=this;i(this.divs,function(t,i){e.lazyload?e.isThisElementOnScreen(t)?e.divs[i]=e.createGif(t):e.imagesOffScreen.push(t):e.divs[i]=e.createGif(t)}),this.initialized&&this.checkImagesNeedReplacing(this.divs)},a.prototype.isThisElementOnScreen=function(e){var t=a.getPageOffset(),i=0;if(e.offsetParent)do i+=e.offsetTop;while(e=e.offsetParent);return i<this.viewportHeight+t?!0:!1},a.prototype.checkImagesNeedReplacing=function(e){var t=this;this.isResizing||(this.isResizing=!0,this.refreshPixelRatio(),i(e,function(e){t.replaceImagesBasedOnScreenDimensions(e)}),this.isResizing=!1,this.onImagesReplaced(e))},a.prototype.replaceImagesBasedOnScreenDimensions=function(e){var t,i;t="function"==typeof this.availableWidths?this.availableWidths(e):this.determineAppropriateResolution(e),i=this.changeImageSrcToUseNewImageDimensions(e.getAttribute("data-src"),t),e.src=i},a.prototype.determineAppropriateResolution=function(e){return a.getClosestValue(e.clientWidth,this.availableWidths)},a.prototype.refreshPixelRatio=function(){this.devicePixelRatio=a.getClosestValue(a.getPixelRatio(),this.availablePixelRatios)},a.prototype.changeImageSrcToUseNewImageDimensions=function(e,t){return e.replace(/{width}/g,a.transforms.width(t,this.widthsMap)).replace(/{pixel_ratio}/g,a.transforms.pixelRatio(this.devicePixelRatio))},a.getPixelRatio=function(t){return(t||e).devicePixelRatio||1},a.createWidthsMap=function(e,t){for(var i={},s=e.length;s--;)i[e[s]]=t(e[s]);return i},a.transforms={pixelRatio:function(e){return 1===e?"":"-"+e+"x"},width:function(e,t){return t[e]||e}},a.getClosestValue=function(e,t){for(var i=t.length,s=t[i-1];i--;)e<=t[i]&&(s=t[i]);return s},a.prototype.registerResizeEvent=function(){var t=this;l(e,"resize",function(){t.checkImagesNeedReplacing(t.divs)})},a.prototype.registerScrollEvent=function(){var t=this;this.scrolled=!1,this.interval=e.setInterval(function(){t.scrollCheck()},t.scrollDelay),l(e,"scroll",function(){t.scrolled=!0})},a.getPageOffsetGenerator=function(i){return i?function(){return e.pageYOffset}:function(){return t.documentElement.scrollTop}},a.getPageOffset=a.getPageOffsetGenerator(Object.prototype.hasOwnProperty.call(e,"pageYOffset")),a.applyEach=i,"object"==typeof module&&"object"==typeof module.exports?module.exports=exports=a:"function"==typeof define&&define.amd?define(function(){return a}):"object"==typeof e&&(e.Imager=a)}(window,document);
//# sourceMappingURL=./Imager.map.js
