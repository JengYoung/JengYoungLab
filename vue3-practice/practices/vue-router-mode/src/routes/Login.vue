<template>
  <form @submit.prevent>
    <input v-model="userID" placeholder="Input Your ID!" type="text" />
    <input v-model="userPassword" placeholder="Input Your Password!" type="password" />
  </form>
  <button @click="logIn">LogIn!</button>
</template>

<script>
export default {
  data() {
    return {
      userID: '',
      userPassword: '',
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch('user/logIn', {
        id: this.userID,
        password: this.userPassword,
      });
    },
  },
};
</script>
