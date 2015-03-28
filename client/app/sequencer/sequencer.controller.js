(function() {
  'use strict';
  angular.module('pk-sequencer').controller('SequencerCtrl', SequencerCtrl);

  function SequencerCtrl($q) {
    var vm = this;
    vm.playChord = playChord;
    vm.loading = false;
    vm.changeInstrument = changeInstrument;
    vm.notes = {};
    vm.availableInstruments = [{
      value: 0,
      name: 'piano'
    }, {
      value: 118,
      name: 'percussion'
    }];
    vm.selectedInstument = vm.availableInstruments[1];
    vm.drumNote = 0;
    vm.testDrumNote = testDrumNote;
    vm.loadingPromise = $q.defer();

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
      playMidiNote(vm.drumNote, {
        velocity: 127,
        duration: 2
      });
    }

    function loadMidiInstruments() {
      var deferred = $q.defer();
      MIDI.loadPlugin({
        soundfontUrl: './soundfont/',
        instruments: ['synth_drum', 'acoustic_grand_piano'],
        onsuccess: function() {
          MIDI.setVolume(0, 127);
          changeInstrument();
          deferred.resolve();
        }
      });
      return deferred.promise;
    }

    function activate() {
      vm.loading = true;
      loadMidiInstruments().then(function() {
        vm.loading = false;
      });
    }

    activate();
  }
})();