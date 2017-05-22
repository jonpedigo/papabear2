const locationModel = require('../../models/Game/location')
const LOCATIONS = require('../../../../shared/design').LOCATIONS

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) =>{
		props.coordinates = getCoordinates(game.getById(props.kingdom), props.category)
		return locationModel.create(props).then((location) => {
			game.add(location)
			if(cb) cb(null, location)
			return location
		}).catch(cb)
	}

	const getCoordinates = (kingdom, category) => {
		let coordinates = { x: null, y : null }

		let start = kingdom.coordinates
		if(kingdom.orientation.x === 'normal'){
			coordinates.x = start.x + LOCATIONS[category].X_FROM_CENTER
		}else if(kingdom.orientation.x === 'reverse'){
			coordinates.x = start.x - LOCATIONS[category].X_FROM_CENTER
		}

		if(kingdom.orientation.y === 'normal'){
			coordinates.y = start.y + LOCATIONS[category].Y_FROM_CENTER
		}else if(kingdom.orientation.y === 'reverse'){
			coordinates.y = start.y - LOCATIONS[category].Y_FROM_CENTER
		}

		return coordinates
	}

  return {
  	add
  }
}
