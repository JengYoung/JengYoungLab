class Grid {
  ctx: CanvasRenderingContext2D;
  row: number; 
  col: number;

  constructor(ctx: CanvasRenderingContext2D, row: number, col: number) {
    this.ctx = ctx;

    this.row = row;
    this.col = col;
  }

  get pointWidth() {
    return this.ctx.canvas.width / this.row;
  }
  get pointHeight() {
    return this.ctx.canvas.height / this.row;
  }
}

export default Grid;