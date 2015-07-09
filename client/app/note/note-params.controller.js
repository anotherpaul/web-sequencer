(function() {
  'use strict';
  angular.module('pk-note').controller('pkNoteParamsCtrl', pkNoteParamsCtrl);

  function pkNoteParamsCtrl($scope, pkNoteConstants) {
    var vm = this;
    vm.velocityList = pkNoteConstants.velocityList;
    vm.durationList = pkNoteConstants.durationList;
  }
})();
