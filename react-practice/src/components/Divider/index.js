import React from 'react'
import styled from '@emotion/styled'

const Line = styled.hr`
  border: none;
  background-color: #aaa;
  
  &.vertical {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 0.0625rem;
    height: 1.0625em;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 0.0625rem;
  }
`;

const Divider = ({
  type = 'horizontal',
  size = 8,
  ...props
}) => {
  const dividerStyle = {
    margin: type === 'vertical'
      ? `0 ${size}px`
      : `${size}px 0`
  }
  return (
    <Line 
      {...props} 
      className={type}
      style={{ ...dividerStyle, ...props.style }}
    />
  )
}

export default Divider
