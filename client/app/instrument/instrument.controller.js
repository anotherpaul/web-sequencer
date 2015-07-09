(function() {
  'use strict';
  angular.module('pk-instrument').controller('pkInstrumentCtrl', pkInstrumentCtrl);

  function pkInstrumentCtrl($scope, pkMidiService, pkNoteConstants) {
    var vm = this;
    vm.onChange = onChange;
    $scope.noteParams = {
      velocity: pkNoteConstants.velocityList[pkNoteConstants.defaultVelocityIndex].value,
      duration: pkNoteConstants.durationList[pkNoteConstants.defaultDurationIndex].value
    };
    function onChange() {
      pkMidiService.playChord($scope.track.channel, $scope.notes, 0);
    }
  }
})();