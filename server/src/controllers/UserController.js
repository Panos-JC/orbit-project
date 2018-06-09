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
    User.getUserInfo(req.params.username, (err, userInfo) => {
      if (err) return next(err)

      Post.getUserPosts(req.params.username, (err, posts) => {
        if (err) return next(err)

        res.send({
          userInfo: userInfo.userInfo,
          posts: posts
        })
      })
    })
  },

  // Get user info
  async userInfo (req, res, next) {
    User.getUserInfo(req.params.username, (err, userInfo) => {
      if (err) return next(err)

      res.send({userInfo: userInfo.userInfo})
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
  },

  // Follow user
  async follow (req, res, next) {
    User.addUserRel('follow', req.body.user1, req.body.user2, (err) => {
      if (err) return next(err)
      res.send('Followed')
    })
  },

  // Unfollow user
  async unFollow (req, res, next) {
    User.addUserRel('unfollow', req.body.user1, req.body.user2, (err) => {
      if (err) {
        console.log('UserController error')
        return next(err)
      }
      console.log('UserController')
      res.send('Unfollowed')
    })
  },

  // Get a user's liked posts
  async getLikedPosts (req, res, next) {
    User.getLikedPosts(req.params.username, (err, posts) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(posts)
      }
    })
  },

  // Get a user's reposts
  async getReposts (req, res, next) {
    User.getReposts(req.params.username, (err, posts) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(posts)
      }
    })
  }
}
