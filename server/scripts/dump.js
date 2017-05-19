const mongoose = require('mongoose');mongoose.Promise = require('bluebird');
const config = require('../src/config/main');
mongoose.Promise = require('bluebird');
const bluebird = require('bluebird')

const Routine = require('../src/models/Game/routine')
const Character = require('../src/models/Game/character')
const Family = require('../src/models/Game/family')
const Item = require('../src/models/Game/item').Item
const Location = require('../src/models/Game/location')
const Kingdom = require('../src/models/Game/kingdom')
const Game = require('../src/models/Game/game')
const User = require('../src/models/user')
const Conversation = require('../src/models/conversation')
const Message = require('../src/models/message')


mongoose.connect(config.database).then(() => {
	Routine.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Character.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Family.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Item.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Location.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Kingdom.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Game.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	User.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Conversation.remove({}, function(err) { 
	   console.log('collection removed') 
	})
	Message.remove({}, function(err) { 
	   console.log('collection removed') 
	})
})