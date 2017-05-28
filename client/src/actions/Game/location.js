import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'
import { analyzeEvent } from './eventPopup'
//= ===============================
// Location actions
//= ===============================

export function sneakThroughLocation(props) {
  const data = props;
  const url = `/location/${props.locationId}/sneak`;
  return (dispatch) => {
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}
	
//item and location id
export function stealFromLocation(props, analysis = true) {
  const data = props;
  const url = `/location/${props.locationId}/steal/${props.itemId}`;
  return (dispatch) => {
  	if(analysis) return dispatch(analyzeEvent(props))
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function invadeLocation(props, analysis = true) {
  const data = props;
  const url = `/location/${props.locationId}/invade`;
  return (dispatch) => {
  	if(analysis) return dispatch(analyzeEvent(prop))
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function travelToLocation({location: { _id: locationId } }) {
  let data = {}
  const url = `/location/${locationId}/travel`;
  return (dispatch) => {
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function messageLocation(props) {
  const data = props;
  const url = `/location/${props.locationId}/message`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
    dispatch(reset('chatField'));
  };
}