const SPEED = require('../../../shared/design/game').SPEED

const actionModel = require('../../models/Game/action')

module.exports = function () {

	const add = (game, params, cb) =>{
		actionModel.create(params).then((action) => {
			game.add(action)
			cb(null, action)
		}).catch(cb)
	}

  return {
  	add
  }
}
