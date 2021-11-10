import React from 'react';
import Task from '../components/Todolist/Task';

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {
  },
};


export const Default = () => {
  const task = {
    content: '출근하기',
    complete: false
  }
  return (
    <Task 
      content={task.content} 
      complete={task.complete}
    />
  )
}

