import Api from '@/services/Api'

export default {
  search (query) {
    return Api().post('places/search', query)
  },

  getPlace (placeId) {
    return Api().get(`places/${placeId}`, placeId)
  },

  getPlaceByName (placeName) {
    return Api().get(`places/name/${placeName}`, placeName)
  },

  mergePlace (data) {
    return Api().post('/places/create', data)
  },

  visit (placeId, username) {
    return Api().post('/places/visit', {placeId, username})
  },

  rate (placeId, username, rating) {
    return Api().post('/places/rate', {placeId, username, rating})
  },

  interest (placeId, username, postContent) {
    return Api().post('/places/interest', {placeId, username, postContent})
  },

  getStats (placeId, username) {
    return Api().post(`places/${placeId}/stats`, {placeId, username})
  },

  getFriendsVisited (placeId, username) {
    return Api().post(`places/friendsVisited`, {placeId, username})
  }
}
