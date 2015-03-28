(function() {
  'use strict';
  angular.module('pk-sequencer').config(sequencerRoutes);

  function sequencerRoutes($stateProvider) {
    $stateProvider
      .state('sequencer', {
        url: '/',
        templateUrl: '/templates/sequencer/sequencer.tpl.html',
        controller: 'SequencerCtrl as ctrl'
      });
  }
})();
