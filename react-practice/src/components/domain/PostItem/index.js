import { useState } from "react";
import { Text, Header, Spinner } from "@components/base";
import { usePostContext } from "@contexts/PostProvider";

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
      <Text>{post.body}</Text>
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
