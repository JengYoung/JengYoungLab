import React from 'react';
import Box from '../components/Box';

export default {
  title: 'Example/Box',
  component: Box,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    backgroundColor: { control: 'color' }
  }
}

const Template = args => <Box {...args}></Box>

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button'
}