<template>
  <h1>Hello</h1>
  <div>{{ count }}</div>
  <button @click="increaseCount">+</button>
  <button @click="decreaseCount">-</button>
  <div>{{ message }} / {{ reversedMessage }}</div>
  <button @click="fetchTodo">Fetch Todo!</button>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['msg']),
    ...mapState('count', ['count']),
    ...mapState('message', ['message']),
    ...mapGetters('message', ['reversedMessage']),
  },
  methods: {
    ...mapMutations({
      commitIncreaseCount: 'count/increaseCount',
      commitDecreaseCount: 'count/decreaseCount',
    }),
    ...mapActions({
      dispatchFetchTodo: 'message/fetchTodo',
    }),
    increaseCount() {
      this.commitIncreaseCount();
    },
    decreaseCount() {
      this.commitDecreaseCount();
    },
    fetchTodo() {
      this.dispatchFetchTodo();
    },
  },
};
</script>

<style lang="scss" scoped>
/* scoped: style hash를 부여 */

h1 {
  color: red;
}
</style>
