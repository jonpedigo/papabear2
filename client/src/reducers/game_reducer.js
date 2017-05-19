import { UPDATE_GAME, GAME_ERROR, EVENT_RESULT, EVENT_ANALYZE, EVENT_CLOSE, SET_KINGDOM, SET_FAMILY, SET_PLAYER, SET_GAME, GAME_SUCCESS } from '../actions/types';
import GAME from '../../../shared/design/game';
import ITEMS from '../../../shared/design/items';
import SKILLS from '../../../shared/design/skills';
import LOCATIONS from '../../../shared/design/locations';

const design = {
  GAME,
  ITEMS,
  SKILLS,
  LOCATIONS
}

const INITIAL_STATE = { message: '', success: true, playerState : null, metaState: null, eventState: { open: false }, design };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, playerState: action.playerState, metaState: action.metaState }
    case GAME_ERROR:
      return { ...state, success: false, error: action.payload }
    case GAME_SUCCESS: 
      return { ...state, message: action.payload.message }
    case EVENT_CLOSE:
      return { ...state, eventState: { open: false } }
    case EVENT_ANALYZE:
      return { ...state, eventState: action.eventState }
    case EVENT_RESULT:
    	return { ...state, open : true, eventState: action.payload.eventState }
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
