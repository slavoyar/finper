import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    titleKey: string;
  }
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@pages/MainPage.vue'),
    meta: { titleKey: 'bonds.title' },
  },
  {
    path: '/privacy-policy',
    component: () => import('@pages/PrivacyPolicyPage.vue'),
    meta: { titleKey: 'privacy.title' },
  },
  {
    path: '/terms-of-use',
    component: () => import('@pages/TermsOfUsePage.vue'),
    meta: { titleKey: 'terms.title' },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
