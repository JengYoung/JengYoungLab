import LavaLamp from "./LavaLamp";
import Point from "./Point";

class Ball {
  parent: LavaLamp;

  min: number;
  max: number;

  vel: Point
  pos: Point

  size: number;

  width: number;
  height: number;

  constructor(parent: LavaLamp) {
    this.parent = parent;

    this.min = 0.1;
    this.max = 1.5;

    this.vel = new Point(
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25), 
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    )

    this.pos = new Point(
      this.parent.width * 0.2 + Math.random() * this.parent.width * 0.6,
      this.parent.height * 0.2 + Math.random() * this.parent.height * 0.6
    )

    this.size = (this.parent.minScreenSize / 15) + (Math.random() * (this.max - this.min) + this.min) * (this.parent.minScreenSize * 15);

    this.width = this.parent.width;
    this.height = this.parent.height;
  }

  move() {
    if (this.pos.x >= this.width - this.size) {
      if (this.vel.x > 0) this.vel.x = -this.vel.x;
      
      this.pos.x = this.width - this.size;
    } else if (this.pos.x <= this.size) {
      if (this.vel.x < 0) this.vel.x = -this.vel.x;

      this.pos.x = this.size;
    }

    if (this.pos.y >= this.height - this.size) {
      if (this.vel.y > 0) this.vel.y = -this.vel.y;

      this.pos.y = this.height - this.size;
    } else if (this.pos.y <= this.size) {

      if (this.vel.y < 0) this.vel.y = -this.vel.y;
      this.pos.y = this.size;
    }

    this.pos = this.pos.add(this.vel);
  }
}


export default Ball