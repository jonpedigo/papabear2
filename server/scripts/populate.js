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
		category: 'forest'
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
mongoose.connect(config.database).then(() => {
	let game1 = {
		name: 'this crazy game!'
	}

	return Game.create(game1)
}).then((gameDB) => {
	game = gameDB

	console.log('populatng locations for kingdom 1')
	return Promise.all(locations.map((loc) => {
		return Location.create(loc)
	}))

}).then((locations) => {
	locations.forEach((loc) => {
		game.add(loc)
	})

	let kingdom1 = {
		name: "Da killa chicks",
	}

	console.log('populatng kingdom 1')
	return Kingdom.create(kingdom1).then((kingdom) => {
		locations.forEach((loc) => {
			loc.kingdom = kingdom._id
			loc.save().catch(console.log)
		})

		return kingdom
	})
}).then((kingdom) => {
	game.add(kingdom)

	console.log('populatng locations for kingdom 2')
	return Promise.all(locations.map((loc) => {
		return Location.create(loc)
	}))

}).then((locations) => {
	locationsMap = locations.reduce((map, loc) => {
		game.add(loc)
		map[loc.category] = loc._id
		return map
	}, {})

	let kingdom1 = {
		name: "BOYZ RULE",
	}

	console.log('populatng kingdom 2')
	return Kingdom.create(kingdom1).then((kingdom) => {
		locations.forEach((loc) => {
			loc.kingdom = kingdom._id
			loc.save().catch(console.log)
		})

		return kingdom
	})
}).then((kingdom) => {
	game.add(kingdom)

	let family1 = {
		name: "LAST NAME",
		kingdom: kingdom._id
	}

	console.log('populatng family in kingdom 2')

	return Family.create(family1)
}).then((family) => {
	game.add(family)

	let character1 = {
		name: "FIRST NAME", 
		kingdom: family.kingdom,
		currentLocation: locationsMap['townCenter'],
		family: family._id
	}

	// console.log(character1)

	console.log('populatng character in kingdom 2')
	return Character.create(character1)
}).then((character) => {
	game.add(character)

	return game.save()
}).then(() => {
	process.exit()
}).catch(console.log)
