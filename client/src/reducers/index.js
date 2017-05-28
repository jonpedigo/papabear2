import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import communicationReducer from './communication_reducer';
import customerReducer from './customer_reducer';
import gameReducer from './game_reducer';
import eventReducer from './event_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  communication: communicationReducer,
  customer: customerReducer,
  game: gameReducer,
  eventState: eventReducer
});

export default rootReducer;
