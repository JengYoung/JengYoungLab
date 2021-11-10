import { useRouter } from 'next/dist/client/router';

const Post = () => {
  const router = useRouter();

  return <div><button onClick={() => router.push('/about')}>Go to About</button></div>
}

export default Post;
