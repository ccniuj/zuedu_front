import { combineReducers } from 'redux'

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
  }
}

export function list(state = [], action) {
  switch (action.type) {
    case 'GET_LIST_SUCCESS':
      return Object.assign([], action.data)
    default:
      return state
  }
}

export function form(state = {}, action) {
  switch (action.type) {
    case 'GET_NEW_FORM_SUCCESS':
      return Object.assign({}, formInitialState[action.resource], {type: 'new'})
    case 'GET_EDIT_FORM_SUCCESS':
      return Object.assign({}, action.data, {type: 'edit'})
    case 'SUBMIT_FORM_SUCCESS':
      return state
    default:
      return state
  }
}

export default combineReducers({
  list,
  form
})
