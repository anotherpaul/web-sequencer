(function () {
  'use strict';
  angular.module('pk-bar-sequence').directive('pkBarSequence', pkBarSequence);

  function pkBarSequence() {
    return {
      restrict: 'E',
      scope: {
        selectedBeat: '='
      },
      templateUrl: 'templates/bar-sequence/bar-sequence.directive.tpl.html',
      controller: 'pkBarSequenceCtrl as ctrl'
    };
  }
})();