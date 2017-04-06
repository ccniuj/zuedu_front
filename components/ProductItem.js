import React, { Component, PropTypes } from 'react'
import Product from './Product'
import { Link } from 'react-router'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <div className=" product-item-white">
      <Link to={`/products/${product.id}`}>
      <div className=' product-item-back'></div>
      <div className='row product-item'>
        <div className='col-md-9 col-xs-12'>
          <img src={product.cover_image_url} style={{width: '100%',marginLeft:'15px'}} />
        </div>
        <div className='col-md-3 col-xs-12'>
          <div className='row'>
            <div className='col-md-12 col-xs-4 product-item-title '>
              <h1 className="white">{product.name}</h1>
            </div>
            <div className="hidden-sm" style={{height:"180px"}}></div>
            <div className='col-md-12 col-xs-8 product-item-descipt'>
              <span dangerouslySetInnerHTML={{__html: product.subtitle}}/>
            </div>
          </div>
        </div>
      </div>
      </Link>
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}
