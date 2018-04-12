const neo4j = require('neo4j')

var db = new neo4j.GraphDatabase(
  process.env['NEO4J_URL'] ||
  'http://neo4j:123@localhost:7474'
)

module.exports = {
  db
}
