// 리듀서: 상태를 변화시키는 순수함수

import { Action, Task } from './types';

export const tasks = (state: Task[] = [], action: Action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = action.payload;
      return [...state, newTask];
    }
    case 'UPDATE_TASK': {
      const updatedTask = action.payload;
      return state.map((oldTask: Task) => oldTask.id === updatedTask.id ? updatedTask : oldTask);
    }
    case 'REMOVE_TASK': {
      const willRemovedTask = action.payload; 
      return state.filter(nowTask => nowTask.id !== willRemovedTask.id);
    }
    default: {
      return state;
    }
  }
}
