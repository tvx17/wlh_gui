import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/mainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/IndexPage.vue') },
      { name: 'projects', path: 'projects/:id?', component: () => import('pages/ProjectsPage.vue') },
      { name: 'users', path: 'users/:id?', component: () => import('pages/UsersPage.vue') },
      { name: 'books', path: 'books/:id?', component: () => import('pages/BooksPage.vue') },
      { name: 'chapters', path: 'chapters/:id?', component: () => import('pages/ChaptersPage.vue') },
      { name: 'scenes', path: 'scenes/:id?', component: () => import('pages/ScenesPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
