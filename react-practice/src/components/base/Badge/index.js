import React from 'react'
import styled from '@emotion/styled'
const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 1.25rem;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  border-radius: 1.25rem;
  background-color: #f44;
  color: white;
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
  }
`;

const Badge = ({ 
  children, 
  count,
  maxCount, 
  backgroundColor, 
  showZero,
  dot = false,
  textColor, 
  ...props 
}) => {
  const colorStyle = {
    backgroundColor,
    color: textColor
  }

  let badge = null;
  if (count) {
    badge = <Super style={colorStyle}>{
      maxCount && count > maxCount 
        ? `${maxCount}+`
        : count
    }</Super>
  } else {
    if (count !== undefined) {
      badge = showZero 
        ? <Super style={colorStyle}>0</Super> 
        : 0;
    } else if (dot) {
      badge = <Super className="dot" style={colorStyle}></Super>
    }
  }

  return (
    <BadgeContainer {...props}>
      { children }
      {badge}
    </BadgeContainer>
  )
}

export default Badge
