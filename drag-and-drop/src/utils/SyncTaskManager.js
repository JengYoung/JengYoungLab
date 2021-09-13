import removeTodo from "@/apis/todo/removeTodo";
import toggleTodo from "@/apis/todo/toggleTodo";

// 중복되는 태스크를 제거하는 방식
export default function SyncTaskManager() {
  this.tasks = [];

  this.addTask = (taskParams) => {
    this.tasks = [...this.tasks, taskParams];
  };

  this.setUniqueTasks = (id) => {
    this.tasks = this.tasks.filter(({ params }) => params.id !== id);
  };

  this.run = async () => {
    if (this.tasks.length) {
      const { type, params } = this.tasks.shift();
      if (type === "TOGGLE") await toggleTodo(params.id);
      if (type === "REMOVE") await removeTodo(params.id);

      this.run();
    }
  };
}
