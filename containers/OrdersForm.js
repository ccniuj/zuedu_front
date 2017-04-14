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
        then(() => browserHistory.push(`/orders/show/${orders.form.id}`), err => console.log(err)).
        then(() => getForm('show', 'orders', orders.form.id), err => console.log(err))
    }
  }
  render() {
    const style = {
      paddingTop: '100px',
      minHeight: '600px'
    }
    const { cart, orders,cart_matchable_discount_name, cart_matchable_discount_factor, total } = this.props
    let line_items = orders.form.type == 'new' 
    ? cart.form.line_items
    : orders.form.line_items

    return (
      <div className='container' style={style}>
        <OrderInfo />
        <div className="row">
        {
          line_items.length > 0
          ? <CartInfo applicants={line_items}
                      cart_matchable_discount_name={cart_matchable_discount_name}
                      cart_matchable_discount_factor={cart_matchable_discount_factor}
                      total={total} />
          : <div/>
        }
        </div>
        <div className='col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1' style={{textAlign: 'center'}}>
          <h4><center>報名資訊</center></h4>
          <Link to={`/cart/edit/${orders.form.id}`} className='btn btn-sm btn-warning pull-right' style={{marginTop: '-35px'}}>修改</Link>
        </div>
        <div style={{ clear: 'both' }} />
        { 
          line_items.map(applicant => 
            <div key={applicant.id} className='row'>
              <div className='col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1 applicant-form'>
                <ApplicantForm
                  type='show'
                  applicant={applicant} />
              </div>
            </div>
          )
        }
      </div>
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
