const draw = () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#FD0';
  ctx.fillRect(0, 0, 75, 75);

  ctx.fillStyle = '#6C0';
  ctx.fillRect(75, 0, 75, 75);

  ctx.fillStyle = '#09F';
  ctx.fillRect(0, 75, 75, 75);
  
  ctx.fillStyle = '#F30';
  ctx.fillRect(75, 75, 75, 75);

  ctx.fillStyle = '#FFF';

  ctx.globalAlpha = 0.2;

  for (var i = 0; i < 7; i+= 1){
    ctx.beginPath();

    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
  }
}

export default draw;