import axios from 'axios';

export const getPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

  return res;
};
