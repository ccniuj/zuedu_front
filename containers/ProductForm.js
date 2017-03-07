import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { addToCart, getCart, getForm, submitForm, clientRender, getAllProducts } from '../actions'
import Confirm from '../components/Confirm'
import config from '../config'
import LineIt from '../lib/lineit'

class ProductForm extends Component {
  static fetchData({ store, cookie, params }) {
    return store.dispatch(getForm('show', 'products', params, cookie)).
             then(() => store.dispatch(getCart(cookie)))
  }

  constructor(props){
    super(props)
    this.addProducts = () => this._addProducts()
    this.loadFbBtn = () => this._loadFbBtn()
    this.loadLineBtn = () => this._loadLineBtn()
  }

  _addProducts() {
    const { product, addToCart, location } = this.props
    let n = parseInt(this.refs.quantity.value)
    let d = parseInt(this.refs.product_detail.value)
    let adds = Array(n).fill().map( _ => addToCart(product.id, d))

    Promise.all(adds).then(() => browserHistory.push('/cart')) 
  }

  _loadFbBtn() {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=1535205933369498";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  _loadLineBtn() {
    LineIt()
  }

  componentDidMount() {
    const { 
      params,
      products,
      getAllProducts,
      serverRender, 
      clientRender, 
      getForm,
      getCart } = this.props

    if (serverRender) {
      clientRender()
    } else {
      getForm('show', 'products', params.id).
        then(() => getCart())
    }

    if (Object.keys(products)==0) {
      getAllProducts()
    }

    this.loadFbBtn()
    this.loadLineBtn()
  }
  render() {
    const { addToCart, product, cart, member, submitForm, location } = this.props
    const style = {
      paddingTop: '50px',
      minHeight: '600px'
    }
    const redirect_url = location.pathname

    return (
      <div className='container' style={style}>
        <center><h3>{ product.name }</h3></center>
        <img className='product-cover' src={product.cover_image_url} />
        <div id="fb-root"></div>
        {
        // <div className="fb-share-button" 
        //      data-href={`${redirect_url}`} 
        //      data-layout="button" 
        //      data-size="small" 
        //      data-mobile-iframe="false">
        //   <a className="fb-xfbml-parse-ignore" 
        //      target="_blank"
        //      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">
        //     Share
        //   </a>
        // </div>
        }
        <div style={{display: 'inline-block', position: 'relative', top: '5px'}}><div className="line-it-button" 
             data-type="share-b" 
             data-lang="zh-Hant" /></div>
        <div className='row product-form-section'>
          <div className='col-xs-3'>
            <h3>為什麼要參加此課程？</h3>
          </div>
          <div className='col-xs-9'>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
        <div className='row product-form-section'>
          <div className='col-xs-3'>
            <h3>課程指標金三角</h3>
          </div>
          <div className='col-xs-9'>
            <div dangerouslySetInnerHTML={{ __html: product.dimension }} />
            <img src={product.dimension_image_url} style={{width: '100%'}} />
          </div>
        </div>
        <div className='row product-form-section'>
          <div className='col-xs-3'>
            <h3>課程大綱</h3>
          </div>
          <div className='col-xs-9'>
            <img src={product.outline_image_url} style={{width: '100%'}} />
          </div>
        </div>
        <div className='row product-form-section'>
          <div className='col-xs-3'>
            <h3>詳細資訊</h3>
          </div>
          <div className='col-xs-9'>
            <h4>適合對象</h4>
            { product.target }
            <h4>場次</h4>
            { product.product_details.map(pd => <div key={pd.id}>【{pd.description}】{pd.date_from}~{pd.date_to}</div>)}
            <h4>地點</h4>
            { product.product_details.map(pd => <div key={pd.id}>【{pd.description}】{pd.place}</div>)}
            <h4>方案</h4>
            <div dangerouslySetInnerHTML={{ __html: product.pricing }} />
          </div>
        </div>
        <div className='row product-form-section'>
          <div className='col-xs-3'>
            <h3>我要報名</h3>
          </div>
          <div className='col-xs-9'>
            {
              member.id == '' 
              ? 
                <div>
                  請先登入以報名課程或繼續填寫基本資料<br />
                  <a href={`${config.domain}/members/auth/facebook?redirect_url=${redirect_url}`}>
                    fb登入
                  </a>
                </div>
              :
                cart.addedIds.includes(product.id)
                ?
                  <div>
                    <h4>已報名{cart.quantityById[product.id]}位</h4>
                    <Link to='/cart'>填寫報名資料</Link>
                  </div>
                :
                  <div>
                    剩餘名額：{ product.inventory }<br/>
                    <select ref='product_detail'>
                      {
                        product.product_details.map(pd =>
                          <option key={pd.id} value={pd.id}>{pd.description}</option>
                        )
                      }
                    </select>&nbsp;
                    人數：<input ref='quantity' type='text' defaultValue='1' />
                    <button className="btn btn-sm btn-info" data-toggle="modal" data-target="#confirm">報名</button>
                  </div>
            }
          </div>
        </div>
        <Confirm addProducts={this.addProducts}/>
      </div>
    )
  }
}

ProductForm.propTypes = {
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    member: state.member,
    product: state.products.form,
    products: state.products.byId,
    cart: state.cart,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { addToCart, clientRender, getForm, getCart, getAllProducts }
)(ProductForm)
