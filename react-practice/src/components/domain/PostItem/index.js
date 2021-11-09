import { useState } from "react";
import { Header, Spinner } from "@components/base";
import { usePostContext } from "@contexts/PostProvider";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { onDeletePost } = usePostContext();
  const handleDeletePost = async (id) => {
    setLoading(() => true);
    await onDeletePost(id);
    setLoading(() => false);
  };
  return (
    <li>
      <Header strong level={3}>
        {post.title}
      </Header>
      <Link to={`/posts/${post.id}`}>{`Detail ->`}</Link>
      <div>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        )}
      </div>
    </li>
  );
};

export default PostItem;
