import Posts from "../components/Posts.js";

export default function HomePage({
  $target,
  initialState,
  updatePost
}) {
  const $page = document.createElement('div');
  $page.classList.add('page');

  this.state = { ...initialState };

  console.log("HomePage: ", this.state.posts)

  const postsComponent = new Posts({
    $target: $page,
    initialState: { posts: this.state.posts },
    onClick: (post) => {
      console.log(post)
      updatePost(post)
    }
  })
  
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    }

    postsComponent.setState({ posts: this.state.posts })

    this.render();
  }

  this.render = () => {
    $target.appendChild($page);
    
  }
}