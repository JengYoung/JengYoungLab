import  { useRef, useState } from 'react';

const AutoCounter = () => {
  const [ count, setCount ] = useState(0);
  const interValid = useRef();

  const handleStart = () => {
    interValid.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000) 
  }
  
  const handleStop = () => {
    clearInterval(interValid.current);
  }

  return (
    <>
      <div>{ count }</div>
      <button onClick={handleStart}> Start</button>
      <button onClick={handleStop}> Stop</button>
    </>
  )
}

export default AutoCounter