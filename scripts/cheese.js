var Cheese = (function() {
  'use strict';

  var asset = new Image();

  asset.src = 'assets/img/cheese.png';

  return {
    x: 0,

    y: 0,

    assetSize: 32,

    setPosition: function(x, y) {
      this.x = x;
      this.y = y;
    },

    paint: function(ctx) {
      ctx.drawImage(asset, 0, 0, this.assetSize, this.assetSize, this.x, this.y, this.assetSize, this.assetSize);
    }
  };

}());
