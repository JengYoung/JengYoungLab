const draw = () => {
  const canvas = document.querySelector('canvas');

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const lineJoins = ['round', 'bevel', 'miter'];

    ctx.lineWidth = 10;

    lineJoins.forEach((lineJoin, i) => {
      ctx.lineJoin = lineJoin;
      
      ctx.beginPath();

      ctx.moveTo(-5, 5 + i * 40);
      
      ctx.lineTo(35, 45 + i * 40);
      ctx.lineTo(75, 5 + i * 40);
      ctx.lineTo(115, 45 + i * 40);
      ctx.lineTo(155, 5 + i * 40);
      
      ctx.stroke();
    })
  }
}

export default draw;