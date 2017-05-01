// Importing Node packages required for schema
const mongoose = require('mongoose')
const SKILLS = require('../../constants').SKILLS

const Schema = mongoose.Schema

// = ===============================
// Family Schema
// = ===============================

const FamilySchema = new Schema({
  name: { type: String },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  skills: SKILLS.reduce((obj, skill) => obj[skill] = {type: Number}, {}),
  removed: {
    type: Boolean
  }
}, {
  timestamps: true
})

// = ===============================
// Family ORM Methods
// = ===============================

FamilySchema.methods.createCharacter = function (cb) {

}

module.exports = mongoose.model('Family', FamilySchema)
