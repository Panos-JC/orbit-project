import Api from '@/services/Api'

export default {
  // Create Post
  create (data) {
    return Api().post('post/create', data)
  }
}
