const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const PlacesApiController = require('./controllers/PlacesApiController')
const jwt = require('jsonwebtoken')
const config = require('./config/config')

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: '7d'
  })
}

module.exports = (app, passport) => {
  app.post('/register', (req, res, next) => {
    passport.authenticate('local-signup', { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (!user) return res.status(400).send(info)
      const userJson = JSON.parse(JSON.stringify(user))
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    })(req, res, next)
  })

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (!user) return res.status(400).send(info)
      const userJson = JSON.parse(JSON.stringify(user))
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    })(req, res, next)
  })

  app.get('/', (req, res) => {
    res.send('This is the server')
  })

  // User Routes
  app.get('/users',
    UserController.list)

  app.get('/users/:username',
    UserController.show)

  app.get('/users/:username/userInfo',
    UserController.userInfo)

  app.get('/users/:username/followers',
    UserController.followers)

  app.get('/users/:username/following',
    UserController.following)

  app.get('/users/:username/likes',
    UserController.getLikedPosts)

  app.get('/users/:username/reposts',
    UserController.getReposts)

  app.post('/follow',
    UserController.follow)

  app.post('/unfollow',
    UserController.unFollow)

  app.post('/places/search',
    PlacesApiController.search)

  // Post Routes
  app.post('/post/create',
    PostController.create)

  app.post('/post/reply',
    PostController.createReply)

  app.get('/post/:id',
    PostController.getPost)

  app.get('/post/:id/replies',
    PostController.getReplies)

  app.get('/posts/:username',
    PostController.index)

  app.post('/post/like',
    PostController.like)

  app.post('/post/unlike',
    PostController.unlike)

  app.post('/post/repost',
    PostController.repost)

  app.post('/post/removeRepost',
    PostController.removeRepost)
}
