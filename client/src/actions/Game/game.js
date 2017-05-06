import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import { getData, postData, putData, deleteData } from './index';
import socket from './socket'
// Connect to socket.io server

//= ===============================
// Game actions
//= ===============================

export function startConversation({ recipient, composedMessage }) {
  const data = { composedMessage };
  const url = `/chat/new/${recipient}`;
  return (dispatch) => {
    postData(START_CONVERSATION, CHAT_ERROR, true, url, dispatch, data);

    // Clear form after message is sent
    dispatch(reset('composeMessage'));
    browserHistory.push(`/dashboard/conversation/view/${response.data.conversationId}`);
  };
}