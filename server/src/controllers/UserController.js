const User = require('../models/User')
const Post = require('../models/Post')

module.exports = {
  // Get all users
  async list (req, res, next) {
    await User.getAll((err, users) => {
      if (err) return next(err)

      res.send(users)
    })
  },

  // Get user info, stats and posts
  async show (req, res, next) {
    await User.getBy('user.username', req.params.username, (err, user) => {
      if (err) return next(err)

      User.getStats(req.params.username, (err, stats) => {
        if (err) return next(err)

        Post.getUserPosts(req.params.username, (err, posts) => {
          if (err) return next(err)

          res.send({
            user,
            stats,
            posts: posts.posts
          })
        })
      })
    })
  },

  // Get user's followers list
  async followers (req, res, next) {
    await User.getFollowers(req.params.username, (err, followers) => {
      if (err) return next(err)

      res.send({ followers })
    })
  },

  // Get user's following list
  async following (req, res, next) {
    await User.getFollowing(req.params.username, (err, following) => {
      if (err) return next(err)

      res.send({ following })
    })
  }
}
