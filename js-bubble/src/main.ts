import "./style.module.scss";

class App {
  target: Element
  canvas: HTMLCanvasElement;
  callback: (() => any) | null;
  ctx: CanvasRenderingContext2D

  width: number;
  height: number;
  left: number;
  top: number;

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

  init(callback: typeof this.callback){
    this.callback = callback ?? null;

    window.addEventListener('resize', () => {
      this.resize();
    })

    this.canvas.addEventListener('selectstart', () => false);
    this.canvas.addEventListener('ondrag', () => false);

    this.resize();

    return this;
  }

  resize() {
    let elem = this.canvas;

    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    
    for (let left = 0, top = 0; elem !== null; elem = elem.offsetParent as HTMLCanvasElement) {
      left += elem.offsetLeft;
      top += elem.offsetTop;

      this.left += left;
      this.top += top;
    }

    if (this.ctx) {
      this.canvas.width = this.width;
      this.canvas.height = this.height
    }

    if (!!this.callback) {
      this.callback();
    }
  }

  render() {
    this.target.append(this.canvas);
  }
}

const app = new App(document.querySelector('#app') as Element);

app.render();
