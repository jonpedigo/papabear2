const express = require('express')
const passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function (app, io) {

  const actionController = require('../controllers/action')(io)
  const combatController = require('../controllers/combat')(io)
  const craftingController = require('../controllers/crafting')(io)
  const gameController = require('../controllers/game')(io)
  const notificationController = require('../controllers/notification')(io)
  const stealthController = require('../controllers/stealth')(io)
  const travelController = require('../controllers/travel')(io)
  const warController = require('../controllers/war')(io)

  //all the controllers also need the game.....which we get from the route


  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    chatRoutes = express.Router(),
    payRoutes = express.Router(),
    communicationRoutes = express.Router()


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
