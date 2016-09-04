import {
  SUBMIT_LINE_ITEMS_FORM_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  message: '',
  timestamp: ''
}

export default function alert(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LINE_ITEMS_FORM_FAILURE:
      return Object.assign( {}, { message: action.message, timestamp: new Date().getTime() } )
    default:
      return state
  }
}
