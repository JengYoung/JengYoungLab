const draw = () => {
  const canvas = document.querySelector('canvas');

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    
    /** butt, round, square
     * 
     * butt: 좌표에 딱 맞게 잘림
     * round: 선의 끝이 동그렇게 생겼음.
     * square: 선 끝에 선 두께 반 만큼의 사각형 영역 추가
     */
    const lineCap = ['butt','round','square'];

    ctx.strokeStyle = '#09f';

    ctx.beginPath();

    ctx.moveTo(10, 10);
    ctx.lineTo(140, 10);

    ctx.moveTo(10, 140);
    ctx.lineTo(140, 140);

    ctx.stroke();

    // 선을 그림
    ctx.strokeStyle = 'black';

    lineCap.forEach((lineCap, i) => {
      ctx.lineWidth = 15;
      ctx.lineCap = lineCap;

      ctx.beginPath();

      ctx.moveTo(25 + i * 50, 10);
      ctx.lineTo(25 + i * 50, 140);

      ctx.strokeStyle = '#7355cf'
      ctx.stroke();
    })
  }
}

export default draw;