import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'
import "./style.module.scss";

class App {
  target: Element
  canvas: HTMLCanvasElement
  constructor(target: Element) {

    this.target = target;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas');
  }

  render() {
    this.target.append(this.canvas);
  }

}

const app = new App(document.querySelector('#app') as Element);

app.render();
