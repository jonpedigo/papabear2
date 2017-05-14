// DESIGN GOALS
// 1. test afk design ideas (defense charms, actions)
// 2. create an MMO with manageable, exciting, and balanced stakes
// 3. facilitate feelings of loss, revenge, anger to their conclusion
// 4. make information more important than strength? logs, chat and such
// 5. learn more about how unveiling secret mechanics influences play (originally learned through papabear 1, result : its fun! sometimes feels unfair...)

const ITEMS = require('./items')
const SKILLS = require('./skills')
const CLIENT = require('./client')
const LOCATIONS = require('./locations')

const DEFAULT_KINGDOM_LOCATIONS = ['mine', 'field', 'lumberyard', 'barracks', 'sewers', 'tower', 'gate', 'supplyDepot', 'royalChambers', 'townCenter']


console.log(CLIENT)
module.exports = {
  SKILLS: SKILLS,
  DEFAULT_KINGDOM_LOCATIONS: DEFAULT_KINGDOM_LOCATIONS,
  CLIENT: CLIENT,
  ITEMS: ITEMS,
  LOCATIONS : LOCATIONS
}
