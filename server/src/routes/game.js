const express = require('express')
const passport = require('passport')

// all the controllers also need the game.....which we get from the route
const gameController = require('../controllers/Game/game')()
const actionController = require('../controllers/Game/action')()
const characterController = require('../controllers/Game/character')()
const combatController = require('../controllers/Game/combat')()
const craftingController = require('../controllers/Game/crafting')()
const familyController = require('../controllers/Game/family')()
const notificationController = require('../controllers/Game/notification')()
const itemController = require('../controllers/Game/item')()
const recordController = require('../controllers/Game/record')()
const stealthController = require('../controllers/Game/stealth')()
const travelController = require('../controllers/Game/travel')()
const warController = require('../controllers/Game/war')()

const User = require('../models/user')
const setUserInfo = require('../helpers').setUserInfo;

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })

const userAccountReady = (req, res, next) => {
  if (!req.user.family) return next('User needs to create their family before playing')
  if (!req.user.game) return next('User needs to create their family before playing')
  next()
}

const getGame = (req, res, next) => {
  let game = gameController.getGame(req.user.game)
  if (!game) return next('No game!')
  req.game = game
  next()
}

const getPlayer = (req, res, next) => {
  let player = req.game.getById(req.user.currentCharacter)
  if (!player) return next('No selected player!')
  req.player = player
  next()
}

const socketEvents =  (io) =>{
  io.on('connection', (socket) => {
    socket.on('join game', () => {
      socket.join(socket.user.game)
      socket.join(socket.user.currentCharacter)
      socket.join(socket.user.family)
      let game = gameController.getGame(socket.user.game)
      let player = game.getById(socket.user.currentCharacter)
      socket.player = player
      socket.join(player.currentLocation._id)
      socket.join(player.kingdom._id)
      socket.emit('joined game', gameId)
    })
    socket.on('leave game', () => {
      socket.leave(socket.user.game)
      socket.leave(socket.user.currentCharacter)
      socket.leave(socket.user.family)
      socket.leave(socket.player.currentLocation._id)
      socket.leave(socket.player.kingdom._id)
      socket.emit('left game', socket.user.game)
    })
  })
} 

let popState = {
  event: "",
  message: "",
  success: true,
  result : {}
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
  app.use('/api', apiRoutes)

  apiRoutes.use('/game', gameRoutes)
  apiRoutes.use('/character', characterRoutes)
  apiRoutes.use('/family', familyRoutes)
  apiRoutes.use('/action', actionRoutes)
  apiRoutes.use('/item', itemRoutes)
  apiRoutes.use('/location', locationRoutes)

  gameRoutes.post('/:gameId/select', requireAuth, (req, res, next) => {
    if(req.user.game && req.user.game != req.params.gameId) next('You already belong to a game, currently we dont support switching games')
    let gameId = req.params.gameId
    req.user.game = gameId
    req.user.save().then((user) => {
      res.json({user: setUserInfo(user)})
    }).catch(next)
  })

  //createa a family? right.. make sure the damn user aint already got one
  //needs to put it in a random kingdom
  familyRoutes.post('/', requireAuth, getGame, (req, res, next) => {
    if (req.user && req.user.family) return next('You already have a family')
    familyController.add(req.game, req.body, (err, family) => {
      if (err) next(err)
      familyController.findKingdom(req.game, family)
      req.user.family = family._id
      req.user.save().then((user) => {
        res.json({user: setUserInfo(user)})
      }).catch(next)
    })
  })

  //make sure if the character already got one, that the players team is ready for a new player. if not, then error
  characterRoutes.post('/', requireAuth, getGame, (req, res, next) => {
    let props = req.body
    let familyId = req.user.family
    let family = req.game.getById(familyId)
    if (!props.family) props.family = familyId
    else if (props.family != familyId) return next('You cannot create a character that isnt in your family')
    if (family.characters.length && !familyController.canAddCharacter(req.game, family)) return next('You cannot add a character to this family right now')
    
    props.kingdom = family.kingdom
    props.family = family._id
    characterController.add(req.game, props, (err, character) => {
      if(err) return next(err)
      req.user.currentCharacter = character._id
      req.user.save().then((user) => {
        res.json({user: setUserInfo(user)})
      }).catch(next)
    })
  })


  characterRoutes.param('/:characterId', requireAuth, getGame, (req, res, next) => {
    req.character = req.game.getById(req.params.characterId)
    if(!req.character) return next('No character with that Id')
    next()
  })

  //set character on the session by selecting it
  characterRoutes.post('/:characterId/select', requireAuth, getGame, (req, res, next) => {
    let characterId = req.params.characterId
    let character = req.game.getById(characterId)
    req.user.currentCharacter = character._id
    req.user.save().then((user) => {
      res.json({user: setUserInfo(user)})
    }).catch(next)
  })


  characterRoutes.put('/:characterId', requireAuth, getGame, getPlayer, (req, res, next) => {
    if (!req.character.family._id !== req.player.family._id) return next('You cannot update a character that isnt in your family')
    req.character.update(req.body, (err, character) => {
      if(err) return next(err)
      res.json(character._id)
    })
  })

  familyRoutes.param('/:familyId', requireAuth, getGame, getPlayer, (req, res, next) => {
    req.family = req.game.getById(req.params.familyId)
    if(!req.family) return next('No family with that Id')
    next()
  })

  //updates a family
  familyRoutes.put('/:familyId', requireAuth, getGame, getPlayer, (req, res, next) => {
    if (!req.family._id !== req.player.family._id) return next('You cannot update a family that isnt yours')
    req.family.update(req.body, (err, family) => {
      if(err) return next(err)
      res.json(family._id)
    })
  })

  // = ==============================================================================
  // Play the GAME! Routes (user has selected a character)
  // = ========================

////all these routes need to ensure that the characterId is in the same location as the playerId
  //pop
  characterRoutes.post('/:characterId/attack', (req, res, next) => {

  })

  //pop
  //ensure player lvl can sense charm
  characterRoutes.post('/:characterId/sense/charm', (req, res, next) => {
    
  })

  //pop
  //ensure player lvl can sense skill
  characterRoutes.post('/:characterId/sense/skill', (req, res, next) => {
    
  })

  //pop
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
  //pop
  locationRoutes.post('/:locationId/invade', (req, res, next) => {
    
  })

  //pop
  //correct level to sneak
  locationRoutes.post('/:locationId/sneak', (req, res, next) => {
    
  })

  //pop
  //make sure player has correct level to steal
  //make sure items in there
  locationRoutes.post('/:locationId/steal/:itemId', (req, res, next) => {
    
  })

  locationRoutes.post('/:locationId/message', (req, res, next) => {
    
  })

  itemRoutes.param('/:itemId', (req, res, next) => {

  })

  //pop
  //ensure is bug, ensure target is in same location, ensure player has access to this bug
  itemRoutes.post('bug/:bugId/plant', (req, res, next) => {
    
  })

  //pop
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


  actionRoutes.param('/:actionId', (req, res, next) => {

  })

  //user created a new action
  //be sure to deactivate old
  actionRoutes.post('/', (req, res, next) => {
    
  })

  //you must own this action
  //it must not be the IdleAction of the kingdom
  actionRoutes.post('/:actionId/end', (req, res, next) => {
    
  })


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



    // game/:id/start is an admin only route that starts the game, callback to update. Then creates packets and sends out to game
    // send out to all player sockets a custom packet

}
