module.exports = function () {

	const importValue = (source, value) => {
		let result = {}

		if(value.indexOf('.') >= -1){
			let nestedValues = value.split('.')
			let first = nestedValues.unshift()

			if(Array.isArray(source[first])){
				result[first] = source[first].map( (sourceItem) => {
					return importValue(sourceItem[first], nestedValues)
				})
			}else{
				result[first] = importValue(source[first], nestedValues)
			}
		}else{
			result[value] = source[value]
		}

		return result
	}

	const importValues = (source, values) => {
		values = values.split(' ')
		let result = {}
		values.forEach((value) => {
			Object.assign(result, importValue(source, value))
		})
		return result
	}

	const buildClientState = (game, player) => {
		///I could just map the arrays in there with literally just like

		let clientState = {}


		return clientState
	}

  return {
    games: []
  }
}
