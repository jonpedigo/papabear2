// Importing Node packages required for schema
const mongoose = require('mongoose')
const LOCATIONS = require('../../../../shared/design').LOCATIONS

const Schema = mongoose.Schema

// = ===============================
// Location Schema
// = ===============================

const LocationSchema = new Schema({
  name: { type: String },
  coordinates: {
    x: { type: Number },
    y: { type: Number }
  },
  kingdom: {
    type: Schema.Types.ObjectId,
    ref: 'Kingdom'
  },
  category: {
    enum: ['mine', 'field', 'lumberyard', 'barracks', 'sewers', 'tower', 'gate', 'supplyDepot', 'royalChambers', 'townCenter'],
    type: String
  },
  slots: {
    bugs: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  // only on supplyDepots
  supply: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
  },
  // only on private kingdom locations
  compromised: {
    type: Boolean,
    default: false
  },
  // only on resource locations
  deficit: {
    type: Number,
    default: 0
  },
  removed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// = ===============================
// Location ORM Methods
// = ===============================

LocationSchema.methods.allowAccess = function (candidate, cb) {

}

// ADDS: characters
// capacity, actionsavailable, description, private
LocationSchema.methods.initialize = function (state, cb) {
  this.capacity = LOCATIONS[this.name].CAPACITY
  this.actionsAvailable = LOCATIONS[this.name].ACTIONS_AVAILABLE
  this.private = LOCATIONS[this.name].PRIVATE
  this.description = LOCATIONS[this.name].DESCRIPTION

  this.slots.bugs = this.slots.bugs.map((bug) => {
    return state[bug]
  })

  this.supply = this.supply.map((item) => {
    return state[item]
  })

  this.kingdom = state[this.kingdom]

  this.characters = state['Character'].filter((character) => character.currentLocation._id == this._id || character.currentLocation == this._id )
}

// get a ...static property where its determined by how many people are currently in there

module.exports = mongoose.model('Location', LocationSchema)
