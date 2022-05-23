import axios from 'axios';

export const getPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

  return res;
};

export const getPost = async (id: string) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return res;
};

export const getComments = async (id: string) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/comments', {
    params: { postId: id },
  });

  return res;
};
