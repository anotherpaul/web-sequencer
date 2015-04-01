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

    function applyToChord() {
      _.each(Object.keys($scope.notes), function(note) {
        $scope.notes[note] = {
          velocity: $scope.noteParams.velocity,
          duration: $scope.noteParams.duration
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
          velocity: $scope.noteParams.velocity,
          duration: $scope.noteParams.duration
        };
      }
      else {
        delete $scope.notes[noteIndex];
      }
      $scope.onChordChange();
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
