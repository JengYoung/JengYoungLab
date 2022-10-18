import Metaball from "./Metaball";
import { getRandomInt } from "./utils/index";

class Metaballs {
  ctx: CanvasRenderingContext2D;
  #metaballs: Metaball[];
  ballCnt: number;
  
  constructor(ctx: CanvasRenderingContext2D, ballCnt: number) {
    this.ctx = ctx;
    
    this.ballCnt = ballCnt;

    this.#metaballs = [];

    this.init();
  }

  get balls() {
    return [...this.#metaballs]
  }

  init() {
    for (let i = 0; i < this.ballCnt; i += 1) {
      const x = getRandomInt(0, this.ctx.canvas.width);
      const y = getRandomInt(0, this.ctx.canvas.height);
      const r = getRandomInt(10, 100);
      const vx = getRandomInt(-400, 400);
      const vy = getRandomInt(-400, 400);

      const metaball = new Metaball(
        this.ctx,
        x,
        y,
        r,
        vx,
        vy
      )

      this.#metaballs.push(metaball);
    }
  }
}

export default Metaballs;