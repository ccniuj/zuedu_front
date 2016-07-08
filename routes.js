import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import ProductsContainer from './containers/ProductsContainer'
import CartContainer from './containers/CartContainer'

export default (
  <Route path='/' component={App}>
    <Route path='/products' component={ProductsContainer} />
    <Route path="/cart" component={CartContainer} />
  </Route>
)

