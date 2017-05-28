import { UPDATE_GAME, GAME_ERROR, SET_KINGDOM, SET_FAMILY, SET_PLAYER, SET_GAME, GAME_SUCCESS } from '../actions/types';
import GAME from '../../../shared/design/game';
import ITEMS from '../../../shared/design/items';
import SKILLS from '../../../shared/design/skills';
import LOCATIONS from '../../../shared/design/locations';
import CHARACTERS from '../../../shared/design/characters';

const design = {
  GAME,
  ITEMS,
  SKILLS,
  LOCATIONS,
  CHARACTERS
}

const INITIAL_STATE = { message: '', success: true, playerState : null, worldState: null, design };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, playerState: action.playerState, worldState: action.worldState }
    case GAME_ERROR:
      return { ...state, success: false, error: action.payload }
    case GAME_SUCCESS: 
      return { ...state, message: action.payload.message }
    case SET_KINGDOM: 
    	return {...state, kingdom: action.payload.user.kingdom }
    case SET_FAMILY: 
    	return {...state, family: action.payload.user.family }
    case SET_PLAYER: 
    	return {...state, player: action.payload.user.currentCharacter }
    case SET_GAME: 
    	return {...state, game: action.payload.user.game }
  }

  return state;
}
