const User = require('../models/User')

exports.list = (req, res, next) => {
  User.getAll((err, users) => {
    if (err) return next(err)

    res.send(users)
  })
}
