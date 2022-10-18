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

    const isMetaballOverCanvas = (xy: 'x' | 'y', vxvy: 'vx' | 'vy', wh: 'width' | 'height') => {
      return (this[xy] - this.r < 0 && this[vxvy] < 0 ) || 
             (this[xy] + this.r > this.ctx.canvas[wh] && this[vxvy] > 0)
    }
    
    if (isMetaballOverCanvas('x', 'vx', 'width')) this.vx *= -1;
    if (isMetaballOverCanvas('y', 'vy', 'height')) this.vy *= -1;
  }
}

export default Metaball;