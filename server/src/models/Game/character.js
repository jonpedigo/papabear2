// Importing Node packages required for schema
const mongoose = require('mongoose')
const SKILLS_LIST = require('../../../../shared/design').SKILLS.LIST

const Schema = mongoose.Schema

// = ===============================
// Character Schema
// = ===============================

//levels and such
const CharacterSchema = new Schema({
  name: { type: String },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  primary: {
    type: Boolean
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
    charms:[{
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
  experience: SKILLS_LIST.reduce((obj, skill) => obj[skill] = {type: Number, default: 0}, {}),
  dead: {
    type: Boolean,
    default: false
  },
  options : {},
  removed: {
    type: Boolean,
    default: false
  }
}, {
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

CharacterSchema.methods.initialize = function (state, cb) {
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
