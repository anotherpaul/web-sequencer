'use strict';

var path = require('path');
var vendorFileList = [
  'angular/angular.min.js',
  'angular-busy/dist/angular-busy.min.js',
  'angular-busy/dist/angular-busy.min.css',
  'lodash/lodash.min.js',
  'midi/build/MIDI.js',
  'midi/inc/Base64.js',
  'midi/inc/base64binary.js',
];
var vendorDir = './public/vendor';
var vendorFiles = vendorFileList.map(function(entry) {
  return path.join(vendorDir, entry);
});

module.exports = {
  vendorFiles: vendorFiles
};