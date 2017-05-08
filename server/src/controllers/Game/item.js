const ITEMS = require('../../../../shared/design/game').ITEMS
const itemModel = require('../../models/Game/item').Item

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) => {
		itemModel.create(props).exec().then((item) => {
			game.add(item)
			cb(null, item)
		}).catch(cb)
	}

	const take = (game, agent, reactant) => {

	}

	const drop = (game, agent, reactant) => {

	}

  return {
  	add,
  	take,
  	drop
  }
}
