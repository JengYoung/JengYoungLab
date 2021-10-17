import React from 'react';
import TaskList from '../components/Todolist/TaskList';

export default {
  title: 'todolist/TaskList',
  component: TaskList,
  argTypes: {
  },
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
