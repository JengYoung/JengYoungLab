import { Post } from '../../interfaces';
import { NextPageContext } from 'next';
import axios from 'axios';

export const getServerSideProps = async (context: NextPageContext) => {
  const postId = context.query.id;

  try {
    const { data: post } = await axios(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    
    return {
      props: { post },
    }
  } catch(e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return {
        notFound: true
      }
    }

    return { props: {}}; // 그냥 네트워크 오류가 아니라면 다른 페이지로 리다이렉트.
  }
}

interface Props {
  post: Post
}

const PostPage = ({ post }: Props) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default PostPage
