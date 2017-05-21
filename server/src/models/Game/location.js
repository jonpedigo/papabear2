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
    enum: ['quarry', 'field', 'forest', 'barracks', 'sewers', 'tower', 'gate', 'supplyDepot', 'royalChambers', 'townCenter'],
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
  timestamps: true,
  strict:false
})

// = ===============================
// Location ORM Methods
// = ===============================

LocationSchema.methods.getCharacters = function (game, cb) {
  return game.state['Character'].filter((character) => character.currentLocation && character.currentLocation._id == this._id )
}

// ADDS: characters
// capacity, events, description, private
LocationSchema.methods.initialize = function (state, cb) {
  this.set('capacity', LOCATIONS[this.category].CAPACITY)
  this.set('events', LOCATIONS[this.category].EVENTS)
  this.set('private', LOCATIONS[this.category].PRIVATE)
  this.set('description', LOCATIONS[this.category].DESCRIPTION)

  this.slots.bugs = this.slots.bugs.map((bug) => {
    return state[bug]
  })

  this.supply = this.supply.map((item) => {
    return state[item]
  })

  this.kingdom = state[this.kingdom]

  // console.log(state['Character'][0].currentLocation, this._id)
  // this.set('characters', state['Character'].filter((character) => character.currentLocaton && (character.currentLocation._id == this._id) || character.currentLocation == this._id.toString() ))
}

// get a ...virtual property where its determined by how many people are currently in there

module.exports = mongoose.model('Location', LocationSchema)
