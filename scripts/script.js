(function(window, document, MazeGenerator, MazePainter, Player, Cheese) {
  'use strict';

  // DOM Elements
  var canvasMaze = document.getElementById('maze');
  var canvasPlayer = document.getElementById('player');
  var bAudio = document.getElementById('audio-icon');

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

  // Maze is solved
  var solved = false;

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  function paint() {
    paintMaze();
    ctxPlayer.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    paintCheese(ctxPlayer);
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

    // If the cell is the exit
    if (MazeGenerator.areTheSameCell(currentCell, MazeGenerator.exit)) {
      if (Player.getCurrentDirection() === Player.DirectionEnum.N) {
        if (Player.y >= Cheese.y + Cheese.assetSize + Cheese.assetSize / 2) {
          solved = true;
        }
      }
      else if (Player.getCurrentDirection() === Player.DirectionEnum.E) {
        if (Player.x + Player.frameSize >= Cheese.x + Cheese.assetSize / 2) {
          solved = true;
        }
      }
      else if (Player.getCurrentDirection() === Player.DirectionEnum.S) {
        if (Player.y + Player.frameSize >= Cheese.y + Cheese.assetSize / 2) {
          solved = true;
        }
      }
      else if (Player.getCurrentDirection() === Player.DirectionEnum.W) {
        if (Player.x >= Cheese.x + Cheese.assetSize + Cheese.assetSize / 2) {
          solved = true;
        }
      }

      if (solved) {
        newGame();
        solved = false;
      }

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

  function newGame() {
    MazeGenerator.init(canvasMaze.width, canvasMaze.height, cellSize);
    MazeGenerator.generate();
    MazeGenerator.selectEntry();
    MazeGenerator.selectExit();
    MazePainter.init(canvasMaze, cellSize, cellColor, frontierColor, wallWidth, wallColor, entryColor, exitColor, 'assets/img/tile.png');
    currentCell = [MazeGenerator.entry[0], MazeGenerator.entry[1]];
    Player.init(MazeGenerator.entry[1] * cellSize, MazeGenerator.entry[0] * cellSize, 'assets/img/rat-spritesheet.png', 3, 32, canvasPlayer.width, canvasPlayer.height, MazeGenerator.getMaze());
    Cheese.setPosition(MazeGenerator.exit[1] * cellSize, MazeGenerator.exit[0] * cellSize);
  }

  function initializeAudio() {
    var audioElement = new AudioElement('assets/audio/poc.mp3');
    document.body.appendChild(audioElement);
    audioElement.play();

    bAudio.addEventListener('click', function() {
      if (audioElement.volume === 1) {
        audioElement.volume = 0;
        bAudio.classList.add('fa-volume-off');
        bAudio.classList.remove('fa-volume-up');
      }
      else {
        audioElement.volume = 1;
        bAudio.classList.add('fa-volume-up');
        bAudio.classList.remove('fa-volume-off');
      }
    });
  }

  newGame();

  var paintMaze = MazePainter.startPainting.bind(MazePainter);
  var updatePlayer = Player.update.bind(Player);
  var paintPlayer = Player.paint.bind(Player);
  var paintCheese = Cheese.paint.bind(Cheese);

  document.addEventListener('keydown', Player.handleKeyDown.bind(Player));
  document.addEventListener('keyup', Player.handleKeyUp.bind(Player));

  initializeAudio();

  loop();

}(window, document, MazeGenerator, MazePainter, Player, Cheese, AudioElement));
