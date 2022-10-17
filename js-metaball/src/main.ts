import "./style.module.scss";

export class App {
  target: Element;
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  x: number;
  y: number;

  points: [number, number][]

  #STEP = 640;

  #SIZE = 75
  #MAIN_SIZE = 100;

  #POSITION: [number, number] = [50, 50]

  #currentStep = 0;

  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');

    this.canvas.id = 'canvas';

    this.width = window.innerWidth * 0.75;
    this.height = window.innerHeight * 0.75;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;

    this.points = Array.from(
      { length: this.#STEP }, 
      (_, idx) => +(idx !== 60)
    ).map(this.segment.apply(this, [this.canvasCenterXY, 30]))
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

  get canvasCenterXY(): [number, number] {
    return [this.width / 2, this.height / 2]
  }

  get step() {
    return this.#STEP;
  }

  get currentStep() {
    return this.#currentStep;
  }

  set currentStep(step: number) {
    this.#currentStep = step;
  }

  get position() {
    return this.#POSITION
  }

  set position(arr) {
    this.#POSITION = [...arr]
  }

  segment(center: typeof this.canvasCenterXY, radius: number) {
    return (offset: number, i: number, arr: number[]) => {
      const radian = Math.PI * 2;
      const centerDist = radius + offset;

      // NOTE: needs to be [[] total radians / amount ]]
      const a = radian / arr.length * i - radian / 4;
     
      return [
        center[0] + (centerDist) * Math.cos(a),
        center[1] + (centerDist) * Math.sin(a),
      ] as [number, number]
    }
  }

  makeCircle(x: number, y: number, r: number) {
    const path = new Path2D();
    path.arc(x, y, r, 0, 2 * Math.PI)

    return path;
  }

  draw() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.makeCircle(...this.canvasCenterXY, this.#MAIN_SIZE)

    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);

    const c1 = this.points[this.currentStep];
    const c2 = this.points[this.currentStep - (this.step / 2)] || this.points[this.currentStep + (this.step / 2)]

    this.ctx.fillStyle = '#FFCC00'
    this.ctx.fill(this.makeCircle(...this.position, 25))
    this.ctx.fill(this.makeCircle(...this.canvasCenterXY, this.#MAIN_SIZE))
    this.ctx.fill(this.makeCircle(...c1, this.#SIZE))
    this.ctx.fill(this.makeCircle(...c2, this.#SIZE))
    

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
