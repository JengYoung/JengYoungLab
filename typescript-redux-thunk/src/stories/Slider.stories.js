import React from 'react';
import Icon from '../components/Icon';
import Slider from '../components/Slider';
import Spacer from '../components/Spacer';

export default {
  title: 'component/Slider',
  component: Slider,
  argTypes: {
    defaultValue: { defaultValue: 1, control: "number" },
    min: { defaultValue: 1, control: 'number' },
    max: { defaultValue: 100, control: 'number' },
    step: { defaultValue: 0.1, control: 'number' },
    onChange: { action: 'onChange' }
  },
};

const Template = (args) => <Slider {...args} />;

export const Default = Template.bind({});

export const VolumeControl = () => {
  return (
    <Spacer>
      <Icon name="volume"></Icon>
      <Slider style={{ width: 100, display: 'inline-block' }}></Slider>
      <Icon name="volume-2"></Icon>
    </Spacer>
  )
}