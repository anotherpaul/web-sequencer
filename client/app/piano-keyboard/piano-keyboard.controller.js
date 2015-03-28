(function() {
  'use strict';
  angular.module('pk-piano-keyboard').controller('pkPianoKeyboardCtrl', pkPianoKeyboardCtrl);

  function pkPianoKeyboardCtrl($scope, pkPianoKeyboardConstants, _, pkNoteConstants) {
    var vm = this;
    vm.toggleNote = toggleNote;
    vm.applyToChord = applyToChord;
    vm.cleanChord = cleanChord;
    vm._ = _;
    vm.octaveCount = $scope.octaveCount;
    vm.startOctaveIndex = 2;
    vm.increaseOctave = increaseOctave;
    vm.decreaseOctave = decreaseOctave;
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

    function cleanChord() {
      $scope.notes = {};
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

    function decreaseOctave() {
      if (vm.startOctaveIndex > 0) {
        vm.startOctaveIndex = vm.startOctaveIndex - 1;
      }
    }

    function increaseOctave() {
      if (vm.startOctaveIndex < pkPianoKeyboardConstants.maxOctave - pkPianoKeyboardConstants.octaveCount) {
        vm.startOctaveIndex = vm.startOctaveIndex + 1;
      }
    }

  }
})();
