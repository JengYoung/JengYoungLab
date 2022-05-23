<template>
  <div>
    <h2>Joohee Blog</h2>
    <router-link :to="{ name: 'todo' }">TodoPage</router-link>
    <router-link :to="{ name: 'post' }">PostPage</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h2 {
  color: rgb(216, 150, 70);
}
router-link {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: bisque;
  font-size: 20px;
  padding: 2rem;
  margin: 1.5rem;
}
</style>
