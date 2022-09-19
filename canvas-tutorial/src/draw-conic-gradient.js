const draw = () => {
  const X_MOVEMENT = 12;
  const canvas = document.querySelector('canvas');

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const conicGradient = ctx.createConicGradient(0, X_MOVEMENT, 75);
    conicGradient.addColorStop(0, '#ddd');
    conicGradient.addColorStop(0.125, '#eee');
    conicGradient.addColorStop(1, '#f0f0f0');

    const conicGradient2 = ctx.createConicGradient(0, X_MOVEMENT + 175, 75);
    
    // we multiple our values by Math.PI/180 to convert degrees to radians
    conicGradient2.addColorStop(0, 'black');
    conicGradient2.addColorStop(0.25, 'black');
    conicGradient2.addColorStop(0.25, 'white');
    conicGradient2.addColorStop(0.5, 'white');
    conicGradient2.addColorStop(0.5, 'black');
    conicGradient2.addColorStop(0.75, 'black');
    conicGradient2.addColorStop(0.75, 'white');
    conicGradient2.addColorStop(1, 'white');

    ctx.fillStyle = conicGradient;
    ctx.fillRect(X_MOVEMENT, 25, 100, 100);

    ctx.fillStyle = conicGradient2;
    ctx.fillRect(X_MOVEMENT + 125, 25, 100, 100);
  }
}

export default draw;