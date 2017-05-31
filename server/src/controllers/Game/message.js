const messageModel = require('../../models/Game/message')

module.exports = function () {
	const create = (props, cb) => {
		// console.log("props", props)
		messageModel.create(props).then((message) => {
			console.log("MA", message.author._id, message.location)
			if(cb) cb(null, message)
			return message
		}).catch(cb)
	}

  return {
  	create
  }
}
