import { createContext, ReactChild, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 } from 'uuid';

interface Task {
  id: string;
  content: string;
  complete: boolean;
}

interface iTaskContext {
  tasks: Task[];
  addTask(content: string): void;
  updateTask(id: string, status: boolean): void;
  removeTask(id: string): void;
}

const TaskContext = createContext<iTaskContext>({} as iTaskContext);

export const useTasks = () => useContext(TaskContext);

interface Props {
  children: ReactChild;
  initialTasks?: Task[];
}

const TaskProvider = ({children, initialTasks = []}: Props) => {
  const [ tasks, setTasks ] = useLocalStorage<Task[]>('tasks', initialTasks)

  const addTask = (content: string) => {
    setTasks([
      ...tasks,{
        id: v4(),
        content,
        complete: false,
      }
    ])
  }

  const updateTask = (id: string, status: boolean) => {
    setTasks(
      tasks.map(item => item.id === id ? { ...item, complete: status} : item)
    )
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(item => item.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider;
