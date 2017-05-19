import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'
import { openEventPopup } from './eventPopup'

//= ===============================
// Character actions
//= ===============================

export function attackCharacter(props, analysis = true) {
  const data = props;
  const url = `/character/{props.characterId}/attack`;
  return (dispatch) => {
  	if(analysis) return dispatch(openEventPopup(props))
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function senseCharacter(props, analysis = true) {
  const data = props;
  const url = `/character/${props.characterId}/sense/${props.category}`;
  return (dispatch) => {
  	if(analysis) return dispatch(openEventPopup(props))
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function recordCharacter(props) {
  const data = props;
  const url = `/character/${props.characterId}/record`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function messageCharacter(props) {
  const data = props;
  const url = `/character/${props.characterId}/message`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
    dispatch(reset('chatField'));
  };
}