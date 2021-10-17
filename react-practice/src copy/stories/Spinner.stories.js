import React from 'react';
import Spinner from '../components/Spinner';

export default {
  title: 'Component/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      defaultValue: 24,
      control: "number"
    },
    color: {
      control: "color"
    }
  },
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
