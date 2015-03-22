(function() {
  'use strict';
  angular.module('pk-piano-keyboard').controller('pkPianoKeyboardCtrl', pkPianoKeyboardCtrl);

  function pkPianoKeyboardCtrl($scope, pkPianoKeyboardConstants, _, pkNoteConstants) {
    var vm = this;
    vm.toggleNote = toggleNote;
    vm.applyToChord = applyToChord;
    vm._ = _;
    vm.octaveCount = $scope.octaveCount;
    vm.startOctaveIndex = 2;
    if (!vm.octaveCount) {
      vm.octaveCount = pkPianoKeyboardConstants.octaveCount;
    }
    vm.config = {
      velocity: pkNoteConstants.defaultVelocity,
      duration: pkNoteConstants.defaultDuration
    };
    
    function applyToChord() {
      _.each(Object.keys($scope.notes), function(note) {
        $scope.notes[note] = {
          velocity: vm.config.velocity,
          duration: vm.config.duration
        };
      });
    }

    function toggleNote(noteIndex) {
      var foundNote = $scope.notes[noteIndex];
      if (!foundNote) {
        $scope.notes[noteIndex] = {
          velocity: vm.config.velocity,
          duration: vm.config.duration
        };
      }
      else {
        delete $scope.notes[noteIndex];
      }
    }

  }
})();
