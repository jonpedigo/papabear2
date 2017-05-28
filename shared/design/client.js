const CLIENT = {}

const PLAYER_STATE = function(game, player){
	return {
		name: player.name,
		damage: player.damage,
		experience: player.experience,
		primary: player.primary,
		options: player.options,
		dead: player.dead,
		currentRoutine: player.currentRoutine ? {
			_id: player.currentRoutine._id,
		  category: player.currentRoutine.category,
		  location: {
		  	name : player.currentRoutine.location.name
		  } 
		} : null,
		currentLocation: {
			_id: player.currentLocation._id,
			name: player.currentLocation.name,
			category: player.currentLocation.category,
			//only has a supply if its a supply depot
			//  -- supply map
			supply: player.currentLocation.category !== 'supplyDepot' ? null : player.currentLocation.supply
			.map((item) => {
					return {
						_id: player.kingdom.king.slots.charm._id,
    				name: player.kingdom.king.slots.charm.name
					}
			}),
			// end supply map--
			kingdom: {
				_id: player.currentLocation.kingdom._id,
				name: player.currentLocation.kingdom.name
			},
			// need to remove player character
			// -- characters map
			characters: player.currentLocation.getCharacters(game).filter(c => c._id !== player._id)
			.map((character) => {
				return {
					_id: character._id,
					name: character.name,
					primary: character.primary,
					family: {
						name: character.family.name
					},
					kingdom: {
						name: character.kingdom.name
					},
					slots: {
						weapon: character.slots.weapon ? {
							name:  character.slots.weapon.name 
						} : null
					},
					dead: character.dead,
					damage: character.damage,
					currentRoutine: character.currentRoutine ? {
				  	category: character.currentRoutine.category 
					} : null
				}
			}),
			// end characters map --
			deficit: player.currentLocation.deficit,
			coordinates: player.currentLocation.coordinates,
			compromised: player.currentLocation.compromised
		},
		family: {
			name: player.family.name,
			experience: player.family.experience,
			description: player.family.description
		},
		kingdom: {
			_id: player.kingdom._id,
			name: player.kingdom.name,
		  king: {
		    slots: {
		      charm: player.kingdom.king.slots.charm ? {
		      	name: player.kingdom.king.slots.charm.name 
		      } : null,
		      charm2: player.kingdom.king.slots.charm2 ? {
		      	name: player.kingdom.king.slots.charm2.name 
		      } : null
		    }
		  },
		  routine: player.kingdom.routine ? {
		  	_id: player.kingdom.routine._id,
		  	category: player.kingdom.routine.category,
		  	location: {
		  		name : player.kingdom.routine.location.name
		  	}
		  } : null
		},
		slots: {
      charms: player.slots.charms.map((charm) => {
      	return {
      		_id: charm._id,
      		name: charm.name
      	}
      }),
      weapon: player.slots.weapon ? {
      	_id: player.slots.weapon._id,
      	name: player.slots.weapon.name
      } : null
		}
	}
}

const WORLD_STATE = function(game){
	return {
		locations: game.state['Location'].map((loc) => {
			return {
				_id: loc._id,
				coordinates: loc.coordinates,
				category: loc.category,
				name: loc.name,
				kingdom: {
					_id: loc.kingdom._id,
					name: loc.kingdom.name,
					color: loc.kingdom.color
				},
				distribution: loc.getCharacters(game)
				.reduce((map, character, index, array) => {
					if(map[character.kingdom.name]) map[character.kingdom.name]++
					else map[character.kingdom.name] = 1
					map.total++

					//if this is the last element in the array
					if(index === array.length -1){
						for(var prop in map){
							if(map.hasOwnProperty(prop)){
								//turn into a percent
								map[prop] = map[prop]/map.total	
							}
						}
					}

					return map
					//if I just sorted everything into different arrays based on teams and then used the lengths
				}, { total: 0})
			}
		}),
		kingdoms: game.state['Kingdom'].map((kingdom) => {
			return {
				_id: kingdom._id,
				name: kingdom.name,
				characterCount: kingdom.getCharacters(game).length,
				dead: kingdom.dead
			}
		})
	}
}

CLIENT.PLAYER_STATE = PLAYER_STATE

CLIENT.WORLD_STATE = WORLD_STATE

module.exports = CLIENT