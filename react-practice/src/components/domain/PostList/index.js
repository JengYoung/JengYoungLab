import React from "react";
import { PostItem } from "@components/domain";
import { usePostContext } from "@contexts/PostProvider";

const PostList = () => {
  const { posts } = usePostContext();
  console.log("Posts", posts);
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post}></PostItem>
      ))}
    </ul>
  );
};

export default PostList;
