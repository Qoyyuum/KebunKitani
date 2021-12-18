import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Dashboard.vue') },
      { path: 'form/:id', component: () => import('components/Forms.vue'),
      children: [
        { path: 'review', component: () => import('pages/finalreview.vue') },
      ] },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
