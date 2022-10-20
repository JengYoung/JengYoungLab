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
      maxDistModifier: 1.2,
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
    self.$canvasEl.width = self.canvasWidth;
    self.$canvasEl.height = self.canvasHeight;

    self.canvas = self.$canvasEl;
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
      
      // NOTE: 배치는 랜덤하게 뿌려줌.
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
          // NOTE: 두 거리의 차를 기반으로 나온 힘이 산출되었다.
          const f = orb.attract(otherOrb);

          // 다른 상대 Mover에 힘을 적용한다.
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
    // self.ctx.closePath()

    // Draw metaball connections
    self.ctx.beginPath();
    self.ctx.fillStyle = gradient
    self.orbs.forEach((orb, orbIdx) => {
      self.orbs.forEach((otherOrb, otherOrbIdx) => {
        if (orbIdx !== otherOrbIdx) {
          _drawMetaballCurves(orb, otherOrb);
        }
      });
    });
    self.ctx.fill();
  }

  // NOTE: 메타볼 커브를 만드는 메서드.
  // Adapted from https://varun.ca/metaballs/
  const _drawMetaballCurves = function(orb1, orb2) {
    const radius1 = orb1.size;
    const radius2 = orb2.size;
    const center1 = orb1.location;
    const center2 = orb2.location;
  
    const HALF_PI = Math.PI / 2;

    // NOTE 두 점 사이의 거리를 구해줍니다.
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
      

      /**
       * @descriptions
       * 현재 두 원이 겹쳐 있는 경우에는 접점 1,2 각도를 계산해야 한다. 이는 역코사인을 이용한다.
       * @see: https://en.wikipedia.org/wiki/Law_of_cosines
       */
      const isDistOverSumRadius = d < radius1 + radius2
      u1 = isDistOverSumRadius ? Math.acos((radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)) : 0;
      u2 = isDistOverSumRadius ? Math.acos((radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)) : 0;
      
      // All the angles
      const angleBetweenCenters = _angle(center2, center1);
      
      // NOTE: 최대 확산 각도(maximum angle of spread)를 구함.
      const maxSpread = Math.acos((radius1 - radius2) / d);
      
      const dist = _dist(center2, center1);

      // TODO: The spread for the smaller circle is (Math.PI - maxSpread) * v
    const v = _mapToRange(dist, 0, maxDist, self.settings.maxV, self.settings.minV);

    // NOTE: angle1, 2 - circle1에서의 접점을 알려줍니다.
    const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v;
    const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v;
    
    // NOTE: angle3, 4 - circle2에서의 접점각도를 알려줍니다. (Math.PI를 더하고 빼주는 이유는, 반대쪽으로 접근하기 위해서입니다.)
    const angle3 = angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
    const angle4 = angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;

    // NOTE: 각 포인트의 위치를 구합니다.
    // Points
    const p1 = _getVector(center1, angle1, radius1);
    const p2 = _getVector(center1, angle2, radius1);
    const p3 = _getVector(center2, angle3, radius2);
    const p4 = _getVector(center2, angle4, radius2);

    // Define handle length by the distance between both ends of the curve
    const totalRadius = radius1 + radius2;
    const d2Base = Math.min(v * self.settings.handleSize, _dist(p1, p3) / totalRadius);

    // Take into account when circles are overlapping
    const d2 = d2Base * Math.min(1, d * 2 / totalRadius); // 1 ~ @의 가중치가 되겠군요!

    const r1 = radius1 * d2;
    const r2 = radius2 * d2;

    // NOTE: d2라는 가중치를 통해서 평행이동한 핸들의 위치를 구현한다.
    const h1 = _getVector(p1, angle1 - HALF_PI, r1);
    const h2 = _getVector(p2, angle2 + HALF_PI, r1);
    const h3 = _getVector(p3, angle3 + HALF_PI, r2);
    const h4 = _getVector(p4, angle4 - HALF_PI, r2);
    
    // NOTE: 핸들이 곧 베지어 곡선의 역할을 해서, 이를 바탕으로 자연스러운 곡선을 그려냅니다.
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

  /**
   * @descriptions
   * 기본적으로 벡터를 구하기 위해서는 x, y의 위치를 구하면 된다.
   * 이때, cos과 sin을 이용하면 쉽게 구할 수 있다.
   * cos = 밑변 / 빗변 
   * sin = 빗변 / 높이
   * 
   * 이때, 빗변은 r이다. 따라서 cos과 sin값에 반지름(빗변) 곱하면 벡터를 구할 수 있다.
   * @param {number, number} param0 
   * @param {number} a 
   * @param {number} r 
   * 
   * @returns {[number, number]}
   */
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
    // self.ctx.fillRect(0, 0, self.canvasWidth, self.canvasHeight);
    // self.ctx.stroke();
  };

  const _update = function() {
    self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight)
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