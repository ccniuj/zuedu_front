import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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

    return (
      <div className='container' style={style}>
        <OrderInfo />
        { this.props.orders.form.line_items.map(applicant => 
          <ApplicantForm
            key={applicant.id}
            type='show'
            applicant={applicant} />
        )}
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
