<template>
  <h1 @click="updateMessage">{{ newMessage }}</h1>
  <h2>{{ name }}</h2>
</template>

<script>
export default {
  props: {
    message: { type: String, default: '' },
    name: { type: [String, Number], default: '' },
  },
  data() {
    return {
      newMessage: this.message,
    };
  },
  methods: {
    updateMessage() {
      this.newMessage = 'Good';
    },
  },
};
</script>
<style lang="scss" scoped>
/* scoped: style hash를 부여 */
$color: orange;
h1 {
  color: $color;
}
</style>
