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
      'MATCH (post:Post {id: {postId}})<-[r:POSTED|LIKED|REPOSTED]-(u)',
      'RETURN post, type(r) AS type, COUNT(u) AS counters, collect(u) AS users'
    ].join('\n'),
    params: {
      postId: parseInt(id)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Get post replies
Post.getReplies = (postId, callback) => {
  const qp = {
    query: [
      'MATCH (post:Post {id: {postId}})<-[r:REPLIED_TO]-(reply:Post)<-[:POSTED]-(user:User)',
      'OPTIONAL MATCH (reply)<-[l:LIKED]-()',
      'WITH user, reply, COUNT(l) AS likes, r',
      'OPTIONAL MATCH (reply)<-[rep:REPOSTED]-()',
      'RETURN user, reply, likes, COUNT(rep) AS reposts, r',
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
      'MATCH (user:User {username: {username}}), (post:Post {id: {postId}})',
      'CREATE (user)-[:POSTED {timestamp: timestamp()}]->(reply:Post {id: uid, content: {reply}})-[:REPLIED_TO {timestamp: timestamp()}]->(post)',
      'RETURN user, reply, post'
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

// Get posts of friends
Post.getPosts = (username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})-[:FOLLOWS]->(followee:User)-[p:POSTED|REPOSTED]->(post:Post)',
      'MATCH (post)<-[:POSTED]-(poster:User)',
      'OPTIONAL MATCH (post)<-[:REPOSTED]-(reposter:User)',
      'WITH followee, post, poster, COUNT(reposter) AS reposts, p',
      'OPTIONAL MATCH (post)<-[:LIKED]-(liker:User)',
      'WITH followee, post, poster, reposts, COUNT(liker) AS likes, p',
      'OPTIONAL MATCH (post)-[:REPLIED_TO]->(n)<-[:POSTED]-(u)',
      'WITH {id: post.id, content: post.content,',
      '      poster: {username: poster.username, fname: poster.fname, lname: poster.lname},',
      '        reposter: CASE WHEN type(p) = "POSTED" THEN NULL ELSE followee.username END,',
      '        reposts: reposts,',
      '        likes: likes,',
      '        repliedTo: CASE WHEN COUNT(n) > 0 THEN u.username ELSE NULL END',
      '      } AS post, p',
      'RETURN post',
      'ORDER BY p.timestamp DESC'
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
      'MATCH (user:User {username: {username}})-[p:POSTED|REPOSTED]->(post:Post)',
      'MATCH (post)<-[:POSTED]-(poster:User)',
      'OPTIONAL MATCH (post)<-[:REPOSTED]-(reposter:User)',
      'WITH user, post, poster, COUNT(reposter) AS reposts, p',
      'OPTIONAL MATCH (post)<-[:LIKED]-(liker:User)',
      'WITH user, post, poster, reposts, COUNT(liker) AS likes, p',
      'OPTIONAL MATCH (post)-[:REPLIED_TO]->(n)<-[:POSTED]-(u)',
      'WITH {id: post.id,',
      '    content: post.content,',
      '        poster: {username: poster.username, fname: poster.fname, lname: poster.lname},',
      '        reposter: CASE WHEN type(p) = "REPOSTED" THEN user.username ELSE NULL END,',
      '        reposts: reposts,',
      '        likes: likes,',
      '        repliedTo: CASE WHEN COUNT(n) > 0 THEN u.username ELSE NULL END',
      '      } AS post, p',
      'RETURN post',
      'ORDER BY p.timestamp DESC'
    ].join('\n'),
    params: { username }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
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
      'CREATE (user)-[r:POSTED {timestamp: timestamp()}]->(post:Post {id:uid, content: {content}, timestamp: timestamp()})',
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
