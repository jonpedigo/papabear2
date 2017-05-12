// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  websiteRouter = require('./routes/website'),
  gameRouter = require('./routes/game'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  socketEvents = require('./socketEvents'),
  passport = require('passport'),
  cookieParser = require('cookie-parser')
  config = require('./config/main');

mongoose.Promise = require('bluebird');

// Database Setup
mongoose.connect(config.database, function(err){
  if(err) console.log(err)
  else{
    console.log("Mongoose connected on " + config.database)
  }
})

// Start the server
let server
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port)
  console.log(`Your server is running on port ${config.port}.`)
} else{
  server = app.listen(config.test_port)
}

const io = require('socket.io').listen(server)

//socket authentication
const jwt = require('jsonwebtoken')
io.sockets.on('connection', function(socket){
  socket.on('authenticate', (token) => {
    //this damn boiler plate dick head put a JWT_ in front of my tokens...
    token = token.substr(4)
    jwt.verify(token, config.secret, (err, user) => {
      if(err) console.log(err)
      if(user && user._id) {
        socket.user = user
        socket.emit('authenticated')
      } else socket.emit('unauthorized')
    })   
  })
})

//just testing syntax of models
require('./models/Game/action')
require('./models/Game/character')
require('./models/Game/family')
require('./models/Game/item')
require('./models/Game/location')
require('./models/Game/kingdom')
require('./models/Game/game')

gameController = require('./controllers/Game/game')()
gameController.populateGames()
// Set static file location for production
// app.use(express.static(__dirname + '/public'))

// Setting up basic middleware for all Express requests
// app.use(cookieParser('keyboard cat'));
app.use(bodyParser.urlencoded({ extended: false })) // Parses urlencoded bodies
app.use(bodyParser.json()) // Send JSON responses
app.use(logger('dev')) // Log requests to API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-HTTP-Method-Override')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

app.use(cookieParser(config.secret))
app.use(passport.initialize())

// Import routes to be served
websiteRouter(app)
gameRouter(app, io)

// necessary for testing
module.exports = server
