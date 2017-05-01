// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Location Schema
// = ===============================
const LocationSchema = new Schema({
  name: { type: String },
  actionsAvailable: [ { type: String } ],
  private: { type: Boolean },
  description: { type: String },
  coordinates: {
    x: { type: Number },
    y: { type: Number }
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  category: {
    enum: ['mine', 'field', 'lumberyard', 'barracks', 'sewers', 'tower', 'gate', 'supplyDepot', 'royalChambers', 'townCenter'],
    type: String
  },
  bugs: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  capacity: {
    type: Number
  },
  // only on supplyDepots
  supply: {
    type: []
  },
  // only on private kingdom locations
  compromised: {
    type: Boolean,
    default: false
  },
  removed: {
    type: Boolean
  }
}, {
  timestamps: true
})

// = ===============================
// Location ORM Methods
// = ===============================

LocationSchema.methods.allowAccess = function (candidate, cb) {

}

// get a ...static property where its determined by how many people are currently in there

module.exports = mongoose.model('Location', LocationSchema)
