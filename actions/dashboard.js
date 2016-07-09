import * as types from '../constants/ActionTypes'
import { receiveProducts, handleErrors } from './index'

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

export function getForm(type, id='') {
  return dispatch => {
    if (type=='new') {
      dispatch({
        type: 'GET_NEW_FORM_SUCCESS'
      })
    } else {
      dispatch({
        type: 'GET_EDIT_FORM_REQUEST'
      })
      fetch(`http://localhost:3000/dashboard/products/${id}/edit`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).
        then(handleErrors).
        then(res => res.json()).
        then(product => {
          dispatch({
            type: 'GET_EDIT_FORM_SUCCESS',
            product
          })
        }).
        catch(err => {
          console.log(err)
          dispatch({
            type: 'GET_EDIT_FORM_FAILURE'
          })
        })
    }
  }
}