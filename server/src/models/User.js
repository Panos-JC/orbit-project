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

/**
 * Returns an object for every user in the database, excluding the logged in user.
 * Each object contains the user's info (username, fname, lname) and a boolean
 * indicating whether or not the user is beeing followed by the logged in user.
 * @param {string} username The username of the logged in user.
 * @param {function} callback A callback function.
 */
User.getAll = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User)',
      'MATCH (loggedUser:User {username: {username}})',
      'WHERE user <> loggedUser',
      'RETURN user.username AS username,',
      '       user.fname AS fname,',
      '       user.lname AS lname,',
      '       CASE WHEN exists((loggedUser)-[:FOLLOWS]->(user)) THEN true ELSE false END AS isFriend'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
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

// Get user's visits
User.getVisits = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[:VISITED]->(place:Place)',
      'RETURN place.name as name, place.place_id AS place_id'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}

/**
 * Adds or removes the follow relationship between two users
 * @param {string} rel The follow or unfollow keyword
 * @param {string} user1 The username of the logged in user
 * @param {string} user2 The username of the followee
 * @param {string} callback A callback function
 */
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
