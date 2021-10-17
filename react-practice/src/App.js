import styled from '@emotion/styled';
import React from 'react';
import TaskProvider from './components/contexts/TaskProvider';
import Header from './components/Todolist/Header';
import NewTaskForm from './components/Todolist/NewTaskForm';
import TaskList from './components/Todolist/TaskList'

const Container = styled.div`
  width: 25rem;
  margin: 0 auto;
`;

function App() {
  return (
    <TaskProvider>
      <Container>
        <Header>TODO</Header>
        <NewTaskForm></NewTaskForm>
        <TaskList css={{ marginTop: 16 }}></TaskList>
      </Container>
    </TaskProvider>

  )
}

export default App;
