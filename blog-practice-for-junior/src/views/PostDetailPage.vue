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
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    (async () => {
      await store.dispatch('postModule/fetchPost', route.params.id);
      await store.dispatch('postModule/fetchComments', route.params.id);
    })();

    const post = computed(() => store.state.postModule.post);
    const comments = computed(() => store.state.postModule.comments);

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
