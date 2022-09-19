const draw = () => {
  const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    
    ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
    ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
    ctx.arc(50, 50, 7.5, 0, Math.PI * 2, true);
    ctx.arc(50, 50, 3.75, 0, Math.PI * 2, true);
    ctx.arc(50, 50, 1.875, 0, Math.PI * 2, true);
    
    ctx.fill('evenodd');
  }
}
export default draw;