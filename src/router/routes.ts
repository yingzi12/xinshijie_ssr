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
      { path: 'commit', component: () => import('pages/world/commit.vue') },
      { path: 'create', component: () => import('pages/world/create.vue') },

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
      { path: 'commit', component: () => import('pages/story/commit.vue') },
      { path: 'create', component: () => import('pages/story/create.vue') },

    ],
  },
  {
    path: '/element',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/element/index.vue') },
      { path: 'index', component: () => import('pages/element/index.vue') },
      { path: 'detail', component: () => import('pages/element/detail.vue') },
      { path: 'commit', component: () => import('pages/element/commit.vue') },
      { path: 'create', component: () => import('pages/element/create.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        children:[
          { path: '', component: () => import('pages/admin/index.vue') },
          { path: 'index', component: () => import('pages/admin/index.vue') },
        ]
      },
      {
        path: 'world',
        children:[
          { path: '', component: () => import('pages/admin/world/index.vue') },
          { path: 'index', component: () => import('pages/admin/world/index.vue') },
          { path: 'info', component: () => import('pages/admin/world/info.vue') },
          { path: 'category', component: () => import('pages/admin/world/category.vue') },
          { path: 'story', component: () => import('pages/admin/world/story.vue') },
          { path: 'element', component: () => import('pages/admin/world/element.vue') },
          { path: 'manage', component: () => import('pages/admin/world/manage.vue') },
          { path: 'discuss', component: () => import('pages/admin/world/discuss.vue') },
          { path: 'commit', component: () => import('pages/admin/world/commit.vue') },
          { path: 'redident', component: () => import('pages/admin/world/redident.vue') },
          { path: 'auditElement', component: () => import('pages/admin/world/auditElement.vue') },
          { path: 'auditStory', component: () => import('pages/admin/world/auditStory.vue') },
          { path: 'auditManage', component: () => import('pages/admin/world/auditManage.vue') },
        ]
      },
      {
        path: 'story',
        children:[
          { path: '', component: () => import('pages/admin/story/index.vue') },
          { path: 'index', component: () => import('pages/admin/story/index.vue') },
          { path: 'info', component: () => import('pages/admin/story/info.vue') },
          { path: 'author', component: () => import('pages/admin/story/author.vue') },
          { path: 'auditAuthor', component: () => import('pages/admin/story/auditAuthor.vue') },
          { path: 'reel', component: () => import('pages/admin/story/reel.vue') },
          { path: 'chapter', component: () => import('pages/admin/story/chapter.vue') },
          { path: 'auditChapter', component: () => import('pages/admin/story/auditChapter.vue') },
          { path: 'discuss', component: () => import('pages/admin/story/discuss.vue') },
          { path: 'commit', component: () => import('pages/admin/story/commit.vue') },

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
