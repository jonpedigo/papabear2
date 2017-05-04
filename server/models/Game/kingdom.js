// Importing Node packages required for schema
const mongoose = require('mongoose')
const DEFAULT_KINGDOM_LOCATIONS = require('../../../shared/design').DEFAULT_KINGDOM_LOCATIONS

const Schema = mongoose.Schema

// = ===============================
// Kingdom Schema
// = ===============================
const KingdomSchema = new Schema({
  name: { type: String },

  // pb3: this is only temporary and would be switched with a character
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
  idleAction: {
    type: Schema.Types.ObjectId,
    ref: 'Action'
  },
  // im not sure a kingdom needs access to its locations?
  // locations: DEFAULT_KINGDOM_LOCATIONS.reduce((obj, skill) => obj[skill] = {type: Schema.Types.ObjectId, ref: 'Locaton'}, {}),
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
// Kingdom ORM Methods
// = ===============================

KingdomSchema.methods.destroy = function (cb) {

}

module.exports = mongoose.model('Kingdom', KingdomSchema)
