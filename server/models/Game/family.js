// Importing Node packages required for schema
const mongoose = require('mongoose')
const SKILLS_LIST = require('../../../client/src/design').SKILLS.LIST

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
  description: {
    type: String
  },
  // this is THE MOST important data to keep thats the only real part that is going to MATTER LONG TERM is the skills, and perhaps some rare items? anywyas..this is the only thing that needs to be backwards compatible
  experience: SKILLS_LIST.reduce((obj, skill) => {
    obj[skill] = {type: Number, default: 0}
    return obj
  }, {}),
  removed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict:false
})

// = ===============================
// Family ORM Methods
// = ===============================

FamilySchema.methods.getCharacters = function (game, cb) {
  return game.state['Character'].filter((character) => character.family && character.family._id == this._id )
}

FamilySchema.methods.update = function(props, cb){
  Object.assign(this, props, {updated: true})
  cb(null, this)
}

// ADDS: characters
FamilySchema.methods.initialize = function(state, cb){
  this.kingdom = state[this.kingdom]
  // this.characters = state['Character'].filter((character) => (character.family && character.family._id == this._id) || character.family == this._id )
}

module.exports = mongoose.model('Family', FamilySchema)
