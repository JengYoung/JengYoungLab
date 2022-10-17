import Bubble from "./Bubble";
import Point from "./Point";

class Ball {
  parent: Bubble;

  min: number;
  max: number;

  vel: Point
  pos: Point

  size: number;

  width: number;
  height: number;

  constructor(parent: Bubble) {
    this.parent = parent;

    this.min = 0.1;
    this.max = 1.5;

    /** 
     * @description
     * point에 전달하는 x,y는, 처음에 곱해주는 것은 방향,
     * 이후 곱해주는 값은 각 좌표에 따른 속도(velocity)의 가중치를 부여해줍니다.  
     */
    this.vel = new Point(
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25), 
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    )

    /**
     * @description
     * 현재 버블의 위치(position)를 정의합니다.
     */
    this.pos = new Point(
      this.parent.width * 0.2 + Math.random() * this.parent.width * 0.6,
      this.parent.height * 0.2 + Math.random() * this.parent.height * 0.6
    )

    /**
     * @description
     * 각 버블의 사이즈를 정의합니다.
     * 
     * 핵심은 다음과 같습니다.
     * Random에서 max와 min의 차에서 min을 더한 값은, 무조건 max를 넘길 수 없습니다.
     * 즉 무조건 최대 크기의 사이즈 배율을 정할 수 있는데요.
     * 
     * 여기서 최소 스크린 사이즈를 넘기면 안됩니다. 따라서 이를 부모에게서 받아서, 이후 15를 나눠줍니다.
     * 이 15는 말 그대로 이 뷰포트를 15로 나눈 사이즈입니다. 즉 max의 최대 값은 화면 사이즈의 0.1배입니다. (1.5배이므로)
     */
    this.size = (this.parent.minScreenSize / 15) + (Math.random() * (this.max - this.min) + this.min) * (this.parent.minScreenSize / 15);

    this.width = this.parent.width;
    this.height = this.parent.height;
  }

  /**
   * @descriptions
   * 간단한 논리로 이루어져 있습니다.
   * 만약 화면을 넘어갈 경우에는 움직이는 방향을 반대로 바꿔주어야 합니다.
   * 또한, 현재의 x와 y 역시 화면 안에 들어가도록 다시 바꿔줄 필요가 있습니다.
   */
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