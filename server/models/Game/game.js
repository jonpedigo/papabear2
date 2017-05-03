// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Game Schema
// = ===============================
const GameSchema = new Schema({
  name: { type: String },
  saveState: { type: [{
    ref: { type: String },
    update: { type: Boolean },
    value: { type: Schema.Types.ObjectId, refPath: 'state.ref' }
  }]},
  lifespan: {
    ref: { type: String }
  },
  removed: {
    type: Boolean,
    default: false
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
  // restore state from db
  this.populate('saveState.value').then(game => {
    // set all references on all state objects to specific objects, and map based on id and reference AKA {locations, items, actions, characters, teams}
    let state = game.saveState.reduce((map, doc) => {
      doc.init(game.state, () => {
        // put into reference array
        if (map[doc.ref]) {
          map[doc.ref].push(doc.value)
        } else {
          map[doc.ref] = doc.value
        }
        // set id in map
        map[doc.value._id] = doc.value
      })
    }, {})

    this.stat = state
    //
  })
}

GameSchema.methods.update = function (cb) {

}

// this model should not actually send socket information out - this should only be responsible for updating the state of the game or its childrens state. move this to game schema
GameSchema.methods.update = function (cb) {

}

GameSchema.methods.save = function (cb) {

}

module.exports = mongoose.model('Game', GameSchema)

// What needs updating on a loop?
// player actions.....other than that...nothing? AI? papa bear?
// player actions and NPCS essentially
// players and location because they have HP

// need to save on loop
// characters, families (EXPERIENCE)
// Locations (resource counts)

// I need to save
// everything except families because a family exists outside of the scope of a game
// All requests to server will not be sockets they will be post requests..
// From that request I can get the user, get their game, and get the game state from memory
// how do I get access to sockets?
