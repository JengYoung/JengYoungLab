import router from '@/routes';
export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    updateLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    initialize({ commit }) {
      if (localStorage.getItem('isLoggedIn')) {
        commit('updateLoggedIn', true);
      }
    },
    logIn({ commit }, payload) {
      const { id, password } = payload;
      if (id && password) {
        localStorage.setItem('isLoggedIn', true);
        commit('updateLoggedIn', true);
        const { redirect } = router.currentRoute.value.query;
        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/');
        }
      }
    },
    logOut({ commit }) {
      localStorage.removeItem('isLoggedIn');
      commit('updateLoggedIn', false);
      const { requiresAuth } = router.currentRoute.value.meta;
      if (requiresAuth) {
        router.push('/');
      }
    },
  },
};
