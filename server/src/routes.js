const UserController = require('./controllers/UserController')
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

  app.get('/users',
    UserController.list)

  app.get('/users/:username',
    UserController.show)

  app.get('/users/:username/followers',
    UserController.followers)

  app.get('/users/:username/following',
    UserController.following)
}
