// Importing Node packages required for schema
const mongoose = require('mongoose')
// const extend = require('mongoose-schema-extend')

const ITEMS = require('../../../client/src/design').ITEMS

const Schema = mongoose.Schema

// = ===============================
// Item Schema
// = ===============================

const ItemSchema = new Schema({
  name: { type: String },
  category: {
    enum: ['charm', 'weapon', 'bug', 'ore', 'wood', 'animal'],
    type: String
  },
  removed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict:false
})

// ADDS: flavor, slot
ItemSchema.methods.initialize = function (state, cb) {
  this.flavor = ITEMS[this.name].FLAVOR
  this.description = ITEMS[this.name].DESCRIPTION

  if (this.owner) this.owner = state[this.owner]
}

const Item = mongoose.model('Item', ItemSchema)

// // = ===============================
// // Charm Schema
// // = ===============================
// const CharmSchema = ItemSchema.extend({
//   category: {
//     type: String,
//     default: 'charm'
//   }
// })

// const Charm = mongoose.model('Charm', CharmSchema)

// // = ===============================
// // Weapon Schema
// // = ===============================
// const WeaponSchema = ItemSchema.extend({
//   category: {
//     type: String,
//     default: 'weapon'
//   }
// })

// const Weapon = mongoose.model('Weapon', WeaponSchema)

// // = ===============================
// // Bug Schema
// // = ===============================
// const BugSchema = ItemSchema.extend({
//   category: {
//     type: String,
//     default: 'bug'
//   },
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: 'Character'
//   }
// })

// const Bug = mongoose.model('Bug', BugSchema)

module.exports = {
  Item
}
