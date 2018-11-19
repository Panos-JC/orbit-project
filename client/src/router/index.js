import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/authentication/Login'
import Register from '@/components/authentication/Register'
import Homepage from '@/components/homepage/Homepage'
import Users from '@/components/Users'
import Profile from '@/components/profile/Profile'
import Posts from '@/components/profile/Posts'
import Following from '@/components/profile/Following'
import Followers from '@/components/profile/Followers'
import Visits from '@/components/profile/Visits'
import Places from '@/components/places/Places'
import Place from '@/components/places/Place'
import ExtendedPost from '@/components/extendedPost/ExtendedPost'
import Tags from '@/components/Tags'

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
      component: Profile,
      children: [
        {
          path: 'posts',
          component: Posts
        },
        {
          path: 'following',
          component: Following
        },
        {
          path: 'followers',
          component: Followers
        },
        {
          path: 'visits',
          component: Visits
        }
      ]
    },
    {
      path: '/post/:id',
      name: 'post',
      component: ExtendedPost
    },
    {
      path: '/places',
      name: 'places',
      component: Places
    },
    {
      path: '/places/:placeId',
      name: 'place',
      component: Place
    },
    {
      path: '/tags/:name',
      name: 'tags',
      component: Tags
    }
  ]
})
