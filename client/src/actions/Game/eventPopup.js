import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_OPEN, EVENT_RESULT, EVENT_ANALYZE, EVENT_CLOSE, EVENT_REVIEW, GIVE_EVENT_LOCAL_PROPS, GAME_ERROR, GAME_SUCCESS } from '../types'

//= ===============================
// Character actions
//= ===============================

export function analyzeEvent(props) {
  const data = props;
  return (dispatch) => {
    dispatch({type: EVENT_ANALYZE, eventState: data })
  }
}

export function reviewEvent(props) {
  const data = props;
  return (dispatch) => {
    dispatch({type: EVENT_REVIEW, eventState: data })
  }
}

export function giveEventLocalProps(props){
  const data = props;
  return (dispatch) => {
    dispatch({type: GIVE_EVENT_LOCAL_PROPS, eventState: data })
  }
}

export function closeEventPopup(props) {
  return (dispatch) => {
    dispatch({type: EVENT_CLOSE})
  };
}

export function openEventPopup(props) {
  return (dispatch) => {
    dispatch({type: EVENT_OPEN})
  };
}
