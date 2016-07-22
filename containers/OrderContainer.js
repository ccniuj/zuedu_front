import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllProducts, getCart, clientRender } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

class OrderContainer extends Component {
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
    if (this.props.cart.addedIds.length==0) {
      this.props.getAllProducts().
        then(() => this.props.getCart())
    }
  }
  render() {
    const { products, total } = this.props
    const style = {
      paddingTop: '50px'
    }

    return (
      <div className='container' style={style}>
        <div className='col-md-6 col-xs-6'>
          <h3>訂單</h3>
          <Cart
            products={products}
            total={total} />
          <form onSubmit={ e => {
                e.preventDefault()
                submitForm(order.type, 'orders', null, {
                  last_name: this.refs.last_name.value,
                  first_name: this.refs.first_name.value,
                  email: this.refs.email.value,
                  address: this.refs.address.value
                })
              }}
            >
            <label htmlFor='last_name'>姓</label>
            <input ref='last_name' type='text' name='last_name' placeholder='輸入姓' style={{width: '100%'}} />
            <br/>
            <br/>
            <label htmlFor='first_name'>名</label>
            <input ref='first_name' type='text' name='first_name' placeholder='輸入名' style={{width: '100%'}} />
            <br/>
            <br/>
            <label htmlFor='email'>信箱</label>
            <input ref='email' type='text' name='email' placeholder='輸入信箱' style={{width: '100%'}} />
            <br/>
            <br/>
            <label htmlFor='address'>運送地址</label>
            <input ref='address' type='text' name='address' placeholder='輸入運送地址' style={{width: '100%'}} />
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='確定' />
          </form>
        </div>
      </div>
    )
  }
}

OrderContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: getCartProducts(state),
    total: getTotal(state),
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getAllProducts, getCart, clientRender }
)(OrderContainer)
