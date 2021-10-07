<template>
  <h1 v-if="msg" class="message" @click="log">
    {{ msg }}
  </h1>
  <Hello 
    @click="msg += '?!'"
    @please="msg += '~~'"
  />
</template>

<script>
import Hello from '@/components/Hello';

export default {
  components: {
    Hello,
  },
  data() {
    return {
      msg: '왜???',
    };
  },
};
</script>

<style lang="scss">
h1 {
  color: red;
}
</style>
