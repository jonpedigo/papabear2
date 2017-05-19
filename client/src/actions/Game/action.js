import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'

//= ===============================
// Character actions
//= ===============================

export function createAction(props) {
  const data = props;
  const url = `/action`;
  return (dispatch) => {
    postData(EVENT_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function startAction(props) {
  const data = props;
  const url = `/action/${props.actionId}/start`;
  return (dispatch) => {
    postData(EVENT_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function endAction(props) {
  const data = props;
  const url = `/action/${props.actionId}/end`;
  return (dispatch) => {
    postData(EVENT_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}