import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'
import { analyzeEvent } from './eventPopup'

//= ===============================
// Character actions
//= ===============================

export function attackCharacter({category, character: { _id: characterId }}, analysis = true) {
  const data = props;
  const url = `/character/{props.characterId}/attack`;
  return (dispatch) => {
  	if(analysis) return dispatch(analyzeEvent(props))
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function senseCharacter({category, character: { _id: characterId }}, analysis = true) {
  const data = props;
  const url = `/character/${props.characterId}/sense/${props.category}`;
  return (dispatch) => {
  	if(analysis && category !== 'bug') return dispatch(analyzeEvent(props))
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