import { configureStore } from '@reduxjs/toolkit';
import { posts } from '@redux/posts/index';

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
  }
})

export type StoreState = ReturnType<typeof store.getState>;
