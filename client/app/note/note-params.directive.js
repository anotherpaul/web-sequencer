(function() {
  'use strict';
  angular.module('pk-note').directive('pkNoteParams', pkNoteParams);

  function pkNoteParams() {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'templates/note/note-params.directive.html',
      controller: 'pkNoteParamsCtrl as ctrl'
    };
  }
})();