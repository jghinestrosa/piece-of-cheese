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
  var wallColor = '#5D3E33';
  var wallWidth = 5;
  var entryColor = '#0f0';
  var exitColor = '#0f0';

  // Player position in maze
  var currentCell = null;

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  function paint() {
    paintMaze();
    paintPlayer(ctxPlayer);
  }

  function update() {
    updatePlayer();
  }

  function checkCollisions() {
    var cell = null;

    // Collisions outer walls
    if (Player.x < 0 || Player.x + Player.frameSize >= canvasMaze.width || Player.y < 0 || Player.y + Player.frameSize >= canvasMaze.height) {
      Player.onCollision();
      return;
    }

    // Collisions inner walls
    if (Player.getCurrentDirection() === Player.DirectionEnum.N) {
      cell = [getPositionFromCoordinate(Player.y), getPositionFromCoordinate(Player.x + (Player.frameSize / 2))];
    }
    else if (Player.getCurrentDirection() === Player.DirectionEnum.E) {
      cell = [getPositionFromCoordinate(Player.y + (Player.frameSize / 2)), getPositionFromCoordinate(Player.x + Player.frameSize)];
    }
    else if (Player.getCurrentDirection() === Player.DirectionEnum.S) {
      cell = [getPositionFromCoordinate(Player.y + Player.frameSize), getPositionFromCoordinate(Player.x + (Player.frameSize / 2))];
    }
    else if (Player.getCurrentDirection() === Player.DirectionEnum.W) {
      cell = [getPositionFromCoordinate(Player.y + (Player.frameSize / 2)), getPositionFromCoordinate(Player.x)];
    }

    if (!MazeGenerator.areTheSameCell(cell, currentCell) && !MazeGenerator.areCellsJoined(cell, currentCell)) {
      Player.onCollision();
    }
    else {
      currentCell = cell;
    }
  }

  function loop() {
    update();
    checkCollisions();
    paint();
    window.requestAnimationFrame(loop);
  }

  function getPositionFromCoordinate(coord) {
    return Math.floor(coord / MazeGenerator.cellSize);
  }

  MazeGenerator.init(canvasMaze.width, canvasMaze.height, cellSize);
  MazeGenerator.generate();
  MazeGenerator.selectEntry();
  MazeGenerator.selectExit();

  MazePainter.init(canvasMaze, cellSize, cellColor, frontierColor, wallWidth, wallColor, entryColor, exitColor, 'assets/img/tile.png');

  currentCell = [MazeGenerator.entry[0], MazeGenerator.entry[1]];

  Player.init(MazeGenerator.entry[1] * cellSize, MazeGenerator.entry[0] * cellSize, 'assets/img/rat-spritesheet.png', 3, 32, canvasPlayer.width, canvasPlayer.height, MazeGenerator.getMaze());

  var paintMaze = MazePainter.startPainting.bind(MazePainter);
  var updatePlayer = Player.update.bind(Player);
  var paintPlayer = Player.paint.bind(Player);

  document.addEventListener('keydown', Player.handleKeyDown.bind(Player));
  document.addEventListener('keyup', Player.handleKeyUp.bind(Player));

  loop();
  


}(window, document, MazeGenerator, MazePainter, Player));
