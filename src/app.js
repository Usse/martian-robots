
import {Grid} from './grid';
import {Robot} from './robot';
import data from '../input';


var mars = new Grid(
  data.grid_dimensions.x,
  data.grid_dimensions.y
);


var robots = [];
data.robots.forEach(function(r) {
  var robot = new Robot(
    r.initial_position.x,
    r.initial_position.y,
    r.initial_position.orientation,
    r.moves    
  );
  robots.push(robot);
});


robots.forEach(function(robot) {
  robot.move(mars);
  console.log(
    robot.x + ' ' + 
    robot.y + ' ' + 
    robot.orientation, 
    (robot.isLost) ? 'LOST' : ''
  );
});







