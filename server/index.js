// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  websiteRouter = require('./routes/website'),
  gameRouter = require('./routes/game'),
  mongoose = require('mongoose'),
  extend = require('mongoose-schema-extend'),
  socketEvents = require('./socketEvents'),
  config = require('./config/main');


// Database Setup
mongoose.connect(config.database)

// Start the server
let server
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port)
  console.log(`Your server is running on port ${config.port}.`)
} else{
  server = app.listen(config.test_port)
}


const io = require('socket.io').listen(server)

// var game = require('./controllers/Game/game')(io)

//just testing syntax of models
require('./models/Game/action')
require('./models/Game/character')
require('./models/Game/family')
require('./models/Game/item')
require('./models/Game/location')
require('./models/Game/kingdom')
require('./models/Game/game')


// Set static file location for production
// app.use(express.static(__dirname + '/public'))

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })) // Parses urlencoded bodies
app.use(bodyParser.json()) // Send JSON responses
app.use(logger('dev')) // Log requests to API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// Import routes to be served
websiteRouter(app)
gameRouter(app, io)

// necessary for testing
module.exports = server
