import React, { createContext, useCallback, useContext, useState } from "react";

const initialState = [];

const TodosContext = createContext();

export const useTodos = () => useContext(todoContext);

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialState);

  const addTodo = useCallback((todo) => {
    setTodos((state) => [...state, todo]);
  }, []);

  const removeTodo = useCallback((todo) => {
    setTodos((state) => state.filter((stateTodo) => stateTodo.id !== todo.id));
  }, []);

  return (
    <TodosContext.provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodosContext.provider>
  );
};

export default TodosProvider;
