const messageModel = require('../../models/Game/message')

module.exports = function () {
	const create = (props, cb) => {
		messageModel.create(props).then((message) => {
			if(cb) cb(null, message)
			return message
		}).catch(cb)
	}

  return {
  	create
  }
}
