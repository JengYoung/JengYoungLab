<template>
  <header>
    <h1>TODO PAGE</h1>
  </header>

  <form class="form" action="">
    <input
      class="form__input"
      type="text"
      placeholder="할 일을 입력하세요!"
      v-model="inputValue"
    />
    <button class="form__submit-btn" @click.prevent="addTodo">입력</button>
  </form>

  <ul class="todos">
    <li v-for="todo in todos" class="todo" :key="todo.id">
      <span
        class="todo__content"
        :class="todo.completed ? 'todo__content--toggled' : ''"
        @click="() => onToggle(todo.id)"
      >
        {{ todo.content }}
      </span>
      <button class="todo__remove-btn" @click="() => onRemove(todo.id)">
        X
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface TodoInterface {
  id: string;
  content: string;
  completed: boolean;
}
export default defineComponent({
  setup() {
    const todos = ref<TodoInterface[]>([]);
    if (!window.localStorage.getItem('todos')) {
      window.localStorage.setItem('todos', JSON.stringify([]));
    } else {
      todos.value = JSON.parse(
        window.localStorage.getItem('todos') as string
      ) as TodoInterface[];
    }

    const inputValue = ref('');

    const addTodo = () => {
      todos.value = [
        ...todos.value,
        {
          id: new Date().toString(),
          content: inputValue.value,
          completed: false,
        },
      ];
      window.localStorage.setItem('todos', JSON.stringify(todos.value));
      inputValue.value = '';
    };

    const onToggle = (id: string) => {
      todos.value = todos.value.map((val) =>
        val.id === id ? { ...val, completed: !val.completed } : val
      );
      window.localStorage.setItem('todos', JSON.stringify(todos.value));
    };

    const onRemove = (id: string) => {
      todos.value = todos.value.filter((val) => val.id !== id);
      window.localStorage.setItem('todos', JSON.stringify(todos.value));
    };

    return {
      todos,
      addTodo,
      inputValue,
      onToggle,
      onRemove,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo {
  list-style: none;
}
.todo__content--toggled {
  text-decoration: line-through;
}
</style>
