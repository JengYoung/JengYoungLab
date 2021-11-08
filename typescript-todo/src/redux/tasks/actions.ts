import { v4 } from 'uuid';
import { Action, Task } from './types';

const initialState: Task = {
  id: v4(),
  content: '',
  complete: false,
}

export const addTask = (content: string): Action => ({
  type: 'ADD_TASK',
  payload: {
    ...initialState,
    id: v4(),
    content,
  }
})

export const updateTask = (id: string, content: string, complete: boolean) => ({
  type: 'UPDATE_TASK',
  payload: {
    ...initialState,
    id, 
    content,
    complete,
  }
});

export const removeTask = (id: string) => ({
  type: 'REMOVE_TASK',
  payload: {
    ...initialState,
    id,
  }
})
