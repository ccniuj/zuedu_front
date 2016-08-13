import {
  CHECK_MEMBER_LOGIN_REQUEST,
  CHECK_MEMBER_LOGIN_SUCCESS,
  CHECK_MEMBER_LOGIN_FAILURE,
  MEMBER_LOGOUT_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
  id: '',
  name: '',
  email: ''
}

export default function member(state = initialState, action) {
  switch (action.type) {
    case CHECK_MEMBER_LOGIN_SUCCESS:
      return Object.assign( {}, state, 
               { id: action.member.id, name: action.member.name, email: action.member.email }
             )
    case MEMBER_LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
