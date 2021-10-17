import React from 'react'
import styled from '@emotion/styled';
import Toggle from './Toggle';

const ListItem = styled.li`
  display: flex;
  width: 25rem;
  height: 2.5rem;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
  list-style: none;
  box-sizing: border-box;
`;

const Content = styled.span`
  flex: 1;
  margin-left: 0.5rem;
  font-size: 0.875rem;
`;

const RemoveBtn = styled.button`
  width: 4.25rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: red;
  cursor: pointer;
`;

const Task = ({ content, complete, ...props }) => {
  return (
    <ListItem {...props}>
      <Toggle on={complete} />
      <Content>{content}</Content>
      <RemoveBtn>Remove!</RemoveBtn>
    </ListItem>
  )
}

export default Task
