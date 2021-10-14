import styled from '@emotion/styled';

const Button = styled.button`
  display: block;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.375rem;
  color: white;
  border-radius: 0.25rem;
  outline: none;
  border: none;
  background-color: black;
  box-sizing: border-box;

  &:hover { 
    background-color: #111;
    cursor: pointer;
  }
  &:active { 
    background-color: #222;
  }
  &:disabled {
    background-color: #888;
  }
`;

export default Button;