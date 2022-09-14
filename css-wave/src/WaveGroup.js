import { Wave } from "./Wave";

// 결국 이 클래스의 궁극적인 목적은 웨이브라는 컴포넌트를 여러 개를 손쉽게 핸들링하기 위한 것이다.
export class WaveGroup {
  constructor() {
    // 총 웨이브의 개수와, 물결이 칠 때 발생할 포인트를 지정.
    this.totalWaves = 3;
    this.totalPoints = 6;

    // 웨이브의 총 개수에 맞게 컬러 지정.
    this.color = [
      'rgba(0, 199, 235, 0.4)', 
      'rgba(0, 146, 199, 0.4)', 
      'rgba(0, 87, 158, 0.4)'
    ]

    this.waves = [];

    // 웨이브를 하나씩 추가해준다.
    for (let i = 0; i < this.totalWaves; i += 1) {
      const wave = new Wave(
        i,
        this.totalPoints,
        this.color[i]
      );

      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    // 하나씩 리사이즈해준다.
    for (let i = 0; i < this.totalWaves; i += 1) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight)
    }
  }

  draw(ctx) {
    // 하나씩 그려준다.
    for (let i = 0; i < this.totalWaves; i += 1) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}