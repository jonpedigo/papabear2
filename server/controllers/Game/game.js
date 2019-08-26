const games = {}

let Game = require('../../models/Game/game')
let Kingdom = require('../../models/Game/kingdom')

module.exports = function () {

	const buildClientState = (game, player) => {

		let clientState = {}


		return clientState
	}

	const getGame = (id) => {
		return games[id]
	}

	const populateGames = (loopCallback) => {

		//this will need some serious re-work when the game actually is real...
		Game.find({}).then((allGames) =>{
			allGames.forEach((game) => {
				games[game._id] = game
				game.initialize((err)=> {
					if(err) console.log(err)
					//need to put this in start route
					game.start(loopCallback)
				})
			})
		})
	}

  return {
  	populateGames,
  	getGame
  }
}

	// const importValue = (source, value) => {
	// 	let result = {}

	// 	if(value.indexOf('.') >= -1){
	// 		let nestedValues = value.split('.')
	// 		let first = nestedValues.unshift()

	// 		if(Array.isArray(source[first])){
	// 			result[first] = source[first].map( (sourceItem) => {
	// 				return importValue(sourceItem[first], nestedValues)
	// 			})
	// 		}else{
	// 			result[first] = importValue(source[first], nestedValues)
	// 		}
	// 	}else{
	// 		result[value] = source[value]
	// 	}

	// 	return result
	// }

	// const importValues = (source, values) => {
	// 	values = values.split(' ')
	// 	let result = {}
	// 	values.forEach((value) => {
	// 		Object.assign(result, importValue(source, value))
	// 	})
	// 	return result
	// }
