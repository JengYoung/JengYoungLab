import React from 'react';
import Counter from '../components/Counter';

export default {
  title: 'Example/Counter',
  component: Counter,
  argTypes: {
    onIncrease: { action: 'increase' }
  }
};

const Template = (args) => <Counter {...args} />;

export const Default = Template.bind({});