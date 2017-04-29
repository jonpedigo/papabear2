// Importing Node packages required for schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const LocationSchema = new Schema({
  name: { type : String }
  activities: {
    type: [],
  },
  private: { type : Boolean },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  supply: {
    type: [],
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  occupants: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
},
{
  timestamps: true
});

//= ===============================
// Location ORM Methods
//= ===============================


// Method to compare password for login
LocationSchema.methods.allowAccess = function (candidate, cb) {


};

module.exports = mongoose.model('Location', LocationSchema);
