import HomePage from "../pages/HomePage.js";
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
    homePage: new HomePage({ $target, initialState: { posts: this.state.posts } }),
    postsPage: new PostsPage({ $target, initialState: { post: this.state.post } })
  }

  this.route = () => {
    $target.innerHTML = ''; // clear
    const { pathname } = window.location;

    if (pathname === '/') {
      pages.homePage.setState({ posts })
    }
  }

  initRouter(() => this.route());
}