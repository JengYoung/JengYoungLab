(() => {
  let offset = 0;

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Cannot find canvas context.')
    return;
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setLineDash([4, 2]);

    ctx.lineDashOffset = -offset;
    ctx.strokeRect(10, 10, 100, 100);
  }

  const move = () => {
    const INITIALIZATION_VALUE = 18
    offset += 1;
    offset = offset % INITIALIZATION_VALUE
    
    draw();
    setTimeout(move, 50);
  }

  move()
})();
