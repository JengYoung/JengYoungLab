import { getComments, getPost, getPosts } from '@/api/post';
import { CommentInterface, PostInterface } from '@/api/post/types';
import { Module } from 'vuex';
import { RootState } from '..';

export interface PostModuleState {
  postsLoading: boolean;
  postLoading: boolean;
  commentsLoading: boolean;
  posts: PostInterface[];
  post: PostInterface | null;
  comments: CommentInterface[];
}
const postModule: Module<PostModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    postsLoading: false,
    postLoading: false,
    commentsLoading: false,
    posts: [],
    post: null,
    comments: [],
  }),
  mutations: {
    mutatePosts(state: PostModuleState, posts: PostInterface[]) {
      state.posts = posts;
    },
    mutateComments(state: PostModuleState, comments: CommentInterface[]) {
      state.comments = comments;
    },
    mutatePost(state: PostModuleState, post: PostInterface) {
      state.post = post;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const posts = await getPosts();
      commit('mutatePosts', posts.data);
    },
    async fetchComments({ commit }, id: string) {
      const comments = await getComments(id);
      commit('mutateComments', comments.data);
    },
    async fetchPost({ commit }, id: string) {
      const post = await getPost(id);
      commit('mutatePost', post.data);
    },
  },
};

export default postModule;
