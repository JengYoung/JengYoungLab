import React, { createContext, useCallback, useContext, useState } from "react";

const initialState = [];

const TodosContext = createContext();

export const useTodos = () => useContext(TodosContext);

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialState);

  const getTodos = useCallback((todo) => {
    setTodos(() => todo);
  }, []);

  const addTodo = useCallback((todo) => {
    setTodos((state) => [...state, todo]);
  }, []);

  const removeTodo = useCallback((todo) => {
    setTodos((state) => state.filter((stateTodo) => stateTodo.id !== todo.id));
  }, []);

  return (
    <TodosContext.Provider value={{ todos, getTodos, addTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
