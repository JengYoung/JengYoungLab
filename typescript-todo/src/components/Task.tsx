import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
// import { useTasks } from '../context/TaskProvider';
import { removeTask, updateTask } from '../redux/tasks';
import Toggle from './Toggle';

interface Props {
  id: string;
  content: string;
  complete: boolean;
}

const Task = ({ id, content, complete, ...props }: Props) => {
  // const { updateTask, removeTask } = useTasks();
  const dispatch = useDispatch();

  return (
    <ListItem {...props}>
      <Toggle 
        on={complete} 
        onChange={e => dispatch(updateTask(id, content, e.target.checked))}
      ></Toggle>
      <Content complete={complete}>{content}</Content>
      <RemoveButton 
        onClick={() => dispatch(removeTask(id))}
      >Remove</RemoveButton>
    </ListItem>
  )
}

export default Task;

const ListItem = styled.li`
  display: flex;
  width: 400px;
  height: 40px;
  align-items: center;
  padding: 0 8px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const Content = styled.span<{ complete: boolean }>`
  display: inline-block;
  flex: 1;
  margin-left: 8pt;
  font-size: 15px;
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
`;

const RemoveButton = styled.button`
  width: 60px;
  height: 24px;
  margin-left: 8px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: red;
  cursor: pointer;
`;
