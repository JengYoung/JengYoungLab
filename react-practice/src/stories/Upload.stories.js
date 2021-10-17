import React from 'react';
import Upload from '../components/Upload';

export default {
  title: 'Component/Upload',
  component: Upload,
  argTypes: {
  },
};

const Template = (args) => 
  <Upload {...args}>
    <button>CLICK!</button>
  </Upload>;

export const Default = Template.bind({});

export const AccessFile = () => {
  return (
    <Upload>
      {file => <button>{file ? file.name : 'Click me'}</button>}
    </Upload>
  )
}

export const Droppable = () => {
  return (
    <Upload
      droppable
    >
      {
        (file, dragging) => (
          <div style={{ 
            width: 300,
            height: 100,
            border: '4px dashed #aaa',
            borderColor: dragging ? 'black' : '#aaa'
          }}>
            { file ? file.name : 'Click or drag file to this area to upload' }
          </div>
        )
      }
    </Upload>
  )
}