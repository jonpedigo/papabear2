import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, EVENT_SUCCESS } from '../types'

//= ===============================
// Character actions
//= ===============================

export function attackCharacter(props) {
  const data = props;
  const url = `/character/{props.characterId}/attack`;
  return (dispatch) => {
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function senseCharacter(props) {
  const data = props;
  const url = `/character/${props.characterId}/sense/${props.category}`;
  return (dispatch) => {
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function recordCharacter(props) {
  const data = props;
  const url = `/character/${props.characterId}/record`;
  return (dispatch) => {
    postData(EVENT_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function messageCharacter(props) {
  const data = props;
  const url = `/character/${props.characterId}/message`;
  return (dispatch) => {
    postData(EVENT_SUCCESS, GAME_ERROR, true, url, dispatch, data);
    dispatch(reset('chatField'));
  };
}