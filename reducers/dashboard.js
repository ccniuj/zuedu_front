import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const formInitialState = {
  products: {
    type: '',
    id: 0,
    name: '',
    price: 0,
    inventory: 0,
    description: ''
  },
  carts: {
    type: '',
    id: 0,
    line_items: []
  },
}

export function list(state = [], action) {
  switch (action.type) {
    case types.GET_DASHBOARD_LIST_SUCCESS:
      return Object.assign([], action.data)
    default:
      return state
  }
}

export function form(state = {}, action) {
  switch (action.type) {
    case types.GET_DASHBOARD_NEW_FORM_SUCCESS:
      return Object.assign({}, formInitialState[action.resource], {type: 'new'})
    case types.GET_DASHBOARD_EDIT_FORM_SUCCESS:
      return Object.assign({}, action.data, {type: 'edit'})
    case types.SUBMIT_DASHBOARD_FORM_SUCCESS:
      return state
    default:
      return state
  }
}

export default combineReducers({
  list,
  form
})
