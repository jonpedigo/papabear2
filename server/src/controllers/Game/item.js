const ITEMS = require('../../../../shared/design/game').ITEMS
const itemModel = require('../../models/Game/item').Item

module.exports = function () {

	const add = (game, props, cb) => {
		itemModel.create(props).then((item) => {
			game.add(item)
			cb(null, item)
		}).catch(cb)
	}

	const take = (game, agent, reactant) => {

	}

  return {
  	add,
  	take,
  	drop
  }
}
