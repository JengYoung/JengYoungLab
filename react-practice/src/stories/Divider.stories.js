import React from 'react';
import Divider from '../components/Divider';
import Text from '../components/Text/index';

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
  },
};

const Template = (args) => <Divider {...args} />;

export const Default = Template.bind({});


export const Horizontal = () => {
  return (
    <>
      <Text>위</Text>
      <Divider type="horizontal"/>
      <Text>아래</Text>
    </>
  ) 
}

export const Vertical = () => {
  return (
    <>
      <Text>왼쪽</Text>
      <Divider type="vertical"/>
      <Text>오른쪽</Text>
    </>
  ) 
}