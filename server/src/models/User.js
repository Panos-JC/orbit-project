const db = require('../config/database').db

// private constructor
var User = module.exports = function User (_node) {
  this._node = _node
}

// Get a single user
User.get = (id, callback) => {
  var qp = {
    query: [
      'MATCH (user:User)',
      'WHERE ID(user) = {userId}',
      'RETURN user'
    ].join('\n'),
    params: {
      userId: parseInt(id)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result[0]['user'])
  })
}

// Get all users (Limit 100)
User.getAll = (callback) => {
  var qp = {
    query: [
      'MATCH (user:User)',
      'RETURN user',
      'LIMIT 100'
    ].join('\n')
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    console.log('User.getAll: ')
    console.log(result)
    callback(null, result)
  })
}
