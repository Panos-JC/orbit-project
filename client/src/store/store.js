import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    notifications: [],
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

    clearStore (state) {
      state.token = null
      state.user = null
      state.isUserLoggedIn = false
    },
    setNotifications (state, notifications) {
      state.notifications = notifications
    },
    deleteNotifications (state) {
      state.notifications = []
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    clearStore ({commit}) {
      commit('clearStore')
    },
    setNotifications ({commit}, notifications) {
      commit('setNotifications', notifications)
    },
    deleteNotifications ({commit}) {
      commit('deleteNotifications')
    }
  }
})
