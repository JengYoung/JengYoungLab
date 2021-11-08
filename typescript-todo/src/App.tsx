import NewTaskForm from './components/NewTaskForm';
import Header from './components/Header';
import TaskList from './components/TaskList';


import styled from '@emotion/styled';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const App = () => {
  return (
    <Container>
      <Header>Todo</Header>
      <NewTaskForm></NewTaskForm>
      <TaskList css={{ marginTop: 16 }}></TaskList>
    </Container>
  )
}

export default App;


// craco
// emotion
// storybook
