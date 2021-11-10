import React from "react";
import { PostItem } from "@components/domain";
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/index';
import { Post } from '@redux/posts';
import { Spinner } from '@src/components/base';

interface PostListProps {
  [index: string]: any;
}

const PostList: React.FC<PostListProps> = ({ ...props }) => {
  const { posts, loading } = useSelector((store: StoreState) => store.posts);
  console.log("Posts", posts);
  return (
    <div>
      {loading 
        ? <Spinner></Spinner> 
        : (
          <ul>
            {posts.map((post: Post) => (
              <PostItem key={post.id} post={post} {...props}></PostItem>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default PostList;
