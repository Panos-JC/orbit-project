import Api from '@/services/Api'

export default {
  search (query) {
    return Api().post('places/search', query)
  },

  getPlace (placeId) {
    return Api().get(`places/${placeId}`, placeId)
  }
}
