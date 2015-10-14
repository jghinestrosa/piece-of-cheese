var Player = (function() {

  var x;
  var y;

  var asset = new Image();

  var frame = 0;
  var tickCount = 0;
  var ticksPerFrame = 4;

  var frameRow = 0;

  var currentDirection = null;

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
        frame = (frame + 1) % this.numberOfFrames;
        tickCount = 0;
      }
      else {
        tickCount++;
      }
    },

    paint: function(ctx) {
      ctx.clearRect(this.x, this.y, this.frameSize, this.frameSize);
      ctx.drawImage(asset, 0, frameRow, this.frameSize, this.frameSize, this.x, this.y, this.frameSize, this.frameSize);

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
    }
  
  };

}());
