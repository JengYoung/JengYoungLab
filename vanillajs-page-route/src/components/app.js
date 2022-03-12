import HomePage from "../pages/HomePage.js";
import PostPage from "../pages/PostPage.js";
import posts from '../mocks/posts.json' assert{ type: "json"}
import { initRouter } from "../utils/router.js";

export default function App({
  $target
}) {
  const initialState = {
    posts: [],
    post: null
  }

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    }
  }

  const pages = {
    homePage: new HomePage({ 
      $target, 
      initialState: { posts: this.state.posts }, 
      updatePost: (post) => {
        this.state.post = post;
      } }),
    postPage: new PostPage({ 
      $target, 
      initialState: { 
        post: this.state.post 
      } 
    })
  }

  this.route = () => {
    $target.innerHTML = ''; // clear
    const { pathname } = window.location;
    const routeParams = pathname.split('/').slice(1);

    console.log(routeParams);

    if (routeParams[0] === '') {
      pages.homePage.setState({ posts })
    }

    if (routeParams[0] === 'posts') {
      pages.postPage.setState({ post: this.state.post })
    }

    console.log(this.state.post)
  }

  this.route();

  initRouter(() => this.route());
}