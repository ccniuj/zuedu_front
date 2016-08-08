import React, { Component, PropTypes } from 'react'
import Product from './Product'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <div className='col-xs-6 text-center'>
        <Product
          name={product.name}
          price={product.price} />
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired
}
