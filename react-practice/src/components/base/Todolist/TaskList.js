import React from 'react';
import styled from '@emotion/styled';
import Task from './Task';
import { useTasks } from '../contexts/TaskProvider';

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
  const { tasks } = useTasks();

  return (
    <UnorderedList {...props}>
      {
        tasks.map(item =>
          <Task
            key={item.id}
            id={item.id}
            content={item.content}
            complete={item.complete}
          />
        )
      }
    </UnorderedList>
  )
}

export default TaskList
