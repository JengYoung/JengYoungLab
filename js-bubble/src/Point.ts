class Point {
  x: number;
  y: number;
  
  magnitude: number;
  computed: number;
  force: number;


  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.magnitude = Math.pow(x, 2) + Math.pow(y, 2);
    this.computed = 0;
    this.force = 0;
  }

  add(p: { x: number, y: number}) {
    return new Point(this.x + p.x, this.y + p.y)
  }
}

export default Point