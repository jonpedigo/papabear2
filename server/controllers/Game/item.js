const ITEMS = require('../../../client/src/design').ITEMS
const itemModel = require('../../models/Game/item').Item

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) => {
		return itemModel.create(props).then((item) => {
			game.add(item)
			if(cb) cb(null, item)
			return item
		}).catch(cb)
	}

	const take = (game, agent, reactant) => {

	}

	const drop = (game, agent, reactant) => {

	}

	const craft = (game, props, player, cb) => {
		//can handle this with required: true in mongo
		if(!props.name) return cb('item needs a name in order to craft')
		if(!props.category) return cb('item needs a category')
		if(player.currentLocation.kingdom.name !== player.kingdom.name) return cb('You can only craft items for your team')
		if(player.currentLocation.category !== 'supplyDepot') return cb('You can only craft items while you are at a supply depot')
		if(!ITEMS[props.name].CRAFT_CHECK(player, player.currentLocation.supply)) return cb('You don\'t have the resources to craft this item')

		add(game, props, (err, item) => {
			if(err) return cb(err)
			player.currentLocation.supply.push(item)
		})
	}

  return {
  	add,
  	take,
  	drop,
  	craft
  }
}
