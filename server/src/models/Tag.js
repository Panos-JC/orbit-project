const db = require('../config/database').db

// Private constructor
let Tag = module.exports = function Tag (_node) {
  this._node = _node
}

// Get popular tags
Tag.getPopularTags = (callback) => {
  const qp = {
    query: [
      'MATCH (tag:Tag)<-[t:HAS]-(:Post)',
      'RETURN tag.name AS name, COUNT(t) AS count',
      'ORDER BY count DESC'
    ].join('\n')
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}

// Get posts by tag
Tag.getTagged = (tag, callback) => {
  const qp = {
    query: [
      'MATCH (u:User)-[p:POSTED]->(post:Post)-[:HAS]->(tag:Tag {name: {tag}})',
      'OPTIONAL MATCH (post)<-[l:LIKED]-()',
      'OPTIONAL MATCH (post)<-[r:REPOSTED]-()',
      'RETURN post.id AS id, ',
      '       post.content AS content,',
      '       count(l) AS likes,',
      '       count(r) AS reposts,',
      '       u.fname AS fname,',
      '       u.lname AS lname,',
      '       u.username AS username,',
      '       p.timestamp AS timestamp',
      'ORDER BY timestamp DESC'
    ].join('\n'),
    params: { tag: '#' + tag }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}
