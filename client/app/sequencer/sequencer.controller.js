(function () {
  'use strict';
  angular.module('pk-sequencer').controller('SequencerCtrl', SequencerCtrl);

  function SequencerCtrl(){
    var vm = this;
    vm.notes = {};
  }
})();