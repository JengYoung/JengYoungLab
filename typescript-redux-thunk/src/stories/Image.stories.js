import React from 'react';
import Image from '../components/Image';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    block: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    src: {
      name: 'src',
      type: { name: 'string', require: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' }
    },
    placeholder: {
      name: 'placeholder',
      type: { name: 'string' },
      defaultValue: 'https://via.placeholder.com/200',
      control: { type: 'text' }
    },
    threshold: {
      type: { name: 'number' },
      defaultValue: 0.5,
      control: { type: 'number' }
    },
    width: {
      name: 'width',
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 }
    },
    height: {
      name: 'height',
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 }
    },
    alt: {
      name: 'alt',
      control: 'string'
    },
    mode: {
      defaultValue: 'cover',
      options: ['cover', 'fill', 'contain'],
      control: { type: 'inline-radio' }
    }
  },
};

const Template = (args) => <Image {...args} />;

export const Default = Template.bind({});

export const Lazy = args => {
  return (
    <div>
      {
        Array.from(new Array(20), (_, k) => k).map(i => (
          <Image key={i} {...args} lazy block src={`${args.src}?&${i}`}></Image>
        ))
      }
    </div>
  )
}