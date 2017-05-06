const characterModel = require('../../models/Game/character')

module.exports = function () {

	const add = (game, props, cb) => {
		characterModel.create(props).then((character) => {
			game.add(character)
			cb(null, character)
		}).catch(cb)
	}

  return {
  	add
  }
}
