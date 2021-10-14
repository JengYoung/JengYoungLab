import React from 'react';
import SignUpForm from '../components/SignUpForm';

export default {
  title: 'component/SignUpForm',
  component: SignUpForm,
  argTypes: {
    onSubmit: {action: 'onSubmit'}
  },
};

const Template = (args) => <SignUpForm {...args} />;

export const Default = Template.bind({});
