import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'
import { openEventPopup } from './eventPopup'

//= ===============================
// Item actions
//= ===============================

export function craftItem(props) {
  const data = props;
  const url = `/item`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function plantBug(props, analysis = true) {
  const data = props;
  const url = `/item/bug/${props.itemId}/plant`;
  return (dispatch) => {
  	if(analysis) return dispatch(openEventPopup(props))
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

//needs character that the bug was on
export function removeBug(props) {
  const data = props;
  const url = `/item/bug/${props.itemId}/remove`;
  return (dispatch) => {
    postData(EVENT_RESULT, GAME_ERROR, true, url, dispatch, data);
  };
}

export function equipItem(props) {
  const data = props;
  const url = `/item/${props.itemId}/equip`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function unequipItem(props) {
  const data = props;
  const url = `/item/${props.itemId}/unequip`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}