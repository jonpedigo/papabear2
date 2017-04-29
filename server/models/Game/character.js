// Importing Node packages required for schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const CharacterSchema = new Schema({
  firstName: { type : String },
  familyId : {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
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
  }
},
{
  timestamps: true
});

//= ===============================
// Character ORM Methods
//= ===============================


// Method to compare password for login
CharacterSchema.methods.allowAccess = function (candidate, cb) {


};

module.exports = mongoose.model('Character', CharacterSchema);
