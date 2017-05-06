// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Location Schema
// = ===============================

//capacity, actionsavailable, description, private
//characters
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
  bugs: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
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

// get a ...static property where its determined by how many people are currently in there

module.exports = mongoose.model('Location', LocationSchema)
