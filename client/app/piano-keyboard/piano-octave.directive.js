(function () {
  'use strict';
  angular.module('pk-piano-keyboard').directive('pkPianoOctave', pkPianoOctave);

  function pkPianoOctave() {
    return {
      restrict: 'E',
      controller: 'pkPianoOctaveCtrl as ctrl',
      scope: {
        notes: '=',
        octave: '@',
        toggleNoteFn: '&'
      },
      templateUrl: 'templates/piano-keyboard/piano-octave.directive.html'
    };
  }
})();