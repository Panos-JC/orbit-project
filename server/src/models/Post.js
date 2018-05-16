const db = require('../config/database').db

// Private constructor
var Post = module.exports = function Post (_node) {
  this._node = _node
}

// Get all posts
Post.getAll = (callback) => {
  const qp = {
    query: [
      'MATCH (user:User)-[:POSTED]->(post:Post)',
      'RETURN user, post',
      'ORDER BY post.timestamp DESC'
    ].join('\n')
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Get posts of friends
Post.getPosts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[:FOLLOWS]->(followee:User)',
      'MATCH (followee)-[:POSTED]->(post:Post)',
      'RETURN post, followee',
      'ORDER BY post.timestamp DESC'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Get a user's posts
Post.getUserPosts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[:POSTED]->(post:Post)',
      'RETURN collect(post) AS posts'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result[0])
  })
}

// Create post with a unique id
Post.createPost = (username, content, callback) => {
  const qp = {
    query: [
      'MERGE (id:UniqueId {name: "Post"})',
      'ON CREATE SET id.count = 1',
      'ON MATCH SET id.count = id.count + 1',
      'WITH id.count AS uid',
      'MATCH (user:User {username: {username}})',
      'CREATE (user)-[r:POSTED]->(post:Post {id:uid, content: {content}, timestamp: timestamp()})',
      'RETURN user, post'
    ].join('\n'),
    params: {
      username,
      content
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}
