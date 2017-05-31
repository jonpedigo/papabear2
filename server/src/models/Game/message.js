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
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
})

module.exports = mongoose.model('Message', MessageSchema)