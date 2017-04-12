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
import loader from 'react-loader'
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
    var settings = {
      dots: true,
      arrows:false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      dotsClass: "home-slick-dot slick-dots black"
    };
    let homepic = (this.state.windowWidth>768)?
                <div><img src="/images/pic2.png" alt=""/></div>
                :
                <div><img src="/images/pic2-2.png" alt=""/></div>
    return (
      <div className='container-fluid' style={style}>
        <div className='row'>
        <div className="pic-slider" >
        <loader>
          <Slider {...settings}>
              {homepic}
          </Slider> 
        </loader>
                   
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
                <div className="col-sm-10">
                  <div className="header-polgan-left">
                    <h4 className="left white">美式 PBL 教學、1 : 15 高師生比</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <img className="col-sm-5 col-sm-push-7 col-sm-offset-0 col-xs-8 col-xs-offset-2 home-product-pic" src="/images/pic5.png" alt=""/>
                <div className="col-xs-12 col-sm-7 col-sm-pull-5 ">
                  <h4 className="white left">
                    讓孩子提早掌握 Z 世代的必備工具，<br/>
                    並藉由 Z 世代的思維讓他們有能力創造出<br/>
                    下一個改變世界大生態的服務及產品。<br/>
                  </h4>
                  <br/>
                  <div className="col-xs-4  home-product-spec" >
                    <img src="/images/takenote.png" alt=""/>
                    <h3 className="white">Project based learning</h3>
                  </div>
                  <div className="col-xs-4  home-product-spec">
                    <img src="/images/brain.png" alt=""/>
                    <h3 className="white">培養邏輯思維</h3>
                  </div>
                  <div className="col-xs-4 home-product-spec">
                    <img src="/images/theremen.png" alt=""/>
                    <h3 className="white">Peer learning<br />同儕間的學習交流
                    </h3>
                  </div>                  
                </div>
                <Link to="/products/1">
                <div className="col-sm-3 col-sm-offset-9 col-xs-9 col-xs-offset-3 more-about-right">了解更多<span className="glyphicon glyphicon-menu-right"></span><span className="glyphicon glyphicon-menu-right"></span></div>
                </Link>
              </div>
              
            </div>
            
          </div>
          <div className=" row home-product-block ">
          <h1 className="right white">強調動手做的Z-Create</h1>
            
            <div className="col-sm-12 col-xs-12 home-product-detail">
              <div className="row">
                <div className="col-sm-10 col-sm-offset-2">
                  <div className="header-polgan-right ">
                    <h4 className="white right">
                    全台首創程式實境教學，
                    科學結合程式邏輯應用
                    </h4>
                  </div>
                </div>
              </div>
                <div className="row">
                  <img className="col-sm-5 col-xs-8 col-sm-offset-0 col-xs-offset-2 home-product-pic" src="/images/pic6.png" alt=""/>
                  <div className="col-sm-7 col-xs-12">
                    <h4 className="white right">
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
                  <Link to="/products/2">
                  <div className="col-sm-3 col-xs-9 more-about-left"><span className="glyphicon glyphicon-menu-left"></span><span className="glyphicon glyphicon-menu-left"></span>了解更多</div>
                  </Link>
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