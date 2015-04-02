(function() {
  'use strict';
  angular.module('pk-note').constant('pkNoteConstants', {
    names: [null, 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    defaultVelocity: 100,
    defaultDurationIndex: 1,
    durationList: [{
      value: 0.125,
      caption: '1/32'
    }, {
      value: 0.25,
      caption: '1/16'
    }, {
      value: 0.5,
      caption: '1/8'
    }, {
      value: 1,
      caption: '1/4'
    }, {
      value: 2,
      caption: '1/2'
    }, {
      value: 4,
      caption: '1/1'
    }]
  });
})();
