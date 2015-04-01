(function() {
  'use strict';
  angular.module('pk-sequencer').controller('SequencerCtrl', SequencerCtrl);

  function SequencerCtrl($interval, pkMidiService, _) {
    var vm = this;
    vm.playCurrentNotes = playCurrentNotes;
    vm.startBarPlayback = startBarPlayback;
    vm.stopBarPlayback = stopBarPlayback;
    vm.loading = false;
    vm.applyInstrument = applyInstrument;
    vm.tempoBpm = 120;
    vm.beatCount = 16;
    vm.currentNotes = {};
    vm.currentBar = [];
    vm.drumNote = 0;
    vm.availableInstruments = [{
      value: 0,
      name: 'piano'
    }, {
      value: 118,
      name: 'percussion'
    }];

    vm.tracks = [];
    vm.currentTrackIndex = 0;
    vm.currentBarIndex = 0;
    vm.loopPlayback = false;

    var playbackHandle;

    vm.selectedInstument = vm.availableInstruments[1];

    function applyInstrument() {
      if (vm.tracks[vm.currentTrackIndex]) {
        vm.tracks[vm.currentTrackIndex].instrument = vm.selectedInstument;
        pkMidiService.changeInstrument(vm.tracks[vm.currentTrackIndex].channel, vm.tracks[vm.currentTrackIndex].instrument.value);
      }
    }

    function playChord(channel, notes, delay) {
      if (!_.isEmpty(notes)) {
        Object.keys(notes).forEach(function(key) {
          pkMidiService.playNote(channel, key, notes[key], delay);
        });
      }
    }

    function playCurrentNotes() {
      playChord(vm.tracks[vm.currentTrackIndex].channel, vm.currentNotes, 0);
    }

    function startBarPlayback() {
      stopBarPlayback();
      vm.currentBeatIndex = 0;
      playbackHandle = $interval(function() {
        playChord(vm.tracks[vm.currentTrackIndex].channel, vm.currentBar[vm.currentBeatIndex], 0);
        vm.currentBeatIndex = vm.currentBeatIndex + 1;        
        if (vm.currentBeatIndex >= vm.beatCount) {
          if (vm.loopPlayback) {
            vm.currentBeatIndex = 0;
          } else {
            stopBarPlayback();
          }
        }
      }, 15 * 1000 / vm.tempoBpm);
    }

    function stopBarPlayback() {
      if (playbackHandle) {
        $interval.cancel(playbackHandle);
        playbackHandle = undefined;
      }
    }

    function initTracks() {
      vm.tracks = [{
        title: 'drums',
        instrument: vm.availableInstruments[1],
        channel: 0,
        bars: []
      }];
      vm.tracks.forEach(function(track) {
        pkMidiService.changeInstrument(track.channel, track.instrument.value);
      });
      vm.currentBar = vm.tracks[vm.currentTrackIndex].bars[vm.currentBarIndex] = [];
    }

    function activate() {
      vm.loading = true;
      pkMidiService.load().then(function() {
        vm.loading = false;
        initTracks();
      });
    }
    activate();
  }
})();