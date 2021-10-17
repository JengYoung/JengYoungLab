import React from 'react';
import ErrorText from '../components/ErrorText';

export default {
  title: 'component/ErrorText',
  ErrorText: ErrorText,
};

const Template = (args) => <ErrorText {...args}>Error Text</ErrorText>;

export const Default = Template.bind({});
