var Player = (function() {

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

  return {
    init: function(x, y, assetURL, numberOfFrames, frameSize, canvasWidth, canvasHeight) {
      this.x = x;
      this.y = y;
      asset.onload = function() {
        console.log('loaded');
      };
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
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
      //console.log('keydown');
      switch (evt.keyCode) {
        case 37:
          this.changeDirection(this.DirectionEnum.W);
          isKeyDown = true;
          break;
        case 38:
          this.changeDirection(this.DirectionEnum.N);
          isKeyDown = true;
          break;
        case 39:
          this.changeDirection(this.DirectionEnum.E);
          isKeyDown = true;
          break;
        case 40:
          this.changeDirection(this.DirectionEnum.S);
          isKeyDown = true;
          break;
      }
    },

    handleKeyUp: function(evt) {
      //console.log('keyup');
      isKeyDown = false;
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
