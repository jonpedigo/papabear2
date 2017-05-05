const SPEED = require('../../../shared/design/game').SPEED

const familyModel = require('../../models/Game/family')

module.exports = function () {

	const add = (game, params, cb) => {
		familyModel.create(params).then((family) => {
			game.add(family)
			cb(null, family)
		}).catch(cb)
	}

  return {
  	add
  }
}
