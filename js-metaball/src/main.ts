import "./style.module.scss";
import Grid from "./Grid";
import Metaballs from "./Metaballs";

class App {
  target: Element

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  grid: Grid;
  metaballs: Metaballs;

  #gradientHeadColor = "#ffbb00";
  #gradientTailColor = "#7828e9";

  #nowTimestamp = 0;

  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.grid = new Grid(this.ctx, this.width, this.height);
    this.metaballs = new Metaballs(this.ctx, 10);
  }

  get width() {
    return this.canvas.width;
  }
  set width(val: number) {
    this.canvas.width = val;
  }

  get height() {
    return this.canvas.height;
  }
  set height(val: number) {
    this.canvas.height = val;
  }

  get nowTimestamp() {
    return this.#nowTimestamp;
  }

  set nowTimestamp(val) {
    this.#nowTimestamp = val;
  }

  update() {

  }

  animate(t?: number): void {
    if (!t) {
      requestAnimationFrame(this.animate.bind(this));
      return;
    }

    const weight = (Math.min(t - this.nowTimestamp, 10)) / 1000;
    this.nowTimestamp = t;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let gx = 0; gx < this.grid.row; gx += 1) {
      for (let gy = 0; gy < this.grid.col; gy += 1) {
        const canvasX = gx + this.grid.pointWidth;
        const canvasY = gy + this.grid.pointHeight;

        const isOccurForce = this.getForce(canvasX, canvasY) >= 1;
        if (isOccurForce) {
          this.ctx.fillStyle ="rgb(200, 0, 0)";
          this.ctx.fillRect(canvasX, canvasY, 1, 1)
        }
      }
    }

    this.metaballs.moveAll(weight);

    requestAnimationFrame(() => this.animate());
  }

  render() {
    this.target.appendChild(this.ctx.canvas);
    this.animate()
  }

  getForce(x: number, y: number): number {
    const balls = this.metaballs.balls;

    let total = 0; 

    for (let i = 0; i < balls.length; i += 1) {
      const {x: mx, y: my, r: mr} = balls[i];

      total += Math.pow(mr, 2) / (Math.pow(x - mx, 2) + Math.pow(y - my, 2))
    }

    return total;
  }
}

const app = new App(document.getElementById('app') as Element);
app.render();