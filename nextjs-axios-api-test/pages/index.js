import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useTodos } from "../contexts/TodosProvider";

const { NEXT_PUBLIC_API_END_POINT } = process.env;

export const fetchTodos = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return data;
};

export default function Home() {
  const { todos, getTodos } = useTodos();
  useEffect(() => {
    const updateTodo = async () => {
      const { data } = await axios.get(
        `${NEXT_PUBLIC_API_END_POINT}/api/hello`
      );
      getTodos(data);
    };
    updateTodo();
  }, [getTodos]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <>
      {todos?.map(({ userId, id, title, completed }) => (
        <div key={id}>
          <h3>{title}</h3>
          <h4>JengYoung{userId}</h4>
          <input type="checkbox" defaultChecked={completed} />
        </div>
      ))}
    </>
  );
}
