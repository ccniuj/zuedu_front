import * as types from '../constants/ActionTypes'
import { handleErrors } from './index'
import { browserHistory } from 'react-router'

export function getList(resource) {
  return dispatch => {
    fetch(`http://localhost:3000/dashboard/${resource}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(handleErrors).
      then(res => res.json()).
      then(data => dispatch({
        type: 'GET_LIST_SUCCESS',
        data
      })).
      catch(err => {
        console.log(err)
        dispatch({
          type: 'GET_EDIT_FORM_FAILURE'
        })
      })
  }
}

export function getForm(type, resource, id='') {
  return dispatch => {
    if (type=='new') {
      dispatch({
        type: 'GET_NEW_FORM_SUCCESS',
        resource
      })
    } else {
      dispatch({
        type: 'GET_EDIT_FORM_REQUEST'
      })
      fetch(`http://localhost:3000/dashboard/${resource}/${id}/edit`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).
        then(handleErrors).
        then(res => res.json()).
        then(data => {
          dispatch({
            type: 'GET_EDIT_FORM_SUCCESS',
            resource,
            data
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

export function submitForm(type, resource, id, payload) {
  return dispatch => {
    let config = {}
    if (type=='new') {
      config['path'] = `/${resource}.json`
      config['method'] = 'POST'
    } else {
      config['path'] = `/${resource}/${id}.json`
      config['method'] = 'PUT'
    }
    fetch(`http://localhost:3000/dashboard${config.path}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: config.method,
      body: JSON.stringify( { [resource]: payload } )
    }).
      then(handleErrors).
      then(() => {
        dispatch({
          type: 'SUBMIT_FORM_SUCCESS'
        })
        browserHistory.push(`/dashboard/${resource}`)
      }).
      catch(err => {
        dispatch({
          type: 'SUBMIT_FORM_FAILURE'
        })
        console.log(err)
      })
  }
}

export function deleteForm(resource, id) {
  return dispatch => {
    fetch(`http://localhost:3000/dashboard/${resource}/${id}.json`, {
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
          type: 'DELETE_FORM_SUCCESS'
        })
        dispatch(getList(resource))
        browserHistory.push(`/dashboard/${resource}`)
      }).
      catch(err => {
        dispatch({
          type: 'DELETE_FORM_FAILURE'
        })
        console.log(err)
      })
  }
}
