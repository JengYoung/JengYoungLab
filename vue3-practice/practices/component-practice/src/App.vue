<template>
  <button @click="reverseMsg">click!</button>
  <Hello :message="msg" :name="1234" />
  <!-- 숫자 데이터 처리를 위한 : -->
</template>

<script>
import Hello from '@/components/Hello';
export default {
  components: {
    Hello,
  },
  data() {
    return {
      msg: 'Hello Vue!',
    };
  },
  methods: {
    reverseMsg() {
      console.log(this.msg.split('').reverse().join(''));
      this.msg = this.msg.split('').reverse().join('');
    },
  },
};
</script>

<style lang="scss">
h1 {
  color: red;
}
</style>
