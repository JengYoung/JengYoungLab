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

    <ul class="comments">
      <li :key="comment.id" v-for="comment in comments" class="comment">
        <address class="comment__email">{{ comment.email }}</address>
        <h3 class="comment__name">{{ comment.name }}</h3>
        <span class="comment__body">{{ comment.body }}</span>
      </li>
    </ul>
  </article>
  <div v-else>상세 정보를 불러오는 중입니다...</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPost, getComments } from '../api/post';

interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default defineComponent({
  setup() {
    const route = useRoute();

    const post = ref<PostInterface>(null);
    const comments = ref<CommentInterface[]>([]);

    (async () => {
      const postRes = await getPost(route.params.id as string);
      post.value = postRes.data;

      const commentsRes = await getComments(route.params.id as string);

      comments.value = commentsRes.data;
    })();
    return { post, comments };
  },
});
</script>

<style lang="scss" scoped>
header {
  h4 {
    text-align: right;
  }
}
.comment {
  list-style: none;
  text-align: left;
  border: 1px solid lightgray;
  box-shadow: 0px 4px 4px 0px #d4d4d4;
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
