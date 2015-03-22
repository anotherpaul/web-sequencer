(function () {
  'use strict';
  angular.module('pk-piano-keyboard').directive('pkPianoKeyboard', pkPianoKeyboard);

  function pkPianoKeyboard() {
    return {
      restrict: 'E',
      scope: {
        notes: '='
      },
      templateUrl: 'templates/piano-keyboard/piano-keyboard.directive.html',
      controller: 'pkPianoKeyboardCtrl as ctrl',
      link: link
    };

    function link(scope, elem, attr) {
      scope.octaveCount = attr.octaveCount;
    }
  }
})();