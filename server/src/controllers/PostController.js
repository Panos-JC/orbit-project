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
  },

  // Get posts of friends
  async index (req, res, next) {
    await Post.getPosts(req.params.username, (err, posts) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(posts)
      }
    })
  },

  // Like post
  async like (req, res, next) {
    await Post.like(req.body.username, req.body.postId, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  // Unlike post
  async unlike (req, res, next) {
    await Post.unlike(req.body.username, req.body.postId, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send({message: 'Unliked'})
      }
    })
  },

  // Repost
  async repost (req, res, next) {
    await Post.repost(req.body.username, req.body.postId, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send({message: 'Reposted'})
      }
    })
  },

  // Remove repost
  async removeRepost (req, res, next) {
    await Post.removeRepost(req.body.username, req.body.postId, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send({message: 'Removed repost'})
      }
    })
  }
}
