import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: resolve => require(['../views/Map'], resolve),
  },
  {
    path: '/setting',
    component: resolve => require(['../views/Setting'], resolve),
  },
  {
    path: '/cities',
    component: resolve => require(['../views/Cities'], resolve),
  },
  {
    path: '/discovery',
    component: resolve => require(['../views/Discovery'], resolve),
  },
  {
    path: '/about',
    component: resolve => require(['../views/About'], resolve),
  },
  {
    path: '/more',
    component: resolve => require(['../views/More'], resolve),
  },
  {
    path: '/weather',
    component: resolve => require(['../views/Weather'], resolve),
  },
  {
    path: '/login',
    component: resolve => require(['../views/Login'], resolve)
  },
  {
    path: '/side',
    component: resolve => require(['../components/SideManu'], resolve)
  },
];


const router = new VueRouter({ mode: 'history', base: '/app/', routes });

export default router;
