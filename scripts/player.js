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

  return {
    init: function(x, y, assetURL, numberOfFrames, frameSize) {
      this.x = x;
      this.y = y;
      asset.onload = function() {
        console.log('loaded');
      };
      asset.src = assetURL;

      this.numberOfFrames = numberOfFrames;
      this.frameSize = frameSize;

      currentDirection = this.DirectionEnum.E;
    },

    update: function() {

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
      ctx.clearRect(this.x, this.y, this.frameSize, this.frameSize);
      //ctx.drawImage(asset, 0, frameRow, this.frameSize, this.frameSize, this.x, this.y, this.frameSize, this.frameSize);
      ctx.drawImage(asset, frame * this.frameSize, frameRow, this.frameSize, this.frameSize, this.x, this.y, this.frameSize, this.frameSize);

      //ctx.drawImage(asset, frame * this.frameSize, 0, this.frameSize, this.frameSize, this.x, this.y, this.frameSize, this.frameSize);
    },

    changeDirection: function(direction) {
      currentDirection = direction;
      frameRow = currentDirection * this.frameSize;
    },

    DirectionEnum: {
      N: 0,
      E: 1,
      S: 2,
      W: 3
    },

    handleKeyDown: function(evt) {
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
      isKeyDown = false;
    }
  };

}());
