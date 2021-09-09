import names from "@/utils/classNames";

export default function Loading({ $target }) {
  const DIR_APP_LOADING_SRC = process.env.DIR_APP_LOADING_SRC;
  const { _loading, _modal } = names;
  const $loading = document.createElement("div");
  $target.appendChild($loading);

  $loading.classList.add(_loading, _modal);

  this.state = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $loading.innerHTML = `
      <div class="content">
        <img width="100%" src="${DIR_APP_LOADING_SRC}" alt="loading..." />
      </div>
    `;
    $loading.style.display = this.state ? "block" : "none";
  };

  this.render();
}
