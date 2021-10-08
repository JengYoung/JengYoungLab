<template>
  <RouterLink to="/"> Home </RouterLink>
  <RouterLink to="/about?=name=Jengyoung&age=85&email=jengyoung@naver.com">About</RouterLink>
  <RouterLink
    :to="{
      name: 'docsId',
      params: { id: '7777' },
      query: { name: 'Jengyoung', age: 85, email: 'jengyoung@naver.com' },
    }"
    >Document Id</RouterLink>
  <button @click="$router.push({ name: 'home' })">Home</button>
  <button @click="$router.push({ name: 'about' })">About</button>
  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue!',
    };
  },
};
</script>
