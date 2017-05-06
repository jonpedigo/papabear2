const SPEED = require('../../../../shared/design/game').SPEED

const actionModel = require('../../models/Game/action')

module.exports = function () {

	const add = (game, props, cb) =>{
		actionModel.create(props).then((action) => {
			game.add(action)
			cb(null, action)
		}).catch(cb)
	}

  return {
  	add
  }
}
