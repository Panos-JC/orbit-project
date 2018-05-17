import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    following: [],
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
    setFollowing (state, following) {
      state.following = following
    },
    // Adds user in the following array
    addFollowing (state, username) {
      state.following.push(username)
    },
    // Remove user from following array
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
    }
  }
})
