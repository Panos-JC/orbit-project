require('dotenv').config()
module.exports = {
  port: process.env.PORT || 8081,
  neo4jUrl: process.env.NEO4J_URL,
  apiKey: process.env.API_KEY,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
