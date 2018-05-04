import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/authentication/Login'
import Register from '@/components/authentication/Register'
import Homepage from '@/components/homepage/Homepage'
import Users from '@/components/Users'
import Profile from '@/components/profile/Profile'
import Following from '@/components/profile/Following'
import Followers from '@/components/profile/Followers'

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
      path: '/users/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/users/:username/following',
      name: 'following',
      component: Following
    },
    {
      path: '/users/:username/followers',
      name: 'followers',
      component: Followers
    }
  ]
})
