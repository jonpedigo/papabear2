//IS EVERY CRAFT_CHECK THE SAME, can i just have a list of what the name of the supply is and the quantity it needs
// NO! !!! BECAUSE THE GAME MUST HOLD SECRETS, IN THESE FUNCTIONS ARE THE SECRETS TO WHAT IS ALLOWED TO HAPPEN OR NOT
// EXCEPTIONS EXCEPTIONS EXCEPTIONS ARE WHAT MAKE THIS GAME GREAT AND INTERESTING
// THE MYSTERY

// import SKILLS from './skills'

// var SKILLS = require('./skills').SKILLS

var ITEMS = {}

ITEMS['fire wizard staff'] = {
	CRAFT_CHECK: function(player, supply){
		if(player.activeLevels().sorcery < 20) return false
		if(supply.filter(function(item){ return item.name === 'fire logs' }).length < 20) return false
		return true
	},
	MODIFIER: function(attacker, defender){

	}
}


module.exports = ITEMS
