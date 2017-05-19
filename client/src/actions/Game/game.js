import { reset } from 'redux-form';
import { getData, postData, putData, deleteData } from '../index';
import { EVENT_RESULT, GAME_ERROR, GAME_SUCCESS } from '../types'

//= ===============================
// Character actions
//= ===============================

export function createGame(props) {
  const data = props;
  const url = `/game`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function startGame(props) {
  const data = props;
  const url = `/game/${props.GameId}/start`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function suspendGame(props) {
  const data = props;
  const url = `/game/${props.GameId}/suspend`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}

export function endGame(props) {
  const data = props;
  const url = `/game/${props.GameId}/end`;
  return (dispatch) => {
    postData(GAME_SUCCESS, GAME_ERROR, true, url, dispatch, data);
  };
}