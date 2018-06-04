import Api from '@/services/Api'

export default {
  // Create Post
  create (data) {
    return Api().post('post/create', data)
  },

  // Get posts of friends
  getPosts (username) {
    return Api().get(`posts/${username}`, username)
  },

  // Like Post
  like (data) {
    return Api().post('post/like', data)
  },

  // Unike post
  unlike (data) {
    return Api().post('post/unlike', data)
  },

  // Repost
  repost (data) {
    return Api().post('post/repost', data)
  },

  // Undo Repost
  removeRepost (data) {
    return Api().post('post/removeRepost', data)
  }
}
