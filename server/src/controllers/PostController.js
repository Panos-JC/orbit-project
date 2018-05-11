const Post = require('../models/Post')

module.exports = {
  // Create post
  async create (req, res, next) {
    await Post.createPost(req.body.username, req.body.content, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  }
}
