import React, {useState} from 'react'
import styled from '@emotion/styled';
import { useTasks } from '../contexts/TaskProvider';

const Form = styled.form`
  width: 25rem;
`;

const Input = styled.input`
  width: 20.75rem;
  height: 2rem;
  padding: 0.25rem 0.375rem;
  border-radius: 0.5rem;
  border: 0.125rem solid black;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`
  width: 3.75rem;
  height: 2rem;
  padding: 0.25rem 0.375rem;
  margin-left: 0.5rem;
  color: white;
  border-radius: 0.5rem;
  border: none;
  background-color: black;
  box-sizing: border-box;
  cursor: pointer;
`;

const NewTaskForm = (props) => {
  const [ task, setTask ] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = e => {
    e.preventDefault();
    addTask(task);
    setTask('');
  }

  return (
    <Form {...props} onSubmit={handleSubmit}>
      <Input 
        type="text" 
        value={task} 
        onChange={e => setTask(e.target.value)}
        required
      />
      <SubmitBtn>ADD!</SubmitBtn>
    </Form>
  )
}

export default NewTaskForm
