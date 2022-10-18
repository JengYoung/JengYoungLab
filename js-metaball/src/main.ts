class App {
  target: Element

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  #gradientHeadColor = "#ffbb00";
  #gradientTailColor = "#7828e9";

  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

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
  }
}

const app = new App(document.getElementById('app') as Element);
app.render();