const draw = () => {
  const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        ctx.beginPath();
        const x = 25 + j * 40;
        const y = 25 + i * 50;

        const RADIUS = 20;
        const START_ANGLE = 0;
        
        const endAngle = Math.PI + (Math.PI * j) / 2;
        
        const anticlockwise = !!(i % 2)
        
        ctx.arc(x, y, RADIUS, START_ANGLE, endAngle, anticlockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}

export default draw;