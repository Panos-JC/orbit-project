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

  // Get user info (first name, last name, counters for posts, following, followers, and visits)
  async show (req, res, next) {
    await User.getUserInfo(req.params.username, (err, userInfo) => {
      if (err) return next(err)

      res.send(userInfo)
    })
  },

  // Get user's profile posts (user's posts and reposts)
  async getProfilePosts (req, res, next) {
    await Post.getUserPosts(req.params.username, (err, posts) => {
      if (err) return next(err)

      res.send(posts)
    })
  },

  // Get user info
  async userInfo (req, res, next) {
    User.getUserInfo(req.params.username, (err, result) => {
      if (err) return next(err)

      res.send(result)
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

  // Get user's visits
  async visits (req, res, next) {
    await User.getVisits(req.params.username, (err, visits) => {
      if (err) return next(err)

      res.send(visits)
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
  },

  async getVisits (req, res) {
    User.getVisits(req.params.username, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async getRatings (req, res) {
    User.getRatings(req.params.username, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async getInterests (req, res) {
    User.getInterests(req.params.username, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async getRecommendations (req, res) {
    User.getRecommendations(req.body.username, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  }
}
