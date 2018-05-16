import Api from '@/services/Api'

export default {
  // Create Post
  create (data) {
    return Api().post('post/create', data)
  },

  // Get posts of friends
  getPosts (username) {
    return Api().get(`posts/${username}`, username)
  }
}
