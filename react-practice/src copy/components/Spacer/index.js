import React from 'react'

const Spacer = ({ children, type = 'horizontal', size = 8, ...props }) => {
  const spacerStyle = {
    ...props.style,
    display: type === 'vertical' ? 'block' : 'inline-block',
    verticalAlign: type === 'horizontal' ? 'middle' : undefined
  }

  const nodes = React.Children.toArray(children)
                              .filter(elem => React.isValidElement(elem))
                              .map((elem, idx, elems) => 
                                React.cloneElement(elem, {
                                  ...elem.props,
                                  style: {
                                    ...elem.props.style,
                                    marginRight: type === 'horizontal' && idx !== elems.length - 1 ? size : undefined,
                                    marginBottom: type === 'vertical' && idx !== elems.length - 1 ? size : undefined
                                  }
                                }))

  return (
    <div style={spacerStyle}>
      {nodes}
    </div>
  )
}

export default Spacer
