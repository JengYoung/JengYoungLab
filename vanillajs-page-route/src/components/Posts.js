import { push } from "../utils/router.js";

export default function Posts({ $target, initialState, onClick }) {
  const $posts = document.createElement('ul');
  $posts.classList.add('posts');
  $target.appendChild($posts)

  this.state = { ...initialState };

  console.log("posts: ", this.state)

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    };

    this.render();
  }

  this.render = () => {
    $posts.innerHTML = `
      ${this.state.posts.map(post => `
        <li class="post" data-id="${post.id}">
          <div class="post__title">${post.title}</div>
          <div class="post__body">${post.body}</div>
        </li>
      `).join('')}
    `;
  }

  this.render();

  $posts.addEventListener('click', e => {
    const $el = e.target.closest('.post');
    if (!$el) return;

    const { id } = $el.dataset;
    const post = this.state.posts.find(post => `${post.id}` === id);

    onClick(post)
    push(`/posts/${id}`);
  })
}