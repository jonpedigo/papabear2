var LOCATIONS = {}

function enemyTeam(event, player, location){
	if(player.kingdom._id === location.kingdom._id && !location.compromised) return event
	else return false
}

function sameTeam(event, player, location){
	if(player.kingdom._id === location.kingdom._id) return event
	else return false
}

LOCATIONS['townCenter'] = {
	DESCRIPTION: 'A good place to chill and talk w ur team (look out for spies!)',
	FLAVOR: 'some say papa bear was here a long time ago',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), sameTeam.bind(null, 'craft'), sameTeam.bind(null, 'equip'), enemyTeam.bind(null, 'invade'), enemyTeam.bind(null, 'sneak'), enemyTeam.bind(null, 'steal')],
	PRIVATE: true
}

LOCATIONS['supplyDepot'] = {
	DESCRIPTION: 'All the shit is here, craft items, get equipment',
	FLAVOR: 'papa bear smells something cooking!',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), enemyTeam.bind(null, 'invade'), enemyTeam.bind(null, 'sneak')],
	PRIVATE: true
}

LOCATIONS['gate'] = {
	DESCRIPTION: 'All the shit is here, craft items, get equipment',
	FLAVOR: 'papa bear smells something cooking!',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), enemyTeam.bind(null, 'invade'), enemyTeam.bind(null, 'sneak')],
	PRIVATE: false
}

LOCATIONS['royalChambers'] = {
	DESCRIPTION: 'Comfy! is that a nice velvet couch? (wehre the king stays)',
	FLAVOR: 'The king of men resides here',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard')],
	PRIVATE: true
}

LOCATIONS['quarry'] = {
	DESCRIPTION: 'This is where you mine ',
	FLAVOR: 'some say papa bear fell in here',
	CAPACITY: 100,
	EVENTS: ['guard', 'mine'],
	PRIVATE: false
}

LOCATIONS['forest'] = {
	DESCRIPTION: 'Theres is where you woodcut',
	FLAVOR: 'some say papa bear LIVES here',
	CAPACITY: 100,
	EVENTS: ['guard', 'woodcut'],
	PRIVATE: false
}

LOCATIONS['field'] = {
	DESCRIPTION: 'Theres is where you herd animals',
	FLAVOR: 'some say papa bear feeds here',
	CAPACITY: 100,
	EVENTS: ['herd'],
	PRIVATE: false
}

LOCATIONS['barracks'] = {
	DESCRIPTION: 'Theres is where you train warfare',
	FLAVOR: 'some say papa bear wants to destroy this place',
	CAPACITY: 100,
	EVENTS: ['trainWarfare'],
	PRIVATE: false
}

LOCATIONS['sewers'] = {
	DESCRIPTION: 'Theres is where you train stealth',
	FLAVOR: 'some say papa bear has never seen this place',
	CAPACITY: 100,
	EVENTS: ['trainStealth'],
	PRIVATE: false
}

LOCATIONS['tower'] = {
	DESCRIPTION: 'Theres is where you train magic',
	FLAVOR: 'some say you can see papa bear staring up here',
	CAPACITY: 100,
	EVENTS: ['trainMagic'],
	PRIVATE: false
}

module.exports = LOCATIONS
