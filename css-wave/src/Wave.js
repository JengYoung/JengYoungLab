import { Point } from "./point";

export class Wave {
  // 사실상 WaveGroup에서 받아옴.
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    // 중앙이 되는 부분을 지정.
    this.centerX = stageWidth / 2; 
    this.centerY = stageHeight / 2;

    // 포인트가 있어야 할 각 위치는 n - 1등분해야 함.
    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    // 초기화에서는 먼저 포인트를 다 집어넣음.
    this.points = [];

    for (let i = 0; i < this.totalPoints; i += 1) {
      // 포인트는 결국 인덱스와 포인트가 현재 있어야 할 위치 x y만 기억하면 됨.
      this.point = new Point(
        this.index + i, 
        this.pointGap * i, 
        this.centerY
      );

      this.points[i] = this.point;
    }
  }

  draw(ctx) {
    // clearRect한 후 새로운 아이템을 그리기 위해 항상 beginPath를 먼저 호출해야 함.
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
    ctx.beginPath();
    ctx.fillStyle = this.color; // 채우기 색상을 지정. 즉 웨이브 칼라 색을 파도의 배경으로 입힌다.

    let prevX = this.points[0].x; // 시작할 초기 x값을 의미.
    let prevY = this.points[0].y; // 시작할 초기 y값을 의미.

    // 시작점 설정을 위해 사용.
    //https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i += 1) {
      // 끝점은 항상 일정하므로 업데이트하지 않음.
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      // Point에서는 업데이트 시 가중치 * sin 함수값으로 파도에 반영했기 때문에 마치 파도처럼 x, y가 반영될 수밖에 없음. 
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      // ctx.lineTo(cx, cy);
      // 부드러운 곡선으로 그림.
      ctx.quadraticCurveTo(prevX, prevY, cx, cy)

      // 현재의 x,y값을 캐싱해줌.
      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    // 현재를 기준으로 다시 선을 그려주고, 양쪽 밑의 모퉁이까지 선을 이어주어 도형을 만들어냄.
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);

    // 이후 색을 채우고, 패스 그리기를 종료.
    ctx.fill();
    ctx.closePath();
  }
}