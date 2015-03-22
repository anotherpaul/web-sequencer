(function () {
  'use strict';
  angular.module('pk-piano-keyboard').controller('pkPianoOctaveCtrl', pkPianoOctaveCtrl);

  function pkPianoOctaveCtrl($scope) {
    var vm = this;

    vm.toggleNote = toggleNote;

    function toggleNote(note) {
      var noteIndex = note + 12 * $scope.octave;

      var foundNote = $scope.notes[noteIndex];
      if (!foundNote) {
        $scope.notes[noteIndex] = {
          velocity: 0,
          duration: 0
        };
      } else {
        delete $scope.notes[noteIndex];
      }
    }
  }
})();