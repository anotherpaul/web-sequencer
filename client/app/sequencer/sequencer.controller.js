(function() {
  'use strict';
  angular.module('pk-sequencer').controller('SequencerCtrl', SequencerCtrl);

  function SequencerCtrl($q) {
    var vm = this;
    vm.playChord = playChord;
    vm.changeInstrument = changeInstrument;
    vm.notes = {};
    var deferredLoading = $q.defer();
    vm.pluginLoadingPromise = deferredLoading.promise;
    vm.availableInstruments = [{
      value: 118,
      name: 'percussion'
    }];
    vm.selectedInstument = vm.availableInstruments[0];
    vm.drumNote = 0;
    vm.testDrumNote = testDrumNote;

    function playMidiNote(noteIndex, noteParams) {
      var delay = 0; // play one note every quarter second
      // play the note
      MIDI.noteOn(0, noteIndex, noteParams.velocity, delay);
      MIDI.noteOff(0, noteIndex, delay + noteParams.duration);
    }

    function playChord() {
      Object.keys(vm.notes).forEach(function(key) {
        playMidiNote(key, vm.notes[key]);
      });
    }

    function changeInstrument() {
      MIDI.programChange(0, vm.selectedInstument.value);
    }
    
    function testDrumNote() {
      playMidiNote(vm.drumNote, {velocity: 127, duration: 2});
    }

    MIDI.loadPlugin({
      soundfontUrl: './soundfont/',
      instruments: ['synth_drum'],
      callback: function() {
        MIDI.setVolume(0, 127);
        changeInstrument();
        deferredLoading.resolve();
      }
    });
  }
})();