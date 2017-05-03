module.exports = function () {

	const importValue = (source, value) => {
		let result = {}

		if(value.indexOf('.') >== -1){
			let nestedValues = value.split('.')
			let first = nestedValues.unshift()

			if(Array.isArray(source[first])){
				let result[first] = source[first].map( (sourceItem) => {
					return importValue(sourceItem[first], nestedValues)
				})
			}else{
				result[first] = importValue(source[first], nestedValues)
			}
		}else{
			result[value] = source[value]
		}

		return result
	}

	const importValues = (source, values) => {
		let values = values.split(' ')
		let result = {}
		values.forEach((value) => {
			Object.assign(result, importValue(source, value)}
		})
		return result
	}

	const buildClientState = (id, player) => {
		let game = games[id]

		///I could just map the arrays in there with literally just like

		// locations.map((old){
		// 	let locaton = {}
		//	location.name = old.name
		// })

		// let clientState = {
		// 	player: {
		// 		currentLocation: {
		// 			_id: player.currentLocation._id,
		// 			name: player.currentLocation.name
		// 		},
		// 		team: {
		// 			name: player.team.name
		// 		  king: {
		// 		    slots: {
		// 		      charm: {
		// 		      	_id: player.team.king.slots.charm._id
		// 		      	name: player.team.king.slots.charm.name
		// 		      },
		// 		      charm2: {
		// 		      	_id: player.team.king.slots.charm2._id
		// 		      	name: player.team.king.slots.charm2.name
		// 		      }
		// 		    }
		// 		  },
		// 		  action: {
		// 		  	location: {
		// 		  		name : player.team.action.location.name
		// 		  	}
		// 		  	category: player.team.action.category
		// 		  }
		// 		}
		// 	}
		// }

		return clientState
	}

  return {
    games: []
  }
}
