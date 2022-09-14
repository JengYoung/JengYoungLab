export class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.005;
    this.cur = index;
    this.max = Math.random() * 100 + 50;
  }

  update() {
    this.cur += this.speed;

    // 고정된 y값에서 -1 ~ 1사이의 sin 함수 값으로 계속해서 max값을 가중치로 적용.
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }
}