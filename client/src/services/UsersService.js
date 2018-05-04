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
  }
}
