import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import _ from 'lodash'
import configureStore from '../store/configureStore'
import reducer from '../reducers'
import Root from '../containers/Root'

let reduxState = {}
if (window.__REDUX_STATE__) {
  try {
    let plain = JSON.parse(decodeURI(__REDUX_STATE__))
    _.each(plain, (val, key)=> {
      reduxState[key] = val
    })
  } catch (e) {
  }
}
const store = configureStore(reduxState)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)