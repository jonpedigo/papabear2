const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }
}, {
  collection: 'sceneItems',
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
})


MessageSchema.methods.initialize = function(state){
  if(this.location && !this.location._id) this.location = state[this.location]
  if(this.recipient && !this.recipient._id) this.recipient = state[this.recipient]
  if(this.author && !this.author._id) this.author = state[this.author]
}

module.exports = mongoose.model('Message', MessageSchema)