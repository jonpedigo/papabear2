import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, EVENT_ANALYZE, EVENT_CLOSE, GAME_ERROR, GAME_SUCCESS } from '../types'

//= ===============================
// Character actions
//= ===============================

export function openEventPopup(props) {
  const data = props;
  return (dispatch) => {
    dispatch({type: EVENT_ANALYZE, eventState: data })
  }
}

export function closeEventPopup(props) {
  return (dispatch) => {
    dispatch({type: EVENT_CLOSE})
  };
}