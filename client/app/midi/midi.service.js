(function() {
  'use strict';
  angular.module('pk-midi').factory('pkMidiService', pkMidiService);

  function pkMidiService($q, MIDI) {
    function playNote(channel, noteIndex, noteParams, delay) {
      MIDI.noteOn(channel, noteIndex, noteParams.velocity, delay);
      MIDI.noteOff(channel, noteIndex, delay + noteParams.duration);
    }

    function changeInstrument(channel, instrument) {
      MIDI.programChange(channel, instrument);
    }

    function load() {
      var deferred = $q.defer();
      MIDI.loadPlugin({
        soundfontUrl: './soundfont/',
        instruments: ['synth_drum', 'acoustic_grand_piano'],
        onsuccess: function() {
          MIDI.setVolume(0, 127);
          deferred.resolve();
        }
      });
      return deferred.promise;
    }

    return {
      playNote: playNote,
      load: load,
      changeInstrument: changeInstrument
    };
  }
})();
