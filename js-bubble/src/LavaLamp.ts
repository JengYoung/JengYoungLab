import Ball from "./Ball";
import Point from "./Point";

class LavaLamp {
  width: number; 
  height: number; 
  numBalls: number;
  c0: string; 
  c1: string;

  step: number;
  minScreenSize: number;
  sx: number;
  sy: number;
  paint: boolean;
  metaFill: CanvasGradient;

  plx: number[];
  ply: number[];
  mscases: number[];
  ix: number[];
  grid: Array<any>
  balls: Array<any>
  iter: number;
  sign: number;


  constructor(width: number, height: number, numBalls: number, c0: string, c1: string) {
    this.width = width;
    this.height = height;
    this.numBalls = numBalls;
    this.c0 = c0;
    this.c1 = c1;

    this.step = 5;
    this.minScreenSize = Math.min(width, height);
    this.sx = Math.floor(this.width / this.step);
    this.sy = Math.floor(this.height / this.step);

    this.paint = false;
    this.metaFill = this.createRadialGradient(this.width, this.height, this.width, this.c0, this.c1)

    this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
    this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
    this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
    this.grid = [];
    this.balls = [];
    this.iter = 0;
    this.sign = 1;

    this.init();
  }

  init() {
    const sxPlus2 = this.sx + 2;

    for (let i = 0; i < sxPlus2 * (this.sy + 2); i += 1) {
      this.grid[i] = new Point(
        (i % sxPlus2) * this.step, 
        (Math.floor(i / sxPlus2)) * this.step
      )
    }

    for (let i = 0; i < this.numBalls; i += 1) {
      this.balls[i] = new Ball(this)
    }
  }

  computeForce(x: number, y: number, idx: number) {
    let force; 
    const id = idx || x + y * (this.sx + 2);

    if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
      force = 0.6 * this.sign;
    } else {
      force = 0;
      
      const cell = this.grid[id];
      let ball; 
      
      let i = 0;
      while(ball = this.balls[i]) {
        i += 1;
        
        force += ball.size * ball.size / (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y + ball.pos.magnitude + cell.magnitude);
      }
      
      force *= this.sign;
    }

    this.grid[id].force = force;
    return false;
  }

  marchingSquares(next: number[]) {
    const [x, y, pdir] = next;
    
    const id = x + y * (this.sx + 2);

    if (this.grid[id].computed === this.iter) {
      return false;
    }

    let dir;
    let mscase = 0;

    for (let i = 0; i < 4; i += 1) {
      const idn = (x + this.ix[i + 12]) + (y + this.ix[i + 16]) * (this.sx + 2);
      let force = this.grid[idn].force;

      if ((force > 0 && this.sign < 0) || (force < 0 && this.sign > 0) || !force) {
        force = this.computeForce(
          x + this.ix[i + 12],
          y + this.ix[i + 16],
          idn
        )
      }

      if (Math.abs(force) > 1) mscase += Math.pow(2, i);
    }

    if (mscase === 15) {
      return [x, y - 1, false];
    } else {
      if (mscase === 5) dir = (pdir === 2) ? 3 : 1;
      else if (mscase === 10) dir = (pdir === 3) ? 0 : 2;
      else {
        dir = this.mscases[mscase];
        this.grid[id].computed = this.iter;
      }

      const ix = this.step / (
        Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 2]) + (y + this.ply[4 * dir + 2]) * (this.sx + 2)].force) - 1) /
        Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 3]) + (y + this.ply[4 * dir + 3]) * (this.sx + 2)].force) - 1) + 1
      )

      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      ctx.lineTo(
        this.grid[(x + this.plx[4 * dir]) + (y + this.ply[4 * dir]) * (this.sx + 2)].x + this.ix[dir] * ix,
        this.grid[(x + this.plx[4 * dir + 1]) + (y + this.ply[4 * dir + 1]) * (this.sx + 2)].y + this.ix[dir + 4] * ix
      );
      this.paint = true;
      // next
      return [
        x + this.ix[dir + 4],
        y + this.ix[dir + 8],
        dir
      ];
    }
  }

  renderMetaballs() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let i = 0;
    let ball;

    while (ball = this.balls[i++]) ball.move();
    // reset grid
    this.iter += 1;

    this.sign = -this.sign;
    this.paint = false;
    
    ctx.fillStyle = this.metaFill;
    ctx.beginPath();
    
    i = 0;
    
    while (ball = this.balls[i++]) {
      let next = [
        Math.round(ball.pos.x / this.step),
        Math.round(ball.pos.y / this.step), false
      ];

      while (next) {
        next = this.marchingSquares(next as number[]) as number[];
      }

      if (this.paint) {
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        
        this.paint = false;
      }
    }
  }

  createRadialGradient(w: number, h: number, r: number, c0: string, c1: string) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    var gradient = ctx.createRadialGradient(
      w / 1, h / 1, 0,
      w / 1, h / 1, r
    );

    gradient.addColorStop(0, c0);
    gradient.addColorStop(1, c1);

    return gradient;
  }
}

export default LavaLamp;