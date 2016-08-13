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
import ProductForm from './containers/ProductForm'
import ApplicantsContainer from './containers/ApplicantsContainer'
import CartContainer from './containers/CartContainer'
import OrdersContainer from './containers/OrdersContainer'
import OrdersForm from './containers/OrdersForm'
import LoginContainer from './containers/LoginContainer'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/products' component={ProductsContainer} />
      <Route path="/products/:id" component={ProductForm} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/orders" component={OrdersContainer} />
      <Route path="/orders/:type(/:id)" component={OrdersForm} />
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

