const CLIENT = {}

const PLAYER_STATE = function(player){
	return {
		player: {
			name: player.name,
			damage: player.damage,
			experience: player.experience,
			primary: player.primary,
			options: player.options,
			dead: player.dead,
			currentAction: {
				_id: player.currentAction._id,
			  category: player.currentAction.category,
			  location: {
			  	name : player.currentAction.location.name
			  }
			},
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
					_id: player.currentLocation.kingdom.name._id,
					name: player.currentLocation.kingdom.name
				},
				// need to remove player character
				// -- characters map
				characters: player.currentLocation.characters.filter(c => c._id !== player._id)
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
							weapon: {
								name: character.kingdom.king.slots.charm.name
							}
						},
						dead: character.dead,
						damage: character.damage,
						currentAction: {
					  	category: character.currentAction.category
						}
					}
				}),
				// end characters map --
				deficit: player.currentLocation.deficit,
				coordinates: player.currentLocation.coordinates,
				compromised: player.currentLocation.compromised
			},
			kingdom: {
				_id: player.kingdom._id,
				name: player.kingdom.name,
			  king: {
			    slots: {
			      charm: {
			      	name: player.kingdom.king.slots.charm.name
			      },
			      charm2: {
			      	name: player.kingdom.king.slots.charm2.name
			      }
			    }
			  },
			  idleAction: {
			  	_id: player.kingdom.action._id,
			  	category: player.kingdom.action.category,
			  	location: {
			  		name : player.kingdom.action.location.name
			  	}
			  }
			},
			slots: {
	      charms: player.slots.charms.map((charm) => {
	      	return {
	      		_id: charm._id,
	      		name: charm.name
	      	}
	      }),
	      weapon: {
	      	_id: player.slots.weapon._id,
	      	name: player.slots.weapon.name
	      }
			}
		}
	}
}

const META_STATE = function(game){
	return {
		locations: game['Locations'].map((loc) => {
			return {
				_id: loc._id,
				coordinates: loc.coordinates,
				distribution: loc.characters
				.reduce((map, character, index, array) => {
					if(map[character.kingdom.name]) map[character.kingdom.name]++
					else map[character.kingdom.name] = 1
					map.total++

					//if this is the last element in the array
					if(index === array.length -1){
						for(var prop of map){
							//turn into a percent
							map[prop] = map[prop]/map.total
						}
					}

					//if I just sorted everything into different arrays based on teams and then used the lengths
				}, { total: 0})
			}
		}),
		kingdoms: game['Kingdoms'].map((kingdom) => {
			return {
				_id: kingdom._id,
				name: kingdom.name,
				characterCount: kingdom.characters.length,
				dead: kingdom.dead
			}
		})
	}
}

CLIENT.PLAYER_STATE = PLAYER_STATE

CLIENT.META_STATE = META_STATE

module.exports = CLIENT