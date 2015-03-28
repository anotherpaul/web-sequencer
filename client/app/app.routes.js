(function() {
  'use strict';
  angular.module('app').config(appRoutes);

  function appRoutes($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }
})();
