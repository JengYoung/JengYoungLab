
//
//   Mover
//
//////////////////////////////////////////////////////////////////////

/*
This is a general-purpose class used for modeling natural & physics-
based behavior in the examples here: https://codepen.io/collection/AZQJjV/

It includes behavior for applying physical forces – such as wind
or gravity, attracting or repelling other Mover objects, and reversing
direction based on walls or ceilings.

This implementation also includes a draw() method for drawing a
representation of the mover to a Canvas context, but the draw method
could easily be repurposed for other drawing environments, such as WebGL.
*/

import { vec2 } from 'gl-matrix'

interface OptionsInterface {
  x: number;
  y: number;
  canvasWidth: number;
  canvasHeight: number;
  color: string;
  mass: number;
  size: number;
  maxSeekSpeed?: vec2
  maxSeekForce?: vec2
}

interface SelfInterface extends OptionsInterface{
  location: vec2 | null,
  velocity: vec2 | null,
  acceleration: vec2 | null,
  gravitationalConstant: 1,
  wanderTheta: 0;
  applyForce?: (param: vec2) => void;
  draggable?: DraggableSelfInterface;
  [index: string]: any;
}

export const Mover = function (options: OptionsInterface) {
  //
  //   Private Vars
  //
  ///////////////////////////////////////////////////

  var self: SelfInterface = {
    x: 0,
    y: 0,
    location: null,
    velocity: null,
    acceleration: null,
    mass: options.mass,
    size: options.size,
    color: options.color,
    gravitationalConstant: 1,
    canvasWidth: options.canvasWidth,
    canvasHeight: options.canvasHeight,
    wanderTheta: 0
  };



  //
  //   Private Methods
  //
  ///////////////////////////////////////////////////
  function DraggableClass(c: any, object: SelfInterface) {
    return new c({object})
  }

  var _init = function () {
    var x = typeof options.x !== 'undefined' ? options.x : self.canvasWidth / 2;
    var y = typeof options.y !== 'undefined' ? options.y : 0;
    self.maxSeekSpeed = typeof options.maxSeekSpeed !== 'undefined' ? options.maxSeekSpeed : vec2.fromValues(2, 2);
    self.maxSeekForce = typeof options.maxSeekForce !== 'undefined' ? options.maxSeekForce : vec2.fromValues(0.15, 0.15);

    self.location = vec2.fromValues(x, y);
    self.velocity = vec2.fromValues(0, 0);
    self.acceleration = vec2.fromValues(0, 0);

    // Make draggable
    self.draggable = DraggableClass(Draggable, self);

  };

  var _constrain = function (value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  };

  //
  //   Public Methods
  //
  ///////////////////////////////////////////////////

  self.applyForce = function (forceVector) {
    var f = vec2.create();
    vec2.divide(f, forceVector, vec2.fromValues(self.mass, self.mass));
    vec2.add(self.acceleration as vec2, self.acceleration as vec2, f);
  };

  self.attract = function (mover: any, isRepelling: boolean) {
    var constrainMin = typeof isRepelling !== 'undefined' && isRepelling ? 1 : 5;
    var constrainMax = typeof isRepelling !== 'undefined' && isRepelling ? 10000 : 25;

    var f = vec2.create();
    vec2.subtract(f, self.location as vec2, mover.location);
    var d = vec2.length(f);
    d = _constrain(d, constrainMin, constrainMax);
    vec2.normalize(f, f);
    var strength = self.gravitationalConstant * self.mass * mover.mass / (d * d);

    // If we're repelling instead of attracting
    if (typeof isRepelling !== 'undefined' && isRepelling) strength *= -1;

    vec2.multiply(f, f, vec2.fromValues(strength, strength));
    return f;
  };

  self.wander = function (radius: number, distance: number, change: number) {
    self.wanderTheta += Math.random() * (change * 2) - change;

    // Calculate the new location to steer towards on the wander circle
    var circleLoc = vec2.clone((self.velocity as vec2));
    var wanderDistance = vec2.fromValues(distance, distance);
    vec2.normalize(circleLoc, circleLoc);
    vec2.multiply(circleLoc, circleLoc, wanderDistance);
    vec2.add(circleLoc, circleLoc, self.location as vec2);

    var heading = Math.atan2((self.velocity as vec2)[1],( self.velocity as vec2)[0]);

    var circleOffset = vec2.fromValues(
    radius * Math.cos(self.wanderTheta + heading),
    radius * Math.sin(self.wanderTheta + heading));


    var target = vec2.clone(circleLoc);
    vec2.add(target, target, circleOffset);

    self.seek(target);
  };

  self.seek = function (target: vec2) {
    var desired = vec2.clone(target);
    vec2.subtract(desired, desired, self.location as vec2);
    vec2.normalize(desired, desired);
    vec2.multiply(desired, desired, self.maxSeekSpeed as vec2);
    var steer = vec2.clone(desired);
    vec2.subtract(steer, steer, self.velocity as vec2);
    if (vec2.length(steer) > vec2.length(self.maxSeekForce as vec2)) steer = self.maxSeekForce as vec2;
    self.applyForce && self.applyForce(steer);
  };

  self.update = function () {
    // If dragging, velocity is zero
    if (self.draggable && (self.draggable as DraggableSelfInterface).isDragging) self.velocity = vec2.fromValues(0, 0);

    self.acceleration && vec2.add(self.velocity as vec2, self.velocity as vec2, self.acceleration);
    self.velocity && vec2.add(self.location as vec2, self.location as vec2, self.velocity);
    self.acceleration = vec2.fromValues(0, 0);
  };
  
  self.draw = function (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = self.color;
    ctx.beginPath();
    self.location && ctx.arc(self.location[0], self.location[1], self.size, 0, 2 * Math.PI);
    ctx.fill();
  };

  self.checkEdges = function (shouldLoop: boolean) {
    var shouldLoop = typeof shouldLoop !== 'undefined' ? shouldLoop : false;

    if (self.location && self.location[0] > self.canvasWidth) {
      if (shouldLoop) {
        self.location = vec2.fromValues(0, self.location[1]);
      } else {
        self.location = vec2.fromValues(self.canvasWidth, self.location[1]);
        self.velocity && vec2.multiply(self.velocity, self.velocity, vec2.fromValues(-1, 1));
      }
    } else if (self.location && self.location[0] < 0) {
      if (shouldLoop) {
        self.location = vec2.fromValues(self.canvasWidth, self.location[1]);
      } else {
        self.velocity && vec2.multiply(self.velocity, self.velocity, vec2.fromValues(-1, 1));
        self.location = vec2.fromValues(0, self.location[1]);
      }
    }

    if (self.location && self.location[1] > self.canvasHeight) {
      if (shouldLoop) {
        self.location = vec2.fromValues(self.location && self.location[0], 0);
      } else {
        self.velocity && vec2.multiply(self.velocity, self.velocity, vec2.fromValues(1, -1));
        self.location = vec2.fromValues(self.location && self.location[0], self.canvasHeight);
      }
    }if (self.location && self.location[1] < 0) {
      if (shouldLoop) {
        self.location = vec2.fromValues(self.location[0], self.canvasHeight);
      } else {
        self.velocity && vec2.multiply(self.velocity, self.velocity, vec2.fromValues(1, -1));
        self.location = vec2.fromValues(self.location[0], 0);
      }
    }
  };


  //
  //   Initialize
  //
  ///////////////////////////////////////////////////

  _init();

  // Return the Object
  return self;
};


//
//   Draggable
//
//////////////////////////////////////////////////////////////////////

/*
An additional class that can be composed with a Mover, and gives the
Mover the ability to be dragged.
*/

export interface DraggableSelfInterface {
  $parentEl: HTMLCanvasElement;
  mover: SelfInterface | null,
  dragOffset: vec2
  isDragging: boolean
}

export function Draggable (options: {
  object: SelfInterface
}) {
  //
  //   Private Vars
  //
  ///////////////////////////////////////////////////

  var self: DraggableSelfInterface = {
    $parentEl: document.getElementById('canvas') as HTMLCanvasElement,
    mover: null,
    dragOffset: vec2.create(),
    isDragging: false
  };



  //
  //   Private Methods
  //
  ///////////////////////////////////////////////////

  var _init = function () {
    self.mover = options.object as SelfInterface;

    _addEventListeners();
  };

  console.log(self.$parentEl)
  var _addEventListeners = function () {
    self.$parentEl.addEventListener('mousedown', _onMouseDown);
    self.$parentEl.addEventListener('mousemove', _onMouseMove);
    self.$parentEl.addEventListener('mouseup', _onMouseUp);
  };

  var _onMouseDown = function (evt: MouseEvent) {
    var clickPos = vec2.fromValues(evt.offsetX, evt.offsetY);
    var objectPos = vec2.fromValues((self?.mover?.location as vec2)[0], (self?.mover?.location as vec2)[1]);
    var dist = vec2.distance(clickPos, objectPos);
    if (dist < (self?.mover?.size as number)) self.isDragging = true;

    // Get the offset of the drag
    vec2.subtract(self.dragOffset, objectPos, clickPos);
  };

  var _onMouseMove = function (evt: MouseEvent) {
    if (!self.isDragging) return false;
    var newLocation = vec2.fromValues(evt.offsetX + self.dragOffset[0], evt.offsetY + self.dragOffset[1]);
    ((self.mover as SelfInterface).location as vec2) = newLocation as vec2;
    return true;
  };

  var _onMouseUp = function () {
    self.isDragging = false;
  };


  //
  //   Public Methods
  //
  ///////////////////////////////////////////////////

  // No public methods so far

  //
  //   Initialize
  //
  ///////////////////////////////////////////////////

  _init();

  // Return the Object
  return self;
};