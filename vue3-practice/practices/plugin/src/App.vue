<template>
  <h1>
    {{ msg }}
  </h1>
  <Hello>
    <template #default="slotProps">
      <h2>Hello Vue?! {{ slotProps.good }}</h2>
    </template>
  </Hello>
  <Btn>Click Me!</Btn>
  <Btn />
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
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await this.$myName('https://jsonplaceholder.typicode.com/todos/1');
      console.log(res, 'Done!');
    },
  },
};
</script>

<style lang="scss">
h1 {
  color: red;
}
</style>
