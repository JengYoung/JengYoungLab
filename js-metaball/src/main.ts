import Grid from "./Grid";
import Metaball from "./Metaball";
import Metaballs from "./Metaballs";

class App {
  target: Element

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  grid: Grid;
  metaballs: Metaballs;

  #gradientHeadColor = "#ffbb00";
  #gradientTailColor = "#7828e9";

  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.grid = new Grid(this.ctx, 1000, 1000);
    this.metaballs = new Metaballs(this.ctx, 10);

    this.init();
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

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
      
    this.animate();
  }

  update() {

  }

  animate() {
    requestAnimationFrame(() => {});
  }

  render() {
    this.target.appendChild(this.canvas);
    this.init();
  }

  getForce(x: number, y: number): number {
    const balls = this.metaballs.balls;

    return balls.reduce((acc: number, {x: mx, y: my, r: mr}: Metaball) => {
      return acc + Math.pow(mr, 2) / (Math.pow(x - mx, 2) + Math.pow(y - my, 2));
    }, 0)
  }
}

const app = new App(document.getElementById('app') as Element);
app.render();