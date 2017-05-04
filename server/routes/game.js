const express = require('express')
const passport = require('passport')

// all the controllers also need the game.....which we get from the route
const gameController = require('../controllers/Game/game')
const actionController = require('../controllers/Game/action')
const characterController = require('../controllers/Game/character')
const combatController = require('../controllers/Game/combat')
const craftingController = require('../controllers/Game/crafting')
const familyController = require('../controllers/Game/family')
const notificationController = require('../controllers/Game/notification')
const itemController = require('../controllers/Game/item')
const recordController = require('../controllers/Game/record')
const stealthController = require('../controllers/Game/stealth')
const travelController = require('../controllers/Game/travel')
const warController = require('../controllers/Game/war')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const userAccountReady = (req, res, next) => {
  if (!req.user.family) return next('User needs to create their family before playing')
  if (!req.user.game) return next('User needs to create their family before playing')
  next()
}

const characterSelected = (req, res, next) => {
  if (!req.session.character) return next('User needs to select character to play with before playing')
  next()
}

const getState = (req, res, next) => {
  let state = gameController.getState(req.user.game)
  if (!state) return next('No game state!')
  req.state = state
  next()
}

const socketEvents =  (io) =>{
  io.socketsById = {}
  io.on('connection', (socket) => {
    socket.on('join game', (characterId, gameId, kingdomId, locationId) => {
      io.socketsById[characterId] = socket
      socket.join(gameId)
      socket.join(kingdomId)
      socket.join(locationId)
      socket.emit('joined game', gameId)
    })
    socket.on('leave game', (characterId, gameId, kingdomId, locationId) => {
      io.socketsById[characterId] = null
      socket.leave(gameId)
      socket.leave(kingdomId)
      socket.leave(locationId)
      socket.emit('left game', gameId)
    })
  })
} 

module.exports = function (app, io) {
  socketEvents(io)

  // Initializing route groups
  const gameRoutes = express.Router()
  const characterRoutes = express.Router()
  const actionRoutes = express.Router()
  const familyRoutes = express.Router()
  const locationRoutes = express.Router()
  const itemRoutes = express.Router()

  // = ===============================================================================
  // Game Auth Routes
  // = ========================

  // ensures that before you select a character you have a family and a game
  gameRoutes.use(userAccountReady)

  //load the game state
  gameRoutes.use(getState)

  characterRoutes.post('/', (req, res, next) => {
    // this is the character controller where create character comes in... :)
    // need to get the state on every damn thing, because everything needs to create something and therefore add itself to the gamestate
  })

  //set character on the session by selecting it
  characterRoutes.post('/select', (req, res, next) => {
    let gameId = req.user.game
    let characterId = req.body.characterId
    let character = gameController.get(gameId, characterId)
    req.session.player = character
    res.json(character)
  })

  gameRoutes.use('/character', characterRoutes)

  // ensures that in this session you have a character, player is ready to play
  gameRoutes.use(characterSelected)


  // = ==============================================================================
  // Play the GAME! Routes (user has selected a character)
  // = ========================

  characterRoutes.param('/:characterId', (req, res, next) => {

  })

  //all these routes need to ensure that the characterId is in the same location as the playerId
  characterRoutes.post('/:characterId/attack', (req, res, next) => {

  })

  characterRoutes.post('/:characterId/sense/charm', (req, res, next) => {
    
  })

  characterRoutes.post('/:characterId/sense/skill', (req, res, next) => {
    
  })

  characterRoutes.post('/:characterId/sense/bug', (req, res, next) => {
    
  })

  characterRoutes.post('/:characterId/message', (req, res, next) => {
    
  })


  locationRoutes.post('/:locationId/go', (req, res, next) => {
    
  })

  //all of these here need to ensure that player is in same location
  locationRoutes.post('/:locationId/invade', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/sneak', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/steal', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/bug/:bugId/plant', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/bug/:bugId/remove', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/message', (req, res, next) => {
    
  })

  gameRoutes.use(requireAuth, locationRoutes)


  //ensure is bug, ensure target is in same location, ensure player has access to the this bug
  itemRoutes.post('bug/:bugId/plant', (req, res, next) => {
    
  })

  //ensure is bug, ensure target is in location
  itemRoutes.post('bug/:bugId/remove', (req, res, next) => {
    
  })

  //ensure item has resources BY THE TEAM WHOM IS MAKING IT to make given item
  //ensure character is in supplyDepot OF THEIR TEAM
  itemRoutes.post('/', (req, res, next) => {
    
  })

  gameRoutes.use(requireAuth, gameRoutes)

  //
  actionRoutes.post('/', (req, res, next) => {
    
  })

  //you must either own this action
  actionRoutes.post('/actionId/remove', (req, res, next) => {
    
  })

  gameRoutes.use(requireAuth, actionRoutes)

  app.use('api/game', gameRoutes)

    // every routes gotta check which player is active

    // game/:id/start is an admin only route that starts the game, callback to update. Then creates packets and sends out to game
    // send out to all player sockets a custom packet

    // in here I need all of the controllers!!

    // start action
    // end action

    // requests neccesary
    // sneak into ___
    // steal item
    // check levels

    // craft item
    // equip
    // give
    // plant
    // removing

    // send chat
    // store log

    // go

}
