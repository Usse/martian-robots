var data = {
  grid_dimensions : {
    x : 5,
    y : 3
  },
  robots : [
    {
      initial_position : {
        x : 1,
        y : 1,
        orientation : 'E'
      },
      moves : 'RFRFRFRF'
    },
    
    {
      initial_position : {
        x : 3,
        y : 2,
        orientation : 'N'
      },
      moves : 'FRRFLLFFRRFLL'
    },
    {
      initial_position : {
        x : 0,
        y : 3,
        orientation : 'W'
      },
      moves : 'LLFFFLFLFL'
    }
    
  ]
};

module.exports = data;