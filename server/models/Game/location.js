// Importing Node packages required for schema
const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');

const Schema = mongoose.Schema;

//= ===============================
// Location Schema
//= ===============================
const LocationSchema = new Schema({
  name: { type : String },
  actionsAvailable: [ { type : String } ],
  private: { type : Boolean },
  description: { type : String },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  category : {
    enum: ['mine', 'field', 'lumberyard', 'barracks', 'sewers', 'tower', 'gate', 'supplyDepot', 'royalChambers', 'townCenter'],
    type: String
  },
  supply: {
    type: [],
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  occupants: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  capacity: {
    type : Number
  },
  removed: {
    type : Boolean
  }
},
{
  timestamps: true
});

//= ===============================
// Location ORM Methods
//= ===============================

LocationSchema.methods.allowAccess = function (candidate, cb) {


};

module.exports = mongoose.model('Location', LocationSchema);
