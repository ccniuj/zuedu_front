import * as types from '../constants/ActionTypes'
import { browserHistory } from 'react-router'
import request from 'superagent'
import config from '../config'

export function receiveProducts(products) {
  return {
    type: types.RECEIVE_PRODUCTS,
    products
  }
}

export function receiveCart(cart) {
  return {
    type: 'RECEIVE_CART',
    cart
  }
}

export function serverRender() {
  return {
    type: 'SET_SERVER_RENDER_FLAG_TRUE'
  }
}

export function clientRender() {
  return {
    type: 'SET_SERVER_RENDER_FLAG_FALSE'
  }
}

export function getAllProducts(cookie) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      if (cookie) {
        headers['cookie'] = cookie
      }
      request.
        get(`${config.domain}/products.json`).
        withCredentials().
        set(headers).
        end((err, res) => {
          if (!err) {
            let data = JSON.parse(res.text)
            dispatch(receiveProducts(data))
            resolve(receiveProducts(data))
          } else {
            reject(err)
          }
        })
    })
  }
}

export function getCart(cookie) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      if (cookie) {
        headers['cookie'] = cookie
      }
      request.
        get(`${config.domain}/carts.json`).
        withCredentials().
        set(headers).
        end((err, res) => {
          if (!err) {
            let data = JSON.parse(res.text)
            dispatch(receiveCart(data))
            resolve(receiveCart(data))
          } else {
            reject(err)
          }
        })
    })
  }
}

function addToCartUnsafe(productId) {
  return {
    type: types.ADD_TO_CART,
    productId
  }
}

export function addToCart(productId) {
  return (dispatch, getState) => {
    if (getState().products.byId[productId].inventory > 0) {
      fetch(`${config.domain}/line_items.json`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
                product_id: productId
              })
      }).
        then(res => res.json()).
        then(() => dispatch(addToCartUnsafe(productId)))
    }
  }
}

export function checkout(products) {
  return (dispatch, getState) => {
    const cart = getState().cart

    dispatch({
      type: types.CHECKOUT_REQUEST
    })
    fetch(`${config.domain}/orders/new.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(res => res.json()).
      then(() => dispatch({
        type: types.CHECKOUT_SUCCESS,
        cart
      }))
  }
}

export function login(user_id, password) {
  return dispatch => {
    dispatch({
      type: types.LOGIN_REQUEST,
      user_id,
      password
    })
    fetch(`${config.domain}/users/sign_in.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(
        {
          user: 
            {
              email: user_id,
              password: password
            }
        })
    }).
      then(handleErrors).
      then(() => {
        dispatch({
          type: types.LOGIN_SUCCESS,
          user_id
        })
        browserHistory.push('/dashboard')
      }).
      catch((err) => {
        console.log(err)
        dispatch({
          type: types.LOGIN_FAILURE
        })
      })
  }
}

export function logout() {
  return dispatch => {
    dispatch({
      type: types.LOGOUT_REQUEST,
    })
    fetch(`${config.domain}/users/sign_out.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'DELETE',
    }).
      then(handleErrors).
      then(() => {
        dispatch({
          type: types.LOGOUT_SUCCESS
        })
        browserHistory.push('/')
      }).
      catch((err) => {
        console.log(err)
        dispatch({
          type: types.LOGOUT_FAILURE
        })
      })
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response
}