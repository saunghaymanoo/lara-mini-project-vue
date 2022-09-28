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
import DashboardSubcategoryListView from '../views/DashboardSubcategoryListView'
import DashboardSubcategoryCreateView from '../views/DashboardSubcategoryCreateView'
import DashboardSubcategoryEditView from '../views/DashboardSubcategoryEditView'
import DashboardOrderView from '../views/DashboardOrderView'
import DashboardUserListView from '../views/DashboardUserListView'
import DashboardUserCreateView from '../views/DashboardUserCreateView'
import DashboardUserShowView from '../views/DashboardUserShowView'
import DashboardChangePasswordView from '../views/DashboardChangePasswordView'

Vue.use(VueRouter)
function needAuth(to,from,next){
  if(store.state.token == null){
    return next('/')
  }
  return next();
}
function needAdmin(to,from,next){
  if(store.state.auth == null){
    return next('/')
  }else if(store.state.auth.role != 'admin'){
    return next('/login')
  }else{
    return next();
  }
}
// router.beforeEach((to,from,next) => {
//   if(to.path != '/' && store.state.token == null){
//     router.push('/login')
//   }else{
//     return next();
//   }
// })
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
    beforeEnter: needAuth,
    beforeRouteEnter: needAuth,
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
  {
    path: '/subcategory-list/',
    name: 'subcategory.list',
    component: DashboardSubcategoryListView,
    beforeEnter: needAuth
  },
  {
    path: '/subcategory-create/',
    name: 'subcategory.create',
    component: DashboardSubcategoryCreateView,
    beforeEnter: needAuth
  },
  {
    path: '/subcategory-edit/:id',
    name: 'subcategory.edit',
    component: DashboardSubcategoryEditView,
    beforeEnter: needAuth
  },
  {
    path: '/order',
    name: 'order',
    component: DashboardOrderView,
    beforeEnter: needAdmin
  },
  {
    path: '/user-list',
    name: 'user.list',
    component: DashboardUserListView,
    beforeEnter: needAdmin
  },
  {
    path: '/user-create',
    name: 'user.create',
    component: DashboardUserCreateView,
    beforeEnter: needAdmin
  },
  {
    path: '/user-show',
    name: 'user.show',
    component: DashboardUserShowView,
    beforeEnter: needAuth
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: DashboardChangePasswordView,
    beforeEnter: needAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
