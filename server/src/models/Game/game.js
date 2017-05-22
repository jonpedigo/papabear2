// Importing Node packages required for schema
const mongoose = require('mongoose')
const bluebird = require('bluebird')

const Schema = mongoose.Schema

// = ===============================
// Game Schema
// = ===============================

// state, saveInterval gameLoopInterval, nodes
const GameSchema = new Schema({
  name: { type: String },
  saveState: { type: [{
    ref: { type: String },
    loop: { type: Boolean },
    _id: false,
    value: { type: Schema.Types.ObjectId, refPath: 'saveState.ref' }
  }]},
  age: {
    ref: { type: String }
  },
  removed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict:false
})

// = ===============================
// Game ORM Methods
// = ===============================

GameSchema.methods.add = function (gameObject, options = {}, cb) {
  // how do I find collection of an object?
  let collection = gameObject.constructor.modelName
  console.log(`${collection} with id ${gameObject._id} added to game id ${this._id}`, `loop: ${options.loop}`, `category: ${gameObject.category}`, `name: ${gameObject.name}`)
  if (options.loop) {
    gameObject.loop = options.loop
    this.nodes.push(gameObject)
  }

  this.saveState.push({value: gameObject, ref: collection})

  // only do this if the game is initalized, cuz it will happen on initzation
  if (!this.initialized) return

  gameObject.initialize(this.state)
  if (this.state[collection]) this.state[collection].push(gameObject)
  else this.state[collection] = [gameObject]
  this.state[gameObject._id] = gameObject
}

GameSchema.methods.getById = function (id) {
  return this.state[id]
}

GameSchema.methods.getCollection = function (collectionName) {
  return this.state[collectionName]
}

GameSchema.methods.end = function (cb) {

}

// ADDS: saveIntervals, gameLoopInterval
GameSchema.methods.start = function (loopCallback) {
  this.saveInterval = setInterval(this.saveAll.bind(this), 60000)
  this.gameLoopInterval = setInterval(this.loop.bind(this, loopCallback), 1000)
}


// ADDS: nodes, state
GameSchema.methods.initialize = function (cb) {
  this.state = {
    Character: [],
    Kingdom: [],
    Location: [],
    Family: [],
    Routine: [],
    Item: []
  }

  // restore state from db
  this.populate('saveState.value', (err, game) => {
    if (err) console.log(err)
    // set all references on all state objects to specific objects, and map based on id and reference AKA {locations, items, actions, characters, teams}
    let state = game.saveState.reduce((map, doc) => {
      if (doc.removed) return
      // put into reference array
      if (map[doc.ref]) {
        map[doc.ref].push(doc.value)
      } else {
        map[doc.ref] = [doc.value]
      }
      // set id in map
      map[doc.value._id] = doc.value

      return map
    }, this.state)

    this.nodes = []
    // now that we have a very organized state, we can self populate all of the docs in the state so that all references match
    game.saveState.forEach((doc) => {
      // for all documents that need updating
      if (doc.loop) this.nodes.push(doc)
      doc.value.initialize(this.state)
    })

    this.initialized = true
    if (cb) cb(null, state)
  })
}

GameSchema.methods.update = function (cb) {

}

GameSchema.methods.saveAll = function (cb) {
  let savePromises = this.saveState.map((gameObject) => {
    if (!gameObject.value) return console.log('yo there was no value in one BAD', gameObject.ref)
    return gameObject.value.save()
  })

  Promise.all(savePromises).then((saveState) => {
    console.log(saveState.length + ' items saved in game ' + this.name)
    this.save((err, game) => {
      if (err) console.log(err)
      console.log(`Game ${game.name}, ${game._id} saved`)
    })
  }).catch(console.log)
}

GameSchema.methods.loop = function (cb) {
  cb(this)
}

module.exports = mongoose.model('Game', GameSchema)

// What needs updating on a loop?
// player actions.....other than that...nothing? AI? papa bear?
// player actions and NPCS essentially
// players and location because they have HP

// need to save on loop
// characters, families (EXPERIENCE)
// Locations (resource counts)

// I need to save
// everything except families because a family exists outside of the scope of a game
// All requests to server will not be sockets they will be post requests..
// From that request I can get the user, get their game, and get the game state from memory
// how do I get access to sockets?
