const familyModel = require('../../models/Game/family')
const gameController = require('../../controllers/Game/game')

module.exports = function () {

	//honestly shouldnt do async here, should just set as updated
	const add = (game, props, cb) => {
		props.kingdom = findKingdom(game)._id
		familyModel.create(props).then((family) => {
			game.add(family)
			cb(null, family)
		}).catch(cb)
	}

	const canAddCharacter = (game, family) => {
		let characterCount = family.kingdom.getCharacters(game).length
		let familyKingdom = family.kingdom

		let otherKingdoms = game.getCollecton('Kingdom').filter((kingdom) => { !kingdom.dead && kingdom._id !== familyKingdom._id })	
		let withMoreCharacters = otherKingdoms.filter((kingdom) => kingdom.getCharacters(game).length >= characterCount ).length

		//has to be one of the kingdoms w the least population /bottom 50%
		if(withMoreCharacters >= (otherKingdoms.length/2) ) return true
	}

	const findKingdom = (game) => {
		let kingdoms = game.getCollection('Kingdom')
		
		let averagePopulation = kingdoms.reduce((prev, kingdom) => {
			return prev+ kingdom.getCharacters(game).length
		}, 0)/kingdoms.length

		averagePopulation = Math.ceil(averagePopulation)

		let possibleKingdoms = kingdoms.filter((kingdom) => !kingdom.dead && kingdom.getCharacters(game).length <= averagePopulation)

		let randomIndex =  Math.floor(Math.random() * possibleKingdoms.length)

		return possibleKingdoms[randomIndex]
	}

  return {
  	add,
  	findKingdom,
  	canAddCharacter
  }
}
