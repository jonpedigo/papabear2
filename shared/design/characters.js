var CHARACTERS = {}

function enemyTeam(event, player, character){
	if(player.kingdom._id === character.kingdom._id && !character.dead) return event
	else return false
}

function sameTeam(event, player, character){
	if(player.kingdom._id === character.kingdom._id && !character.dead) return event
	else return false
}

function isPlayer(event, player, character){
	if(player._id === characer._id) return event
	else return false
}

CHARACTERS.EVENTS = [isPlayer.bind(null, 'unequip'), enemyTeam.bind(null, 'attack'), enemyTeam.bind(null, 'senseSkill'), enemyTeam.bind(null, 'senseCharm'), 'removeBug', 'senseBug', enemyTeam.bind(null, 'plantBug'), 'record']

module.exports = CHARACTERS
