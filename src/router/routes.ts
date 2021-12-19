import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Dashboard.vue') },
      { path: 'form', component: () => import('components/Forms.vue'), },
      // children: [
        { path: 'vegelist', component: () => import('pages/vegelist.vue') },
        { path: 'meatlist', component: () => import('pages/meatlist.vue') },
        { path: 'fruitlist', component: () => import('pages/fruitlist.vue') },
        { path: 'flowerlist', component: () => import('pages/flowerlist.vue') },
      // ] },
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
