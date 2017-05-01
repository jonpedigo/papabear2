// Importing Node packages required for schema
const mongoose = require('mongoose')
const KINGDOM_LOCATIONS = require('../../constants').KINGDOM_LOCATIONS

const Schema = mongoose.Schema

// = ===============================
// Team Schema
// = ===============================
const TeamSchema = new Schema({
  name: { type: String },
  characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  king: {
    equipment: {
      charm: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      },
      charm2: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    }
  },
  idleAction: {
    type: Schema.Types.ObjectId,
    ref: 'Action'
  },
  locations: KINGDOM_LOCATIONS.reduce((obj, skill) => obj[skill] = {type: Schema.Types.ObjectId, ref: 'Locaton'}, {}),
  dead: {
    type: Boolean
  },
  removed: {
    type: Boolean
  }
}, {
  timestamps: true
})

// = ===============================
// Team ORM Methods
// = ===============================

TeamSchema.methods.destroy = function (cb) {

}

module.exports = mongoose.model('Team', TeamSchema)
