const characterModel = require('../../models/Game/character')

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) => {
		characterModel.create(props).then((character) => {
			console.log("ADDING", character)
			game.add(character)
			cb(null, character)
		}).catch(cb)
	}


  return {
  	add
  }
}
