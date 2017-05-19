const SPEED = require('../../../../shared/design/game').SPEED

const routineModel = require('../../models/Game/routine')

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) =>{
		routineModel.create(props).exec().then((routine) => {
			game.add(routine)
			cb(null, routine)
		}).catch(cb)
	}

  return {
  	add
  }
}
