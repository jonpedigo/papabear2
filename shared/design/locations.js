var LOCATIONS = {}

function enemyTeam(action, player, location){
	if(player.kingdom._id === location.kingdom._id && !location.compromised && location.private) return action
	else return false
}

function sameTeam(action, player, location){
	if(player.kingdom._id === location.kingdom._id) return action
	else return false
}

LOCATIONS['townCenter'] = {
	DESCRIPTION: 'A good place to chill',
	FLAVOR: 'some say papa bear was here once',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind('craft'), sameTeam.bind('equip'), enemyTeam.bind('invade'), enemyTeam.bind('sneak'), enemyTeam.bind('steal')],
	PRIVATE: true
}

module.exports = LOCATIONS
