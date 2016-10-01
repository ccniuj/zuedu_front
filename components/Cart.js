import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Product from './Product'

export default class Cart extends Component {
  render() {
    const { products, total } = this.props

    const hasProducts = products.length > 0
    const nodes = !hasProducts ?
      <em>您尚未選購任何課程</em> :
      products.map(product =>
        <Product
          name={product.name}
          quantity={product.quantity}
          key={product.id}/>
    )

    return (
      <div>
        <h3>購物車</h3>
        <div>{nodes}</div>
        <p>Total: &#36;{total}</p>
      </div>
    )
  }
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string
}
