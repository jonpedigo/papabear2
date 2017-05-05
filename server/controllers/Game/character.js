const SPEED = require('../../../shared/design/game').SPEED

const characterModel = require('../../models/Game/character')

module.exports = function () {

	const add = (game, params, cb) =>{
		characterModel.create(params).then((character) => {
			game.add(character)
			cb(null, character)
		}).catch(cb)
	}

  return {
  	add
  }
}
