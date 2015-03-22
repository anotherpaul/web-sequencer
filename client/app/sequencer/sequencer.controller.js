(function () {
  'use strict';
  angular.module('pk-sequencer').controller('SequencerController', SequencerController);

  function SequencerController(){
    var vm = this;
    vm.notes = {};
  }
})();