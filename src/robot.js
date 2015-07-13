export class Robot {
  constructor(x,y,orientation,instructions = '') {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.instructions = instructions.split('');
    this.isLost = false;
  }


  turn(direction) {
     var turning = {
      'L': {'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S'},
      'R': {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
    };
    return this.orientation = turning[direction][this.orientation];
  }


  goForward(grid) {
    var moveForward = {
      'N': {x: this.x, y: this.y + 1},
      'E': {x: this.x + 1, y: this.y},
      'S': {x: this.x, y: this.y - 1},
      'W': {x: this.x - 1, y: this.y}
    };

    var nextMove = {
      x : moveForward[this.orientation].x,
      y : moveForward[this.orientation].y
    }

    this.isPossibleToMove(grid, nextMove.x, nextMove.y)
  }


  isPossibleToMove(grid, x, y) {
    if(grid.isOutOfGrid(x, y)) {
      if(!grid.isScented(x, y)) {
        this.isLost = true;
        this.leaveScent(grid,x, y);
      }
    } else {
      this.x = x;
      this.y = y;   
    }
  }


  leaveScent(grid,x,y) {
    grid.scents.push( {
      x : x,
      y : y
    });
  }


  move(grid) {
    for(var i=0; i<this.instructions.length; i++) {
      if(!this.isLost) {
        if(this.instructions[i] == 'F') {
         this.goForward(grid);
        } else {
          this.turn(this.instructions[i]);
        }
      } else {        
        return;
      }
    }
  }
}