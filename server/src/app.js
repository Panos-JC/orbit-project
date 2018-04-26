const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

const app = express()

require('./config/passport')(passport)

// express app setup
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// required for passport
app.use(passport.initialize())

// routes
require('./routes')(app, passport)

app.listen(config.port, () => {
  console.log(`Magic happens on port ${config.port}`)
})
