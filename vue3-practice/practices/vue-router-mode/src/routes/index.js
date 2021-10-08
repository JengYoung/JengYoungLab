import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/routes/Home';
import About from '@/routes/About';
import Login from '@/routes/Login';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: Login,
    },
  ],
});
