<template>
  <div>TODO Page</div>
</template>

<script lang="ts">
import { getPosts } from '@/api/post';
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  setup() {
    onMounted(() => {
      (async () => {
        const data = await getPosts();
        console.log('data: ', data);
      })();
    });
    return {};
  },
});
</script>

<style scoped></style>
