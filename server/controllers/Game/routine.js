const SPEED = require('../../../client/src/design/game').SPEED

const routineModel = require('../../models/Game/routine')

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) =>{
		return routineModel.create(props).then((routine) => {
			game.add(routine)
			if(cb) cb(null, routine)
			return routine
		}).catch(cb)
	}

  return {
  	add
  }
}
