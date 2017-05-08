const SPEED = require('../../../../shared/design/game').SPEED

const actionModel = require('../../models/Game/action')

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) =>{
		actionModel.create(props).exec().then((action) => {
			game.add(action)
			cb(null, action)
		}).catch(cb)
	}

  return {
  	add
  }
}
