import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import Root from './containers/Root'
import { getAllProducts } from './actions'
import config from 'Config'

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)