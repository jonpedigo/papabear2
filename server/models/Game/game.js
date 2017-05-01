// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Game Schema
// = ===============================
const GameSchema = new Schema({
  name: { type: String },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  removed: {
    type: Boolean
  }
}, {
  timestamps: true
})

// = ===============================
// Game ORM Methods
// = ===============================

// Method to compare password for login
GameSchema.methods.destroy = function (cb) {

}

module.exports = mongoose.model('Game', GameSchema)
