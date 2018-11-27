import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    ratings: [],
    interests: [],
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
      state.visits = []
      state.ratings = []
      state.interests = []
      state.isUserLoggedIn = false
    },

    /**
     * ====== Ratings methods ======
     */

    setRatings (state, ratings) {
      state.ratings = ratings
    },

    /**
     * ====== Interests methods ======
     */

    setInterests (state, interests) {
      state.interests = interests
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setRatings ({commit}, ratings) {
      commit('setRatings', ratings)
    },
    setInterests ({commit}, interests) {
      commit('setInterests', interests)
    },
    clearStore ({commit}) {
      commit('clearStore')
    }
  }
})
