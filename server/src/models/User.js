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
      'RETURN collect(user) AS users',
      'LIMIT 100'
    ].join('\n')
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    console.log('User.getAll: ')
    console.log(result)
    callback(null, result[0]['users'])
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

// Get user info
User.getUserInfo = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})',
      'OPTIONAL MATCH (user)-[:FOLLOWS]->(followee)',
      'OPTIONAL MATCH (user)<-[:FOLLOWS]-(follower)',
      'OPTIONAL MATCH (user)-[:POSTED|REPOSTED]->(post)',
      'OPTIONAL MATCH (user)-[:VISITED]->(place)',
      'RETURN user.username AS username,',
      '       user.fname AS fname,',
      '       user.lname AS lname,',
      '       count(DISTINCT post) AS posts,',
      '       count(DISTINCT followee) AS following,',
      '       count(DISTINCT follower) AS followers,',
      '       count(DISTINCT place) AS visited'
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

// Add relationship between two users
User.addUserRel = (rel, user1, user2, callback) => {
  let qp = {}
  switch (rel) {
    case 'follow':
      qp = {
        query: [
          'MATCH (user:User {username: {user}}), (other:User {username: {otherUser}})',
          'MERGE (user)-[r:FOLLOWS]->(other)',
          'ON CREATE SET r.timestamp = timestamp()',
          'RETURN r'
        ].join('\n'),
        params: {
          user: user1,
          otherUser: user2
        }
      }
      break

    case 'unfollow':
      qp = {
        query: [
          'MATCH (user:User {username: {user}})-[r:FOLLOWS]->(other:User {username: {otherUser}})',
          'DELETE r'
        ].join('\n'),
        params: {
          user: user1,
          otherUser: user2
        }
      }
      break
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    console.log('FOLLOW/UNFOLLOW')
    callback(null)
  })
}

// Get a user's liked posts
User.getLikedPosts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[:LIKED]->(post:Post)',
      'RETURN post'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, posts) => {
    if (err) callback(err)
    callback(null, posts)
  })
}

// Get a user's reposts
User.getReposts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[:REPOSTED]->(post:Post)',
      'RETURN post'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, posts) => {
    if (err) callback(err)
    callback(null, posts)
  })
}

// Get a user's visited places
User.getVisits = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})',
      'MATCH (user)-[r:VISITED]->(place)',
      'RETURN collect(place.place_id) AS places'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}

// Get a user's rated places
User.getRatings = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})',
      'MATCH (user)-[r:RATED]->(place)',
      'RETURN place.place_id AS place, r.rating AS rating'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}

User.getInterests = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})',
      'MATCH (user)-[:POSTED]->(post)-[:INTERESTED_IN]->(place)',
      'RETURN collect(place.place_id) AS interests'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}

User.getRecommendations = (username, callback) => {
  const qp = {
    query: [
      'MATCH (me:User {username: {username}})-[:FOLLOWS]->(followee:User)-[:FOLLOWS]->(sug)',
      'WHERE me <> sug',
      'AND NOT (me)-[:FOLLOWS]->(sug)',
      'RETURN sug.username AS username,',
      '       sug.fname AS fname,',
      '       sug.lname AS lname,',
      '       count(sug) AS common',
      'ORDER BY common DESC',
      'LIMIT 3'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}

// Passport Functions

User.generateHash = (password, next) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null, next)
}

User.validPassword = (password, pass, next) => {
  return bcrypt.compareSync(password, pass, next)
}
