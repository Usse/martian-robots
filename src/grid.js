export class Grid {

  constructor(x,y, scents = []) {
    if (x > 50 || y > 50) throw new RangeError("Max Grid size is 50");
    else if (x < 0 || y < 0) throw new RangeError("Min Grid size is 0");
    else if (isNaN(x) || isNaN(y)) throw new TypeError("Grid size must be an Integer");
    else {
      this.x = x;
      this.y = y;
      this.scents = [];
    }
  }


  isOutOfGrid(x, y) {
    return (x < 0 || y < 0 || x > this.x || y > this.y);
  }


  isScented(x,y) {
    var found = false;
    this.scents.forEach(function(scent) {
      if(scent.x === x && scent.y === y) {
        found = true;
      }
    });
    return found;
  }
};



