import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import Dashboard from './containers/Dashboard'
import DashboardProductsContainer from './containers/DashboardProductsContainer'
import DashboardCartsContainer from './containers/DashboardCartsContainer'
import DashboardProductForm from './containers/DashboardProductForm'
import DashboardCartForm from './containers/DashboardCartForm'
import ProductsContainer from './containers/ProductsContainer'
import CartContainer from './containers/CartContainer'
import OrderContainer from './containers/OrderContainer'
import LoginContainer from './containers/LoginContainer'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/products' component={ProductsContainer} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/order" component={OrderContainer} />
      <Route path='/login' component={LoginContainer} />
    </Route>
    <Route path='/dashboard' component={Dashboard}>
      <Route path='/dashboard/products' component={DashboardProductsContainer} />
      <Route path='/dashboard/products/:type(/:id)' component={DashboardProductForm} />
      <Route path='/dashboard/carts' component={DashboardCartsContainer} />
      <Route path='/dashboard/carts/:type(/:id)' component={DashboardCartForm} />
    </Route>
  </Route>
)

