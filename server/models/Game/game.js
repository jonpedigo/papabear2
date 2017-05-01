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

GameSchema.methods.update = function (cb) {
  this.nodes.forEach((node) => {
    node.value.update(this.stateRef)
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

// start action
// end action

// requests neccesary
// sneak into ___
// steal item
// check levels

// plant bug

// attack person
// send troops to Location

// craft item
// equip
// give

// send chat
// store log

// go

// need to save on loop
// characters, families (EXPERIENCE)
// Locations (resource counts)

// I need to save
// everything except families because a family exists outside of the scope of a game
