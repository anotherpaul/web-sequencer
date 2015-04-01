(function() {
  'use strict';
  angular.module('pk-note').controller('pkNoteParamsCtrl', pkNoteParamsCtrl);

  function pkNoteParamsCtrl($scope, pkNoteConstants) {
    $scope.config = {
      velocity: pkNoteConstants.defaultVelocity,
      duration: pkNoteConstants.defaultDuration
    };    
  }
})();
