<template>
  <RouterLink to="/">HOME...</RouterLink>
  <RouterLink to="/about">ABOUT...</RouterLink>
  <button v-if="!isLoggedIn" @click="logIn">LOGIN!</button>
  <button v-else @click="logOut">LOGOUT!</button>
  <RouterView />
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
  },
  created() {
    this.$store.dispatch('user/initialize');
  },
  methods: {
    logIn() {
      this.$router.push('/login');
    },
    logOut() {
      this.$store.dispatch('user/logOut');
    },
  },
};
</script>
