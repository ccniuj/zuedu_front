import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const formInitialState = {
  products: {
    type: '',
    id: 0,
    name: '',
    subtitle: '',
    description: '',
    dimension: '',
    target: '',
    pricing: '',
    cover_image_url: '',
    outline_image_url: '',
    dimension_image_url: '',
    product_details: []
  },
  carts: {
    type: '',
    id: 0,
    line_items: []
  },
  product_details: {
    type: '',
    id: 0,
    description: '',
    date_from: '',
    date_to: '',
    time_from: '',
    time_to: '',
    price: 0,
    inventory: 0
  },
  discounts: {
    type: '',
    id: 0,
    name: '',
    discount_type: 'absolute',
    prerequisite: 0,
    factor: 0,
    date_from: '',
    date_to: ''
  }
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
