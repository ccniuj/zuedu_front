import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'
import orders from './orders'
import user from './user'
import member from './member'
import dashboard from './dashboard'
import alert from './alert'

export default combineReducers({
  products,
  cart,
  user,
  member,
  orders,
  dashboard,
  alert,
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

export function getCountedApplicants(state) {
  return state.cart.form.
           line_items.reduce((res, curr) => {
                        let cp_id = curr.product_detail_id
                        if (Object.keys(res).map(k => parseInt(k)).includes(cp_id)) {
                          return Object.assign({}, res,
                            {
                              [cp_id]: Object.assign({}, curr, { count: res[cp_id].count+1 })
                            }
                          )
                        } else {
                          return Object.assign({}, res,
                            {
                              [cp_id]: Object.assign({}, curr, { count: 1 })
                            })
                        }
                      }, {})
}