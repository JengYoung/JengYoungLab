import React from 'react';
import Button from '../components/Button';

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick'}
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
