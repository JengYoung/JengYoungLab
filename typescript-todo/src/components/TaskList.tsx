import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
// import { useTasks } from '../context/TaskProvider';
import Task from './Task';

const TaskList = (props: any) => {
  // const { tasks } = useTasks();
  const { tasks } = useSelector((store: RootState) => ({
    tasks: store.tasks
  }));
  
  return <UnorderedList {...props}>
    {
      tasks.map(item => (
        <Task 
          key={item.id} 
          id={item.id} 
          content={item.content} 
          complete={item.complete}
        ></Task>
      ))
    }
  </UnorderedList>
}

export default TaskList;

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    &:not(:first-of-type) {
      margin-top: 8px;
    }
  }
`;
