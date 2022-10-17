import "./style.module.scss";

export class App {
  target: Element;
  canvas: HTMLCanvasElement
  constructor(target: Element) {
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
  }

  render() {
    this.target.appendChild(this.canvas);
  }
}

const app = new App(document.querySelector('#app') as Element);

app.render();
