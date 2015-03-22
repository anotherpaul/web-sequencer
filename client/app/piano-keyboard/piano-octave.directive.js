(function () {
  'use strict';
  angular.module('pk-piano-keyboard').directive('pkPianoOctave', pkPianoOctave);

  function pkPianoOctave() {
    return {
      restrict: 'E',
      controller: 'pkPianoOctaveCtrl as ctrl',
      scope: {
        notes: '=',
        octave: '@'
      },
      templateUrl: 'templates/piano-keyboard/piano-octave.template.html',
      link: link
    };
  }

  function link(scope, elem, attr){

  }
})();