const Post = require('../models/Post')

module.exports = {
  // Create post
  async create (req, res, next) {
    await Post.createPost(req.body.username, req.body.content, req.body.tags, req.body.mentions, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  // Create reply
  async createReply (req, res, next) {
    await Post.createReply(req.body.username, req.body.postId, req.body.reply, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  // Get post info by id
  async getPost (req, res, next) {
    await Post.getPost(req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        let data = {
          post: {},
          poster: {},
          likes: 0,
          reposts: 0,
          likers: [],
          reposters: []
        }

        for (let j = 0; j < result.length; j++) {
          if (result[j].type === 'POSTED') {
            data.post = result[j].post.properties
            data.poster = result[j].users[0].properties
            continue
          }
          if (result[j].type === 'LIKED') {
            data.likes = result[j].counters
            for (let i = 0; i < result[j].users.length; i++) {
              data.likers[i] = result[j].users[i].properties.username
            }
            continue
          }
          if (result[j].type === 'REPOSTED') {
            data.reposts = result[j].counters
            for (let i = 0; i < result[j].users.length; i++) {
              data.reposters[i] = result[j].users[i].properties.username
            }
            continue
          }
        }
        res.send(data)
      }
    })
  },

  // Get post replies
  async getReplies (req, res, next) {
    await Post.getReplies(req.params.id, (err, repliesRaw) => {
      if (err) {
        res.status(400).send(err)
      } else {
        let replies = []

        for (let i = 0; i < repliesRaw.length; i++) {
          let replyObject = {
            id: null,
            content: '',
            poster: {},
            likes: null,
            reposts: null
          }
          replyObject.id = repliesRaw[i].reply.properties.id
          replyObject.content = repliesRaw[i].reply.properties.content
          replyObject.poster = repliesRaw[i].user.properties
          replyObject.likes = repliesRaw[i].likes
          replyObject.reposts = repliesRaw[i].reposts
          replies[i] = replyObject
        }
        res.send(replies)
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
