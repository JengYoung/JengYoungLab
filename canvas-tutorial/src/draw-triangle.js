const draw = () => {
  const canvas = document.querySelector('canvas');
  console.log('canvas: ', canvas);

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();

    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);

    ctx.fill();

    // ctx.closePath();
  }
}

export default draw;