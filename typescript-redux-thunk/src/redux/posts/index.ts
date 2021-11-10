import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
}

export const fetchAllPost = createAsyncThunk('posts/fetchAllPost', async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
})

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id: number) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  return data;
});

export const deletePostById = createAsyncThunk('posts/deletePostById', async (id: number) => {
  return { id };
});

// 자동으로 액션함수를 만들지 않음. 이미 액션함수가 정의되었으므로 여기다가 thunk를 넣어야 함.
export const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false
  } as PostsState,
  reducers: {},
  extraReducers: {
    [fetchAllPost.pending.type]: (state: PostsState) => {
      state.posts = [];
      state.loading = true;
    },
    [fetchAllPost.fulfilled.type]: (state: PostsState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    },
    [fetchPostById.fulfilled.type]: (state: PostsState, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index === -1) {
        state.posts.push(action.payload);
      } else {
        state.posts[index] = action.payload;
      }
      state.loading = false;
    },
    [deletePostById.fulfilled.type]: (state: PostsState, action: PayloadAction<Pick<Post, 'id'>>) => {
      console.log(action.payload)
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
      console.log("delete: ", state.posts.length)
      state.loading = false;
    },
  }
})
