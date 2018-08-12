const Tag = require('../models/Tag')

module.exports = {
  // Get popular tags
  async getPopularTags (req, res) {
    Tag.getPopularTags((err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  // Get posts by tag
  async getTagged (req, res) {
    Tag.getTagged(req.params.tagName, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  }
}
