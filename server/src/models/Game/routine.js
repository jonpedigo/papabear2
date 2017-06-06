// Importing Node packages required for schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// = ===============================
// Action Schema
// = ===============================
const RoutineSchema = new Schema({
  category: {
    enum: ['woodcut', 'mine', 'herd', 'trainWarfare', 'trainMagic', 'trainStealth', 'guard'],
    type: String
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  removed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict:false
})

// ADDS: Character
RoutineSchema.methods.initialize = function (state, cb) {
  this.location = state[this.location]
  // this.owner = state['Character'].find((character) => (character.family && character.family._id == this._id) || character.family == this._id)
}

RoutineSchema.methods.loop = function(game, character){
  switch(this.category){
    case 'woodcut':

    break;
    case 'mine':

    break;
    case 'herd':
    break;
    case 'trainWarfare':
          //add experience
    break;
    case 'trainMagic':
    break;
    case 'trainStealth':
    break;
  }
}

const Routine = mongoose.model('Routine', RoutineSchema)

// //= ===============================
// // Woodcutting Schema
// //= ===============================

// const WoodcuttingSchema = ActionSchema.extend({
//   class : {
//     type: String,
//     default : "Woodcutting"
//   }
// })

// WoodcuttingSchema.method.update = function(character, cb){

// }

// const Woodcutting = mongoose.model('Woodcutting', WoodcuttingSchema)

// //= ===============================
// // Mining Schema
// //= ===============================

// const MiningSchema = ActionSchema.extend({
//   class : {
//     type: String,
//     default : "Mining"
//   }
// })

// MiningSchema.method.update = function(character, cb){

// }

// const Mining = mongoose.model('Mining', MiningSchema)

// //= ===============================
// // Herding Schema
// //= ===============================

// const HerdingSchema = ActionSchema.extend({
//   class : {
//     type: String,
//     default : "Herding"
//   }
// })

// HerdingSchema.method.update = function(character, cb){

// }

// const Herding = mongoose.model('Herding', HerdingSchema)

// //= ===============================
// // Training Schema
// //= ===============================

// const TrainingSchema = ActionSchema.extend({
//   class : {
//     type: String,
//     default : "Training"
//   },
//   skill: {
//     type: String,
//   }
// })

// TrainingSchema.method.update = function(character, cb){

// }

// const Training = mongoose.model('Training', TrainingSchema)

// //= ===============================
// // Gurading Schema
// //= ===============================

// const GuardingSchema = ActionSchema.extend({
//   class : {
//     type: String,
//     default : "Guarding"
//   }
// })

// GuardingSchema.method.update = function(character, cb){

// }

// const Guarding = mongoose.model('Guarding', GuardingSchema)

// module.exports = {
//   Action,
//   Woodcutting,
//   Mining,
//   Herding,
//   Training,
//   Guarding
// }

module.exports = Routine
