import React from 'react';
import Title from '../components/Title';

export default {
  title: 'component/Title',
  component: Title,
  argTypes: {
  },
};

const Template = (args) => <Title {...args}>Title</Title>;

export const Default = Template.bind({});
