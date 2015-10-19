var Player = (function() {
  'use strict';

  var x;
  var y;

  var asset = new Image();

  var frame = 0;
  var tickCount = 0;
  var ticksPerFrame = 4;

  var frameRow = 0;

  var currentDirection = null;

  var isKeyDown = false;

  var previousX;
  var previousY;

  var pressedKeys = [];
  var availableKeys = [];

  var KeysEnum = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  Object.keys(KeysEnum).forEach(function(key) {
    availableKeys.push(KeysEnum[key]);
  });

  return {
    init: function(x, y, assetURL, numberOfFrames, frameSize, canvasWidth, canvasHeight) {
      this.x = x;
      this.y = y;
      asset.src = assetURL;

      this.numberOfFrames = numberOfFrames;
      this.frameSize = frameSize;

      this.changeDirection(this.DirectionEnum.E);

      this.v = 1;
      this.t = 1;

      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
    },

    update: function() {

      if (isKeyDown) {
        this.move();
      }

      if (tickCount > ticksPerFrame) {
        tickCount = 0;

        if (!isKeyDown) {
          frame = 0;
        }
        else {
          frame = (frame + 1) % this.numberOfFrames;

          if (frame === 0) {
            frame = 1;
          }
        }
      }
      else {
        tickCount++;
      }
    },

    paint: function(ctx) {
      //ctx.clearRect(this.x, this.y, this.frameSize, this.frameSize);
      ctx.drawImage(asset, frame * this.frameSize, frameRow, this.frameSize, this.frameSize, this.x, this.y, this.frameSize, this.frameSize);

      //ctx.drawImage(asset, frame * this.frameSize, 0, this.frameSize, this.frameSize, this.x, this.y, this.frameSize, this.frameSize);
    },

    changeDirection: function(direction) {
      currentDirection = direction;
      frameRow = currentDirection * this.frameSize;
    },

    getCurrentDirection: function() {
      return currentDirection;
    },

    DirectionEnum: {
      N: 0,
      E: 1,
      S: 2,
      W: 3
    },

    handleKeyDown: function(evt) {
      if (availableKeys.indexOf(evt.keyCode) !== -1) {
        evt.preventDefault();
        this.pressKey(evt.keyCode);
      }
    },

    pressKey: function(key) {
      var direction;

      switch (key) {
        case KeysEnum.LEFT:
          direction = this.DirectionEnum.W;
          break;
        case KeysEnum.UP:
          direction = this.DirectionEnum.N;
          break;
        case KeysEnum.RIGHT:
          direction = this.DirectionEnum.E;
          break;
        case KeysEnum.DOWN:
          direction = this.DirectionEnum.S;
          break;
      }

      this.changeDirection(direction);

      if (pressedKeys.indexOf(key) === -1) {
        pressedKeys.push(key);
      }

      isKeyDown = true;
    },

    handleKeyUp: function(evt) {
      this.releaseKey(evt.keyCode);
    },

    releaseKey: function(key) {
      
      if (pressedKeys.indexOf(key) !== -1) {
        pressedKeys.splice(pressedKeys.indexOf(key), 1);
      }

      if (pressedKeys.length > 0) {
        switch (pressedKeys[pressedKeys.length - 1]) {
          case KeysEnum.LEFT:
            this.changeDirection(this.DirectionEnum.W);
            break;
          case KeysEnum.UP:
            this.changeDirection(this.DirectionEnum.N);
            break;
          case KeysEnum.RIGHT:
            this.changeDirection(this.DirectionEnum.E);
            break;
          case KeysEnum.DOWN:
            this.changeDirection(this.DirectionEnum.S);
            break;
        }
      }
      else {
        isKeyDown = false;
      }

    },

    move: function() {
      previousX = this.x;
      previousY = this.y;

      if (currentDirection === this.DirectionEnum.N) {
        this.y = this.y - this.v * this.t;
      }
      else if (currentDirection === this.DirectionEnum.E) {
        this.x = this.x + this.v * this.t;
      }
      else if (currentDirection === this.DirectionEnum.S) {
        this.y = this.y + this.v * this.t;
      }
      else if (currentDirection === this.DirectionEnum.W) {
        this.x = this.x - this.v * this.t;
      }
    },

    onCollision: function() {
      this.x = previousX;
      this.y = previousY;
    }

  };

}());
