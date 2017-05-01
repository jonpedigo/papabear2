// Importing Node packages required for schema
const mongoose = require('mongoose');
const SKILLS = require('../../constants').SKILLS

const Schema = mongoose.Schema;

//= ===============================
// Character Schema
//= ===============================
const CharacterSchema = new Schema({
  name: { type : String },
  familyId : {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  currentAction : {
    type: Schema.Types.ObjectId,
    ref: 'Action'
  },
  equipment : {
    charm : {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    weapon : {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  },
  damage : {
    type: Number 
  },
  logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }],
  skills : SKILLS.reduce((obj, skill) => obj[skill] = {type : Number}, {}),
  dead: {
    type: Boolean
  },
  removed: {
    type : Boolean
  }
},
{
  timestamps: true
});

//= ===============================
// Character ORM Methods
//= ===============================


// Method to compare password for login
CharacterSchema.methods.death = function (cb) {


};

module.exports = mongoose.model('Character', CharacterSchema);
