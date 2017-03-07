import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  RECEIVE_CART
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {},
  form: {
    line_items: []
  }
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
      const { productId } = action
      return Object.assign({}, state, {
        [productId]: (state[productId] || 0) + 1
      })
    default:
      return state
  }
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CART:
      let quantities = action.cart.line_items.reduce((res, cur) => {
         res[cur.product_id] = res[cur.product_id] ? res[cur.product_id]+1 : 1
         return res
      }, {})
      let ids = Object.keys(quantities).map(q => parseInt(q))
      console.log(ids)
      return Object.assign({}, { addedIds: ids }, { quantityById: quantities }, { form: action.cart })
    case CHECKOUT_REQUEST:
      return state
    case CHECKOUT_SUCCESS:
      return state
    case CHECKOUT_FAILURE:
      return state
    default:
      return state
  }
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0
}

export function getAddedIds(state) {
  return state.addedIds
}
