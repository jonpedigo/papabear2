const express = require('express')
const passport = require('passport')

// all the controllers also need the game.....which we get from the route
const gameController = require('../controllers/Game/game')()
const routineController = require('../controllers/Game/routine')()
const characterController = require('../controllers/Game/character')()
const combatController = require('../controllers/Game/combat')()
const craftingController = require('../controllers/Game/crafting')()
const familyController = require('../controllers/Game/family')()
const notificationController = require('../controllers/Game/notification')()
const itemController = require('../controllers/Game/item')()
const locationController = require('../controllers/Game/location')()
const recordController = require('../controllers/Game/record')()
const stealthController = require('../controllers/Game/stealth')()
const travelController = require('../controllers/Game/travel')()
const warController = require('../controllers/Game/war')()

const DESIGN = require('../../../shared/design')

const User = require('../models/user')
const setUserInfo = require('../helpers').setUserInfo;

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })

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

const getLocation = (req, res, next) => {
  let location = req.game.getById(req.params.locationId)
  if (!location) return next('No location!')
  req.location = location
  next()
}

const getRoutine = (req, res, next) => {
  let routine = req.game.getById(req.params.routineId)
  if (!routine) return next('No routine!')
  req.routine = routine
  next()
}

const getItem = (req, res, next) => {
  let item = req.game.getById(req.params.itemId)
  if (!item) return next('No item!')
  req.item = item
  next()
}

const getFamily = (req, res, next) => {
  req.family = req.game.getById(req.params.familyId)
  if(!req.family) return next('No family with that Id')
  next()
}

const getCharacter = (req, res, next) => {
  req.character = req.game.getById(req.params.characterId)
  if(!req.character) return next('No character with that Id')
  next()
}


const socketEvents =  (io) =>{
  io.on('connection', (socket) => {
    socket.on('join game', () => {
      User.findById(socket.user._id).then((user) => {
        socket.join(user.game)
        socket.join(user.currentCharacter)
        socket.join(user.family)
        let game = gameController.getGame(user.game)
        let player = game.getById(user.currentCharacter)
        socket.game = game
        socket.player = player
        socket.join(player.currentLocation._id)
        socket.join(player.kingdom._id)
        socket.emit('joined game', game._id)
      })
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

  const updateCharacter = (game, character) => {
    io.in(character._id).emit('update game', DESIGN.CLIENT.PLAYER_STATE(game, character), DESIGN.CLIENT.WORLD_STATE(game))
  }

  // Initializing route groups
  const gameRoutes = express.Router()
  const characterRoutes = express.Router()
  const routineRoutes = express.Router()
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
  apiRoutes.use('/routine', routineRoutes)
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
    if (family.getCharacters(req.game).length && !familyController.canAddCharacter(req.game, family)) return next('You cannot add a character to this family right now')

    props.kingdom = family.kingdom._id
    characterController.add(req.game, props, (err, character) => {
      if(err) return next(err)
      req.user.currentCharacter = character._id
      req.user.save().then((user) => {
        res.json({user: setUserInfo(user)})
      }).catch(next)
    })
  })

  //set character on the session by selecting it
  characterRoutes.post('/:characterId/select', requireAuth, getGame, getCharacter, (req, res, next) => {
    req.user.currentCharacter = req.character._id
    req.user.save().then((user) => {
      res.json({user: setUserInfo(user)})
    }).catch(next)
  })

  characterRoutes.put('/:characterId', requireAuth, getGame, getPlayer, getCharacter, (req, res, next) => {
    if (!req.character.family._id !== req.player.family._id) return next('You cannot update a character that isnt in your family')
    req.character.update(req.body, (err, character) => {
      if(err) return next(err)
      res.json(character._id)
    })
  })


  //updates a family
  familyRoutes.put('/:familyId', requireAuth, getGame, getPlayer, getFamily, (req, res, next) => {
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
  //event
  characterRoutes.post('/:characterId/attack', requireAuth, getGame, getPlayer, getCharacter, (req, res, next) => {

  })

  //event
  //ensure player lvl can sense charm
  characterRoutes.post('/:characterId/sense', requireAuth, getGame, getPlayer, getCharacter, (req, res, next) => {

  })


  characterRoutes.post('/:characterId/record', requireAuth, getGame, getPlayer, getCharacter, (req, res, next) => {

  })

  characterRoutes.post('/:characterId/message', requireAuth, getGame, getPlayer, getCharacter, (req, res, next) => {

  })

  locationRoutes.post('/:locationId/travel', requireAuth, getGame, getPlayer, getLocation, (req, res, next) => {
    locationController.travelTo(req.location, req.player, (err, travelTime, travelStart) => {
      if(err) next(err)
      req.player.update({currentRoutine: null})
      res.json({eventState: { travelTime, travelStart }})
    })
  })

////all of these here need to ensure that player is in same location
  //event
  locationRoutes.post('/:locationId/invade', requireAuth, getGame, getPlayer, getLocation, (req, res, next) => {

  })

  //event
  //correct level to sneak
  locationRoutes.post('/:locationId/sneak', requireAuth, getGame, getPlayer, getLocation, (req, res, next) => {

  })

  //event
  //make sure player has correct level to steal
  //make sure items in there
  locationRoutes.post('/:locationId/steal/:itemId', requireAuth, getGame, getPlayer, getLocation, (req, res, next) => {

  })

  locationRoutes.post('/:locationId/message', requireAuth, getGame, getPlayer, getLocation, (req, res, next) => {

  })

  //event
  //ensure is bug, ensure target is in same location, ensure player has access to this bug
  itemRoutes.post('bug/:itemId/plant', requireAuth, getGame, getPlayer, getItem, (req, res, next) => {

  })

  //ensure is bug, ensure player is in same location as bugged players
  itemRoutes.post('bug/:itemId/remove', requireAuth, getGame, getPlayer, getItem, (req, res, next) => {

  })

  //ensure item has resources BY THE TEAM WHOM IS MAKING IT to make given item
  //ensure character is in supplyDepot OF THEIR TEAM
  itemRoutes.post('/', requireAuth, getGame, getPlayer, (req, res, next) => {

  })

  //ensure player is in location of supply depot of their OWN team
  //ensure this item is actually in the supply depot
  itemRoutes.post('/:itemId/unequip', requireAuth, getGame, getPlayer, getItem, (req, res, next) => {

  })

  //ensure player is in location of supply depot of their OWN team
  //ensure this item is actually in the supply depot
  itemRoutes.post('/:itemId/equip', requireAuth, getGame, getPlayer, getItem, (req, res, next) => {

  })


  //player created a new routine
  //assume its only created by the player that wants to start it, not for idle kingdom...
  //thats can be a whole nother function no need to mess these parts up
  routineRoutes.post('/', requireAuth, getGame, getPlayer, (req, res, next) => {
    routineController.add(req.game, req.body, (err, routine) => {
      if(err) return next(err)
      req.player.update({currentRoutine: routine})
      res.send('Success')
    })
  })

  //start routine
  //be sure to deactivate old
  routineRoutes.post('/:routineId/start', requireAuth, getGame, getPlayer, getRoutine, (req, res, next) => {

  })

  //you must own this routine
  //it must not be the Idleroutine of the kingdom (just duplicate the idle routine?)
  routineRoutes.post('/:routineId/end', requireAuth, getGame, getPlayer, getRoutine, (req, res, next) => {

  })


//ensure super admin
  gameRoutes.post('/:gameId/start', (req, res, next) => {

  })

  gameRoutes.post('/:gameId/suspend', (req, res, next) => {

  })

  gameRoutes.post('/:gameId/end', (req, res, next) => {

  })

  gameRoutes.post('/', (req, res, next) => {

  })

}
