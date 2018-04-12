const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('This is the server')
  })

  app.get('/users',
    UserController.list)
}
