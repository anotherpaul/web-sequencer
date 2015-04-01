(function() {
  'use strict';
  angular.module('pk-bar-sequence').controller('pkBarSequenceCtrl', pkBarSequenceCtrl);

  function pkBarSequenceCtrl($scope, _) {
    var vm = this;

    vm.updateDisplayedBar = updateDisplayedBar;
    vm.displayedBar = [];
    vm.getBeatCount = getBeatCount;
    vm.writeSelectedBeat = writeSelectedBeat;
    vm.addNotesToSelectedBeat = addNotesToSelectedBeat;
    vm.selectBeat = selectBeat;
    vm.addNote = addNote;

    function getBeatCount() {
      return _.range($scope.beatCount);
    }

    function setBeatNotes(beatIndex, notes) {
      $scope.bar[beatIndex] = _.cloneDeep(notes);
      vm.updateDisplayedBar();
    }

    function getBeatNotes(beatIndex) {
      return _.cloneDeep($scope.bar[beatIndex]);
    }

    function addBeatNotes(beatIndex, notes) {
      if (!$scope.bar[beatIndex]) {
        return setBeatNotes(beatIndex, notes);
      }
      $scope.bar[beatIndex] = _.assign($scope.bar[beatIndex], notes);
      vm.updateDisplayedBar();
    }

    function selectBeat(beatIndex) {
      $scope.selectedBeat = getBeatNotes(beatIndex);
    }

    function writeSelectedBeat(beatIndex) {
      setBeatNotes(beatIndex, $scope.selectedBeat);
    }

    function addNotesToSelectedBeat(beatIndex) {
      addBeatNotes(beatIndex, $scope.selectedBeat);
    }

    function addNote(noteName, beatIndex) {
      var notes = {};
      notes[noteName] = $scope.defaultNoteParams;
      addBeatNotes(beatIndex, notes);
    }

    function updateDisplayedBar() {
      var noteMap = $scope.bar.reduce(function(acc, entry, index) {
        _.forOwn(entry, function(value, key) {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key][index] = value;
        });
        return acc;
      }, {});
      vm.displayedBar = _.transform(noteMap, function(result, value, key) {
        result.push({
          name: key,
          beats: value
        });
        return result;
      }, []);
    }
  }
})();