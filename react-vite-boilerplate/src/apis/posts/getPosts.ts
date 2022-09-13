import { AxiosResponse } from 'axios';
import request from '..';
import { PostInterface } from '../../store/posts/types';

async function getPostsAPI() {
  try {
    const res = await request.get<AxiosResponse<PostInterface[]>>(
      'https://jsonplaceholder.typicode.com/posts'
    );

    return await res;
  } catch (e) {
    return e;
  }
}

export default getPostsAPI;
