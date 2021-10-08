import router from './index';
import store from '@/store';

router.beforeEach(to => {
  console.log(store);
  if (to.meta.requiresAuth && !store.state.user.isLoggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }, // 만약 로그인이 되어있지 않다면, 로그인 페이지로 이동하는데, 만약 로그인을 나중에 한다면 다시 예전 페이지로 되돌려놓는 것!
    };
  }
});
