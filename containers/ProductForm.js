import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToCart, getForm, submitForm, clientRender, getAllProducts } from '../actions'

class ProductForm extends Component {
  static fetchData({ store, cookie, params }) {
    return store.dispatch(getForm('show', 'products', params, cookie))
  }
  componentDidMount() {
    const { 
      params,
      products,
      getAllProducts,
      serverRender, 
      clientRender, 
      getForm } = this.props

    if (serverRender) {
      clientRender()
    } else {
      getForm('show', 'products', params.id)
    }

    if (Object.keys(products)==0) {
      getAllProducts()
    }
  }
  render() {
    const { addToCart, product, products, submitForm } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '500px'
    }

    return (
      <div className='container' style={style}>
        <center><h3>{ product.name }</h3></center>
        { product.description }
        <h4>我要報名</h4>
        剩餘名額：{  product.inventory }<br/>
        人數：<input ref='quantity' type='text' defaultValue='1' />
        <button onClick={() => addToCart(product.id, parseInt(this.refs.quantity.value))}>報名</button>
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
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { addToCart, clientRender, getForm, getAllProducts }
)(ProductForm)
