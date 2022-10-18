class Metaball {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, vx: number, vy: number) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.r = r;
    
    this.vx = vx;
    this.vy = vy;
  }

  move(weight: number = 1) {
    this.x += this.vx * weight;
    this.y += this.vy * weight;

    const isMetaballOverCanvas = (position: 'x' | 'y') => {
      return (this[position] - this.r < 0 && this[`v${position}`] < 0 ) || 
             (this[position] + this.r > this.ctx.canvas.width && this[`v${position}`] > 0)
    }
    
    if (isMetaballOverCanvas('x')) this.vx *= -1;
    if (isMetaballOverCanvas('y')) this.vy *= -1;
  }

  getRandomInt(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min) + min);
  }
}

export default Metaball;