import * as types from '../constants/ActionTypes'
import { handleErrors } from './index'
import { browserHistory } from 'react-router'
import config from '../config'

export function getDashboardList(resource) {
  return dispatch => {
    return fetch(`${config.domain}/dashboard/${resource}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).
      then(handleErrors).
      then(res => res.json()).
      then(data => dispatch({
        type: types.GET_DASHBOARD_LIST_SUCCESS,
        data
      })).
      catch(err => {
        console.log(err)
        dispatch({
          type: types.GET_DASHBOARD_EDIT_FORM_FAILURE
        })
      })
  }
}

export function getDashboardForm(type, resource, id='') {
  return dispatch => {
    if (type=='new') {
      dispatch({
        type: types.GET_DASHBOARD_NEW_FORM_SUCCESS,
        resource
      })
    } else {
      dispatch({
        type: types.GET_DASHBOARD_EDIT_FORM_REQUEST
      })
      return fetch(`${config.domain}/dashboard/${resource}/${id}/edit`, {
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
            type: types.GET_DASHBOARD_EDIT_FORM_SUCCESS,
            resource,
            data
          })
        }).
        catch(err => {
          console.log(err)
          dispatch({
            type: types.GET_DASHBOARD_EDIT_FORM_FAILURE
          })
        })
    }
  }
}

export function submitDashboardForm(type, resource, id, payload) {
  return dispatch => {
    let fetch_config = {}
    if (type=='new') {
      fetch_config['path'] = `/${resource}.json`
      fetch_config['method'] = 'POST'
    } else {
      fetch_config['path'] = `/${resource}/${id}.json`
      fetch_config['method'] = 'PUT'
    }
    return fetch(`${config.domain}/dashboard${fetch_config.path}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: fetch_config.method,
      body: JSON.stringify( { [resource]: payload } )
    }).
      then(handleErrors).
      then(() => {
        dispatch({
          type: types.SUBMIT_DASHBOARD_FORM_SUCCESS
        })
      }).
      catch(err => {
        dispatch({
          type: types.SUBMIT_DASHBOARD_FORM_FAILURE,
          message: err
        })
        return Promise.reject(err)
      })
  }
}

export function deleteDashboardForm(resource, id) {
  return dispatch => {
    return fetch(`${config.domain}/dashboard/${resource}/${id}.json`, {
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
          type: types.DELETE_DASHBOARD_FORM_SUCCESS
        })
      }).
      catch(err => {
        dispatch({
          type: types.DELETE_DASHBOARD_FORM_FAILURE
        })
        console.log(err)
      })
  }
}

export function notifyMember(resource, type, id) {
  console.log(id)
  return dispatch => {
    return fetch(`${config.domain}/dashboard/${resource}/${type}.json`, {
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({id})
    }).
      then(handleErrors).
      then(() => {
        dispatch({
          type: `NOTITY_${resource.toUpperCase()}_${type.toUpperCase()}_SUCCESS`
        })
      }).
      catch(err => {
        dispatch({
          type: `NOTITY_${resource.toUpperCase()}_${type.toUpperCase()}_FAILURE`
        })
        console.log(err)
      })
  }
}

export function download_csv(resource, cols, product_detail_ids) {
  return dispatch => {
    return fetch(`${config.domain}/dashboard/${resource}/download_csv`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify( { product_detail_ids, cols } )
    }).
      then(handleErrors).
      then(res => res.json())
  }
}
