// Importing Node packages required for schema
const mongoose = require('mongoose')
const extend = require('mongoose-schema-extend')

const Schema = mongoose.Schema

// = ===============================
// Item Schema
// = ===============================
const ItemSchema = new Schema({
  name: { type: String },
  category: {
    enum: ['charm', 'weapon', 'ore', 'wood', 'animal'],
    type: String
  },
  removed: {
    type: Boolean,
    default: false
  },
  image: { type: String }
}, {
  timestamps: true
})

const Item = mongoose.model('Item', ItemSchema)

// = ===============================
// Charm Schema
// = ===============================
const CharmSchema = ItemSchema.extend({
  category: {
    type: String,
    default: 'charm'
  },
  slot: {
    type: String,
    default: 'defense'
  }
})

const Charm = mongoose.model('Charm', CharmSchema)

// = ===============================
// Weapon Schema
// = ===============================
const WeaponSchema = ItemSchema.extend({
  category: {
    type: String,
    default: 'weapon'
  },
  slot: {
    type: String,
    default: 'offense'
  }
})

const Weapon = mongoose.model('Weapon', WeaponSchema)

// = ===============================
// Bug Schema
// = ===============================
const BugSchema = ItemSchema.extend({
  category: {
    type: String,
    default: 'charm'
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  },
  slot: {
    type: String,
    default: 'defense'
  }
})

const Bug = mongoose.model('Bug', BugSchema)

module.exports = {
  Item,
  Charm,
  Weapon,
  Bug
}
