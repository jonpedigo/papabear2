import { UPDATE_GAME, GAME_ERROR, EVENT_RESULT, SET_KINGDOM, SET_FAMILY, SET_PLAYER, SET_GAME, EVENT_SUCCESS } from '../actions/types';
import design from '../../../shared/design/game';

const INITIAL_STATE = { message: '', success: true, playerState : {}, metaState: {}, popState: {}, design };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, playerState: action.payload.playerState, metaState: action.payload.metaState }
    case GAME_ERROR:
      return { ...state, success: false, error: action.payload }
    case EVENT_RESULT:
    	return { ...state, popState: action.payload.popState }
    case EVENT_SUCCESS: 
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
