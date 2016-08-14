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
    type: types.RECEIVE_CART,
    cart
  }
}

export function serverRender() {
  return {
    type: types.SET_SERVER_RENDER_FLAG_TRUE
  }
}

export function clientRender() {
  return {
    type: types.SET_SERVER_RENDER_FLAG_FALSE
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
      return fetch(`${config.domain}/line_items.json`, {
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

export function checkMemberLogin() {
  return dispatch => {
    dispatch({
      type: types.CHECK_MEMBER_LOGIN_REQUEST
    })
    fetch(`${config.domain}/members/get_member`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(handleErrors).
      then(res => res.json()).
      then(data => {
        if(data.member) {
          dispatch({
            type: types.CHECK_MEMBER_LOGIN_SUCCESS,
            member: data.member,
          })
        }
      }).
      catch((err) => {
        console.log(err)
        dispatch({
          type: types.CHECK_MEMBER_LOGIN_FAILURE
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

export function memberLogout() {
  return dispatch => {
    dispatch({
      type: types.MEMBER_LOGOUT_REQUEST,
    })
    fetch(`${config.domain}/members/sign_out.json`, {
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
          type: types.MEMBER_LOGOUT_SUCCESS
        })
        browserHistory.push('/')
      }).
      catch((err) => {
        console.log(err)
        dispatch({
          type: types.MEMBER_LOGOUT_FAILURE
        })
      })
  }
}

export function getList(resource, query) {
  return dispatch => {
    let url = `${config.domain}/${resource}.json`
    if (query) {
      url += '?'
      for (let key in query) {
        url += `${key}=${query[key]}&`
      }
    }

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(handleErrors).
      then(res => res.json()).
      then(data => dispatch({
        type: `GET_${resource.toUpperCase()}_LIST_SUCCESS`,
        data
      })).
      catch(err => {
        console.log(err)
        dispatch({
          type: `GET_${resource.toUpperCase()}_LIST_FAILURE`
        })
      })
  }
}

export function getForm(type, resource, id='', cookie) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (type=='new') {
        dispatch({
          type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_SUCCESS`,
          resource
        })
      } else {
        dispatch({
          type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_REQUEST`
        })

        let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        if (cookie) {
          headers['cookie'] = cookie
        }
        request.
          get(`${config.domain}/${resource}/${id}.json`).
          withCredentials().
          set(headers).
          end((err, res) => {
            if (!err) {
              let data = JSON.parse(res.text)
              dispatch({
                type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_SUCCESS`,
                resource,
                data
              })
              resolve()
            } else {
              console.log(err)
              dispatch({
                type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_FAILURE`
              })
              reject(err)
            }
          })
      }
    })
  }
}

export function submitForm(type, resource, id, payload) {
  return dispatch => {
    let fetch_config = {}
    if (type=='new') {
      fetch_config['path'] = `/${resource}.json`
      fetch_config['method'] = 'POST'
    } else {
      fetch_config['path'] = `/${resource}/${id}.json`
      fetch_config['method'] = 'PUT'
    }
    return fetch(`${config.domain}${fetch_config.path}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: fetch_config.method,
      body: JSON.stringify( { [resource]: payload } )
    }).
      then(handleErrors).
      then(res => {
        dispatch({
          type: `SUBMIT_${resource.toUpperCase()}_FORM_SUCCESS`
        })
        return res
      }).
      then(res => {
        const redirect_url = res.headers.get('Location')
        if (redirect_url) {
          dispatch(getAllpayForm(redirect_url))
        }
        return res
      }).
      catch(err => {
        dispatch({
          type: `SUBMIT_${resource.toUpperCase()}_FORM_FAILURE`
        })
        console.log(err)
      })
  }
}

export function deleteForm(resource, id) {
  return dispatch => {
    return fetch(`${config.domain}/${resource}/${id}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'DELETE'
    }).
      then(handleErrors).
      then(() => {
        dispatch({
          type: `DELETE_${resource.toUpperCase()}_FORM_SUCCESS`
        })
      }).
      catch(err => {
        dispatch({
          type: `DELETE_${resource.toUpperCase()}_FORM_FAILURE`
        })
        console.log(err)
      })
  }
}

export function getAllpayForm(redirect_url) {
  return dispatch => {
    fetch(redirect_url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(handleErrors).
      then(res => res.json()).
      then(params => {
        dispatch({
          type: types.GET_ALLPAY_FORM_SUCCESS,
          params
        })
      }).
      catch(err => {
        dispatch({
          type: types.GET_ALLPAY_FORM_FAILURE
        })
        console.log(err)
      })
  }
}

export function submitAllpayForm(params) {
  return dispatch => {
    let data_arr = []
    for (var key in params.payload) {
      data_arr.push(`${key}=${params.payload[key]}`)
    }
    let data = data_arr.join('&')
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response
}
