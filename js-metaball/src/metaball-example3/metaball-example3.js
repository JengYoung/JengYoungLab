/**
 * @descriptions just clone codepen's code.
 * @see https://codepen.io/cmalven/pen/NoWPrg
 */
import dat from 'dat.gui';
import { Mover } from './Mover.ts'
import { vec2 } from 'gl-matrix'

const canvas = document.createElement('canvas');
canvas.id = 'canvas';

document.querySelector('#app').appendChild(canvas)

const Canvas = function() {
  //
  //   Private Vars
  //
  ///////////////////////////////////////////////////
 
  let self = {
    $canvasEl: document.getElementById('canvas'),
    canvas: null,
    ctx: null,
    gui: null,
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    orbs: [],
    settings: {
      numOrbs: 20,
      minOrbSize: 5,
      maxOrbSize: 80,
      handleSize: 2.4,
      orbMassMultiplier: 0.001,
      minV: 0.18,
      maxV: 1.7,
      maxDistModifier: 1.1,
      orbGradientStart: '#ffbd9e',
      orbGradientEnd: '#7828e9',
      bgGradientStart: '#e1d3f5',
      bgGradientEnd: '#ffe0d2'
    }
  };
 
 
  //
  //   Private Methods
  //
  ///////////////////////////////////////////////////
  
  const _init = function() {
    _addGui();
    _createCanvas();
    _setup();
    window.requestAnimationFrame(_update);
  };
 
  const _addGui = function() {
    self.gui = new dat.GUI();
    self.gui.close();
    self.gui.add(self.settings, 'numOrbs', 2, 200).step(1);
    self.gui.add(self.settings, 'minOrbSize', 5, 500).step(1);
    self.gui.add(self.settings, 'maxOrbSize', 5, 150).step(1);
    self.gui.add(self.settings, 'minV', 0.01, 2).step(0.01);
    self.gui.add(self.settings, 'maxV', 0.01, 2).step(0.01);
    self.gui.add(self.settings, 'maxDistModifier', 0.01, 4).step(0.01);
    self.gui.add(self.settings, 'orbMassMultiplier', 0.001, 0.15).step(0.005);
    self.gui.addColor(self.settings, 'orbGradientStart');
    self.gui.addColor(self.settings, 'orbGradientEnd');
    self.gui.addColor(self.settings, 'bgGradientStart');
    self.gui.addColor(self.settings, 'bgGradientEnd');

    // Destroy and rebuild on certain controller actions
    self.gui.__controllers.forEach(controller => {
      if ([
        'numOrbs',
        'minOrbSize',
        'maxOrbSize',
        'orbMassMultiplier'
      ].indexOf(controller.property) > -1 ) {
        controller.onChange(() => {
          _setup();
        });
      }
    });
    
    window.setTimeout(() => {
      self.gui.open();
    }, 4000);
  };

  const _createCanvas = function() {
    console.log(self.$canvasEl)
    self.$canvasEl.width = self.canvasWidth;
    self.$canvasEl.height = self.canvasHeight;

    self.canvas = self.$canvasEl[0];
    self.ctx = self.$canvasEl.getContext('2d');
  };

  const _setup = function() {
    self.orbs = [];
    _createCanvasElements();
  };
  
  const _createCanvasElements = function() {
    let orbIdx = self.settings.numOrbs;
    while (orbIdx--) {
      const size = Math.random() * (self.settings.maxOrbSize - self.settings.minOrbSize) + self.settings.minOrbSize;
      let orb = new Mover({
        canvasWidth: self.canvasWidth,
        canvasHeight: self.canvasHeight,
        color: self.settings.orbGradientStart,
        mass: size * self.settings.orbMassMultiplier,
        size: size
      });
      orb.location = vec2.fromValues(self.canvasWidth * Math.random(), self.canvasHeight * Math.random());
      const randX = Math.random() * 2 - 1;
      const randY = Math.random() * 2 - 1;
      orb.velocity = vec2.fromValues(randX, randY);

      self.orbs.push(orb);
    }
  };
  
  const _updateCanvasElements = function() {
    self.orbs.forEach((orb, orbIdx) => {
      orb.checkEdges(false);
      orb.update();

      // Attract other orbs
      self.orbs.forEach((otherOrb, otherOrbIdx) => {
        if (orbIdx !== otherOrbIdx) {
          const f = orb.attract(otherOrb);
          otherOrb.applyForce(f);
        }
      });
    });
  }
  
  const _drawCanvasElements = function() {
    let gradient = self.ctx.createLinearGradient(0, 0, self.canvasWidth, self.canvasHeight);
    gradient.addColorStop(0, self.settings.orbGradientStart);
    gradient.addColorStop(1, self.settings.orbGradientEnd);
    self.ctx.fillStyle = gradient;

    // Draw orbs
    self.ctx.beginPath();
    self.orbs.forEach((orb, orbIdx) => {
      self.ctx.moveTo(orb.location[0], orb.location[1]);
      self.ctx.arc(orb.location[0], orb.location[1], orb.size, 0, Math.PI*2);
    });
    self.ctx.fill();

    // Draw metaball connections
    self.ctx.beginPath();
    self.orbs.forEach((orb, orbIdx) => {
      self.orbs.forEach((otherOrb, otherOrbIdx) => {
        if (orbIdx !== otherOrbIdx) {
          _drawMetaballCurves(orb, otherOrb);
        }
      });
    });
    self.ctx.fill();
  }

  // Adapted from https://varun.ca/metaballs/
  const _drawMetaballCurves = function(orb1, orb2) {
    const radius1 = orb1.size;
    const radius2 = orb2.size;
    const center1 = orb1.location;
    const center2 = orb2.location;

    const HALF_PI = Math.PI / 2;
    const d = _dist(center1, center2);
    const maxDist = radius1 + radius2 * self.settings.maxDistModifier;
    let u1, u2;

    // If the distance is too great, return
    if (
      radius1 <= radius2 ||
      radius1 === 0 ||
      radius2 === 0 ||
      d > maxDist ||
      d <= Math.abs(radius1 - radius2)
      ) {
      return;
    }

    if (d < radius1 + radius2) {
      u1 = Math.acos(
        (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d),
      );
      u2 = Math.acos(
        (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d),
      );
    } else {
      u1 = 0;
      u2 = 0;
    }

    // All the angles
    const angleBetweenCenters = _angle(center2, center1);
    const maxSpread = Math.acos((radius1 - radius2) / d);

    const dist = _dist(center2, center1);
    const v = _mapToRange(dist, 0, maxDist, self.settings.maxV, self.settings.minV);

    const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v;
    const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v;
    const angle3 = angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
    const angle4 = angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;

    // Points
    const p1 = _getVector(center1, angle1, radius1);
    const p2 = _getVector(center1, angle2, radius1);
    const p3 = _getVector(center2, angle3, radius2);
    const p4 = _getVector(center2, angle4, radius2);

    // Define handle length by the distance between both ends of the curve
    const totalRadius = radius1 + radius2;
    const d2Base = Math.min(v * self.settings.handleSize, _dist(p1, p3) / totalRadius);

    // Take into account when circles are overlapping
    const d2 = d2Base * Math.min(1, d * 2 / (radius1 + radius2));

    const r1 = radius1 * d2;
    const r2 = radius2 * d2;

    const h1 = _getVector(p1, angle1 - HALF_PI, r1);
    const h2 = _getVector(p2, angle2 + HALF_PI, r1);
    const h3 = _getVector(p3, angle3 + HALF_PI, r2);
    const h4 = _getVector(p4, angle4 - HALF_PI, r2);

    self.ctx.moveTo(p1[0], p1[1]);
    self.ctx.bezierCurveTo(
      h1[0], h1[1],
      h3[0], h3[1],
      p3[0], p3[1]
    );
    self.ctx.lineTo(p4[0], p4[1]);
    self.ctx.bezierCurveTo(
      h4[0], h4[1],
      h2[0], h2[1],
      p2[0], p2[1]
    );
  };

  const _getVector = function([cx, cy], a, r) {
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const _dist = function([x1, y1], [x2, y2]) {
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
  };

  const _angle = function([x1, y1], [x2, y2]) {
    return Math.atan2(y1 - y2, x1 - x2);
  };

  const _mapToRange = function(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  const _drawBackground = function() {
    let gradient = self.ctx.createLinearGradient(0, 0, self.canvasWidth, self.canvasHeight);
    gradient.addColorStop(0, self.settings.bgGradientStart);
    gradient.addColorStop(1, self.settings.bgGradientEnd);
    self.ctx.fillStyle = gradient;
    self.ctx.fillRect(0, 0, self.canvasWidth, self.canvasHeight);
    self.ctx.stroke();
  };

  const _update = function() {
    _drawBackground();
    _updateCanvasElements();
    _drawCanvasElements();
    
    window.requestAnimationFrame(_update);
  }
 
 
  //
  //   Initialize
  //
  ///////////////////////////////////////////////////
  
  _init();

  // Return the Object
  return self;
}

new Canvas();