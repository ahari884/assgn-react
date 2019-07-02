import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case types.LOGIN_ERROR:
      return Object.assign({}, state, state);
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}
