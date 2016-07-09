import { combineReducers } from 'redux'

const productInitialState = {
  form: '',
  id: 0,
  name: '',
  price: 0,
  inventory: 0,
  description: ''
}

export function product(state = productInitialState, action) {
  switch (action.type) {
    case 'GET_NEW_FORM_SUCCESS':
      return Object.assign({}, state, {form: 'new'})
    case 'GET_EDIT_FORM_SUCCESS':
      return Object.assign({}, action.product, {form: 'edit'})
    default:
      return state
  }
}

export default combineReducers({
  product
})