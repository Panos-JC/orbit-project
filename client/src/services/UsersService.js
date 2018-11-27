import Api from '@/services/Api'

export default {
  // Get all users
  index (username) {
    return Api().post('users', username)
  },
  // Get user info
  show (username) {
    return Api().get(`users/${username}`, username)
  },
  // Get user's profile posts
  getProfilePosts (username) {
    return Api().get(`users/${username}/posts`, username)
  },

  userInfo (username) {
    return Api().get(`users/${username}/userInfo`, username)
  },

  // Get followers
  followers (username) {
    return Api().get(`users/${username}/followers`, username)
  },

  // Get following
  following (username) {
    return Api().get(`users/${username}/following`, username)
  },

  // Get liked posts
  getLikedPosts (username) {
    return Api().get(`users/${username}/likes`, username)
  },

  // Get liked posts
  getReposts (username) {
    return Api().get(`users/${username}/reposts`, username)
  },

  // Follow user
  follow (data) {
    return Api().post('follow', data)
  },

  // Unfollow user
  unfollow (data) {
    return Api().post('unfollow', data)
  },

  // get user's visits
  getVisits (username) {
    return Api().get(`users/${username}/visits`, username)
  },

  // get user's ratings
  getRatings (username) {
    return Api().get(`users/${username}/ratings`, username)
  },

  // Get user's interests
  getInterests (username) {
    return Api().get(`users/${username}/interests`, username)
  },

  // Get friend recommendations
  getRecommendations (username) {
    return Api().post('users/recommendations', {username})
  }
}
