import Bubble from "./Bubble";
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

  lava!: Bubble

  constructor(target: Element) {
    this.target = target;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    
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

    this.lava = new Bubble(this.ctx, this.width, this.height, 6, "#FF9298", "#E4008E")
  }

  resize() {
    let elem = this.canvas.offsetParent as HTMLElement;

    this.width = elem.offsetWidth;
    this.height = elem.offsetHeight;
    this.left +=  elem.offsetLeft;
    this.top += elem.offsetTop;

    if (this.ctx) {
      this.canvas.width = this.width;
      this.canvas.height = this.height
      
      this.lava = new Bubble(this.ctx, this.width, this.height, 6, "#FF9298", "#E4008E")
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
