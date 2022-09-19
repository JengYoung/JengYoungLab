const draw = () => {
  const canvas = document.querySelector('canvas')
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const linearGradient = ctx.createLinearGradient(0, 0, 0, 150);
    linearGradient.addColorStop(0, '#00ABEB');
    linearGradient.addColorStop(0.5, '#fff');
    linearGradient.addColorStop(0.5, '#26C000');
    linearGradient.addColorStop(1, '#fff');

    const linearGradient2 = ctx.createLinearGradient(0, 50, 0, 95);
    linearGradient2.addColorStop(0.75, '#000');
    linearGradient2.addColorStop(1, 'rgba(0, 0, 0, 0');

    ctx.fillStyle = linearGradient;
    ctx.lineWidth = 2;
    ctx.strokeStyle = linearGradient2;

    ctx.fillRect(10, 10, 130, 130);
    ctx.strokeRect(50, 50, 50, 50);
  }
}

export default draw;