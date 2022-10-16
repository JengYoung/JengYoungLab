import LavaLamp from "./LavaLamp";
import "./style.module.scss";

export class App {
  target: Element
  canvas: HTMLCanvasElement;
  callback: (() => any) | null;
  ctx: CanvasRenderingContext2D

  width: number;
  height: number;
  left: number;
  top: number;

  lava!: LavaLamp

  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    console.log(this.ctx)
    
    this.callback = null;

    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
  }

  init(callback: typeof this.callback) {
    this.callback = callback || null;

    window.addEventListener('resize', () => {
      this.resize();
    })

    this.canvas.addEventListener('selectstart', () => false);
    this.canvas.addEventListener('ondrag', () => false);
    
    this.resize();

    this.lava = new LavaLamp(this.ctx, this.width, this.height, 6, "#FF9298", "#E4008E")
  }

  resize() {
    let elem = this.canvas;

    this.width = elem.offsetWidth;
    this.height = elem.offsetHeight;

    console.log(this.width, this.height)
    
    for (let left = 0, top = 0; elem !== null; elem = elem.offsetParent as HTMLCanvasElement) {
      left += elem.offsetLeft;
      top += elem.offsetTop;

      this.left += left;
      this.top += top;
    }

    console.log('here: ', this.canvas)
    if (this.ctx) {
      this.canvas.width = this.width;
      this.canvas.height = this.height
    }

    if (this.callback) {
      this.callback();
    }
  }

  render() {
    this.target.append(this.canvas);
    this.init(null);

    this.run();
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    requestAnimationFrame(() => {
      this.run()
    });
    
    this.lava.renderMetaballs();  
  };
}

const app = new App(document.querySelector('#app') as Element);

app.render();
