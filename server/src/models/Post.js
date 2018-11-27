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

// Get post info by id
Post.getPost = (id, callback) => {
  const qp = {
    query: [
      'MATCH (post:Post {id: {postId}})<-[p:POSTED]-(poster:User)',
      'OPTIONAL MATCH (post)<-[l:LIKED]-(u:User)',
      'OPTIONAL MATCH (post)<-[r:REPOSTED]-()',
      'RETURN post.id AS id,',
      '      post.content AS content,',
      '      poster.username AS username,',
      '      poster.fname AS fname,',
      '      poster.lname AS lname,',
      '      COUNT(l) AS likes,',
      '      COUNT(r) AS reposts,',
      '      collect(u.username) AS liked'
    ].join('\n'),
    params: {
      postId: parseInt(id)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result[0])
  })
}

// Get post replies
Post.getReplies = (postId, callback) => {
  const qp = {
    query: [
      'MATCH (u1)-[:POSTED]->(post:Post {id: {postId}})<-[r:REPLIED_TO]-(reply:Post)<-[:POSTED]-(user:User)',
      'OPTIONAL MATCH (reply)<-[l:LIKED]-()',
      'WITH user, reply, u1,  COUNT(l) AS likes, r',
      'OPTIONAL MATCH (reply)<-[rep:REPOSTED]-()',
      'RETURN reply.id AS id,',
      '      reply.content AS content,',
      '      user.username AS username,',
      '      user.fname AS fname,',
      '      user.lname AS lname,',
      '      u1.username AS reply,',
      '      likes,',
      '      COUNT(rep) AS reposts,',
      '      r.timestamp',
      'ORDER BY r.timestamp'
    ].join('\n'),
    params: { postId: parseInt(postId) }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Create reply
Post.createReply = (username, postId, reply, callback) => {
  const qp = {
    query: [
      'MERGE (id:UniqueId {name: "Post"})',
      'ON CREATE SET id.count = 1',
      'ON MATCH SET id.count = id.count + 1',
      'WITH id.count AS uid',
      'MATCH (user:User {username: {username}}), (post:Post {id: {postId}})<-[:POSTED]-(poster)',
      'CREATE (user)-[:POSTED {timestamp: timestamp()}]->(reply:Post {id: uid, content: {reply}})-[:REPLIED_TO {timestamp: timestamp()}]->(post)',
      'RETURN user.username AS username,',
      '       user.fname AS fname,',
      '       user.lname AS lname,',
      '       reply.id AS id,',
      '       reply.content AS content,',
      '       poster.username AS reply'
    ].join('\n'),
    params: {
      username,
      postId: parseInt(postId),
      reply
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

/**
 * Returns all posts created or reposted by a user's friends in reverse chronological order.
 * @param {string} username The username of the logged in user.
 * @param {function} callback A callback function.
 */
Post.getPosts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (loggedIn:User {username: {username}})-[:FOLLOWS]-(followee:User)-[r:POSTED|REPOSTED]->(post:Post)',
      'MATCH (post)<-[:POSTED]-(poster:User)',
      'OPTIONAL MATCH (post)<-[:LIKED]-(liker:User) WHERE liker.username = loggedIn.username',
      'OPTIONAL MATCH (post)<-[l:LIKED]-()',
      'OPTIONAL MATCH (post)<-[:REPOSTED]-(reposter:User) WHERE reposter.username = loggedIn.username',
      'OPTIONAL MATCH (post)<-[re:REPOSTED]-()',
      'OPTIONAL MATCH (post)-[:REPLIED_TO]->()<-[:POSTED]-(user)',
      'RETURN post.id AS id,',
      '       post.content AS content,',
      '       poster.username AS username,',
      '       poster.fname AS fname,',
      '       poster.lname AS lname,',
      '       COUNT(DISTINCT l) AS likes,',
      '       COUNT(DISTINCT re) AS reposts,',
      '       CASE WHEN type(r) = "REPOSTED" THEN followee.username ELSE false END AS reposter,',
      '       CASE WHEN liker.username = loggedIn.username THEN true ELSE false END AS liked,',
      '       CASE WHEN reposter.username = loggedIn.username THEN true ELSE false END AS reposted,',
      '       user.username AS reply,',
      '       r.timestamp AS timestamp',
      'ORDER BY timestamp DESC'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

/**
 * Returns all posts created or reposted by a user in reverse chronological order.
 * @param {string} username A user's username
 * @param {function} callback A callback function
 */
Post.getUserPosts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (loggedIn:User {username: {username}})-[r:POSTED|REPOSTED]->(post:Post)',
      'MATCH (post)<-[:POSTED]-(poster:User)',
      'OPTIONAL MATCH (post)<-[:LIKED]-(liker:User) WHERE liker.username = loggedIn.username',
      'OPTIONAL MATCH (post)<-[l:LIKED]-()',
      'OPTIONAL MATCH (post)<-[:REPOSTED]-(reposter:User) WHERE reposter.username = loggedIn.username',
      'OPTIONAL MATCH (post)<-[re:REPOSTED]-()',
      'OPTIONAL MATCH (post)-[:REPLIED_TO]->()<-[:POSTED]-(user)',
      'RETURN post.id AS id,',
      '       post.content AS content,',
      '       poster.username AS username,',
      '       poster.fname AS fname,',
      '       poster.lname AS lname,',
      '       COUNT(DISTINCT l) AS likes,',
      '       COUNT(DISTINCT re) AS reposts,',
      '       CASE WHEN liker.username = loggedIn.username THEN true ELSE false END AS liked,',
      '       CASE WHEN reposter.username = loggedIn.username THEN true ELSE false END AS reposted,',
      '       user.username AS reply,',
      '       r.timestamp AS timestamp',
      'ORDER BY timestamp DESC'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Create post with a unique id, tags and mentions
Post.createPost = (username, content, tags, mentions, callback) => {
  const qp = {
    query: [
      'MERGE (id:UniqueId {name: "Post"})',
      'ON CREATE SET id.count = 1',
      'ON MATCH SET id.count = id.count + 1',
      'WITH id.count AS uid',
      'MATCH (poster:User {username: {username}})',
      'CREATE (poster)-[:POSTED {timestamp: timestamp()}]->(post:Post {id: uid, content: {content}})',
      'WITH post, poster',
      'OPTIONAL MATCH (user:User)',
      'WHERE user.username IN {mentions}',
      'FOREACH (a IN CASE WHEN user IS NULL THEN [] ELSE [user] END | CREATE (post)-[r:MENTIONS]->(user))',
      'WITH collect(user) AS mentions, post, poster',
      'UNWIND {tags} AS tags',
      'FOREACH (b IN CASE WHEN tags IS NULL THEN [] ELSE [tags] END |',
      '            MERGE (tag:Tag {name: tags})',
      '            CREATE (post)-[:HAS]->(tag)',
      '        )',
      'RETURN mentions, post, poster'
    ].join('\n'),
    params: {
      username,
      content,
      tags,
      mentions
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Create like relationship
Post.like = (username, postId, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}}), (post:Post {id: {postId}})',
      'MERGE (user)-[r:LIKED]->(post)',
      'RETURN post'
    ].join('\n'),
    params: {
      username,
      postId: parseInt(postId)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    console.log(username)
    console.log(postId)
    callback(null, result)
  })
}

// Unlike post
Post.unlike = (username, postId, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[r:LIKED]->(post:Post {id: {postId}})',
      'DELETE r'
    ].join('\n'),
    params: {
      username,
      postId: parseInt(postId)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) {
      return callback(err)
    } else {
      console.log(result)
      callback(null, result)
    }
  })
}

// Repost
Post.repost = (username, postId, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}}), (post:Post {id: {postId}})',
      'MERGE (user)-[r:REPOSTED {timestamp: timestamp()}]->(post)',
      'RETURN user, post'
    ].join('\n'),
    params: {
      username,
      postId: parseInt(postId)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Remove repost
Post.removeRepost = (username, postId, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[r:REPOSTED]->(post:Post {id: {postId}})',
      'DELETE r'
    ].join('\n'),
    params: {
      username,
      postId: parseInt(postId)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}
