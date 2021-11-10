import styled from '@emotion/styled';
import Link from 'next/link';

const About = () => {
  return (
    <>
      <Box>About</Box>
      <Link href="/">Go to Home!</Link>
    </>
  )
}
export default About;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: lightgreen;
`;
