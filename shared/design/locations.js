var LOCATIONS = {}

LOCATIONS.SECONDS_PER_GRID = 10

function enemyTeam(r_value, player, location){
	if(player.kingdom._id !== location.kingdom._id && !location.compromised) return r_value
	else return false
}

function sameTeam(r_value, player, location){
	if(player.kingdom._id === location.kingdom._id || location.compromised) return r_value
	else return false
}

LOCATIONS['townCenter'] = {
	DESCRIPTION: 'A good place to chill and talk w ur team (look out for spies!)',
	FLAVOR: 'some say papa bear was here a long time ago',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), enemyTeam.bind(null, 'invade'), enemyTeam.bind(null, 'sneak')],
	PRIVATE: true,
	ACCESSIBLE: sameTeam.bind(null, true),
	X_FROM_CENTER: 0,
	Y_FROM_CENTER: 0,
}

LOCATIONS['supplyDepot'] = {
	DESCRIPTION: 'All the shit is here, craft items, get equipment',
	FLAVOR: 'papa bear smells something cooking!',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), enemyTeam.bind(null, 'invade'),  sameTeam.bind(null, 'craft'), sameTeam.bind(null, 'equip'), enemyTeam.bind(null, 'sneak'), , enemyTeam.bind(null, 'steal')],
	PRIVATE: true,
	ACCESSIBLE: sameTeam.bind(null, true),
	X_FROM_CENTER: 1,
	Y_FROM_CENTER: 1
}

LOCATIONS['gate'] = {
	DESCRIPTION: 'All the shit is here, craft items, get equipment',
	FLAVOR: 'papa bear smells something cooking!',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard'), enemyTeam.bind(null, 'invade'), enemyTeam.bind(null, 'sneak')],
	PRIVATE: false,
	X_FROM_CENTER: 2,
	Y_FROM_CENTER: 2
}

LOCATIONS['royalChambers'] = {
	DESCRIPTION: 'Comfy! is that a nice velvet couch? (wehre the king stays)',
	FLAVOR: 'The king of men resides here',
	CAPACITY: 100,
	EVENTS: [sameTeam.bind(null, 'guard')],
	PRIVATE: true,
	ACCESSIBLE: sameTeam.bind(null, true),
	X_FROM_CENTER: -1,
	Y_FROM_CENTER: -1
}

LOCATIONS['quarry'] = {
	DESCRIPTION: 'This is where you mine ',
	FLAVOR: 'some say papa bear fell in here',
	CAPACITY: 100,
	EVENTS: ['guard', 'mine'],
	PRIVATE: false,
	X_FROM_CENTER: 5,
	Y_FROM_CENTER: 0
}

LOCATIONS['woods'] = {
	DESCRIPTION: 'Theres is where you woodcut',
	FLAVOR: 'some say papa bear LIVES here',
	CAPACITY: 100,
	EVENTS: ['guard', 'woodcut'],
	PRIVATE: false,
	X_FROM_CENTER: 0,
	Y_FROM_CENTER: 5
}

LOCATIONS['field'] = {
	DESCRIPTION: 'Theres is where you herd animals',
	FLAVOR: 'some say papa bear feeds here',
	CAPACITY: 100,
	EVENTS: ['herd'],
	PRIVATE: false,
	X_FROM_CENTER: 5,
	Y_FROM_CENTER: 5
}

LOCATIONS['barracks'] = {
	DESCRIPTION: 'Theres is where you train warfare',
	FLAVOR: 'some say papa bear wants to destroy this place',
	CAPACITY: 100,
	EVENTS: ['trainWarfare'],
	PRIVATE: true,
	ACCESSIBLE: sameTeam.bind(null, true),
	X_FROM_CENTER: 0,
	Y_FROM_CENTER: 2
}

LOCATIONS['sewers'] = {
	DESCRIPTION: 'Theres is where you train stealth',
	FLAVOR: 'some say papa bear has never seen this place',
	CAPACITY: 100,
	EVENTS: ['trainStealth'],
	PRIVATE: true,
	ACCESSIBLE: sameTeam.bind(null, true),
	X_FROM_CENTER: 1,
	Y_FROM_CENTER: 0
}

LOCATIONS['tower'] = {
	DESCRIPTION: 'Theres is where you train magic',
	FLAVOR: 'some say you can see papa bear staring up here',
	CAPACITY: 100,
	EVENTS: ['trainMagic'],
	ACCESSIBLE: sameTeam.bind(null, true),
	PRIVATE: true,
	X_FROM_CENTER: 1,
	Y_FROM_CENTER: -1
}

module.exports = LOCATIONS
