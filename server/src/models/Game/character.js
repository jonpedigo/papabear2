// Importing Node packages required for schema
const mongoose = require('mongoose')
const SKILLS_LIST = require('../../../../shared/design').SKILLS.LIST

const Schema = mongoose.Schema

// = ===============================
// Character Schema
// = ===============================

const CharacterSchema = new Schema({
  name: { type: String },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  primary: {
    type: Boolean
  },
  description: {
    type: String
  },
  // pb3:  need a boolean to tell if this character is the OWNER of that kingdom or just a resident
  kingdom: {
    type: Schema.Types.ObjectId,
    ref: 'Kingdom'
  },
  currentAction: {
    type: Schema.Types.ObjectId,
    ref: 'Action'
  },
  currentLocation: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  slots: {
    charms: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],
    weapon: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    bugs: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
  },
  damage: {
    type: Number,
    default: 0
  },
  experience: SKILLS_LIST.reduce((obj, skill) => {
    obj[skill] = {type: Number, default: 0}
    return obj
  }, {}),
  dead: {
    type: Boolean,
    default: false
  },
  options: {},
  removed: {
    type: Boolean,
    default: false
  }
}, {
  strict:false,
  timestamps: true
})

// = ===============================
// Character ORM Methods
// = ===============================

CharacterSchema.methods.loop = function(game){

}

CharacterSchema.methods.update = function(props, cb){
  Object.assign(this, props, {updated: true})
  cb(null, this)
}

//make this.levels a virtual and have it pull from design?? same w family
CharacterSchema.methods.initialize = function (state, cb) {
  this.kingdom = state[this.kingdom]
  this.currentLocation = state[this.currentLocation]
  this.currentAction = state[this.currentAction]
  this.family = state[this.family]
  this.slots.weapon = state[this.slots.weapon]
  this.slots.charms = this.slots.charms.map((charms) => {
    return state[charms]
  })
  this.slots.bugs = this.slots.bugs.map((bug) => {
    return state[bug]
  })
}


module.exports = mongoose.model('Character', CharacterSchema)
