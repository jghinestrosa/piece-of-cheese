(function(window, document, MazeGenerator, MazePainter, Player) {
  'use strict';

  // DOM Elements
  var canvasMaze = document.getElementById('maze');
  var canvasPlayer = document.getElementById('player');
  var bGenerate = document.getElementById('bGenerate');

  var ctxPlayer = canvasPlayer.getContext('2d');

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
    paintPlayer(ctxPlayer);
  }

  function update() {
    updatePlayer();
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

  Player.init(MazeGenerator.entry[1] * cellSize, MazeGenerator.entry[0] * cellSize, 'assets/img/rat-spritesheet.png', 3, 32, canvasPlayer.width, canvasPlayer.height);

  var paintMaze = MazePainter.startPainting.bind(MazePainter);
  var updatePlayer = Player.update.bind(Player);
  var paintPlayer = Player.paint.bind(Player);

  document.addEventListener('keydown', Player.handleKeyDown.bind(Player));
  document.addEventListener('keyup', Player.handleKeyUp.bind(Player));

  loop();
  


}(window, document, MazeGenerator, MazePainter, Player));
