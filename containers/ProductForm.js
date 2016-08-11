import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { addToCart, getCart, getForm, submitForm, clientRender, getAllProducts } from '../actions'
import config from '../config'

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
    const { addToCart, product, cart, member, submitForm, location } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '500px'
    }
    const redirect_url = location.pathname

    return (
      <div className='container' style={style}>
        <center><h3>{ product.name }</h3></center>
        { product.description }
        {
          member.id == '' 
          ? 
            <div>
              請先登入以報名課程或繼續填寫基本資料<br />
              <a href={`${config.domain}/members/auth/facebook?redirect_url=${redirect_url}`}>
                fb登入
              </a>
            </div>
          :
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
                <button 
                  onClick={ 
                    () => addToCart(product.id, parseInt(this.refs.quantity.value)).
                            then(() => browserHistory.push(`${location.pathname}/applicants`) )
                  }>報名</button>
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
    member: state.member,
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