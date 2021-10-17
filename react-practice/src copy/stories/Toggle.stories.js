import React from 'react';
import Toggle from '../components/Toggle';

export default {
  title: 'Component/Toggle',
  component: Toggle,
  argTypes: {
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' }
  },
};

const Template = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
