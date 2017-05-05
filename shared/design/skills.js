//WARFARE active level includes possible equipment

const SKILLS = {
	//other stealth names - secrecy, silence, camoflauge, covert, spycraft, theivery, asassination, padfoot??? 
	LIST: ['mining', 'woodcutting', 'herding', 'spycraft', 'sorcery', 'warfare'],
	SORCERY: {
		ACTIVE_LEVEL: (skills) => {
			//idk a bebtter equeation for leveling up
			let experience = skills['sorcery']
			return Math.floor(experience/100)
		},
		LATENT_LEVEL: (experience) => {
			let experience = skills['sorcery']
			return Math.floor(experience/1000)
		}
	},
	WARFARE: {
		ACTIVE_LEVEL: (experience) => {
			let experience = skills['warfare']
			return Math.floor(experience/100)
		}
	}
}

module.exports = {
	SKILLS
}