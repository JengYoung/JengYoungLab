import React from 'react'
import './Text.css';

const Text = ({ 
  children, 
  block, 
  paragraph, 
  size, 
  strong, 
  underline, 
  delete: del, 
  color, 
  mark,
  code,
  ...props 
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize: typeof size === 'number' ? size : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color
  }
  if (del) {
    children = <del>{children}</del>
  }
  if (code) {
    children = <code>{children}</code>
  }
  if (mark) {
    children = <mark>{children}</mark>
  }
  return (
    <Tag 
      className={`${
        size === 'string' 
          ? `Text--size-${size}`
          : undefined
      }`}
      style={{ ...props.style, ...fontStyle }} 
      {...props}
    >
      { children }
    </Tag>
  )
}

export default Text
