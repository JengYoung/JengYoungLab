import React from 'react';
import styled from '@emotion/styled';
import Task from './Task';

const UnorderedList = styled.ul`
  width: 25rem;
  margin: 0;
  padding: 0;

  & > li {
    &:not(:first-child) {
      margin-top: 0.5rem;
    }
  }
`;

const TaskList = (props) => {
  return (
    <UnorderedList>
      <Task content="Test"></Task>
      <Task content="Test"></Task>
      <Task content="Test"></Task>
    </UnorderedList>
  )
}

export default TaskList
