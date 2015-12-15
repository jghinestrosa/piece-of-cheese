var AudioElement = (function(document) {
  'use strict';

  return function(src) {
    var audio = document.createElement('audio');
    audio.src = src;
    audio.loop = true;
    return audio;
  };
}(document));
