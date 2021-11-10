import React from 'react';
import Text from '../components/Text';

export default {
  title: 'Component/Text',
  component: Text,
  argTypes: {
    size: { control: "number" },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' },
    color: {control: 'color'},
    block: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    mark: { control: 'boolean' },
    code: { control: 'boolean' },
  },
};

const Template = (args) => <Text {...args}>Text</Text>;

export const Default = Template.bind({});


export const Size = args => {
  return (
    <>
      <Text {...args} size="large">Large</Text>
      <Text {...args} size="normal">Normal</Text>
      <Text {...args} size="small">Small</Text>
      <Text {...args} size={25}>Custom</Text>
    </>
  )
}