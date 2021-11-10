import styled from '@emotion/styled';
import { ReactNode } from 'react';

const StyledHeader = styled.h1`
  text-align: center;
`;

interface HeaderProps {
  children: ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <StyledHeader>
      { children }
    </StyledHeader>
  )
}

export default Header;
