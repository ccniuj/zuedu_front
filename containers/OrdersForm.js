import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getForm, submitForm, getAllProducts, getCart, clientRender } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import OrderInfo from '../components/OrderInfo'
import ApplicantForm from '../components/ApplicantForm'

class OrdersForm extends Component {
  getChildContext() {
    return {
      products: this.props.products,
      orders: this.props.orders,
      total: this.props.total,
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
    if (Object.keys(this.props.orders.allpay).length != 0 ) {
      document.getElementById('allpay').submit()
    }
  }
  render() {
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    const { cart, orders } = this.props
    let line_items = orders.form.type == 'new' 
    ? cart.form.line_items 
    : orders.form.line_items

    return (
      <div className='container' style={style}>
        <OrderInfo />
        <div style={{ clear: 'both' }} />
        <div className='col-xs-8 col-xs-offset-2' style={{textAlign: 'center'}}>
          <h4><center>報名資訊</center></h4>
          <Link to='/cart' className='btn btn-sm btn-warning pull-right' style={{marginTop: '-35px'}}>修改</Link>
        </div>
        <div style={{ clear: 'both' }} />
        { 
          line_items.map(applicant => 
            <ApplicantForm
              key={applicant.id}
              type='show'
              applicant={applicant} />
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
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string
}

OrdersForm.childContextTypes = {
  products: PropTypes.array.isRequired,
  orders: PropTypes.object.isRequired,
  total: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: getCartProducts(state),
    orders: state.orders,
    total: getTotal(state),
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getForm, submitForm, getAllProducts, getCart, clientRender }
)(OrdersForm)
