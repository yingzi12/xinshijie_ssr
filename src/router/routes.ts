import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      { path: 'privacyPolicy', component: () => import('pages/privacyPolicy.vue') },
      { path: 'use', component: () => import('pages/use.vue') },
      { path: 'forgotPassword', component: () => import('pages/forgotPassword.vue') },
      { path: 'restPassword', component: () => import('pages/restPassword.vue') },
      { path: 'down', component: () => import('pages/down.vue') },
      { path: 'help', component: () => import('pages/help.vue') },
      { path: 'findImagePage', component: () => import('pages/findImagePage.vue') },
      { path: 'register', component: () => import('pages/register.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'socket', component: () => import('pages/socket.vue') },

    ],
  },
  {
    path: '/order',
    // component: () => import('layouts/OrderLayout.vue'),
    children: [
      { path: '', component: () => import('pages/order/index.vue') },
      { path: 'index', component: () => import('pages/order/index.vue') },
      { path: 'like', component: () => import('pages/order/like.vue') }
    ],
  },
  {
    path: '/forum',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/forum/column.vue') },
      { path: 'index', component: () => import('pages/forum/column.vue') }
    ],
  },
  {
    path: '/say',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/say/index.vue') },
      { path: 'index', component: () => import('pages/say/index.vue') },
      { path: 'detail', component: () => import('pages/say/detail.vue') },
      { path: 'user', component: () => import('pages/say/user.vue') }
    ],
  },
  {
    path: '/discuss',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/discuss/index.vue') },
      { path: 'index', component: () => import('pages/discuss/index.vue') },
      { path: 'detail', component: () => import('pages/discuss/detail.vue') },
      { path: 'create', component: () => import('pages/discuss/create.vue') }

    ],
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/notice/index.vue') }],
  },

  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/index.vue') }],
  },
  {
    path: '/chapter',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: 'detail', component: () => import('pages/chapter/detail.vue') },
      { path: 'create', component: () => import('pages/chapter/create.vue') }],
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/notice/index.vue') },
      { path: 'index', component: () => import('pages/notice/index.vue') },
      { path: 'detail', component: () => import('pages/notice/detail.vue') }

    ],
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
      { path: 'comment', component: () => import('pages/world/comment.vue') },
      { path: 'create', component: () => import('pages/admin/world/create.vue') },

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
      { path: 'comment', component: () => import('pages/story/comment.vue') },
      { path: 'create', component: () => import('pages/admin/story/create.vue') },

    ],
  },
  {
    path: '/element',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/element/index.vue') },
      { path: 'index', component: () => import('pages/element/index.vue') },
      { path: 'detail', component: () => import('pages/element/detail.vue') },
      { path: 'comment', component: () => import('pages/element/comment.vue') },
      { path: 'create', component: () => import('pages/admin/element/create.vue') },
      { path: 'edit', component: () => import('pages/admin/element/edit.vue') },

    ],
  },
  {
    path: '/manager',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manager/announcement/index.vue') },
      { path: 'hearWorldModule', component: () => import('pages/manager/hearWorldModule.vue') },
      { path: 'hearStoryModule', component: () => import('pages/manager/hearStoryModule.vue') },
      { path: 'announcement', component: () => import('pages/manager/announcement/index.vue') },
      { path: 'editAnnouncement', component: () => import('pages/manager/announcement/edit.vue') },
      { path: 'classify', component: () => import('pages/manager/classify.vue') },
    ],
  },
  {
    path: '/product',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/product/index.vue') },
      { path: 'buy', component: () => import('pages/product/buy.vue') },
      { path: 'chat', component: () => import('pages/product/chat.vue') },
      { path: 'find', component: () => import('pages/product/find.vue') },


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
          { path: 'comment', component: () => import('pages/admin/world/commentlist.vue') },
          { path: 'redident', component: () => import('pages/admin/world/redident.vue') },
          { path: 'auditElement', component: () => import('pages/admin/world/auditElement.vue') },
          { path: 'auditStory', component: () => import('pages/admin/world/auditStory.vue') },
          { path: 'auditManage', component: () => import('pages/admin/world/auditManage.vue') },
          { path: 'edit', component: () => import('pages/admin/world/edit.vue') },
          { path: 'create', component: () => import('pages/admin/world/create.vue') },

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
          { path: 'comment', component: () => import('pages/admin/story/commentlist.vue') },
          { path: 'edit', component: () => import('pages/admin/story/edit.vue') },
          { path: 'create', component: () => import('pages/admin/story/create.vue') },
        ]
      },
      {
        path: 'element',
        children:[
          { path: '', component: () => import('pages/admin/element/index.vue') },
          { path: 'index', component: () => import('pages/admin/element/index.vue') },
          { path: 'detail', component: () => import('pages/admin/element/detail.vue') },
          { path: 'draft', component: () => import('pages/admin/element/draft.vue') },
          { path: 'create', component: () => import('pages/admin/element/create.vue') },
          { path: 'edit', component: () => import('pages/admin/element/edit.vue') },

        ]
      },
      {
        path: 'chapter',
        children:[
          { path: '', component: () => import('pages/admin/chapter/index.vue') },
          { path: 'index', component: () => import('pages/admin/chapter/index.vue') },
          { path: 'detail', component: () => import('pages/admin/chapter/detail.vue') },
          { path: 'draft', component: () => import('pages/admin/chapter/draft.vue') },
          { path: 'edit', component: () => import('pages/admin/chapter/edit.vue') },
          { path: 'add', component: () => import('pages/admin/chapter/add.vue') },
        ]
      },
      {
        path: 'draft',
        children:[
          {
            path: 'element',
            // component: () => import('pages/admin/draft/element/index.vue'),
            children:[
              { path: '',
                component: () => import('pages/admin/draft/element/index.vue'),
              },
              { path: 'index', component: () => import('pages/admin/draft/element/index.vue'), },
              { path: 'detail', component: () => import('pages/admin/draft/element/detail.vue'), },
              { path: 'edit', component: () => import('pages/admin/draft/element/edit.vue'), },

            ]
          },
          {
            path: 'chapter',
            // component: () => import('pages/admin/draft/chapter/index.vue') ,
            children:[
              {
                path: '',
                component: () => import('pages/admin/draft/chapter/index.vue'),
              },
              { path: 'index', component: () => import('pages/admin/draft/chapter/index.vue'), },
              { path: 'detail', component: () => import('pages/admin/draft/chapter/detail.vue'), },
              { path: 'edit', component: () => import('pages/admin/draft/chapter/edit.vue'), },

            ]
          },
        ]
      },

    ],
  },
  {
    path: '/users',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        children:[
          { path: '', component: () => import('pages/users/index.vue') },
          { path: 'index', component: () => import('pages/users/index.vue') },
          { path: 'attention', component: () => import('pages/users/attention.vue') },
          { path: 'collection', component: () => import('pages/users/collection.vue') },
          { path: 'password', component: () => import('pages/users/password.vue') },
          { path: 'service', component: () => import('pages/users/service.vue') },
          { path: 'invite', component: () => import('pages/users/invite.vue') },
          { path: 'discuss', component: () => import('pages/users/discuss.vue') },
          { path: 'message', component: () => import('pages/users/message.vue') },
          { path: 'notification', component: () => import('pages/users/notification.vue') },
          { path: 'edit', component: () => import('pages/users/userEdit.vue') },
          { path: 'addService', component: () => import('pages/users/addService.vue') },
          { path: 'private', component: () => import('pages/users/chat/private.vue') },
          { path: 'say', component: () => import('pages/users/say.vue') },
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
