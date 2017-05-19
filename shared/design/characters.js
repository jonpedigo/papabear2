var CHARACTERS = {}

function enemyTeam(action, player, character){
	if(player.kingdom._id === character.kingdom._id && !character.dead) return action
	else return false
}

function sameTeam(action, player, character){
	if(player.kingdom._id === character.kingdom._id) return action
	else return false
}

CHARACTERS.EVENTS = [enemyTeam.bind('attack'), enemyTeam.bind('sense'), 'bug', 'record']

module.exports = CHARACTERS
