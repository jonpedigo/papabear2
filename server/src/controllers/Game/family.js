const familyModel = require('../../models/Game/family')
const gameController = require('../../controllers/Game/game')

module.exports = function () {

	const add = (game, props, cb) => {
		familyModel.create(props).then((family) => {
			gameController.findKingdomForFamily(game, family)
			game.add(family)
			cb(null, family)
		}).catch(cb)
	}

	const canAddCharacter = (game, family) => {
		let characterCount = family.kingdom.characters.length
		let familyKingdom = family.kingdom

		let otherKingdoms = game.getCollecton('Kingdom').filter((kingdom) => { !kingdom.dead && kingdom._id !== familyKingdom._id })	
		let withMoreCharacters = otherKingdoms.filter((kingdom) => kingdom.characters.length >= characterCount ).length

		//has to be one of the kingdoms w the least population /bottom 50%
		if(withMoreCharacters >= (otherKingdoms.length/2) ) return true
	}

	const findKingdom = (game, family) => {
		let kingdoms = game.getCollecton('Kingdom')
		
		let averagePopulation = kingdoms.reduce((prev, kingdom) => {
			return prev+ kingdom.characters.length
		}, 0)/kingdoms.length

		let possibleKingdoms = kingdoms.filter((kingdom) => !kingdom.dead && kingdom.characters.length <= averagePopulation)

		let randomIndex =  Math.floor(Math.random() * possibleKingdoms.length)
		
		return possibleKingdoms[randomIndex]
	}

  return {
  	add,
  	findKingdom,
  	canAddCharacter
  }
}
