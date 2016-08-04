import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
  user_id: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, { user_id: action.user_id })
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
