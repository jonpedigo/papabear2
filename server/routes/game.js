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

const getGame = (req, res, next) => {
  let game = gameController.getGame(req.user.game)
  if (!game) return next('No game!')
  req.game = game
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
  const apiRoutes = express.Router()

  // = ===============================================================================
  // Game Auth Routes
  // = ========================

  // ensures that before you select a character you have a family and a game
  apiRoutes.use(userAccountReady)

  //load the game state
  apiRoutes.use(getGame)


  characterRoutes.param('/:characterId', (req, res, next) => {

  })

  //make sure if the character already got one, that the players team is ready for a new player. if not, then error
  characterRoutes.post('/', (req, res, next) => {

  })

  characterRoutes.post('/:characterId', (req, res, next) => {

  })

  familyRoutes.param('/:familyId', (req, res, next) => {

  })

  //createa a family? right.. make sure the damn user aint already got one
  familyRoutes.post('/', (req, res, next) => {
    
  })

  //updates a family
  familyRoutes.post('/:familyId', (req, res, next) => {
    
  })

  apiRoutes.use('/family', familyRoutes)

  //set character on the session by selecting it
  characterRoutes.post('/select', (req, res, next) => {
    let gameId = req.user.game
    let characterId = req.body.characterId
    let character = gameController.get(gameId, characterId)
    req.session.player = character
    res.json(character)
  })

  apiRoutes.use('/character', characterRoutes)

  // ensures that in this session you have a character, player is ready to play
  apiRoutes.use(characterSelected)


  // = ==============================================================================
  // Play the GAME! Routes (user has selected a character)
  // = ========================

////all these routes need to ensure that the characterId is in the same location as the playerId
  characterRoutes.post('/:characterId/attack', (req, res, next) => {

  })

  //ensure player lvl can sense charm
  characterRoutes.post('/:characterId/sense/charm', (req, res, next) => {
    
  })

  //ensure player lvl can sense skill
  characterRoutes.post('/:characterId/sense/skill', (req, res, next) => {
    
  })

  //ensure player lvl can sense bug
  characterRoutes.post('/:characterId/sense/bug', (req, res, next) => {
    
  })

  characterRoutes.post('/:characterId/log', (req, res, next) => {
    
  })

  characterRoutes.post('/:characterId/message', (req, res, next) => {
    
  })


  locationRoutes.param('/:locationId', (req, res, next) => {

  })

  locationRoutes.post('/:locationId/go', (req, res, next) => {
    
  })

////all of these here need to ensure that player is in same location
  locationRoutes.post('/:locationId/invade', (req, res, next) => {
    
  })

  //correct level to sneak
  locationRoutes.post('/:locationId/sneak', (req, res, next) => {
    
  })

  //make sure player has correct level to steal
  locationRoutes.post('/:locationId/steal/:itemId', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/message', (req, res, next) => {
    
  })

  apiRoutes.use('/location', locationRoutes)


  itemRoutes.param('/:itemId', (req, res, next) => {

  })

  //ensure is bug, ensure target is in same location, ensure player has access to this bug
  itemRoutes.post('bug/:bugId/plant', (req, res, next) => {
    
  })

  //ensure is bug, ensure player is in same location as bugged players
  itemRoutes.post('bug/:bugId/remove', (req, res, next) => {
    
  })

  //ensure item has resources BY THE TEAM WHOM IS MAKING IT to make given item
  //ensure character is in supplyDepot OF THEIR TEAM
  itemRoutes.post('/', (req, res, next) => {
    
  })

  //ensure player is in location of supply depot of their OWN team
  //ensure this item is actually in the supply depot
  itemRoutes.post('/:itemId/remove', (req, res, next) => {
    
  })

  //ensure player is in location of supply depot of their OWN team
  //ensure this item is actually in the supply depot
  itemRoutes.post('/:itemId/equip', (req, res, next) => {
    
  })

  apiRoutes.use('/item', itemRoutes)

  actionRoutes.param('/:actionId', (req, res, next) => {

  })

  //user created a new action
  //be sure to deactivate old
  actionRoutes.post('/', (req, res, next) => {
    
  })

  //you must own this action
  //it must not be the IdleAction of the kingdom
  actionRoutes.post('/:actionId/remove', (req, res, next) => {
    
  })

  apiRoutes.use('/action', actionRoutes)

//ensure super admin
  gameRoutes.param('/:gameId', (req, res, next) => {

  })

  gameRoutes.post('/:gameId/start', (req, res, next) => {
    
  })

  gameRoutes.post('/:gameId/suspend', (req, res, next) => {
    
  })

  gameRoutes.post('/:gameId/end', (req, res, next) => {
    
  })

  gameRoutes.post('/', (req, res, next) => {
    
  })

  apiRoutes.use('/game', gameRoutes)

  app.use('/api', apiRoutes)

    // game/:id/start is an admin only route that starts the game, callback to update. Then creates packets and sends out to game
    // send out to all player sockets a custom packet

}
