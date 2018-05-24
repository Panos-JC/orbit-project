import Api from '@/services/Api'

export default {
  // Get all users
  index () {
    return Api().get('users')
  },
  // Get a single user
  show (username) {
    return Api().get(`users/${username}`, username)
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

  // Follow user
  follow (data) {
    return Api().post('follow', data)
  },

  // Unfollow user
  unfollow (data) {
    return Api().post('unfollow', data)
  }
}
