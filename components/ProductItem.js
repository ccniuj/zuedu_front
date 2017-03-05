import React, { Component, PropTypes } from 'react'
import Product from './Product'
import { Link } from 'react-router'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <Link to={`/products/${product.id}`}>
      <div className='row product-item'>
        <div className='col-md-9 col-xs-12'>
          <img src={product.cover_image_url} style={{width: '100%'}} />
        </div>
        <div className='col-md-3 col-xs-12'>
          <div className='row'>
            <div className='col-md-12 col-xs-4'>
              <h2>{product.name}</h2>
            </div>
            <div className='col-md-12 col-xs-8'>
              <span dangerouslySetInnerHTML={{__html: product.subtitle}} />
            </div>
          </div>
        </div>
      </div>
      </Link>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}
