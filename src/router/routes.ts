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
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/login.vue') }],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/register.vue') }],
  },
  {
    path: '/order',
    component: () => import('layouts/OrderLayout.vue'),
    children: [
      { path: '', component: () => import('pages/order/index.vue') },
      { path: 'like', component: () => import('pages/order/like.vue') }

    ],
  },
  {
    path: '/findImage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/findImagePage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/index.vue') }],
  },
  {
    path: '/world',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/world/index.vue') },
      { path: 'index', component: () => import('pages/world/index.vue') },
      { path: 'detail', component: () => import('pages/world/detail.vue') },
      { path: 'order', component: () => import('pages/world/order.vue') },
      { path: 'story', component: () => import('pages/world/story.vue') },
      { path: 'manage', component: () => import('pages/world/manage.vue') },
      { path: 'discuss', component: () => import('pages/world/discuss.vue') },
      { path: 'element', component: () => import('pages/world/element.vue') },
      { path: 'commit', component: () => import('pages/world/commit.vue') }

    ],
  },
  {
    path: '/story',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/story/index.vue') },
      { path: 'index', component: () => import('pages/story/index.vue') },
      { path: 'detail', component: () => import('pages/story/detail.vue') },
      { path: 'order', component: () => import('pages/story/order.vue') },
      { path: 'chapter', component: () => import('pages/story/chapter.vue') },
      { path: 'discuss', component: () => import('pages/story/discuss.vue') },
      { path: 'commit', component: () => import('pages/story/commit.vue') }

    ],
  },
  {
    path: '/element',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/element/index.vue') },
      { path: 'index', component: () => import('pages/element/index.vue') },
      { path: 'detail', component: () => import('pages/element/detail.vue') },
      { path: 'commit', component: () => import('pages/world/commit.vue') }
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/AdninLayout.vue'),
        children:[
          { path: '', component: () => import('pages/admin/index.vue') },
          { path: 'index', component: () => import('pages/admin/index.vue') },
        ]
      },

    ],
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/UsersLayout.vue'),
        children:[
          { path: '', component: () => import('pages/users/index.vue') },
          { path: 'index', component: () => import('pages/users/index.vue') },
        ]
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
