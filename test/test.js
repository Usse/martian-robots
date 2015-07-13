
var assert = require("assert");
var chai = require('chai');
var expect = chai.expect;



import {Grid} from '../src/grid';
import {Robot} from '../src/robot';


describe('MartianRobots', function() {
  
  
  describe('Grid', function () {
    it('create a Grid', function () {
      var mars = new Grid(5,3);
      assert.equal(5, mars.x);
      assert.equal(3, mars.y);

      expect(function() {
        var jupiter = new Grid(90,90);
      }).to.throw(RangeError);

      expect(function() {
        var pluto = new Grid(-3,-3);
      }).to.throw(RangeError);

      expect(function() {
        var stringWorld = new Grid('one','two');
      }).to.throw(TypeError);
    });

    it('check if a position is scented', function () {
      var mars = new Grid(5,3);
      assert.equal(false, mars.isScented(2,2));
      mars.scents.push({x:3,y:4});
      assert.equal(true, mars.isScented(3,4));
    });

    it('check grid dimensions', function () {
      var mars = new Grid(5,3);
      assert.equal(false, mars.isOutOfGrid(2,2));
      assert.equal(false, mars.isOutOfGrid(5,3));
      assert.equal(true, mars.isOutOfGrid(3,5));
      assert.equal(true, mars.isOutOfGrid(7,7));
      assert.equal(false, mars.isOutOfGrid(0,0));
      assert.equal(true, mars.isOutOfGrid(-2,-2));
    });
  });


  describe('Robot', function () {
    it('create a Robot', function () {
      var johnny5 = new Robot(0,0,'N','LFR');
      assert.equal(0, johnny5.x);
      assert.equal(0, johnny5.y);
      assert.equal('N', johnny5.orientation);
      assert.equal('L', johnny5.instructions[0]);
      assert.equal('F', johnny5.instructions[1]);
      assert.equal('R', johnny5.instructions[2]);  
    });

    it('the Robot can turn', function () {
      var johnny5 = new Robot(0,0,'N');

      assert.equal('W', johnny5.turn('L'));
      assert.equal('N', johnny5.turn('R'));

      assert.equal('E', johnny5.turn('R'));
      assert.equal('N', johnny5.turn('L'));

      //full turn right
      assert.equal('E', johnny5.turn('R'));
      assert.equal('S', johnny5.turn('R'));
      assert.equal('W', johnny5.turn('R'));
      assert.equal('N', johnny5.turn('R'));

      //full turn left
      assert.equal('W', johnny5.turn('L'));
      assert.equal('S', johnny5.turn('L'));
      assert.equal('E', johnny5.turn('L'));
      assert.equal('N', johnny5.turn('L'));
    });

    it('the Robot can move forward', function () {
      var mars = new Grid(5,3);
      var johnny5 = new Robot(0,0,'N');

      johnny5.goForward(mars);
      assert.equal(0, johnny5.x);
      assert.equal(1, johnny5.y);

      johnny5.turn('R');
      johnny5.goForward(mars);
      assert.equal(1, johnny5.x);
      assert.equal(1, johnny5.y);

      johnny5.turn('R');
      johnny5.goForward(mars);
      assert.equal(1, johnny5.x);
      assert.equal(0, johnny5.y);

      johnny5.turn('R');
      johnny5.goForward(mars);
      assert.equal(0, johnny5.x);
      assert.equal(0, johnny5.y);
    });
  });


});