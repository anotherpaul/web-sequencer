'use strict';

var path = require('path');
var vendorFileList = [
  'angular/angular.min.js',
  'lodash/lodash.min.js'
];
var vendorDir = './public/vendor';
var vendorFiles = vendorFileList.map(function(entry) {
  return path.join(vendorDir, entry);
});

module.exports = {
  vendorFiles: vendorFiles
};