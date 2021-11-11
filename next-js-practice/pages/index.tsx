import axios from 'axios';
import { Post } from '../interfaces';
import Link from 'next/link';
import styled from '@emotion/styled';
export const getServerSideProps = async () => {
  const { data: posts } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

  return {
    props: { posts },
  }
}

interface Props {
  posts: Post[];
  publishedBy: string;
}

const PostLink = styled.li`
  margin: 10px;
  div {
    font-weight: 700;
  }
`;


const HomePage = ({ posts, publishedBy }: Props) => {
  return (
    <div>
      Home
      <ul>
        {
          posts.map(post => (
            <Link 
              key={post.id} 
              href={"/posts/[id]"} 
              as={`/posts/${post.id}`}
              passHref
            >
              <PostLink
              >
                {post.title}
                <div>{publishedBy}</div>
              </PostLink>
            </Link>
          ))
        }
      </ul>
    </div>
  )
}

export default HomePage;
