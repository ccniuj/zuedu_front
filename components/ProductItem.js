import React, { Component, PropTypes } from 'react'
import Product from './Product'
import { Link } from 'react-router'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <div className="product-item-white">
        <Link to={`/products/${product.id}`}>
          <div className=' product-item-back'>
            <div className='row product-item product-item-back'>
              <div className='col-sm-8 col-xs-12 product-item-img'>
                <img src={product.cover_image_url} style={{width: '100%'}} />
              </div>
              <div className='col-sm-3 col-xs-12 product-item-title'>
                    <h1 className="white">{product.name}</h1>
              </div>
            </div>
          </div> 
          <div className="row">
            <div className='col-sm-3 col-xs-12 product-item-descipt' >
              <span dangerouslySetInnerHTML={{__html: product.subtitle}}/>
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
