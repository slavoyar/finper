import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

type Route = RouteRecordRaw & {
  path: string;
  breadcrumbName: string;
};

export const routes: Array<Route> = [
  {
    path: '/',
    breadcrumbName: 'Home',
    component: () => import('@pages/MainPage.vue'),
  },
  {
    path: '/presets',
    breadcrumbName: 'Presets',
    component: () => import('@pages/PresetPage.vue'),
  },
  {
    path: '/privacy-policy',
    breadcrumbName: 'Privacy Policy',
    component: () => import('@pages/PrivacyPolicyPage.vue'),
  },
  {
    path: '/terms-of-use',
    breadcrumbName: 'Terms of Use',
    component: () => import('@pages/TermsOfUsePage.vue'),
  },
  {
    path: '/dashboard',
    breadcrumbName: 'Dashboard',
    component: () => import('@pages/DashboardPage.vue'),
  },
  {
    path: '/budget',
    breadcrumbName: 'Budget',
    component: () => import('@pages/BudgetPage.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
