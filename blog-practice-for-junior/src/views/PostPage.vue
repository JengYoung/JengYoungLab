<template>
  <header>
    <h1>POST PAGE</h1>
  </header>
  <ul class="posts">
    <li class="post" v-for="post in posts" :key="post.id">
      <h3 class="post__title">{{ post.title }}</h3>
      <div class="post__body">content: {{ post.body }}</div>
      <div class="post__id">{{ post.id }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getPosts } from '../api/post';

export default defineComponent({
  setup() {
    const posts = ref([]);
    (async () => {
      const res = await getPosts();
      posts.value = res.data;
    })();
    return {
      posts,
    };
  },
});
</script>

<style lang="scss" scoped>
.post {
  cursor: pointer;
  list-style: none;
  text-align: left;

  margin-bottom: 1rem;
  padding: 1rem;

  border: 1px solid lightgray;
  border-radius: 20px;

  &:hover {
    background: #e5def2;
    transition: all 0.3s;
  }

  .post__id {
    text-align: right;
    font-size: 0.75rem;
  }
}
</style>
