import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'

//= ===============================
// Character actions
//= ===============================

export function createRoutine({location, category}) {
  const data = {location, category}
  const url = `/routine`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data)
  };
}

export function startRoutine(props) {
  const data = props;
  const url = `/routine/${props.routineId}/start`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function endRoutine(props) {
  const data = props;
  const url = `/routine/${props.routineId}/end`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}