import Api from '@/services/Api'

export default {
  // Get all users
  index () {
    return Api().get('users')
  }
}
