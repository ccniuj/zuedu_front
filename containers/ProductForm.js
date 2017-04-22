import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { addToCart, getCart, getForm, submitForm, clientRender, getAllProducts } from '../actions'
import Confirm from '../components/Confirm'
import config from '../config'
import LineIt from '../lib/lineit'
import Slider from 'react-slick'
import { Scrollbars} from 'react-custom-scrollbars';

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
    this.detailChange=e=>this._detailChange(e)
    this.state={
      productDetail:0,
      start:1
    }

  }

  _addProducts() {
    const { product, addToCart, location } = this.props
    let n = parseInt(this.refs.quantity.value)
    let d = product.product_details[parseInt(this.refs.product_detail.value)].id
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
  _detailChange(e){
    console.log('hi')
    console.log(this.state)
    this.setState({productDetail:e.target.value})
    
  }

  render() {
    const { addToCart, product, cart, member, submitForm, location } = this.props
    const style = {
      minHeight: '600px',

    }
    console.log(this.state.productDetail)
    const redirect_url = location.pathname
    var settings = {
      customPaging: function(i) {
        return <a><img src={`${baseUrl}/abstract0${i+1}.jpg`}/></a>
      },
      dots: true,
      arrows:false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      lazyLoad: false,
      dotsClass: "home-slick-dot slick-dots big-dots"
    };
    return (
      <div>
      <img className='product-cover' src={product.cover_image_url} />
      <div className='container container-fix' style={style}>
        
        
        {
          //<div id="fb-root"></div>
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
        /**
        <div style={{display: 'inline-block', position: 'relative', top: '5px'}}><div className="line-it-button" 
             data-type="share-b" 
             data-lang="zh-Hant" /></div>
        **/
        }
        
        <div className='row product-form-section'>
          <div className='col-xs-12 col-sm-4'>
            <h2 className="yellow-bar">為什麼要參加此課程？</h2>
          </div>
          <div className='col-xs-12 col-sm-6 lot-text'>
            <div className="space-text"dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          
        </div>
       <div>
       {
        product.slideshareUrl==""?
        <div></div>
        :<iframe src={product.slideshareUrl} width="100%" height="auto" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style={{border:'1px solid #CCC' ,borderWidth:'1px',marginBottom:'5px',maxWidth: '100%'}} allowfullscreen></iframe>
       }
          
       </div>
          {
            product.activityUrl.split(",")==""?
          <div/>
          :
           <div className='row product-form-section-blue'>
          <div className='col-xs-12 col-sm-4'>
            <h2 className="yellow-bar">活動照片</h2>
          </div>
          <div className='col-sm-6 activity-slider col-xs-12'>

            <Slider {...settings}>
            {
              product.activityUrl.split(",").map((url,index)=>{
              return <div key={index}><img src={url} alt="" style={{width:"100%"}}/></div>})
            }
            </Slider>   
          </div>
          </div>
        }
        
        <div className='row product-form-section'>
          <div className='col-xs-12 col-sm-4'>
            <h2 className="yellow-bar">課程指標金三角</h2>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <div dangerouslySetInnerHTML={{ __html: product.dimension }} />
          </div>
        </div>
        
            {
              product.dimension_image_url.split(",").length == 2?
              <div className='row product-form-section'>
              <img className="col-sm-6 col-sm-offset-1 col-xs-12" src={product.dimension_image_url.split(",")[1]}  />
              <img className="col-sm-4 dimension-url col-xs-12" src={product.dimension_image_url.split(",")[0]}  />
              </div>
              :
              product.dimension_image_url.split(",").length == 1?
              <div className='row product-form-section'>
              <div className="col-sm-6 col-sm-offset-1 col-xs-12" />Warning: getInitialState was defined on Scrollbars, a plain 
              <img className="col-sm-4 dimension-url col-xs-12" src={product.dimension_image_url.split(",")[0]}  />
              </div>
              :
              <div/>
            }
          
        <div className='row product-form-section-blue' >
          <div className='col-xs-12 col-sm-4'>
            <h2 className="yellow-bar">課程大綱</h2>
          </div>
          <div className='col-xs-12 col-sm-7' 
          onTouchStart={
            ()=>{
              console.log(this.state.start)
              if(this.state.start==1){
                this.refs.scroll.scrollLeft(250)
                this.setState({
                  start:this.state.start+1
                })
              }
              else if(this.state.start>5){
                this.setState({
                  start:1
                })
              }
              else{
                this.setState({
                  start:this.state.start+1
                })
              }
              
              }
            }
            >
            <Scrollbars  style={{ minHeight: 500 }} autoHide={false}  ref="scroll">
              <img src={product.outline_image_url} style={{width: 'auto',maxHeight:'520px'}} />
            </Scrollbars>
              

          </div>
        </div>
        <div className='row product-form-section'>
          <div className='col-xs-12 col-sm-4'>
            <h2 className="yellow-bar">詳細資訊</h2>
          </div>
          <div className='col-xs-12 col-sm-7'>
            <h4>適合對象</h4>
            <div className="row"><div className="col-xs-11 col-xs-offset-1" >{ product.target }</div></div>
            
            <h4>場次</h4>
            { product.product_details.map(pd => <div className="row"><div className="col-xs-11 col-xs-offset-1" key={pd.id}>【{pd.description}】{pd.date_from}~{pd.date_to}</div></div>)}
            <h4>地點</h4>
            { product.product_details.map(pd => <div className="row"><div className="col-xs-11 col-xs-offset-1" key={pd.id}>【{pd.description}】{pd.place}</div></div>)}
            <h4>方案</h4>
            <div className="row"><div className="col-xs-11 col-xs-offset-1 space-text"  dangerouslySetInnerHTML={{__html:product.pricing}} /></div>
          </div>
        </div>
        <div className='row product-form-section'>
          <div className='col-xs-12 col-sm-4'>
            <h2 className="yellow-bar">我要報名</h2>
          </div>
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
                    <div className="input-group input-group-lg col-xs-12 col-xs-offset-0 col-sm-7" style={{paddingTop:"13px"}}>
                    <span className="input-group-addon hidden-xs">
                    場次
                    </span>
                    <select className="form-control"ref='product_detail' onChange={this.detailChange}>
                      {
                        product.product_details.map((pd,key) =>
                          <option key={key} value={key}>{pd.description}</option>
                        )
                      }
                    </select>
                    <span className="input-group-addon">
                    人數
                    </span>
                    <input className="form-control"ref='quantity' type='number' min='1' max={product.product_details[this.state.productDetail].inventory} defaultValue='1' />
                    <span className="input-group-btn">
                    <button className="btn btn-default btn-info" data-toggle="modal" data-target="#confirm">報名</button>
                    </span>
                    </div>
                    {/**
                      product.product_details[this.state.productDetail].inventory>15?<div/>:
                      <div>
                      剩餘名額：{product.product_details[this.state.productDetail].inventory}
                      </div>
                      **/
                    }
                  </div>
            }
        </div>
         
        <Confirm addProducts={this.addProducts}/>
      </div>
    
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

/**
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
                    <div className="input-group col-md-4">

                    
                    </div>
                    
                    <div className="input-group col-md-8" style={{paddingTop:"20px"}}>
                    <span className="input-group-addon hidden-xs">
                    場次
                    </span>
                    <select className="form-control"ref='product_detail' onChange={this.detailChange}>
                      {
                        product.product_details.map((pd,key) =>
                          <option key={key} value={key}>{pd.description}</option>
                        )
                      }
                    </select>
                    <span className="input-group-addon">
                    人數
                    </span>
                    <input className="form-control"ref='quantity' type='number' min='1' max={product.product_details[this.state.productDetail].inventory} defaultValue='1' />
                    <span className="input-group-btn">
                    <button className="btn btn-default btn-info" data-toggle="modal" data-target="#confirm">報名</button>
                    </span>
                    </div>
                    {
                      product.product_details[this.state.productDetail].inventory>15?<div/>:
                      <div>
                      剩餘名額：{product.product_details[this.state.productDetail].inventory}
                      </div>
                    }
                  </div>
            }
**/