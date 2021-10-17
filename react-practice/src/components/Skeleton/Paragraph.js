import React from 'react'
import Box from './Box';

const Paragraph = ({
  line = 3,
  ...props
}) => {
  return (
    <div {...props}>
      {Array.from(Array(line), (_, idx) => (
        idx !== line - 1
          ? <Box width="100%" height={16} key={idx} />
          : <Box width="64%" height={16} key={idx} />
      ))}
    </div>
  )
}

export default Paragraph
