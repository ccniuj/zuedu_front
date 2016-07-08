import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
  user_id: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return initialState
    case LOGIN_SUCCESS:
      return Object.assign({}, { user_id: action.user_id })
    default:
      return initialState
  }
}
