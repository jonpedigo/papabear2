const mongoose = require('mongoose');mongoose.Promise = require('bluebird');
const config = require('../src/config/main');
mongoose.Promise = require('bluebird');
const bluebird = require('bluebird')

const Action = require('../src/models/Game/action')
const Character = require('../src/models/Game/character')
const Family = require('../src/models/Game/family')
const Item = require('../src/models/Game/item').Item
const Location = require('../src/models/Game/location')
const Kingdom = require('../src/models/Game/kingdom')
const Game = require('../src/models/Game/game')
const User = require('../src/models/user')
const Conversation = require('../src/models/conversation')


var game
var docsMap = {}
var locationsMap = {}
mongoose.connect(config.database).then(() => {
	let game1 = {
		name: 'this crazy game!'
	}

	return Game.create(game1)
}).then((gameDB) => {
	docsMap[gameDB._id] = gameDB
	game = gameDB

	let locations = [
		{
			name: 'nice downtown!',
			category: 'townCenter'
		}
	]

	console.log('populatng locations')
	return Promise.all(locations.map((loc) => {
		return Location.create(loc)
	}))

}).then((locations) => {
	locationsMap = locations.reduce((map, loc) => {
		docsMap[loc._id] = loc
		game.add(loc)
		map[loc.category] = loc._id
		return map
	}, {})

	let kingdom1 = {
		name: "Da killa chicks",
		// locations: locationsMap
	}

	console.log('populatng kingdoms')

	return Kingdom.create(kingdom1).then((kingdom) => {
		locations.forEach((loc) => {
			loc.kingdom = kingdom._id
			loc.save().catch(console.log)
		})

		return kingdom
	})
}).then((kingdom) => {
	docsMap[kingdom._id] = kingdom
	game.add(kingdom)

	let family1 = {
		name: "LAST NAME",
		kingdom: kingdom._id
	}

	console.log('populatng families')

	return Family.create(family1)
}).then((family) => {
	docsMap[family._id] = family
	game.add(family)

	let character1 = {
		name: "FIRST NAME", 
		kingdom: family.kingdom,
		currentLocation: locationsMap['townCenter'],
		family: family._id
	}

	// console.log(character1)
	// console.log(docsMap)

	console.log('populatng characters')
	return Character.create(character1)
}).then((character) => {
	docsMap[character._id] = character
	game.add(character)

	return game.save()
}).then(() => {
	process.exit()
}).catch(console.log)
