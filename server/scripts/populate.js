const mongoose = require('mongoose');mongoose.Promise = require('bluebird');
const config = require('../src/config/main');
mongoose.Promise = require('bluebird');
const bluebird = require('bluebird')

const Routine = require('../src/models/Game/routine')
const Character = require('../src/models/Game/character')
const Family = require('../src/models/Game/family')
const Item = require('../src/models/Game/item').Item
const Location = require('../src/models/Game/location')
const Kingdom = require('../src/models/Game/kingdom')
const Game = require('../src/models/Game/game')
const User = require('../src/models/user')
const Conversation = require('../src/models/conversation')

const RoutineController = require("../src/controllers/Game/routine")()
const CharacterController = require("../src/controllers/Game/character")()
const LocationController = require("../src/controllers/Game/location")()
const FamilyController = require("../src/controllers/Game/family")()
const GameController = require("../src/controllers/Game/game")()
const ItemController = require("../src/controllers/Game/item")()


//I should just have a file for 1) making a game 2) adding a kingdom, w character 3) adding items?
var game
var locationsMap = {}
var locations = [
	{
		name: 'nice downtown!',
		category: 'townCenter'
	},
	{
		name: 'THE MINE',
		category: 'quarry'
	},
	{
		name: 'the forest',
		category: 'woods'
	},
	{
		name: 'the field',
		category: 'field'
	},
	{
		name: 'THE BLACK GATE',
		category: 'gate'
	},
	{
		name: 'Casterly Rock',
		category: 'royalChambers'
	},
	{
		name: 'Storage...space',
		category: 'supplyDepot'
	},
	{
		name: 'Wizards TOWER',
		category: 'tower'
	},
	{
		name: 'Poop zone',
		category: 'sewers'
	},
	{
		name: 'BADABUM BUMP',
		category: 'barracks'
	}
]

//kingdoms are 8,8 in size
var kingdomSize = 8
var kingdoms = [
	{
		name: "top right",
		coordinates: {
			x: 3,
			y: 3
		},
		orientation: {
			x: 'normal',
			y: 'normal'
		},
		color: 'blue'
	},
	{
		name: "under top right",
		coordinates: {
			x: 3,
			y: 3 + kingdomSize + 2
		},
		orientation: {
			x: 'normal',
			y: 'reverse'
		},
		color: 'red'
	},
	{
		name: "next to top right",
		coordinates: {
			x: 3 + kingdomSize + 2,
			y: 3
		},
		orientation: {
			x: 'reverse',
			y: 'normal'
		},
		color: 'green'

	}
]

function createKingdomAndCharacters(game, kingdomData){
	var kingdom
	return Kingdom.create(kingdomData).then((kingdomCreated)=> {
		kingdom = kingdomCreated
		game.add(kingdom)
		return Promise.all(locations.map((loc) => {
			loc.kingdom = kingdom._id
			return LocationController.add(game, loc)
		}))
	}).then((locations) => {

		let family = {
			name: `LAST NAME ${kingdom.name}`,
			kingdom: kingdom._id
		}

		return FamilyController.add(game, family)
	}).then((family) => {
		let character = {
			name: `FIRST NAME ${kingdom.name}`, 
			kingdom: family.kingdom._id,
			family: family._id
		}

		return CharacterController.add(game, character)
	})
}


mongoose.connect(config.database).then(() => {
	var game = {
		name: 'this crazy game!'
	}
	return Game.create(game)
}).then((gameCreated) => {
	game = gameCreated
	game.initialize(() => {
		let promises = []
		for(var i = 0; i < kingdoms.length; i++){
			let kingdom = kingdoms[i]
			promises.push(createKingdomAndCharacters(game, kingdom))
		}
		Promise.all(promises).then(() => {
			return game.save()
		}).then(() => {
			process.exit()
		}).catch(console.log)
	})
})

