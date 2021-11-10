import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deletePostById, Post } from '@src/redux/posts';

import { Header, Spinner } from "@components/base";

interface PostItemProps {
  post: Post;
  [index: string]: any;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDeletePost = useCallback(async (id: number) => {
    setLoading(true);
    setTimeout(async () => {
      await dispatch(deletePostById(id));
      setLoading(false);
    }, 1000)
  }, [dispatch]);

  return (
    <li>
      <Header strong level={3}>
        {post.title}
      </Header>
      <Link to={`/posts/${post.id}`}>Click To Watch Details!</Link>
      <div>
        {loading 
          ? <Spinner></Spinner> 
          : <button onClick={() => handleDeletePost(post.id)}>Delete!</button>
        }
      </div>
    </li>
  );
};

export default PostItem;
