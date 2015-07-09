(function () {
  'use strict';
  angular.module('pk-instrument').directive('pkInstrument', pkInstrument);

  function pkInstrument() {
    return {
      restrict: 'E',
      scope: {
        notes: '=',
        track: '=',
        noteParams: '='
      },
      templateUrl: 'templates/instrument/instrument.directive.tpl.html',
      controller: 'pkInstrumentCtrl as ctrl'
    };
  }
})();