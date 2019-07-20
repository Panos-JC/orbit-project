const neo4j = require('neo4j')
const config = require('./config.js')

var db = new neo4j.GraphDatabase(config.neo4jUrl)

module.exports = {
  db
}
