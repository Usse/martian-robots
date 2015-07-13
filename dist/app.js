/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _grid = __webpack_require__(1);

	var _robot = __webpack_require__(2);

	var _input = __webpack_require__(5);

	var _input2 = _interopRequireDefault(_input);

	var mars = new _grid.Grid(_input2['default'].grid_dimensions.x, _input2['default'].grid_dimensions.y);

	var robots = [];
	_input2['default'].robots.forEach(function (r) {
	  var robot = new _robot.Robot(r.initial_position.x, r.initial_position.y, r.initial_position.orientation, r.moves);
	  robots.push(robot);
	});

	robots.forEach(function (robot) {
	  robot.move(mars);
	  console.log(robot.x + ' ' + robot.y + ' ' + robot.orientation, robot.isLost ? 'LOST' : '');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Grid = (function () {
	  function Grid(x, y) {
	    var scents = arguments[2] === undefined ? [] : arguments[2];

	    _classCallCheck(this, Grid);

	    if (x > 50 || y > 50) throw new RangeError("Max Grid size is 50");else if (x < 0 || y < 0) throw new RangeError("Min Grid size is 0");else if (isNaN(x) || isNaN(y)) throw new TypeError("Grid size must be an Integer");else {
	      this.x = x;
	      this.y = y;
	      this.scents = [];
	    }
	  }

	  _createClass(Grid, [{
	    key: "isOutOfGrid",
	    value: function isOutOfGrid(x, y) {
	      return x < 0 || y < 0 || x > this.x || y > this.y;
	    }
	  }, {
	    key: "isScented",
	    value: function isScented(x, y) {
	      var found = false;
	      this.scents.forEach(function (scent) {
	        if (scent.x === x && scent.y === y) {
	          found = true;
	        }
	      });
	      return found;
	    }
	  }]);

	  return Grid;
	})();

	exports.Grid = Grid;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Robot = (function () {
	  function Robot(x, y, orientation) {
	    var instructions = arguments[3] === undefined ? '' : arguments[3];

	    _classCallCheck(this, Robot);

	    this.x = x;
	    this.y = y;
	    this.orientation = orientation;
	    this.instructions = instructions.split('');
	    this.isLost = false;
	  }

	  _createClass(Robot, [{
	    key: 'turn',
	    value: function turn(direction) {
	      var turning = {
	        'L': { 'N': 'W', 'E': 'N', 'S': 'E', 'W': 'S' },
	        'R': { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' }
	      };
	      return this.orientation = turning[direction][this.orientation];
	    }
	  }, {
	    key: 'goForward',
	    value: function goForward(grid) {
	      var moveForward = {
	        'N': { x: this.x, y: this.y + 1 },
	        'E': { x: this.x + 1, y: this.y },
	        'S': { x: this.x, y: this.y - 1 },
	        'W': { x: this.x - 1, y: this.y }
	      };

	      var nextMove = {
	        x: moveForward[this.orientation].x,
	        y: moveForward[this.orientation].y
	      };

	      this.isPossibleToMove(grid, nextMove.x, nextMove.y);
	    }
	  }, {
	    key: 'isPossibleToMove',
	    value: function isPossibleToMove(grid, x, y) {
	      if (grid.isOutOfGrid(x, y)) {
	        if (!grid.isScented(x, y)) {
	          this.isLost = true;
	          this.leaveScent(grid, x, y);
	        }
	      } else {
	        this.x = x;
	        this.y = y;
	      }
	    }
	  }, {
	    key: 'leaveScent',
	    value: function leaveScent(grid, x, y) {
	      grid.scents.push({
	        x: x,
	        y: y
	      });
	    }
	  }, {
	    key: 'move',
	    value: function move(grid) {
	      for (var i = 0; i < this.instructions.length; i++) {
	        if (!this.isLost) {
	          if (this.instructions[i] == 'F') {
	            this.goForward(grid);
	          } else {
	            this.turn(this.instructions[i]);
	          }
	        } else {
	          return;
	        }
	      }
	    }
	  }]);

	  return Robot;
	})();

	exports.Robot = Robot;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var data = {
	  grid_dimensions: {
	    x: 5,
	    y: 3
	  },
	  robots: [{
	    initial_position: {
	      x: 1,
	      y: 1,
	      orientation: 'E'
	    },
	    moves: 'RFRFRFRF'
	  }, {
	    initial_position: {
	      x: 3,
	      y: 2,
	      orientation: 'N'
	    },
	    moves: 'FRRFLLFFRRFLL'
	  }, {
	    initial_position: {
	      x: 0,
	      y: 3,
	      orientation: 'W'
	    },
	    moves: 'LLFFFLFLFL'
	  }]
	};

	module.exports = data;

/***/ }
/******/ ]);