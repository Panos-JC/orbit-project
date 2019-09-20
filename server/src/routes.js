const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const PlacesApiController = require('./controllers/PlacesApiController')
const PlaceController = require('./controllers/PlaceController')
const TagController = require('./controllers/TagController')
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
  app.post('/users',
    UserController.list)

  app.get('/users/:username',
    UserController.show)

  app.get('/users/:username/userInfo',
    UserController.userInfo)

  app.get('/users/:username/posts',
    UserController.getProfilePosts)

  app.get('/users/:username/followers',
    UserController.followers)

  app.get('/users/:username/following',
    UserController.following)

  app.get('/users/:username/visits',
    UserController.visits)

  app.get('/users/:username/likes',
    UserController.getLikedPosts)

  app.get('/users/:username/reposts',
    UserController.getReposts)

  app.post('/follow',
    UserController.follow)

  app.post('/unfollow',
    UserController.unFollow)

  app.get('/users/:username/visits',
    UserController.getVisits)

  app.get('/users/:username/ratings',
    UserController.getRatings)

  app.get('/users/:username/interests',
    UserController.getInterests)

  app.post('/users/recommendations',
    UserController.getRecommendations)

  app.post('/users/visitor_friends',
    UserController.getVisitorFriends)

  app.post('/users/create_notification',
    UserController.createNotification)

  app.get('/users/:username/notifications',
    UserController.getNotifications)

  app.delete('/users/:username/notifications',
    UserController.deleteNotifications)

  // Places Routes
  app.post('/places/search',
    PlacesApiController.search)

  app.get('/places/:placeId',
    PlacesApiController.getPlace)

  app.post('/places/:placeId/stats',
    PlaceController.getStats)

  app.get('/places/name/:placeName',
    PlacesApiController.getPlaceByName)

  app.post('/places/create',
    PlaceController.createPlace)

  app.post('/places/visit',
    PlaceController.visit)

  app.post('/places/rate',
    PlaceController.rate)

  app.post('/places/interest',
    PlaceController.interest)

  app.post('/places/friendsVisited',
    PlaceController.friendsVisited)

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

  // TAG Routes
  app.get('/tags/popular',
    TagController.getPopularTags)

  app.get('/tags/:tagName',
    TagController.getTagged)
}
