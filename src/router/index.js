import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView'
import DashboardItemCreateView from '../views/DashboardItemCreateView'
import DashboardItemListView from '../views/DashboardItemListView'
import DashboardItemEditView from '../views/DashboardItemEditView'
import DashboardCategoryListView from '../views/DashboardCategoryListView'
import DashboardCategoryCreateView from '../views/DashboardCategoryCreateView'
import DashboardCategoryEditView from '../views/DashboardCategoryEditView'

Vue.use(VueRouter)
function needAuth(to,from,next){
  if(localStorage.getItem('token') === null){
    return next('/login')
  }
  return next();
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  //item create = dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: needAuth
  },
  {
    path: '/item-create',
    name: 'item.create',
    component: DashboardItemCreateView,
    beforeEnter: needAuth
  },
  {
    path: '/item-list',
    name: 'item.list',
    component: DashboardItemListView,
    beforeEnter: needAuth
  },
  {
    path: '/item-edit/:id',
    name: 'item.edit',
    component: DashboardItemEditView,
    beforeEnter: needAuth
  },
  {
    path: '/category-list',
    name: 'category.list',
    component: DashboardCategoryListView,
    beforeEnter: needAuth
  },
  {
    path: '/category-create',
    name: 'category.create',
    component: DashboardCategoryCreateView,
    beforeEnter: needAuth
  },
  {
    path: '/category-edit/:id',
    name: 'category.edit',
    component: DashboardCategoryEditView,
    beforeEnter: needAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
