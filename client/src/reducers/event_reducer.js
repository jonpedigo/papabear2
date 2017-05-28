import { EVENT_RESULT, EVENT_ANALYZE, EVENT_CLOSE, EVENT_REVIEW, GIVE_EVENT_LOCAL_PROPS } from '../actions/types';

const INITIAL_STATE = { open: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EVENT_CLOSE:
      return { ...state, open: false }
    case EVENT_ANALYZE:
      return { ...state, open: true, mode: 'analyze', ...action.eventState }
    case EVENT_RESULT:
    	return { ...state, open: true, mode: 'result', ...action.payload.eventState }
    case EVENT_REVIEW:
      return { ...state, open: true, mode: 'review', ...action.eventState }
    case GIVE_EVENT_LOCAL_PROPS: 
      return { ...state, ...action.eventState }
  }

  return state;
}
