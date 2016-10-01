import React, { Component, PropTypes } from 'react'

export default class Product extends Component {
  render() {
    const { quantity, name } = this.props
    return (
      <div className='product-item'>
      </div>
    )
  }
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  name: PropTypes.string
}
