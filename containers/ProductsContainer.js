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
    $(this.refs.products).fadeIn(1500)
  }
  render() {
    const { products } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '500px'
    }
    return (
      <div className='container' style={style}>
        <div style={{ display: 'none' }} ref='products'>
          <center><h3>課程</h3></center>
          { 
            products.map(product =>
              <Link to={`/products/${product.id}`} key={product.id}>
                <ProductItem
                  product={product}
                  onAddToCartClicked={() => this.props.addToCart(product.id)} />
              </Link>
            )
          }
        </div>
      </div>
    )
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products),
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { addToCart, getAllProducts, clientRender }
)(ProductsContainer)
