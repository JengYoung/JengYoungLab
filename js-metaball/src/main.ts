import "./style.module.scss";

export class App {
  target: Element;
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  x: number;
  y: number;

  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');

    this.canvas.id = 'canvas';

    this.width = window.innerWidth * 0.75;
    this.height = window.innerHeight * 0.75;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
  }

  get width() {
    return this.canvas.width;
  }

  set width(w: number) {
    this.canvas.width = w;
  }

  get height() {
    return this.canvas.height
  }

  set height(h: number) {
    this.canvas.height = h;
  }

  get canvasCenterXY() {
    return [this.width / 2, this.height / 2]
  }

  draw() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // const [cx, cy] = this.canvasCenterXY;

    requestAnimationFrame(() => {
      this.draw()
    })
  }

  render(shouldAppend: boolean) {
    if (shouldAppend) this.target.appendChild(this.canvas);
    this.draw();
  }
}

const app = new App(document.querySelector('#app') as Element);

app.render(true);
