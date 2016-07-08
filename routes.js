import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import ProductsContainer from './containers/ProductsContainer'
import CartContainer from './containers/CartContainer'
import LoginContainer from './containers/LoginContainer'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/products' component={ProductsContainer} />
    <Route path="/cart" component={CartContainer} />
    <Route path='/login' component={LoginContainer} />
  </Route>
)

