import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/routes/Home';
import About from '@/routes/About';
import Docs from '@/routes/Docs';
import DocsId from '@/routes/DocsId';
import NotFound from '@/routes/NotFound';
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/documents',
      component: Docs,
    },
    {
      path: '/documents/:id',
      name: 'docsId',
      component: DocsId,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});
