import * as types from '../constants/ActionTypes'
import { receiveProducts } from './index'

export function getAllProducts() {
  return dispatch => {
    fetch('http://localhost:3000/dashboard/products.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(res => res.json()).
      then(products => dispatch(receiveProducts(products)))
  }
}
