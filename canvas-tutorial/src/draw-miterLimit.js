const draw = () => {
  const canvas = document.querySelector('canvas');
  const $input = document.querySelector('.miter-limit');
  if (!$input.value) {
    $input.value = 0;
  }
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 150, 150);
    
    ctx.strokeStyle =  '#09f';
    ctx.lineWidth = 2;
    ctx.strokeRect(-5, 50, 160, 50);

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 10;

    if ($input.value.match(/\d+(\/\d+)?/)) {
      ctx.miterLimit = parseFloat(document.querySelector('.miter-limit').value);
    } else {
      alert('Value must be a positive number');
    }

    ctx.beginPath();
    ctx.moveTo(0, 100);
    
    for (let i = 0; i < 24; i += 1) {
      const dy = i % 2 ? -25 : 25;
      ctx.lineTo(Math.pow(i, 1.5) * 2, 75 + dy);
    }

    ctx.stroke();
    return false;
  }
}

(() => {
  const $input = document.createElement('input');
  $input.className = 'miter-limit'
  $input.value = 0;

  document.body.appendChild($input)

  $input.addEventListener('input', draw)
})();
export default draw;