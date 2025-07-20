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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
