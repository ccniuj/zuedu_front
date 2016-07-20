import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToCart, getAllProducts, clientRender } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

class ProductsContainer extends Component {
  static fetchData({ store }) {
    return store.dispatch(getAllProducts())
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    } else {
      this.props.getAllProducts()
    }
  }
  render() {
    const { products } = this.props
    const style = {
      paddingTop: '50px'
    }
    return (
      <div className='container' style={style}>
        <ProductsList title="課程">
          {products.map(product =>
            <ProductItem
              key={product.id}
              product={product}
              onAddToCartClicked={() => this.props.addToCart(product.id)} />
          )}
        </ProductsList>
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
