(function () {
  'use strict';
  angular.module('pk-bar-sequence').directive('pkBarSequence', pkBarSequence);

  function pkBarSequence() {
    return {
      restrict: 'E',
      scope: {
        notes: '=',
        selectedBeat: '='
      },
      templateUrl: 'templates/bar-sequence/bar-sequence.directive.html',
      controller: 'pkBarSequenceCtrl as ctrl'
    };
  }
})();