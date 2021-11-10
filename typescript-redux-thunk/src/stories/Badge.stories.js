import React from 'react';
import Badge from '../components/Badge';
import Image from '../components/Image';

export default {
  title: 'component/Badge',
  component: Badge,
  argTypes: {
    count: { defaultValue: 10, control: "number" },
    maxCount: { defaultValue: 100, control: "number" },
    backgroundColor: {control: 'color'},
    textColor: {control: 'color'},
    showZero: { defaultValue: false, control: 'boolean' }
  },
};

const Template = (args) => 
  <Badge {...args}>
    <Image 
      src="https://picsum.photos/60" 
      width={60} 
      style={{ borderRadius: 8 }}
    ></Image>
  </Badge>;

export const Default = Template.bind({});

export const Dot = () => 
  <Badge dot>
    <Image 
      src="https://picsum.photos/60" 
      width={40} 
      style={{ borderRadius: 8 }}
    ></Image>
  </Badge>;