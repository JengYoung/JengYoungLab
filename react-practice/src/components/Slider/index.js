import React, {useState, useCallback, useRef, useEffect} from 'react'
import styled from '@emotion/styled';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 1rem;
`;

const Rail = styled.div`
  position: absolute;
  top: 0.375rem;
  left: 0;
  width: 100%;
  height: 0.25rem;
  border-radius: 0.125rem;
  background-color: #aaa;
`;

const Handle = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0;
  width: 0.75rem;
  height: 0.75rem;
  transform: translate(-50%, -50%);
  border: 0.125rem solid #44b;
  border-radius: 50%;
  background-color: white;
  cursor: grab;
`;

const Track = styled.div`
  position: absolute;
  top: 0.375rem;
  left: 0;
  width: 0;
  height: 0.25rem;
  border-radius: 0.125rem;
  background-color: #44b;
`;

const Slider = ({
  min = 0,
  max = 100,
  step = 0.1,
  defaultValue,
  onChange,
  ...props
}) => {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(defaultValue ? defaultValue : min);

  const handleMouseDown = useCallback(() => {
    setDragging(true)
  }, []);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, [])

  useEffect(() => {
    const handleMouseMove = e => {
      if (!dragging) return;
      const handleOffset = e.pageX - sliderRef.current.offsetLeft;
      const sliderWidth = sliderRef.current.offsetWidth;

      const track = handleOffset / sliderWidth;

      let newValue;
      if (track < 0) {
        newValue = min;
      } else if (track > 1) {
        newValue = max;
      } else {
        newValue = Math.round((min + (max - min) * track) / step) * step;
        newValue = Math.min(max, Math.max(min, newValue))
      }

      setValue(newValue);
      onChange && onChange(value);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step])

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail></Rail>
      <Track style={{ width: `${percentage}%`}}></Track>
      <Handle onMouseDown={handleMouseDown} style={{ left: `${percentage}%`}}></Handle>
    </SliderContainer>
  )
}

export default Slider
