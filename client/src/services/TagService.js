import Api from '@/services/Api'

export default {
  // Get popular tags
  getPopularTags () {
    return Api().get('tags/popular')
  },

  // Get posts by tag
  getTagged (tagName) {
    return Api().get(`tags/${tagName}`, tagName)
  }
}
