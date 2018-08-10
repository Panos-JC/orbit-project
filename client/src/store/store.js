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
    reposts: [],
    visits: [],
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
     * ====== Reposts Methods ======
     */

    setReposts (state, reposts) {
      state.reposts = reposts
    },
    addRepost (state, postId) {
      state.reposts.push(postId)
    },
    removeRepost (state, postId) {
      const index = state.reposts.indexOf(postId)
      if (index > -1) {
        state.reposts.splice(index, 1)
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
    },

    /**
     * ====== Visits methods ======
     */

    setVisits (state, visits) {
      state.visits = visits
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
    setFollowing ({commit}, following) {
      commit('setFollowing', following)
    },
    setLikedPosts ({commit}, likedPosts) {
      commit('setLikedPosts', likedPosts)
    },
    setReposts ({commit}, reposts) {
      commit('setReposts', reposts)
    },
    setVisits ({commit}, visits) {
      commit('setVisits', visits)
    },
    setRatings ({commit}, ratings) {
      commit('setRatings', ratings)
    },
    setInterests ({commit}, interests) {
      commit('setInterests', interests)
    }
  }
})
