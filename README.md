# aw-auto-resize
An [AngularJS](angularjs.org) directive which automatically resizes the font size of an element's
content to fit within the bounds of the element. The directive binds to the
window resize.

##Usage
Include the directive into your application or controller.
```javascript
angular.module('myAppOrController', ['awAutoResize']);
```

Apply the directive to an element in your view.
```html
<h1 aw-auto-resize>Header with auto font resizing</h1>
```

Add a manual trigger to refresh the font size using **resize-if**.
```html
<h1 aw-auto-resize resize-if="doResize">Header with manual refresh trigger</h1>
<button ng-click="doResize = true">Refresh</button>
```

Give the element font-size bounds with **min-size** and **max-size**.
```html
<h1 aw-auto-resize min-size="30" max-size="40">Header with font-size bounds</h1>
```

##Todo
* Allow minimum and maximum bounds to be given in **em** or **px**.
* Speed up refresh time to reduce window resize lag.
* Allow users to specify which element attributes trigger a refresh.
* Come up with a better solution than content overflow after reaching minimum font size.
* Let the minimum and maximum font sizes to be controlled with a controller scope variable.

##Dependencies
* [AngularJS](angularjs.org)
* [JQuery](jquery.com)
