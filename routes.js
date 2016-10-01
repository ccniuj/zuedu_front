import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import About from './containers/About'
import Faq from './containers/Faq'
import Home from './components/Home'
import Dashboard from './containers/Dashboard'
import DashboardProductsContainer from './containers/DashboardProductsContainer'
import DashboardProductForm from './containers/DashboardProductForm'
import DashboardProductDetailForm from './containers/DashboardProductDetailForm'
import DashboardCartsContainer from './containers/DashboardCartsContainer'
import DashboardCartForm from './containers/DashboardCartForm'
import DashboardMembersContainer from './containers/DashboardMembersContainer'
import DashboardMemberForm from './containers/DashboardMemberForm'
import DashboardOrdersContainer from './containers/DashboardOrdersContainer'
import DashboardOrderForm from './containers/DashboardOrderForm'
import DashboardApplicantsContainer from './containers/DashboardApplicantsContainer'
import DashboardApplicantForm from './containers/DashboardApplicantForm'
import DashboardDiscountsContainer from './containers/DashboardDiscountsContainer'
import DashboardDiscountForm from './containers/DashboardDiscountForm'
import ProductsContainer from './containers/ProductsContainer'
import ProductForm from './containers/ProductForm'
import CartContainer from './containers/CartContainer'
import OrdersContainer from './containers/OrdersContainer'
import OrdersForm from './containers/OrdersForm'
import LoginContainer from './containers/LoginContainer'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About} />
      <Route path='/faq' component={Faq} />
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
      <Route path='/dashboard/product_details/:type(/:id)' component={DashboardProductDetailForm} />
      <Route path='/dashboard/carts' component={DashboardCartsContainer} />
      <Route path='/dashboard/carts/:type(/:id)' component={DashboardCartForm} />
      <Route path='/dashboard/members' component={DashboardMembersContainer} />
      <Route path='/dashboard/members/:type(/:id)' component={DashboardMemberForm} />
      <Route path='/dashboard/orders' component={DashboardOrdersContainer} />
      <Route path='/dashboard/orders/:type(/:id)' component={DashboardOrderForm} />
      <Route path='/dashboard/applicants' component={DashboardApplicantsContainer} />
      <Route path='/dashboard/applicants/:type(/:id)' component={DashboardApplicantForm} />
      <Route path='/dashboard/discounts' component={DashboardDiscountsContainer} />
      <Route path='/dashboard/discounts/:type(/:id)' component={DashboardDiscountForm} />
    </Route>
  </Route>
)

