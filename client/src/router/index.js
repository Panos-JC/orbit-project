import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/authentication/Login'
import Register from '@/components/authentication/Register'
import Homepage from '@/components/homepage/Homepage'
import Users from '@/components/Users'
import Profile from '@/components/profile/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root'
    },
    {
      path: '/home',
      name: 'home',
      component: Homepage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/users/:userid',
      name: 'profile',
      component: Profile
    }
  ]
})
