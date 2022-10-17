import "./style.module.scss";

type XYType = [number, number];
export class App {
  target: Element;
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  x: number;
  y: number;

  points: XYType[]

  #STEP = 640;

  #SIZE = 75
  #MAIN_SIZE = 100;

  #POSITION: XYType = [50, 50]

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

  get canvasCenterXY(): XYType {
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
      ] as XYType
    }
  }

  makeCircle(x: number, y: number, r: number) {
    const path = new Path2D();
    path.arc(x, y, r, 0, 2 * Math.PI)

    return path;
  }

  getDist([x1, y1]: XYType, [x2, y2]: XYType) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  getAngle([x1, y1]: XYType, [x2, y2]: XYType) {
    return Math.atan2(y1 -y2, x1 - x2);
  }

  getVector([cx, cy]: XYType, a: number, r: number): XYType {
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }

  makeMetaball(
    r1: number, 
    r2: number, 
    c1: XYType, 
    c2: XYType, 
    callback: 
    () => any = () => {}, 
    handleLenRate: number = 2.4, 
    v: number = 0.5
  ) {
    const HALF_PI = Math.PI / 2;

    const dist = this.getDist(c1, c2)
    const maxDist = r1 + r2 * 2.5;

    if (!r1 || !r2 || dist > maxDist || dist <= Math.abs(r1 - r2)) {
      return callback();
    }

    let check = dist < r1 + r2;
    let u1 = check ? Math.acos((Math.pow(r1, 2) + Math.pow(dist, 2) - Math.pow(r2, 2)) / (2 * r1 * dist)) : 0;
    let u2 = check ? Math.acos((Math.pow(r2, 2) + Math.pow(dist, 2) - Math.pow(r1, 2)) / (2 * r2 * dist)) : 0

    const angle1 = this.getAngle(c2, c1);
    const angle2 = Math.acos((r1 - r2) / dist);

    const angle1a =(angle1 + u1) + (angle2 - u1) * v
    const angle1b =(angle1 - u1) - (angle2 - u1) * v
    const angle2a = angle1 + Math.PI - u2 + -(Math.PI - u2 - angle2) * v;
    const angle2b = -(angle1 + Math.PI - u2) + (Math.PI - u2 - angle2) * v;

    const p1a = this.getVector(c1, angle1a, r1);
    const p1b = this.getVector(c1, angle1b, r1);
    const p2a = this.getVector(c2, angle2a, r2);
    const p2b = this.getVector(c2, angle2b, r2);

    const totalRadius = r1 + r2;
    const d2Base = Math.min(v * handleLenRate, this.getDist(p1a, p2b) / totalRadius);

    const d2 = d2Base * Math.min(1, dist * 2 / totalRadius);
    const wr1 = r1 * d2;
    const wr2 = r2 * d2;

    const h1 = this.getVector(p1a, angle1a - HALF_PI, wr1);
    const h2 = this.getVector(p2a, angle2a + HALF_PI, wr2);

    const h4 = this.getVector(p1b, angle1b + HALF_PI, wr1);
    const h3 = this.getVector(p2b, angle2b - HALF_PI, wr2);

    return this.transformPath(
      p1a,
      p2a,
      p1b,
      p2b,
      h1,
      h2,
      h3,
      h4,
      dist > r1,
      r2,
    )
  }

  transformPath(
    p1a: XYType,
    p2a: XYType,
    p1b: XYType,
    p2b: XYType,
    h1: XYType,
    h2: XYType,
    h3: XYType,
    h4: XYType,
    escaped: boolean,
    r: number,
  ) {
    return new Path2D([
      'M', p1a,
      'C', h1, h2, p2a,
      'A', r, r, 0, escaped ? 1 : 0, 0, p2b,
      'C', h3, h4, p1b,
    ].join(' '))
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
