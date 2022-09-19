const draw = () => {
  const canvas = document.querySelector('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'https://cdn.dribbble.com/users/210795/screenshots/16073734/media/cab58d1106fe8b9e903ea49676e3133f.png?compress=1&resize=1600x1200&vertical=top'
    
    img.onload = () => {
      const pattern = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 150, 150);

    }
  }
}

export default draw;