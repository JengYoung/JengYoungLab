import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Spinner, Header, Text } from "@components/base";
import { fetchPostById, Post } from '@src/redux/posts';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@src/redux';

interface ParamType {
  postId: string;
}

const PostPage = () => {
  const { postId } = useParams() as ParamType;
  const dispatch = useDispatch();
  const post: Post | undefined = useSelector((state: StoreState) => state.posts.posts.find(post => post.id === parseInt(postId)));

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)))
  }, [dispatch, postId])
  return (
    <div>
      {post ? (
        <>
          <Header strong>{post.title}</Header>
          <Text>{post.body}</Text>
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
};

export default PostPage;
