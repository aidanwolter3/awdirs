/*   Module:
*       awAutoResize
*
*    Author:
*       Aidan Wolter
*
*    Description:
*       A directive which automatically resizes the font size of the elements
*       content to fit within the padding of the element. The directive binds
*       to the window resize.
*/

angular.module('awAutoResize', [])
.directive('awAutoResize', ['$window', function($window) {
  return {

    //restrict the directive to DOM attributes only
    restrict: 'A',

    //declare the scope as local
    scope: {
      'needsResize': '=resizeIf'
    },

    //link into the DOM for modification
    link: function(scope, element, attrs) {

      //set options as specified in DOM
      scope.maxSize = scope.$eval(attrs.maxSize);
      scope.minSize = scope.$eval(attrs.minSize);

      //validate the options
      if(scope.maxSize <= scope.minSize) {
        throw new Error('awAutoResize: maxSize can not be less than or equal to minSize ('+scope.maxSize+' <= '+scope.minSize+')');
        return;
      }

      //create a function to call on the window resize
      scope.onResize = function() {

        //set the starting height as the element's height
        //make sure to not exceed the max height
        if(scope.maxSize && scope.maxSize < element.height()) {
          scope.fontSize = scope.maxSize;
        } else {
          scope.fontSize = element.height();
        }
        element.css('font-size', parseFloat(scope.fontSize) + 'px');

        //function to decrease the font-size by 1
        var decreaseFontSize = function() {
          scope.fontSize = element.css('font-size').slice(0, -2) - 1;
          element.css('font-size', parseFloat(scope.fontSize) + 'px');
        }

        //while the font-size is too large but not smaller than minSize
        while( ((element.context.scrollWidth > element.context.offsetWidth) ||
               (element.context.scrollHeight > element.context.offsetHeight )) &&
                 (!scope.minSize || scope.fontSize >= scope.minSize) ) {

          //decrease size
          decreaseFontSize();
        }

      } // end onResize

      //set initial font size
      scope.onResize();

      //bind the windows resize to the function we just created
      scope.$watch('needsResize', function(newValue, oldValue) {
        if(newValue !== oldValue && newValue === true) {
          scope.needsResize = false;
          scope.onResize();
        }
      });
      angular.element($window).bind('resize', function() { scope.onResize(); });
      angular.element($window).bind('load', function() { scope.onResize(); });

    }// end link

  };
}]);
