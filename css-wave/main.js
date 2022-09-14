import { WaveGroup } from "./src/WaveGroup";

class App {
  constructor() {
    // 캔버스를 DOM에 추가한다.
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
    
    // 여러 개의 파도를 묶은 컴포넌트인 WaveGroup을 불러온다.
    this.waveGroup = new WaveGroup();
    
    // 뷰포트 사이즈가 변경될 때마다 반영한다.
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    // 리페인트 이전에 실행할 애니메이션을 요청함.
    // https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    // 리사이즈된 화면 크기로 재할당.
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // 레티나 디스플레이에서 잘 보여지도록 함.    
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    // 리사이즈 이벤트가 트리거 되면, 이에 맞게 웨이브 역시 리사이즈를 시켜줌.
    this.waveGroup.resize(this.stageWidth, this.stageHeight)
  } 
  
  animate() {
    // 애니메이션을 재요청하기 위해 기존의 캔버스를 지움.
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // 현재의 캔버스에 다시 웨이브를 그림.
    this.waveGroup.draw(this.ctx);

    // 리페인트 이전에 실행될 애니메이션을 재요청함.
    requestAnimationFrame(this.animate.bind(this));
  }
}
window.addEventListener('load', () => {
  new App();
})