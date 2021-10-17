import React from 'react';
import NewTaskForm from '../components/Todolist/NewTaskForm';

export default {
  title: 'todolist/NewTaskForm',
  component: NewTaskForm,
  argTypes: {
  },
};

const Template = (args) => <NewTaskForm {...args} />;

export const Default = Template.bind({});
