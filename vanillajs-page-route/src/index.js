import App from "./components/app.js";

const $app = document.createElement('main');
$app.id = 'app';
document.body.appendChild($app);

new App({ 
  $target: $app
})