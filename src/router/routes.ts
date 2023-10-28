import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/detail',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DetailPage.vue') }],
  },
  {
    path: '/play',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/VideoJSPlayer.vue') }],
  },
  {
    path: '/see',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SeePage.vue') }],
  },
  {
    path: '/findImage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FindImagePage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
