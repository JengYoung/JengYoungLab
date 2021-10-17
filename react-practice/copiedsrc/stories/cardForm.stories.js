import React from 'react';
import CardForm from '../components/CardForm';

export default {
  title: 'component/CardForm',
  component: CardForm,
  argTypes: {
  },
};

const Template = (args) => <CardForm {...args}>CardForm</CardForm>;

export const Default = Template.bind({});
