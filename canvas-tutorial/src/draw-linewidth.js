const draw = () => {
  const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < 10; i += 1) {
      ctx.lineWidth = i + 2;
      ctx.beginPath();

      ctx.moveTo(i * 14, 0);
      ctx.lineTo(i * 14, 300);
      
      ctx.stroke();
    }
  }
}

export default draw;