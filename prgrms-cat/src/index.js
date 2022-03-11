import App from "./components/app.js";
import { names, PREFIX_CLASS } from "./utils/names.js";

const $target = document.querySelector(PREFIX_CLASS + names.app);

alert($target);

const app = new App({
  $target
})