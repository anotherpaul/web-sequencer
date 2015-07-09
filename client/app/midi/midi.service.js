(function() {
  'use strict';
  angular.module('pk-midi').factory('pkMidiService', pkMidiService);

  function pkMidiService($q, MIDI, _, $timeout) {
    function playNote(channel, noteIndex, noteParams, delay) {
      MIDI.noteOn(channel, noteIndex, noteParams.velocity, delay);
      $timeout(function(){
        MIDI.noteOff(channel, noteIndex, 0);
      }, delay + noteParams.duration * 1000);
    }

    function playChord(channel, notes, delay) {
      if (!_.isEmpty(notes)) {
        Object.keys(notes).forEach(function(key) {
          playNote(channel, key, notes[key], delay);
        });
      }
    }

    function changeInstrument(channel, instrument) {
      MIDI.programChange(channel, instrument, 0);
    }

    function load() {
      var deferred = $q.defer();
      MIDI.loadPlugin({
        soundfontUrl: './soundfont/',
        instruments: ['synth_drum', 'acoustic_grand_piano'],
        onsuccess: function() {
          MIDI.setVolume(0, 127, 0);
          deferred.resolve();
        }
      });
      return deferred.promise;
    }

    return {
      playNote: playNote,
      playChord: playChord,
      load: load,
      changeInstrument: changeInstrument
    };
  }
})();
