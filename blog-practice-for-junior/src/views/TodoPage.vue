<template>
  <header>
    <h1>TODO PAGE</h1>
  </header>
  <form class="form" action="">
    <input class="form__input" type="text" placeholder="할 일을 입력하세요!" />
    <button class="form__submit-btn">입력</button>
  </form>
  <ul class="todos"></ul>
</template>

<script lang="ts">
import { getPosts } from '../api/post';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  setup() {
    const todos = ref([]);

    onMounted(() => {
      (async () => {
        const data = await getPosts();
        console.log('data: ', data);
      })();
    });
    return {
      todos,
    };
  },
});
</script>

<style scoped></style>
