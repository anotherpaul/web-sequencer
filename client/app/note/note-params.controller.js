(function() {
  'use strict';
  angular.module('pk-note').controller('pkNoteParamsCtrl', pkNoteParamsCtrl);

  function pkNoteParamsCtrl($scope, pkNoteConstants) {
    var vm = this;
    vm.durationList = pkNoteConstants.durationList;
  }
})();
