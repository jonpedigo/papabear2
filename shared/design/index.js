// DESIGN GOALS
// 1. test afk design ideas (defense charms, actions)
// 2. create an MMO with manageable, exciting, and balanced stakes
// 3. facilitate feelings of loss, revenge, anger to their conclusion
// 4. make information more important than strength? logs, chat and such
// 5. learn more about how unveiling secret mechanics influences play (originally learned through papabear 1, result : its fun! sometimes feels unfair...)

const ITEMS = require('/items')
const SKILLS = require('/skills')

const DEFAULT_KINGDOM_LOCATIONS = ['mine', 'field', 'lumberyard', 'barracks', 'sewers', 'tower', 'gate', 'supplyDepot', 'royalChambers', 'townCenter']

const CLIENT_STATE = function(player){

	let clientState = {
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
	      charm: {
	      	_id: player.kingdom.king.slots.charm._id,
	      	name: player.kingdom.king.slots.charm.name
	      },
	      weapon: {
	      	_id: player.kingdom.king.slots.charm2._id,
	      	name: player.kingdom.king.slots.charm2.name
	      }
			}
		}
	}

	return clientState
}

module.exports = {
  SKILLS,
  DEFAULT_KINGDOM_LOCATIONS,
  CLIENT_STATE,
  ITEMS
}
