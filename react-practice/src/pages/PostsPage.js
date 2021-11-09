import { useCallback } from "react";
import axios from "axios";

import PostProvider from "@contexts/PostProvider";

import { Header, Spinner } from "@components/base";
import { PostList, PostAddForm } from "@components/domain";

import { useAsync } from "@hooks";

const PostsPage = () => {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.data);
  }, []);

  const handleAddPost = useCallback(async (post) => {
    return await axios
      .post("https://jsonplaceholder.typicode.com/posts", post)
      .then((response) => response.data);
  }, []);

  const handleDeletePost = useCallback(async (id) => {
    return await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => ({ id }));
  }, []);

  return (
    <PostProvider
      initialPosts={initialPosts.value}
      handleDeletePost={handleDeletePost}
      handleAddPost={handleAddPost}
    >
      <Header>Posts</Header>
      <PostAddForm></PostAddForm>
      {initialPosts.isLoading ? <Spinner></Spinner> : <PostList></PostList>}
    </PostProvider>
  );
};

export default PostsPage;
