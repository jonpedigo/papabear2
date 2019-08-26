const mongoose = require('mongoose');mongoose.Promise = require('bluebird');
const config = require('../src/config/main');
mongoose.Promise = require('bluebird');
const bluebird = require('bluebird')

const Routine = require('../src/models/Game/routine')
const Character = require('../src/models/Game/character')
const Family = require('../src/models/Game/family')
const Item = require('../src/models/Game/item')
const Location = require('../src/models/Game/location')
const Kingdom = require('../src/models/Game/kingdom')
const Game = require('../src/models/Game/game')
const User = require('../src/models/user')

const RoutineController = require("../src/controllers/Game/routine")()
const CharacterController = require("../src/controllers/Game/character")()
const LocationController = require("../src/controllers/Game/location")()
const FamilyController = require("../src/controllers/Game/family")()
const GameController = require("../src/controllers/Game/game")()
const ItemController = require("../src/controllers/Game/item")()

mongoose.connect(config.database).then(() => {
	var game = {
		name: 'default game'
	}
	return Game.create(game)
}).then((game) => {
	console.log('Game created id', game._id)
	process.exit()
})