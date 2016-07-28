import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getForm, submitForm, getAllProducts, getCart, clientRender } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

class OrdersForm extends Component {
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
    getForm(params.type, 'orders', null)
  }
  componentDidUpdate() {
    if (Object.keys(this.props.orders.allpay).length != 0 ) {
      document.getElementById('allpay').submit()
    }
  }
  render() {
    const { products, orders, total, submitForm } = this.props
    const _payload = orders.allpay.payload ? orders.allpay.payload : {}

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
                submitForm(orders.form.type, 'orders', null, {
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
          信用卡測試卡號: 4311-9522-2222-2222<br/>
          信用卡測試安全碼: 222<br/>
          信用卡測試有效年月: 設定在未來時間即可<br/>
          <form id='allpay' action={orders.allpay.url} method='post' style={{display: 'none'}}>
            {
              Object.keys(_payload).map( (key, i) => {
                return <input key={i} type="text" name={key} defaultValue={_payload[key]} />
              })
            }
          </form>
        </div>
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

const mapStateToProps = (state) => {
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
