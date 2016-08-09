import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart, getCart, getForm, submitForm, clientRender, getAllProducts } from '../actions'

class ProductForm extends Component {
  static fetchData({ store, cookie, params }) {
    return store.dispatch(getForm('show', 'products', params, cookie)).
             then(() => store.dispatch(getCart(cookie)))
  }
  
  componentDidMount() {
    const { 
      params,
      products,
      getAllProducts,
      serverRender, 
      clientRender, 
      getForm,
      getCart } = this.props

    if (serverRender) {
      clientRender()
    } else {
      getForm('show', 'products', params.id).
        then(() => getCart())
    }

    if (Object.keys(products)==0) {
      getAllProducts()
    }
  }

  render() {
    const { addToCart, product, cart, submitForm } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '500px'
    }

    return (
      <div className='container' style={style}>
        <center><h3>{ product.name }</h3></center>
        { product.description }
        {
          cart.addedIds.includes(product.id)
          ?
            <div>
              <h4>已報名{cart.quantityById[product.id]}位</h4>
              <Link to={`/products/${product.id}/applicants`}>填寫報名資料</Link>
            </div>
          :
            <div>
              <h4>我要報名</h4>
              剩餘名額：{  product.inventory }<br/>
              人數：<input ref='quantity' type='text' defaultValue='1' />
              <button onClick={() => addToCart(product.id, parseInt(this.refs.quantity.value))}>報名</button>    
            </div>
        }
      </div>
    )
  }
}

ProductForm.propTypes = {
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    product: state.products.form,
    products: state.products.byId,
    cart: state.cart,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { addToCart, clientRender, getForm, getCart, getAllProducts }
)(ProductForm)
