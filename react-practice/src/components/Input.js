import React from 'react'

const Input = React.forwardRef((_, ref) => {
  return (
    <>
      <input ref={ref}></input>
    </>
  )
});

export default Input
