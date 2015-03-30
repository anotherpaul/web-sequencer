(function() {
  'use strict';
  angular.module('pk-bar-sequence').controller('pkBarSequenceCtrl', pkBarSequenceCtrl);

  function pkBarSequenceCtrl($scope, _) {
    var vm = this;

    vm.updateDisplayedBar = updateDisplayedBar;
    vm.displayedBar = {
      beatCount: 16,
      notes: {}
    };
    vm.bar = [];
    vm.getBeatCount = getBeatCount;
    vm.writeSelectedBeat = writeSelectedBeat;
    vm.addNotesToSelectedBeat = addNotesToSelectedBeat;
    vm.selectBeat = selectBeat;
    
    function getBeatCount() {
      return _.range(vm.displayedBar.beatCount);
    }
    
    function setBeatNotes(beatIndex, notes) {
      vm.bar[beatIndex] = _.cloneDeep(notes);
      vm.updateDisplayedBar();
    }
    
    function getBeatNotes(beatIndex) {
      return _.cloneDeep(vm.bar[beatIndex]);
    }
    
    function addBeatNotes(beatIndex, notes) {
      if (!vm.bar[beatIndex]) {
        return setBeatNotes(beatIndex, notes);
      }
      vm.bar[beatIndex] = _.assign(vm.bar[beatIndex], notes);
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

    function updateDisplayedBar() {
      var noteMap = vm.bar.reduce(function(acc, entry, index) {
        _.forOwn(entry, function(value, key) {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key][index] = value;
        });
        return acc;
      }, {});
      vm.displayedBar.notes = _.transform(noteMap, function(result, value, key) {
        result.push({
          name: key,
          beats: value
        });
        return result;
      }, [])
    }
  }
})();