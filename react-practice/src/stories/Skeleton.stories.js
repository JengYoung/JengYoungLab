import Skeleton from '../components/Skeleton';

export default {
  title: 'Component/Skeleton',
  // component: Skeleton,
  argTypes: {
  },
};

export const Box = (args) => <Skeleton.Box {...args} />;

Box.argTypes =  {
  width: { defaultValue: 200, control: 'number' },
  height: { defaultValue: 200, control: 'number' },
}

export const Circle = (args) => <Skeleton.Circle {...args}/>

Circle.argTypes =  {
  size: { defaultValue: 200, control: 'number' },
}

export const Paragraph = (args) => <Skeleton.Paragraph {...args}/>
Paragraph.argTypes =  {
  size: { line: 3, control: 'number' },
}

export const Sample = () => {
  return (
    <>
      <div style={{ cssFloat: 'left', marginRight: 16 }}>
        <Skeleton.Circle size={60}/>
      </div>
      <div style={{ cssFloat: 'left', width: '80%' }}>
        <Skeleton.Paragraph line={4}/>
      </div>
      <div style={{ clear: 'both' }}></div>
    </>
  )
}