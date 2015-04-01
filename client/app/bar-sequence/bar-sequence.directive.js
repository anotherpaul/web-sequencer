(function () {
  'use strict';
  angular.module('pk-bar-sequence').directive('pkBarSequence', pkBarSequence);

  function pkBarSequence() {
    return {
      restrict: 'E',
      scope: {
        bar: '=',
        beatCount: '=',
        selectedBeat: '=',
        defaultNoteParams: '='
      },
      templateUrl: 'templates/bar-sequence/bar-sequence.directive.tpl.html',
      controller: 'pkBarSequenceCtrl as ctrl'
    };
  }
})();