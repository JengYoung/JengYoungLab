const draw = () => { 
  const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();

    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 65, 100);
    ctx.quadraticCurveTo(62.5, 115, 50, 112.5);
    ctx.quadraticCurveTo(65, 120, 80, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);

    ctx.stroke();
  }
}

export default draw;