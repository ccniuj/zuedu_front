import React, { Component, PropTypes } from 'react'
import Product from './Product'
import { Link } from 'react-router'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <div className='row product-item'>
        <div className='col-xs-9'>
          <img src={product.cover_image_url} style={{width: '100%'}} />
        </div>
        <div className='col-xs-3'>
          <h2>{ product.name }</h2>
          <span dangerouslySetInnerHTML={{__html: product.subtitle}} />
          <br/>
          <br/>
          <br/>
          <br/>
          <Link style={{position: 'absolute', bottom: '0px'}} to={`/products/${product.id}`}><h4>進一步瞭解</h4></Link>
        </div>
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired
}
