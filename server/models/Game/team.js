// Importing Node packages required for schema
const mongoose = require('mongoose')
const KINGDOM_LOCATIONS = require('../../constants').KINGDOM_LOCATIONS

const Schema = mongoose.Schema

// = ===============================
// Team Schema
// = ===============================
const TeamSchema = new Schema({
  name: { type: String },
  // characterIds: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  king: {
    slots: {
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
  idleActionId: {
    type: Schema.Types.ObjectId,
    ref: 'Action'
  },
  locationCategories: KINGDOM_LOCATIONS.reduce((obj, skill) => obj[skill] = {type: Schema.Types.ObjectId, ref: 'Locaton'}, {}),
  dead: {
    type: Boolean
  },
  removed: {
    type: Boolean,
    default: false
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
