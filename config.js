'use strict';

var path = require('path');
var vendorFileList = [
  'angular/angular.min.js',
  'angular-busy/dist/angular-busy.min.js',
  'angular-busy/dist/angular-busy.min.css',
  'lodash/lodash.min.js',
  'midi/build/MIDI.js',
  'midi/inc/shim/Base64.js',
  'midi/inc/shim/Base64binary.js'
];
var vendorDir = './public/vendor';
var vendorFiles = vendorFileList.map(function(entry) {
  return path.join(vendorDir, entry);
});

var soundfonts = [
  './bower_components/midi-soundfonts-partial/FluidR3_GM/synth_drum-ogg.js',
  './bower_components/midi-soundfonts-partial/FluidR3_GM/acoustic_grand_piano-ogg.js'
];

module.exports = {
  soundfonts: soundfonts,
  vendorFiles: vendorFiles
};