const mongoose = require('mongoose')
const config = require('../src/config/main')
mongoose.Promise = require('bluebird')
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

const DESIGN = require('../../shared/design')

var familys = [
	{
		name: 'Pedigo'
	},
	{
		name: 'Palenchar'
	},
	{
		name: 'Jakymiw'
	},
	{
		name: 'Bryan'
	},
	{
		name: 'Song'
	},
	{
		name: 'Liou'
	},
	{
		name: 'Maccarone'
	},
	{
		name: 'Leff'
	},
	{
		name: 'Goldin'
	},
	{
		name: 'Anecone'
	},
	{
		name: 'Scarramuzino'
	},
	{
		name: 'Gould'
	},
	{
		name: 'Patinella'
	},
	{
		name: 'Rosenblum'
	}
]


var characters = [
	{
		name: 'John'
	},
	{
		name: 'Jon'
	},
	{
		name: 'Jonathan'
	},
	{
		name: 'Honan'
	},
	{
		name: 'Talaman'
	},
	{
		name: 'Ghengis'
	},
	{
		name: 'Atilla'
	},
	{
		name: 'Becrom'
	},
	{
		name: 'Snow'
	},
	{
		name: 'Sam'
	},
	{
		name: 'Cartman'
	},
	{
		name: 'Telethor'
	},
	{
		name: 'Bashram'
	},
	{
		name: 'Bagradah'
	}
	// {
	// 	name: 'Argazi'
	// },
	// {
	// 	name: 'Entarkia'
	// },
	// {
	// 	name: 'Phishi'
	// },
	// {
	// 	name: 'Nick'
	// },
	// {
	// 	name: 'Nick'
	// }
]

var routineCategorys = ['woodcut', 'mine', 'herd', 'trainWarfare', 'trainMagic', 'trainStealth', 'guard']

function randomRoutineCategory(game){
	return routineCategorys[Math.floor(Math.random() * routineCategorys.length)]
}

function locationBasedOnCategory(locations, category){
	let location
	switch(category){
		case 'woodcut':
			location = locations.woods
		break;
		case 'mine':
			location = locations.quarry
		break;
		case 'herd':
			location = locations.field
		break;
		case 'trainWarfare':
			location = locations.barracks
		break;
		case 'trainStealth':
			location = locations.sewers
		break;
		case 'trainMagic':
			location = locations.tower
		break;
		case 'guard':
			location = locations.gate
		break;
	}

	return location
}

function createFamilyAndCharacter(game, familyData){
	var family
	return FamilyController.add(game, familyData).then((familyCreated)=> {
		let character = characters.pop()
		character.family = familyCreated._id
		character.kingdom = familyCreated.kingdom._id

		let routineCategory = randomRoutineCategory(game)

		let locations = game.getById(familyCreated.kingdom._id).getLocations(game)
		let location = locationBasedOnCategory(locations, routineCategory)

		return RoutineController.add(game, {category: routineCategory, location}).then((routine) => {
			character.currentRoutine = routine
			character.currentLocation = location
			return CharacterController.add(game, character)
		})
	})
}


mongoose.connect(config.database).then(() => {
	return Game.findById(DESIGN.GAME.id)
}).then((game) => {
	game.initialize(() => {
		let promises = []
		for(var i = 0; i < familys.length; i++){
			let family = familys[i]
			promises.push(createFamilyAndCharacter(game, family))
		}
		Promise.all(promises).then(() => {
			return game.save()
		}).then(() => {
			process.exit()
		}).catch(console.log)
	})
})


// .then((locations) => {

// 		let family = {
// 			name: `LAST NAME ${kingdom.name}`,
// 			kingdom: kingdom._id
// 		}

// 		return FamilyController.add(game, family)
// 	}).then((family) => {
// 		let character = {
// 			name: `FIRST NAME ${kingdom.name}`, 
// 			kingdom: family.kingdom._id,
// 			family: family._id
// 		}

// 		return CharacterController.add(game, character)
// 	})