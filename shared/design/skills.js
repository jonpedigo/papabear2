//WARFARE active level includes possible equipment

var SKILLS = {
	//other stealth names - secrecy, silence, camoflauge, covert, spycraft, theivery, asassination, padfoot??? 
	LIST: ['mining', 'woodcutting', 'herding', 'spycraft', 'sorcery', 'warfare'],
	SORCERY: {
		ACTIVE_LEVEL: function(skills){
			//idk a bebtter equeation for leveling up
			var experience = skills['sorcery']
			return Math.floor(experience/100)
		},
		LATENT_LEVEL: function(experience){
			var experience = skills['sorcery']
			return Math.floor(experience/1000)
		}
	},
	WARFARE: {
		ACTIVE_LEVEL: function(experience){
			var experience = skills['warfare']
			return Math.floor(experience/100)
		}
	}
}

module.exports = SKILLS