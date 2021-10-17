import React from 'react';
import styled from '@emotion/styled';
import useToggle from '../../hooks/useToggle';


const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 4rem;
  height: 1.875rem;
  padding: 0.125rem;
  border-radius: 0.9375rem;
  background-color: #ccc;
  box-sizing: border-box;
  transition: background-color 0.2s ease-out;

  &:after {
    content: '';
    position: relative;
    left: 0;
    display: block;
    width: 1.625rem;
    height : 1.625rem;
    border-radius: 50%;
    background-color: white;
    transition: left 0.2s ease-out;
  }
`;

const ToggleInput = styled.input`
  display: none;

  &:checked + div { 
    background: lightgreen;
  }

  &:checked + div:after {
    left: calc(100% - 1.625rem);
  }
`;

const Toggle = ({ on = false, onChange, ...props }) => {
  const [ checked, toggle ] = useToggle(on);

  const handleChange = (e) => {
    toggle();
    onChange && onChange(e);
  }

  return (
    <ToggleContainer { ...props }>
      <ToggleInput 
        type="checkbox"
        onChange={handleChange}
        checked={checked}
      />
      <ToggleSwitch></ToggleSwitch>
    </ToggleContainer>
  )
}

export default Toggle
