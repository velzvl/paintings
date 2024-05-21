import { createRouter, createWebHistory } from 'vue-router';
import PaintingsPage from '@/pages/PaintingsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', redirect: '/' },
    {
      path: '/',
      name: 'paintings',
      component: PaintingsPage,
    },
  ],
});

export default router;
