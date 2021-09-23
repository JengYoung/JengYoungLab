<template>
  <div id="app">
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Long time no see, Vue! 😆',
    };
  },
};

</script>

<style>
#app {
  display: flex;
  font-size: 3rem;
  color: purple;
}
</style>