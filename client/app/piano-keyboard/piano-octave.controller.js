(function() {
  'use strict';
  angular.module('pk-piano-keyboard').controller('pkPianoOctaveCtrl', pkPianoOctaveCtrl);

  function pkPianoOctaveCtrl($scope) {
    var vm = this;

    vm.toggleNote = toggleNote;

    function toggleNote(note) {
      var noteIndex = note + 12 * $scope.octave;
      $scope.toggleNoteFn({
        noteIndex: noteIndex
      });
    }
  }
})();