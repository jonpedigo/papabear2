var LOCATIONS = {}

function enemyTeam(event, player, location){
	if(player.kingdom._id === location.kingdom._id && !location.compromised && location.private) return event
	else return false
}

function sameTeam(event, player, location){
	if(player.kingdom._id === location.kingdom._id) return event
	else return false
}

LOCATIONS['townCenter'] = {
	DESCRIPTION: 'A good place to chill',
	FLAVOR: 'some say papa bear was here once',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), sameTeam.bind(null, 'craft'), sameTeam.bind(null, 'equip'), enemyTeam.bind(null, 'invade'), enemyTeam.bind(null, 'sneak'), enemyTeam.bind(null, 'steal')],
	PRIVATE: true
}

module.exports = LOCATIONS
