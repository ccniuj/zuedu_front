import React, {
  Component,
  PropTypes
} from 'react'
import {
  connect
} from 'react-redux'
import {
  clientRender
} from '../actions'
import Slider from 'react-slick'
import { Link } from 'react-router'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state={
      windowWidth:""
    }
    
  }

  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
    this.setState({windowWidth:window.innerWidth})
  }

  render() {
    const style = {
      paddingTop: '50px',

    }
    let autoplay = (this.state.windowWidth>768)
                    ?
                    {autoplay:true}
                    :
                    {autoplay:true}
    var settings = Object.assign({},{
      dots: true,
      arrows:false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight:true,
      autoplaySpeed:3000,
      dotsClass: "home-slick-dot slick-dots black",
    },autoplay);

    return (
      <div className='container-fluid' style={style}>
        <div className='row'>
        <div className="pic-slider" >
          <Slider {...settings}>
              <div><img src="/images/pic29.jpg" alt=""/></div>
              <div><img src="/images/AD10.jpg" alt=""/></div>
              <div><img src="/images/AD14.jpg" alt=""/></div>
          </Slider> 
        </div>
        </div>
        
        <div className="home-blocks row">
        <img src="/images/yellow-radius.png" style={{width:"100%",zIndex:3,marginBottom:"-6%"}} alt=""/>
          <div className="col-xs-10 col-xs-offset-1  home-pic" >
            <div className ="row home-pic">

              <div className= "col-md-4  home-block">
                  <div className="col-md-12  home-block-detail">
                    <img src="/images/PIC21.png" alt=""/>
                    <h2>ZUBOX</h2>
                    <h4 className="lot-text">
                      為孩子特別設計的教材，讓孩子透過教材發揮出無限想像力。
                    </h4>
                </div>
              </div>
              <div className= "col-md-4  home-block">
                <div className="col-md-12  home-block-detail">
                  <img src="/images/PIC22.png" alt=""/>
                  <h2>圖像式思考</h2>
                  <h4 className="lot-text">
                  透過圖像是思考教學，<br/>讓孩子的想像力不再受限。
                  </h4>
                  
                </div>

              </div>
              <div className= "col-md-4  home-block">

                <div className="col-md-12 home-block-detail">

                  <img src="/images/PIC23.png" alt=""/>
                  <h2>沈浸式教學</h2>
                  <h4 className="lot-text">
                  設計多種程式設計的遊戲，讓孩子在遊玩的過程中輕鬆學習程式的精隨。
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          /*
        <div className='row text-center home-numbers-container'>
          <div className="col-md-12"ref='numbers' style={{ display: 'none' }}>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n1}+</span>
              <span>學員</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n2}成</span>
              <span>學生滿意度</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n3}年</span>
              <span>營隊經驗</span>
              <img src='/images/icon_wreath.png' />
            </div>
            <div className='col-xs-3 home-number'>
              <span>{this.state.n4}門</span>
              <span>主題課程</span>
              <img src='/images/icon_wreath.png' />
            </div>
          </div>
        </div>
          */
        }
        <div className="row home-product">
        <div className="col-md-12">
          <div className=" row home-product-block">
            <h1 className="ccol-sm-12 col-xs-12 left white">強調程式教學的Z-Code</h1>
            
            <div className="col-sm-12 col-xs-12 home-product-detail">
              <div className="row">
                <div className="col-sm-8">
                  <div className="header-polgan-left">
                    <h4 className="left white">美式PBL教學，培養運算思維，掌握未來競爭力</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <img className="col-sm-5 col-sm-push-7 col-sm-offset-0 hidden-xs home-product-pic" src="/images/pic5.png" alt=""/>
                <div className="col-xs-12 col-sm-7 col-sm-pull-5 ">
                  <h4 className="white left product-detail">
                    讓孩子提早掌握 Z 世代的必備工具，<br/>
                    並藉由 Z 世代的思維讓他們有能力創造出<br/>
                    下一個改變世界大生態的服務及產品。<br/>
                  </h4>
                  <br/>
                  <div className="col-xs-4  home-product-spec-left" >
                    <img src="/images/takenote.png" alt=""/>
                    <h3 className="white">專案導向PBL教學</h3>
                  </div>
                  <div className="col-xs-4  home-product-spec-left">
                    <img src="/images/brain.png" alt=""/>
                    <h3 className="white">訓練邏輯<br/>養成運算思維</h3>
                  </div>
                  <div className="col-xs-4 home-product-spec-left">
                    <img src="/images/theremen.png" alt=""/>
                    <h3 className="white">同儕學習互相成長</h3>
                  </div>                  
                </div>
                <a id='left' href="https://docs.google.com/forms/d/e/1FAIpQLSeyyu5oBNCDEyqyIusL-f8gP-t1leEphzlEuHJC7jyOviuscA/viewform">
                <div className="col-sm-3 col-sm-offset-9 col-xs-5 col-xs-offset-7 more-about-right">了解更多<span className="glyphicon glyphicon-menu-right"></span><span className="glyphicon glyphicon-menu-right"></span></div>
                </a>
              </div>
              
            </div>
            
          </div>
          <div className=" row home-product-block ">
          <h1 className="right white">強調動手做的Z-Create</h1>
            
            <div className="col-sm-12 col-xs-12 home-product-detail">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-4">
                  <div className="header-polgan-right ">
                    <h4 className="white right">
                    全台首創程式實境教學，科學結合程式邏輯應用
                    </h4>
                  </div>
                </div>
              </div>
                <div className="row">
                  <img className="col-sm-5 col-sm-offset-0 hidden-xs home-product-pic" src="/images/pic6.png" alt=""/>
                  <div className="col-sm-7 col-xs-12">
                    <h4 className="white right product-detail">
                    幫助孩子們發覺自己的興趣，<br/>
                    增強未來學習的動機以及培養自發。<br/>
                    </h4>
                    <br/>
                    <div className="col-xs-4 home-product-spec">
                      <img src="/images/threeRoad.png" alt=""/>
                      <h3 className="white">廣泛接觸不同的事情</h3>
                    </div>
                    <div className="col-xs-4 home-product-spec">
                      <img src="/images/chart.png" alt=""/>
                      <h3 className="white">藉由興趣統計量表分析</h3>
                    </div>
                    <div className="col-xs-4 home-product-spec">
                      <img src="/images/maker.png" alt=""/>
                      <h3 className="white">實際動手參與</h3>
                    </div>
                  </div>
                  <a id='left' href="https://docs.google.com/forms/d/e/1FAIpQLSeyyu5oBNCDEyqyIusL-f8gP-t1leEphzlEuHJC7jyOviuscA/viewform">
                  <div className="col-sm-3 col-xs-5 col-lg-3 col-lg-pull-5 more-about-left"><span className="glyphicon glyphicon-menu-left"></span><span className="glyphicon glyphicon-menu-left"></span>了解更多</div>
                  </a>
                </div>
            </div>

          </div>

        </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {}

function mapStateToProps(state) {
  return {
    serverRender: state.serverRender
  }
}

export default connect(mapStateToProps, {
  clientRender
})(Home)