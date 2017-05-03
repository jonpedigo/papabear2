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
const stealthController = require('../controllers/Game/stealth')
const travelController = require('../controllers/Game/travel')
const warController = require('../controllers/Game/war')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function (app, io) {
  io.on('connection', (socket) => {
    socket.on('join game', (playerId, gameId, kingdomId) => {
      socket.join(playerId)
      socket.join(gameId)
      socket.join(kingdomId)
      socket.emit('game joined', gameId)
    })
    socket.on('disconnect', (playerId, gameId, kingdomId) => {
      socket.leave(playerId)
      socket.leave(gameId)
      socket.leave(kingdomId)
    })
  })

  // Initializing route groups
  const gameRoutes = express.router()

  // ensures that before you select a character you have a family and a game
  // called userDataComplete, also make sure they have an email...?
  gameRoutes.use((req, res, next) => {
    if (!req.user.family) return next('User needs to create their family before playing')
    if (!req.user.game) return next('User needs to create their family before playing')
    next()
  })

  gameRoutes.use((req, res, next) => {
    let state = gameController.getState(req.user.game)
    if (!state) return next('No game state!')
    req.state = state
    next()
  })

  gameRoutes.post('/character/select', requireAuth, (req, res, next) => {
    let gameId = req.user.game
    let characterId = req.body.characterId
    let character = gameController.get(gameId, characterId)
    req.session.character = character
    res.json(character)
  })

  gameRoutes.post('/character', requireAuth, (req, res, next) => {
    // this is the character controller where create character comes in... :)
    // need to get the state on every damn thing, because everything needs to create something and therefore add itself to the gamestate
  })

  // ensures that in this session you have a character, if not send to create on
  // called ensure characterSelected
  gameRoutes.use((req, res, next) => {
    if (!req.session.character) return next('User needs to select character to play with before playing')
    next()
  })

  app.use('/game', requireAuth, gameRoutes)

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

    // plant bug

    // attack person
    // send troops to Location

    // craft item
    // equip
    // give

    // send chat
    // store log

    // go

}
