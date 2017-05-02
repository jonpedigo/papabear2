const express = require('express')
const passport = require('passport')

const gameController = require('../controllers/Game/game')
const actionController = require('../controllers/Game/action')
const combatController = require('../controllers/Game/combat')
const craftingController = require('../controllers/Game/crafting')
const notificationController = require('../controllers/Game/notification')
const stealthController = require('../controllers/Game/stealth')
const travelController = require('../controllers/Game/travel')
const warController = require('../controllers/Game/war')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

//should this component handle all the networking?? I REALLY DONT KNOW WHERE TO DO SOCKETS OR SHOULD ALL COMPONENTS BE ABLE TO USE sockets
/// IT CANT REaLLY BE IN HERE BECAUSE THERES NO ROUTE TO TRIGGER THIS, UNlESS THE GAME STARTING ROUTE DOES IT
// I CAN EITHER GIVE IT TO EVERY CONTROLLER OR GIVE IT JUST TO THE GAME CONTROLLER

module.exports = function (app, io) {


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
