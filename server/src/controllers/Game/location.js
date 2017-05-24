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

	const travelTo = (location, character) => {
		function reachDestination(){
			console.log(`Character ${character.name} ${character.family.name} arrived at ${location.name}:${location.coordinates.x},${location.coordinates.y} from ${character.currentLocation.name}:${character.currentLocation.coordinates.x},${character.currentLocation.coordinates.y}`)
			character.update({currentLocation: location})
		}

		let spg = LOCATIONS.SECONDS_PER_GRID
		let start = character.currentLocation.coordinates
		let end = location.coordinates

		let dif = {
			x: start.x - end.x,
			y: start.y - end.y
		}

		let distance = Math.sqrt( (dif.x * dif.x) + (dif.y * dif.y) )
		let totalTravelTime = (spg * 1000) * distance
		let gridTotal = 0

		console.log(`Character ${character.name} ${character.family.name} traveling to ${location.name}:${location.coordinates.x},${location.coordinates.y} from ${character.currentLocation.name}:${character.currentLocation.coordinates.x},${character.currentLocation.coordinates.y} will take ${totalTravelTime/1000} seconds`)

		setTimeout(reachDestination.bind(this), totalTravelTime)
	}

  return {
  	add,
  	travelTo
  }
}
