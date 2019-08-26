//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',
  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  PROTECTED_TEST = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'fetch_user';
export const ERROR_RESPONSE = 'error_reponse';

//= =====================
// Messaging Actions
//= =====================
export const FETCH_CONVERSATIONS = 'fetch_conversations',
  FETCH_RECIPIENTS = 'fetch_recipients',
  START_CONVERSATION = 'start_conversation',
  FETCH_SINGLE_CONVERSATION = 'fetch_single_conversation',
  CHAT_ERROR = 'chat_error',
  SEND_REPLY = 'send_reply';

//= =====================
// Page Actions
//= =====================
export const SEND_CONTACT_FORM = 'send_contact_form',
  STATIC_ERROR = 'static_error';

//= =====================
// Customer Actions
//= =====================
export const CREATE_CUSTOMER = 'create_customer',
  FETCH_CUSTOMER = 'fetch_customer',
  CANCEL_SUBSCRIPTION = 'cancel_subscription',
  UPDATE_BILLING = 'update_billing',
  BILLING_ERROR = 'billing_error',
  CHANGE_SUBSCRIPTION = 'change_subscription';

//= =====================
// Game Actions
//= =====================
export const UPDATE_GAME = 'update_game';
export const GAME_ERROR = 'game_error';
export const GAME_SUCCESS = 'event_success';
export const EVENT_RESULT = 'event_result';
export const EVENT_CLOSE = 'event_close';
export const EVENT_OPEN = 'event_open';
export const EVENT_ANALYZE = 'event_analyze';
export const EVENT_REVIEW = 'event_review';
export const GIVE_EVENT_LOCAL_PROPS = 'give_event_local_props';
export const SET_PLAYER = 'set_player';
export const SET_KINGDOM = 'set_kingdom';
export const SET_FAMILY = 'set_family';
export const SET_GAME = 'set_game';
