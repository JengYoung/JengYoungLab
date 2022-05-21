<template>
  <div class="home">
    <header>
      <h1>로그인</h1>
    </header>
    <form class="form" action="">
      <div class="form__input-box">
        <div class="form__input-name">ID</div>
        <input type="text" placeholder="ID를 입력해주세요 🙌" />
      </div>
      <div class="form__input-box">
        <div class="form__input-name">PASSWORD</div>
        <input type="text" placeholder="비밀번호를 입력해주세요 🔑" />
      </div>

      <button type="button" class="form__button">로그인하기 🚪</button>
    </form>
  </div>

  <nav>
    <router-link class="link" to="/">회원가입</router-link>
    <router-link class="link" to="/about"
      >아이디와 비밀번호를 잊어버리셨나요?</router-link
    >
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 500px;
  min-width: 300px;
}
.form__input-box {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

  &:not(&:last-child) {
    margin-bottom: 2rem;
  }
  .form__input-name {
    text-align: left;
    font-weight: 700;
  }
  input {
    height: 2rem;
    border-radius: 2rem;
    border: 1px solid;
    padding: 10px;
  }
}
.form__button {
  cursor: pointer;

  height: 3rem;

  margin: 0.5rem;

  outline: none;
  border: none;
  border-radius: 2rem;

  background-color: #691ddd;
  color: white;

  font-size: 1.125rem;
  font-weight: 700;

  &:hover {
    background-color: #7e45d4;
    transition: all 0.3s;
  }
}

.link {
  margin-right: 1rem;
  text-decoration: none;
  font-weight: 400;
  color: gray;

  &:hover {
    color: #a37cde;
    transition: all 0.3s;
  }
}
</style>
