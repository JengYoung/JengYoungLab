import { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { fetchAllPost } from '@src/redux/posts';

import { Header } from "@components/base/index";
import { PostList } from '@components/domain';

const PostsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch])

  return (
    <div>
      <Header>Posts</Header>
      <PostList></PostList>
    </div>
  );
};

export default PostsPage;
