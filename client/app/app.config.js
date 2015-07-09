(function() {
  'use strict';
  angular.module('app').config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('light-blue');
  });
})();
