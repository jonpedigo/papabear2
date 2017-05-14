const characterModel = require('../../models/Game/character')

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	//just init into game.saveState and let the game save it for you
	const add = (game, props, cb) => {
		props.currentLocation = game.getById(props.kingdom).getLocations(game).townCenter._id
		characterModel.create(props).then((character) => {
			game.add(character)
			cb(null, character)
		}).catch(cb)
	}

  return {
  	add
  }
}
