(function(window, document, MazeGenerator, MazePainter) {
  'use strict';

  // DOM Elements
  var canvasMaze = document.getElementById('maze');
  var bGenerate = document.getElementById('bGenerate');

  // Initialization variables
  var cellSize = 40;
  var cellColor = '#fff';
  var frontierColor = '#f00';
  var wallColor = '#000';
  var entryColor = '#0f0';
  var exitColor = '#0f0';

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  function paint() {
    paintMaze();
  }

  function update() {
  
  }

  function loop() {
    update();
    paint();
    window.requestAnimationFrame(loop);
  }
  
  MazeGenerator.init(canvasMaze.width, canvasMaze.height, cellSize);
  MazeGenerator.generate();
  MazeGenerator.selectEntry();
  MazeGenerator.selectExit();

  MazePainter.init(canvasMaze, cellSize, cellColor, frontierColor, wallColor, entryColor, exitColor, null, null);

  var paintMaze = MazePainter.startPainting.bind(MazePainter);

  loop();
  


}(window, document, MazeGenerator, MazePainter));
