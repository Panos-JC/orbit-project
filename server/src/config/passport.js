const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = (passport) => {
  // Local Login
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.getBy('user.username', username, (err, user) => {
      if (err) return done(err)

      // if no user is found, return appropriate message
      if (!user) {
        return done(null, false, {message: 'No user found'})
      }

      // if the password doesn't match, return appropriate message
      if (!User.validPassword(password, user.properties.password)) { // eslint-disable-line
        return done(null, false, {message: 'Oops! Wrong password'})
      } else {
        // else, return user
        return done(null, user)
      }
    })
  }
  ))

  // Local Signup
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.getBy('user.username', username, (err, user) => {
      if (err) return done(err)

      // if user exists, return appropriate message
      if (user) {
        return done(null, false, {message: 'User already exists'})
      } else {
        // Else create user
        const newUser = {}
        newUser.username = username
        newUser.password = User.generateHash(password)
        newUser.fname = req.body.fname
        newUser.lname = req.body.lname
        console.log('REQ.BODY: ' + req.body)

        User.create(newUser, (err, user) => {
          if (err) throw err
          console.log('Passport-createUser: ' + user)
          return done(null, user)
        })
      }
    })
  }
  ))
}
