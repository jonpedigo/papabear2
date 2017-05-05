const ITEMS = require('../../../shared/design/game').ITEMS
const itemController = require('./item')

module.exports = function () {

	const craft = (game, params, player, cb) => {
		//can handle this with required: true in mongo
		if(!params.name) return cb('item needs a name in order to craft')
		if(!params.category) return cb('item needs a category')
		if(player.currentLocation.kingdom.name !== player.kingdom.name) return cb('You can only craft items for your team')
		if(player.currentLocation.category !== 'supplyDepot') return cb('You can only craft items while you are at a supply depot')
		if(!ITEMS[params.name].CRAFT_CHECK(player, player.currentLocation.supply)) return cb('You don\'t have the resources to craft this item')
		
		itemController.add(game, params, (err, item) => {
			if(err) return cb(err)
			player.currentLocation.supply.push(item)
		})
	}

  return {
  	craft
  }
}
