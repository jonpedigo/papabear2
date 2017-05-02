// Importing Node packages required for schema
const mongoose = require('mongoose')
const SKILLS = require('../../constants').SKILLS

const Schema = mongoose.Schema

// = ===============================
// Character Schema
// = ===============================
const CharacterSchema = new Schema({
  name: { type: String },
  familyId: {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
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
    charm: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    weapon: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    bugs: [ {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
  },
  damage: {
    type: Number
  },
  skills: SKILLS.reduce((obj, skill) => obj[skill] = {type: Number}, {}),
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
// Character ORM Methods
// = ===============================

CharacterSchema.methods.init = function (state, cb) {

  // tools.populateWithState('currentLocation', 'currentAction', ).bind(this)
  // function populatewithState(){
  //  arguments.forEach( (arg) => {
  //   if (this[arg]) this[arg] = state[this[arg]]
  // })
  // }
  // if (this.currentAction) this.currentAction = state[this.currentAction]
  // if (this.currentLocation) this.currentLocation = state.locations.find(l => this.currentLocation === l._id)
  // if (this.currentAction) this.currentAction = state.locations.find(l => this.currentAction === l._id)

}

module.exports = mongoose.model('Character', CharacterSchema)
