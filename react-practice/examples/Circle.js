const Circle = ({ width = 100, height = 100, backgroundColor = 'red' }) => {
  const style = {
    width,
    height,
    backgroundColor,
    borderRadius: '50%',
  };
  return <div style={style}></div>
}

export default Circle

