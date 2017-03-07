import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { getForm, submitForm, getAllProducts, getCart, clientRender, cleanAllpayForm } from '../actions'
import { getCartProducts } from '../reducers'
import OrderInfo from '../components/OrderInfo'
import CartInfo from '../components/CartInfo'
import ApplicantForm from '../components/ApplicantForm'

class OrdersForm extends Component {
  getChildContext() {
    return {
      products: this.props.products,
      orders: this.props.orders,
      submitForm: this.props.submitForm
    }
  }

  componentDidMount() {
    const { 
      params, 
      serverRender, 
      clientRender, 
      cart, 
      getAllProducts, 
      getCart, 
      getForm } = this.props

    if (serverRender) {
      clientRender()
    }
    if (cart.addedIds.length==0) {
      getAllProducts().
        then(() => getCart())
    }
    getForm(params.type, 'orders', params.id)
  }

  componentDidUpdate() {
    const {
      orders,
      cleanAllpayForm, 
      getForm } = this.props

    if (Object.keys(orders.allpay).length != 0 ) {
      new Promise((resolve, reject) => {
        document.getElementById('allpay').submit()
        resolve()
      }).
        then(() => cleanAllpayForm(), err => console.log(err)).
        then(() => browserHistory.push(`/cart/show/${orders.form.id}`), err => console.log(err)).
        then(() => getForm('show', 'orders', orders.form.id), err => console.log(err))
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    const { cart, orders,
            cart_matchable_discount_name, cart_matchable_discount_factor, total } = this.props

    let line_items = orders.form.type == 'new' 
    ? cart.form.line_items 
    : orders.form.line_items

    return (
        <OrderInfo />
    )
  }
}

OrdersForm.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired
}

OrdersForm.childContextTypes = {
  products: PropTypes.array.isRequired,
  orders: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: getCartProducts(state),
    orders: state.orders,
    total: state.orders.form.price,
    cart_matchable_discount_name: state.cart.form.matchable_discount_name,
    cart_matchable_discount_factor: state.cart.form.matchable_discount_factor,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getForm, submitForm, getAllProducts, getCart, clientRender, cleanAllpayForm }
)(OrdersForm)
