import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllProducts } from '../actions/dashboard'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

class DashboardProductsContainer extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    const { products } = this.props
    return (
      <div className='container'>
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

DashboardProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  getAllProducts: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products)
  }
}

export default connect(
  mapStateToProps,
  { getAllProducts }
)(DashboardProductsContainer)
