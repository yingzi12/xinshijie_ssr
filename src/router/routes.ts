import { RouteRecordRaw } from 'vue-router';
import Xinshijie from "layouts/xinshijie/XinshijieIndex.vue"
const routes: RouteRecordRaw[] = [
  {
    path: '/world',
    component: Xinshijie,
    children: [
      {
        path: 'index',
        component: () => import('pages/world/WorldIndex.vue')
      }
    ],
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
