import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});
