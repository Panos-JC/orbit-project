import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    following: [],
    likedPosts: [],
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },

    /**
     * ====== Liked Posts Methods ======
     */

    setLikedPosts (state, likedPosts) {
      state.likedPosts = likedPosts
    },
    addLikedPost (state, postId) {
      state.likedPosts.push(postId)
    },
    removeLikedPost (state, postId) {
      const index = state.likedPosts.indexOf(postId)
      if (index > -1) {
        state.likedPosts.splice(index, 1)
      }
    },

    /**
     * ====== Following Array Methods ======
     */

    setFollowing (state, following) {
      state.following = following
    },
    addFollowing (state, username) {
      state.following.push(username)
    },
    removeFollowing (state, username) {
      const index = state.following.indexOf(username)
      if (index > -1) {
        state.following.splice(index, 1)
      }
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setFollowing ({commit}, following) {
      commit('setFollowing', following)
    },
    setLikedPosts ({commit}, likedPosts) {
      commit('setLikedPosts', likedPosts)
    }
  }
})
