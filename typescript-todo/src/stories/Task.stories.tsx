import Task from "../components/Task";

export default {
  title: "Component/Task",
  component: Task,
};

export const Default = () => <Task id="123" content="todo" complete></Task>;
