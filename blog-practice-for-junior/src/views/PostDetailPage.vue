<template>
  <header>
    <h1>POST DETAIL PAGE</h1>
  </header>
  <article v-if="post">
    <header>
      <h2>{{ post.title }}</h2>
      <h4>{{ post.userId }}</h4>
    </header>
    <div>{{ post.body }}</div>
  </article>
  <div v-else>상세 정보를 불러오는 중입니다...</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPost } from '../api/post';

interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  setup() {
    const post = ref<PostInterface>(null);
    const route = useRoute();

    (async () => {
      const res = await getPost(route.params.id as string);
      post.value = res.data;
    })();
    return { post };
  },
});
</script>

<style lang="scss" scoped>
header {
  h4 {
    text-align: right;
  }
}
</style>
