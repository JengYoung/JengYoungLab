import React from 'react';
import Flux from '../components/Flux';

const { Row, Col } = Flux;
export default {
  title: 'Component/Flux',
  component: Flux,
  argTypes: {
  },
};

const Box = () => {
  return (
    <div 
        style={{ 
          backgroundColor: '#44b',
          width: '100%',
          height: 18,
          color: 'white',
          textAlign: 'center',
          borderRadius: 8,
        }}
    >Box</div>
  )
}

export const Default = () => {
  return (
    <>
      <Row gutter={[8,8]}>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
      </Row>
      <Row gutter={[8,8]}>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
        <Col span={2}><Box/></Col>
      </Row>
    </>
  )
}
