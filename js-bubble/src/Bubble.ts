import Ball from "./Ball";
import Point from "./Point";

class Bubble {
  ctx: CanvasRenderingContext2D;
  width: number; 
  height: number; 
  numBalls: number;

  /**
   * @descriptions
   * 그라데이션을 위한 색깔을 의미합니다.
   */
  c0: string; 

  /**
   * @descriptions
   * 그라데이션을 위한 색깔을 의미합니다.
   */
  c1: string;

  /**
   * @descriptions
   * 각 Point 좌표가 있어야 할 곳들을 위한 가중치입니다.
   * 이 가중치 값이 있으면 부딪힐 때 좀 더 탱탱한? 느낌을 받습니다.
   * 또한, 클 수록 거품이 더 딱딱하게 변화합니다.
   */
  step: number;
  minScreenSize: number;
  sx: number;
  sy: number;
  paintLoading: boolean;
  metaFill: CanvasGradient;

  /**
   * @descriptions
   * pathline X
   */
  plx: number[];

  /**
   * @descriptions
   * pathline Y
   */
  ply: number[];
  
  /**
   * @descriptions
   * this.mscases[15]: 절대 들어와서는 안 됨. (early return)
   * 
   * @see: this.marchingSquares
   */
  mscases: number[];
  ix: number[];
  grid: Array<any>
  balls: Array<any>
  iter: number;
  forceDirection: number;


  constructor(
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    numBalls: number, 
    c0: string, 
    c1: string
  ) {
    this.ctx = ctx;

    /**
     * 이곳에는 캔버스의 width와 height가 담겨있습니다.
     */
    this.width = width;
    this.height = height;

    this.numBalls = numBalls;

    this.c0 = c0;
    this.c1 = c1;

    /*

     */
    this.minScreenSize = Math.min(this.width, this.height);

    this.step = 5;
    this.sx = Math.floor(this.width / this.step);
    this.sy = Math.floor(this.height / this.step);

    this.paintLoading = false;
    this.metaFill = this.createRadialGradient(this.width, this.height, this.width, this.c0, this.c1)

    this.plx = [
      0, 0, 1, 0, 
      1, 1, 1, 1, 
      1, 1, 0, 1, 
      0, 0, 0, 0
    ];

    this.ply = [
      0, 0, 0, 0, 
      0, 0, 1, 0, 
      0, 1, 1, 1, 
      0, 1, 0, 1
    ];
    
    this.mscases = [
      0, 3, 0, 3, 
      1, 3, 0, 3, 
      2, 2, 0, 2, 
      1, 1, 0, -1
    ]; 
    
    this.ix = [
      1, 0, -1, 0, 
      0, 1, 0, -1, 
      -1, 0, 1, 0, 
      0, 1, 1, 0, 
      0, 0, 1, 1
    ];

    this.grid = [];
    this.balls = [];
    this.iter = 0;
    this.forceDirection = 1;

    this.init();
  }

  /**
   * @description
   * 더 자연스러운 효과를 위해 sx에 가중치를 더했습니다.
   * 이는 step과 관련이 있습니다.
   * step은 this.sx, this.sy의 크기를 줄여주는데요.
   */
  get weightedSx() {
    return this.sx + 2;
  }

  init() {
    const syPlus2 = this.sy + 2;

    for (let i = 0; i < (this.weightedSx) * (syPlus2); i += 1) {
      this.grid.push(new Point(
        (i % this.weightedSx) * this.step, 
        (Math.floor(i / this.weightedSx)) * this.step
      ))
    }

    for (let i = 0; i < this.numBalls; i += 1) {
      this.balls.push(new Ball(this))
    }
    console.log(this.sx, this.sy, this.grid, this.balls)
  }

  /**
   * @descriptions
   * 이 함수는 만약 내가 일정 스텝 좌표에 도달했을 경우, 다음으로 이동할 수 있는 힘의 크기를 정의합니다.
   * 이를 통해 빠르거나 느리게 공을 특정 좌표에 이동시킬 수 있습니다. 
   * 
   * @returns 힘의 크기를 반환합니다. (number)
   */
  computeForce(x: number, y: number, idx: number) {
    let force = 0; 

    const id = idx || x + y * this.weightedSx;
    const point = this.grid[id];

    if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
      force = 0.6 * this.forceDirection;
    } else {
      force = 0;

      for (let i = 0; i < this.balls.length; i += 1) {
        const ball = this.balls[i];

        const { x: pointX, y: pointY, magnitude: pointMagnitude } = point;
        const { x: ballX, y: ballY, magnitude: ballMagnitude } = ball.pos;

        const multiplyX = -2 * pointX * ballX
        const multiplyY = -2 * pointY * ballY

        const magnitudeSum = ballMagnitude + pointMagnitude;

        force += ball.size * ball.size / (multiplyX + multiplyY + magnitudeSum);
      }
      
      force *= this.forceDirection;
    }

    point.force = force;

    return force;
  }

  marchingSquares(next: number[], id: number): typeof next {
    const [x, y, pdir] = next;
    let mscase = 0;

    const getDir = (mscase:  number, pdir: number) => {
      if (mscase === 5) return (pdir === 2) ? 3 : 1;
      if (mscase === 10) return (pdir === 3) ? 0 : 2;
      
      return this.mscases[mscase];
    }

    /**
     * 
     * @descriptions
     * 방향이 다르거나, 움직일 가중치가 없을 경우 업데이트를 할 수 있도록 합니다.
     * 
     * @returns boolean
     */
    const checkForceNeedUpdate = (force: number) => {
      return (force > 0 && this.forceDirection < 0) || (force < 0 && this.forceDirection > 0) || !force
    }

    for (let i = 0; i < 4; i += 1) {
      const idn = (x + this.ix[i + 12]) + (y + this.ix[i + 16]) * this.weightedSx;
      let force = this.grid[idn].force;

      if (checkForceNeedUpdate(force)) {
        force = this.computeForce(
          x + this.ix[i + 12],
          y + this.ix[i + 16],
          idn
        )
      }

      if (Math.abs(force) > 1) mscase += Math.pow(2, i);
    }

    if (mscase === 15) return [x, y - 1, 0];

    const dir = getDir(mscase, pdir)

    if (mscase !== 5 && mscase !== 10) {
      this.grid[id].computed = this.iter;
    }

    const baseIdx = 4 * dir

    /**
     * @descriptions
     * 결국, 2번째 인덱스와 3번째 인덱스를 보면 둘의 값이 dir 값에 따라 서로 반대되는 경향이 있습니다.
     * 이를 이용하여 각기 다른 값을 만들어내어 결과 값에 맞는 grid의 force를 구합니다.
     */
    const ix = this.step / (
      Math.abs(Math.abs(this.grid[(x + this.plx[baseIdx + 2]) + (y + this.ply[baseIdx + 2]) * this.weightedSx].force) - 1) /
      Math.abs(Math.abs(this.grid[(x + this.plx[baseIdx + 3]) + (y + this.ply[baseIdx + 3]) * this.weightedSx].force) - 1) + 1
    )

    const ctxXGridIndex = (x + this.plx[baseIdx]) + (y + this.ply[baseIdx]) * this.weightedSx;
    const ctxYGridIndex = (x + this.plx[baseIdx + 1]) + (y + this.ply[baseIdx + 1]) * this.weightedSx
      
    this.ctx.lineTo(
      this.grid[ctxXGridIndex].x + this.ix[dir] * ix,
      this.grid[ctxYGridIndex].y + this.ix[dir + 4] * ix
    );

    this.paintLoading = true;
    
    // next
    return [
      x + this.ix[dir + 4],
      y + this.ix[dir + 8],
      dir
    ];
  }

  renderMetaballs() {
    for (let i = 0; i < this.balls.length; i += 1) {
      const ball = this.balls[i];
      ball.move();
    }

    // reset grid
    this.iter += 1;

    this.forceDirection = -this.forceDirection;

    
    this.ctx.fillStyle = this.metaFill;
    this.ctx.beginPath();
    
    
    for (let i = 0; i < this.balls.length; i += 1) {
      const ball = this.balls[i];

      let next: number[] = [
        Math.round(ball.pos.x / this.step),
        Math.round(ball.pos.y / this.step), 
        0
      ];

      /**
       * @descriptions
       * 여기가 거품을 이어주는 핵심입니다.
       * 결국 반복문이 끝나기 전까지, ctx.lineTo를 호출하여 그려냅니다.
       */
      while (next) {
        const id = next[0] + next[1] * this.weightedSx;
        if (this.grid[id].computed === this.iter) break;

        next = this.marchingSquares(next, id);
      }

      if (this.paintLoading) {
        this.ctx.fill();
        this.ctx.closePath();
        
        this.ctx.beginPath();
        this.paintLoading = false;
      }
    }
  }

  createRadialGradient(w: number, h: number, r: number, c0: string, c1: string) {
    var gradient = this.ctx.createRadialGradient(
      w / 1, h / 1, 0,
      w / 1, h / 1, r
    );

    gradient.addColorStop(0, c0);
    gradient.addColorStop(1, c1);

    return gradient;
  }
}

export default Bubble;