import TodoList from "@/components/TodoList";
import request from "@/apis/request";
import SyncTaskManager from "@/utils/SyncTaskManager";
import { TITLE_COMPLETED, TITLE_INCOMPLETED } from "@/utils/constants";
export default function App({ $target }) {
  const taskQueue = new SyncTaskManager();
  this.state = {
    todos: [],
  };

  const inCompletedTodoList = new TodoList({
    $target,
    initialState: {
      title: TITLE_INCOMPLETED,
      todos: [],
    },
    onDrop: (todoId) => handleDrop(todoId, false),
    onRemove: (todoId) => handleRemove(todoId),
  });

  const completedTodoList = new TodoList({
    $target,
    initialState: {
      title: TITLE_COMPLETED,
      todos: [],
    },
    onDrop: (todoId) => handleDrop(todoId, true),
    onRemove: (todoId) => handleRemove(todoId),
  });

  this.setState = (nextState) => {
    this.state = nextState;

    const { todos } = this.state;

    inCompletedTodoList.setState({
      ...inCompletedTodoList.state,
      todos: todos.filter((todo) => !todo.isCompleted),
    });

    completedTodoList.setState({
      ...completedTodoList.state,
      todos: todos.filter((todo) => todo.isCompleted),
    });
  };

  const fetchTodos = async () => {
    const todos = await request("");

    this.setState({
      ...this.state,
      todos,
    });
  };

  fetchTodos();

  const $button = document.createElement("button");
  $button.textContent = "변경내용 동기화";
  $target.appendChild($button);
  $button.addEventListener("click", () => {
    taskQueue.run();
  });

  const handleDrop = async (id, isCompleted) => {
    const nextTodos = [...this.state.todos];
    const todoIndex = nextTodos.findIndex((todo) => todo._id === id);
    nextTodos[todoIndex].isCompleted = isCompleted ? true : false;

    // 낙관적 업데이트의 한계 - 만약 전송 속도 느리다면 UI 렌더링 순서가 꼬일 수도 있다!
    /*
      해결 - Queue와 같은 자료 구조를 활용하자!
    */
    this.setState({
      ...this.state,
      todos: nextTodos,
    });

    // taskQueue.addTask(async () => {
    //   await toggleTodo(todoId);
    // });

    taskQueue.addTask({
      type: "TOGGLE",
      params: { id },
    });
  };

  const handleRemove = async (id) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter((todo) => todo._id !== id),
    });

    taskQueue.setUniqueTasks(`${id}`);
    taskQueue.addTask({
      type: "REMOVE",
      params: { id },
    });
  };
}
