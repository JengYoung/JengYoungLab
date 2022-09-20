const draw = () => {
  const canvas = document.querySelector('canvas')
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 0.5;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    
    const text = 'Hi! I am studying in CanvasAPI! XD'
    ctx.font = '16px Times New Roman';

    ctx.fillStyle = '#ff0fa2';
    ctx.fillText(text, 5, 30);
  }
}


const draw2 = () => {
  const canvas = document.querySelector('canvas')
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.font = '48px serif';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#625fff'
    ctx.fillText('JengYoung', 10, 48);
    ctx.strokeText('JengYoung', 10, 48);
  
  }
}
export default draw2;