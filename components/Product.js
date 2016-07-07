import React, { Component, PropTypes } from 'react'

export default class Product extends Component {
  render() {
    const { price, quantity, name } = this.props
    return <div> {name} - &#36;{price} {quantity ? `x ${quantity}` : null} </div>
  }
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  name: PropTypes.string
}
