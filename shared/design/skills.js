//WARFARE active level includes possible equipment

var SKILLS = {
	//other stealth names - secrecy, silence, camoflauge, covert, spycraft, theivery, asassination, padfoot??? 
	LIST: ['mining', 'woodcutting', 'herding', 'stealth', 'magic', 'warfare'],
}

SKILLS['magic'] = {
	ABILITIES: [
		'level 1 charms',
		'level 2 charms',
		'start at 8',
		'level 3 charms, level 1 wall charms',
		'level 4 charms',
		'start at 20',
		'level 5 charms, level 2 wall charms',
		'level 6 charms'
	]
}

SKILLS['stealth'] = {
	ABILITIES: [
		'sneak',
		'steal',
		'start at 8',
		'sense skills',
		'sense abilities',
		'start at 20',
		'bug',
		'start at 50'
	]
}

SKILLS['warfare'] = {
	ABILITIES: [
		'level 1 weapons',
		'level 2 weapons',
		'start at 8',
		'level 3 weapons',
		'level 4 weapons',
		'start at 20',
		'level 5 weapons',
		'level 6 weapons'
	]
}

SKILLS['herding'] = {
	ABILITIES: [
		'Cow',
		'deer',
		'start at 8',
		'horse',
		'camel idfg',
		'start at 20',
		'pegasus',
		'dragon '
	]

}

SKILLS['woodcutting'] = {
	ABILITIES: [
		'badwood',
		'goodwood',
		'start at 8',
		'greatwood',
		'ultrawood',
		'start at 20',
		'masterwood',
		'Wood of the ancients'
	]
}

SKILLS['mining'] = {
	ABILITIES: [
		'rock',
		'iron',
		'start at 8',
		'greenstone',
		'bluestone',
		'start at 20',
		'redstone',
		'agamandoon/badazite'
	]
}

SKILLS.GET_LEVEL = function(experience){
	for(var i = 0; i < this.LEVEL_CURVE.length; i++){
		if(experience < this.LEVEL_CURVE[i]) return i - 1
	}
	return i
}

SKILLS.GET_ABILITIES = function(skillName, experience){
	let abilities = []

	for(var i = 0; i < this.ABILITY_CURVE.length; i++){
		if(experience > this.ABILITY_CURVE[i]){
			abilities.push(this[skillName].ABILITIES[i])
		} 
	}

	return abilities
}

SKILLS.LEVEL_CURVE = function(){
	function equation(level){
		return (Math.pow(level, 1.8) * 100) / 2
	}

	let levels = [0]

	for(i = 1; i <= 100; i++){
		levels.push(equation(i))
	}

	return levels
}.call()

SKILLS.ABILITY_CURVE = function(){
	function equation(number){
		return (Math.pow(2, number) * (3600 * 2))
	}

	let abilities = [0] //<-- you can always use the first ability

	for(i = 1; i < 8; i++){
		abilities.push(equation(i))
	}

	return abilities
}.call()

module.exports = SKILLS