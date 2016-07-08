import {
  LOGIN_REQUEST
} from '../constants/ActionTypes'

const initialState = {
  user_id: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { user_id: action.user_id }
    default:
      return initialState
  }
}
