// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Action Schema
// = ===============================

const RecordSchema = new Schema({
  body: {
    type: String,
    required: true
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