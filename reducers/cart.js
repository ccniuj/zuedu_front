import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

function addedIds(state = initialState.addedIds, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

function quantityById(state = initialState.quantityById, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId, quantity } = action
      return Object.assign({}, state, {
        [productId]: (state[productId] || 0) + quantity
      })
    default:
      return state
  }
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_CART':
      let ids = action.cart.line_items.map(item => item.product_id)
      let quatities = Object.assign({}, ...action.cart.line_items.map(item => Object.assign({}, { [item.product_id]: item.quantity })))
      return Object.assign({}, { addedIds: ids }, { quantityById: quatities })
    case CHECKOUT_REQUEST:
      return state
    case CHECKOUT_SUCCESS:
      return state
    case CHECKOUT_FAILURE:
      return state
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0
}

export function getAddedIds(state) {
  return state.addedIds
}
