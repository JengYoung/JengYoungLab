import React from 'react';
import Header from '../components/Header';

export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 6 }},
    strong: { control: 'boolean' }, 
    underline: { control: 'boolean' }, 
    color: { control: 'color' }
  },
};

const Template = (args) => <Header {...args}>Header</Header>;

export const Default = Template.bind({});
