export default function HomePage({
  $target,
  initialState,
}) {
  const $page = document.createElement('div');
  $page.classList.add('page');

  this.state = { ...initialState };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    }

    this.render();
  }

  this.render = () => {
    $page.innerHTML = `
      <div class="post">
        <div class="post__title">${this.state.post.title}</div>
        <div class="post__body">${this.state.post.body}</div>
      </div>
    `
    $target.appendChild($page);
  }
}