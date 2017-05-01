// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Game Schema
// = ===============================
const GameSchema = new Schema({
  name: { type: String },
  state: { type: [{
    ref: { type: String },
    value: { id: Schema.Types.ObjectId, refPath: 'state.ref' }
  }]},
  nodes: { type: [{
    ref: { type: String },
    value: { id: Schema.Types.ObjectId, refPath: 'nodes.ref' }
  }]},
  lifespan: {
    ref: { type: String }
  },
  removed: {
    type: Boolean
  }
}, {
  timestamps: true
})

// = ===============================
// Game ORM Methods
// = ===============================

GameSchema.methods.addNode = function (cb) {

}

// for the controller
// GameSchema.methods.findTeamForFamily = function (cb) {
//
// }

GameSchema.methods.end = function (cb) {

}

GameSchema.methods.start = function (cb) {

}

GameSchema.methods.init = function (cb) {
  let game = {
    stateMap : {},
    onlineCharacters : {},
    sockets: {}
  }
}

GameSchema.methods.update = function (cb) {
  this.nodes.forEach((node) => {
    node.value.update(this.stateMap)
  })
}

GameSchema.methods.update = function (cb) {
  this.onlineCharacters.forEach((character) => {
    let diff = {}
    // chats/logs should be instant!
    // get game metadata (map information, kingdom destroyed)
    // get data about current location
    // get data about player
    this.sockets[character._id].emit('update_state', diff)
  })
}

GameSchema.methods.save = function (cb) {

}

GameSchema.methods.restore = function (cb) {

}

module.exports = mongoose.model('Game', GameSchema)

// What needs updating on a loop?
// player actions.....other than that...nothing? AI? papa bear?
// player actions and NPCS essentially

// need to save on loop
// characters, families (EXPERIENCE)
// Locations (resource counts)

// I need to save
// everything except families because a family exists outside of the scope of a game
// All requests to server will not be sockets they will be post requests..
// From that request I can get the user, get their game, and get the game state from memory
// how do I get access to sockets?
