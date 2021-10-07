<template>
  <h1 v-bind="$attrs">Hello</h1>
  <h2>Haha?!</h2>
</template>

<script>
export default {
  props: {
    style: Object,
  },
  mounted() {
    console.log(this.$attrs);
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
