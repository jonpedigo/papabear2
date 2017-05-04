// Importing Node packages required for schema
const mongoose = require('mongoose')
const SKILLS = require('../../../shared/design').SKILLS

const Schema = mongoose.Schema

// = ===============================
// Family Schema
// = ===============================

const FamilySchema = new Schema({
  name: { type: String },
  // just for now while families are LOCKED to teams and therefore all characters are locked to teams
  kingdom: {
    type: Schema.Types.ObjectId,
    ref: 'Kingdom'
  },
  // this is THE MOST important data to keep thats the only real part that is going to MATTER LONG TERM is the skills, and perhaps some rare items? anywyas..this is the only thing that needs to be backwards compatible
  experience: SKILLS.reduce((obj, skill) => obj[skill] = {type: Number, default: 0}, {}),
  removed: {
    type: Boolean,
    default: false
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
