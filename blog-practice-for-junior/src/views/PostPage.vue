<template>
  <div>POST Page</div>
  <div>{{ posts }}</div>
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

<style scoped></style>
