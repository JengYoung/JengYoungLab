const draw = () => {
  const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const radialGradient = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    radialGradient.addColorStop(0, '#A7D30C');
    radialGradient.addColorStop(0.9, '#019F62');
    radialGradient.addColorStop(1, 'rgba(1,159,98,0)');
    
    const radialGradient2 = ctx.createRadialGradient(105,105,20,112,120,50);
    radialGradient2.addColorStop(0, '#FF5F98');
    radialGradient2.addColorStop(0.75, '#FF0188');
    radialGradient2.addColorStop(1, 'rgba(255,1,136,0)');

    const radialGradient3 = ctx.createRadialGradient(95,15,15,102,20,40);
    radialGradient3.addColorStop(0, '#00C9FF');
    radialGradient3.addColorStop(0.8, '#00B5E2');
    radialGradient3.addColorStop(1, 'rgba(0,201,255,0)');
  
    const radialGradient4 = ctx.createRadialGradient(0,150,50,0,140,90);
    radialGradient4.addColorStop(0, '#F4F201');
    radialGradient4.addColorStop(0.8, '#E4C700');
    radialGradient4.addColorStop(1, 'rgba(228,199,0,0)');

    ctx.fillStyle = radialGradient;
    ctx.fillRect(0,0,150,150);

    ctx.fillStyle = radialGradient2;
    ctx.fillRect(0,0,150,150);
    
    ctx.fillStyle = radialGradient3;
    ctx.fillRect(0,0,150,150);
    
    ctx.fillStyle = radialGradient4;
    ctx.fillRect(0,0,150,150);
  }
}

export default draw;