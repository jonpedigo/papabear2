import { UPDATE_GAME } from '../actions/types';
import design from '../../../shared/design/game';

const INITIAL_STATE = { state : { locations: [], player : {} }, design };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, state: { locations: action.game.locations, player : action.game.player } }
  }

  return state;
}
