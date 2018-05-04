const db = require('../config/database').db
const bcrypt = require('bcrypt-nodejs')

// private constructor
var User = module.exports = function User (_node) {
  this._node = _node
}

// Get a single user
User.get = (id, callback) => {
  const qp = {
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
    callback(null, result[0])
  })
}

// Get user by field
User.getBy = (field, value, callback) => {
  const qp = {
    query: [
      'MATCH (user:User)',
      'WHERE ' + field + ' = {value}',
      'RETURN user'
    ].join('\n'),
    params: { value }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    if (!result[0]) {
      callback(null, null)
    } else {
      callback(null, result[0]['user'])
    }
  })
}

// Get all users (Limit 100)
User.getAll = (callback) => {
  const qp = {
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

// Create user
User.create = (data, callback) => {
  const qp = {
    query: [
      'CREATE (user:User {data})',
      'RETURN user'
    ].join('\n'),
    params: {
      data
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result[0]['user'])
  })
}

// Get user stats (following, followers, posts)
User.getStats = (username, callback) => {
  const qp = {
    query: [
      'OPTIONAL MATCH (u:User {username: {username}})-[:FOLLOWS]->(following:User)',
      'WITH u, COUNT(following) AS following',
      'OPTIONAL MATCH (u)-[:POSTED]->(p:Post)',
      'WITH u, COUNT(p) AS posts, following',
      'OPTIONAL MATCH (u)<-[:FOLLOWS]-(follower:User)',
      'RETURN posts, COUNT(follower) as followers, following'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result[0])
  })
}

// Get user's followers list
User.getFollowers = (username, callback) => {
  const qp = {
    query: [
      'MATCH (u:User {username: {username}})<-[:FOLLOWS]-(user:User)',
      'RETURN collect(user) AS users'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result[0]['users'])
  })
}

// Get user's following list
User.getFollowing = (username, callback) => {
  const qp = {
    query: [
      'MATCH (u:User {username: {username}})-[:FOLLOWS]->(user:User)',
      'RETURN collect(user) AS users'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result[0]['users'])
  })
}

// Passport Functions

User.generateHash = (password, next) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null, next)
}

User.validPassword = (password, pass, next) => {
  return bcrypt.compareSync(password, pass, next)
}
