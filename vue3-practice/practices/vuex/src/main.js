import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from '@/App.vue';
import store from '@/store';

// const store = createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
// });

const app = createApp(App);
app.use(store);
app.mount('#app');
