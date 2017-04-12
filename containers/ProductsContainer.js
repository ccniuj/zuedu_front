import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addToCart, getAllProducts, clientRender } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'

class ProductsContainer extends Component {
  static fetchData({ store, cookie }) {
    return store.dispatch(getAllProducts(cookie))
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    } else {
      this.props.getAllProducts()
    }
    $(this.refs.products).fadeIn(500)
  }
  render() {
    const { products } = this.props
    const style = {
      paddingTop: '115px',
      minHeight: '600px'
    }
    return (
      <div className='container container-fix' style={style}>
        <div style={{ display: 'none'}} ref='products'>
          { products.map(product => <ProductItem product={product} key={product.id} />)}
        </div>
      </div>
    )
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products),
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getAllProducts, clientRender }
)(ProductsContainer)
