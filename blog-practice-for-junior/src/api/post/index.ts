import axios from 'axios';
import { CommentInterface, PostInterface } from './types';

export const getPosts = async () => {
  const res = await axios.get<PostInterface[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return res;
};

export const getPost = async (id: string) => {
  const res = await axios.get<PostInterface>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return res;
};

export const getComments = async (id: string) => {
  const res = await axios.get<CommentInterface[]>(
    'https://jsonplaceholder.typicode.com/comments',
    {
      params: { postId: id },
    }
  );

  return res;
};
