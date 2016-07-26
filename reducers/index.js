import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'
import orders from './orders'
import user from './user'
import dashboard from './dashboard'

export default combineReducers({
  products,
  cart,
  user,
  orders,
  dashboard,
  serverRender,
  routing
})

function serverRender(state=false, action) {
  switch (action.type) {
    case 'SET_SERVER_RENDER_FLAG_TRUE':
      return true
    case 'SET_SERVER_RENDER_FLAG_FALSE':
      return false
    default:
      return state
  }
}

function getAddedIds(state) {
  return fromCart.getAddedIds(state.cart)
}

function getQuantity(state, id) {
  return fromCart.getQuantity(state.cart, id)
}

function getProduct(state, id) {
  return fromProducts.getProduct(state.products, id)
}

export function getTotal(state) {
  return getAddedIds(state).reduce((total, id) =>
    total + getProduct(state, id).price * getQuantity(state, id),
    0
  ).toFixed(2)
}

export function getCartProducts(state) {
  return getAddedIds(state).map(id => Object.assign(
    {},
    getProduct(state, id),
    {
      quantity: getQuantity(state, id)
    }
  ))
}

