const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const extend = require('mongoose-schema-extend')

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }
}, {
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
})

module.exports = mongoose.model('Message', MessageSchema)

const RecordSchema = MessageSchema.extend({
  Record: {
    type: Boolean,
    default: true
  },
  actors: [{
    replace: { type: String },
    value: {
      type: Schema.Types.ObjectId,
      ref: 'Character'
    }
  }],
  props: [{
    replace: { type: String },
    value: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  }],
  settings: [{
    replace: { type: String },
    value: {
      type: Schema.Types.ObjectId,
      ref: 'Location'
    }
  }]
})

module.exports = mongoose.model('Record', RecordSchema)
