import { UPDATE_GAME } from '../actions/types';
import design from '../../../shared/design/game';

const DEFAULT_STATE = { state : { locations: [], player : {} }, design };

export default function (default = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...default, state: { locations: action.game.locations, player : action.game.player } }
  }

  return state;
}
