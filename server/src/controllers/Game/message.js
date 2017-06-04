const messageModel = require('../../models/Game/message')

module.exports = function () {
	const create = (props, cb) => {
		// console.log("props", props)
		messageModel.create(props).then((message) => {
			if(cb) cb(null, message)
			return message
		}).catch(cb)
	}

  return {
  	create
  }
}
