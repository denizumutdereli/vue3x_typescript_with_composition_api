import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Register from '@/public/Register.vue'
import Login from '@/public/Login.vue'
import Secure from '@/guarded/Secure.vue'
import Dashboard from '@/guarded/dashboard/Dashboard.vue'
import Users from '@/guarded/users/Users.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
    //has child component
    path: '/',
    component: Secure,
      children : [
        {path : '/', redirect: '/dashboard'},
        {path: '/dashboard', component: Dashboard },
        {path: '/users', component: Users },
      ]
  }


  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: Register
  // }
  // {
  //   path: '/register',
  //   name: 'Register',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
