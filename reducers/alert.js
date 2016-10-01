import {
  SUBMIT_LINE_ITEMS_FORM_SUCCESS,
  DELETE_LINE_ITEMS_FORM_SUCCESS,
  SUBMIT_LINE_ITEMS_FORM_FAILURE,
  SUBMIT_ORDERS_FORM_SUCCESS,
  DELETE_ORDERS_FORM_SUCCESS,
  SUBMIT_ORDERS_FORM_FAILURE,
  SUBMIT_DASHBOARD_FORM_FAILURE,
  DELETE_DASHBOARD_FORM_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
  message: '',
  alert_type: '',
  timestamp: ''
}

export default function alert(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LINE_ITEMS_FORM_SUCCESS:
    case SUBMIT_LINE_ITEMS_FORM_FAILURE:
    case DELETE_LINE_ITEMS_FORM_SUCCESS:
    case SUBMIT_ORDERS_FORM_SUCCESS:
    case SUBMIT_ORDERS_FORM_FAILURE:
    case DELETE_ORDERS_FORM_SUCCESS:
    case SUBMIT_DASHBOARD_FORM_FAILURE:
      return Object.assign( {}, { message: action.message, alert_type: action.alert_type, timestamp: new Date().getTime() } )
      break
    default:
      return state
  }
}
