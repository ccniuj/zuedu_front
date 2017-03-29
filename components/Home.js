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
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n1: 0,
      n2: 0,
      n3: 0,
      n4: 0
    }
    this.countToNumber = (numbers, duration) => this._countToNumber(numbers, duration)
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    }
    $(this.refs.numbers).fadeIn(500)
    $(this.refs.features).fadeIn(1500)
    this.countToNumber({
      n1: 300,
      n2: 9,
      n3: 5,
      n4: 2
    }, 500)
  }
  _countToNumber(numbers, duration) {
    let ds = {}
    for (let key in numbers) {
      ds[key] = Math.ceil(duration / numbers[key])
    }
    for (let key in ds) {
      let i = setInterval(() => {
        this.setState({
          [key]: this.state[key] + 1
        })
        if (this.state[key] >= numbers[key]) {
          clearInterval(i)
        }
      }, ds[key])
    }
  }
  render() {
    const style = {
      paddingTop: '50px',

    }
    var settings = {
      dots: true,
      arrows:false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      
    };
    return (
      <div className='container-fluid' style={style}>
        <div className='row'>
        <div className="pic-slider" >
          <Slider {...settings}>
            <div><img src="/images/pic2.png" alt=""/></div>
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
                    <h4>
                       為孩子特別設計的教材，讓孩子透過教材發揮出無限想像力。
                    </h4>

                
                </div>
              </div>
              <div className= "col-md-4  home-block">
                <div className="col-md-12  home-block-detail">
                  <img src="/images/PIC22.png" alt=""/>
                  <h2>圖像式思考</h2>
                  <h4>
                  透過圖像是思考教學，讓孩子的想像力不再受限。
                  </h4>

                </div>

              </div>
              <div className= "col-md-4  home-block">

                <div className="col-md-12 home-block-detail">

                  <img src="/images/PIC23.png" alt=""/>
                  <h2>沈浸式教學</h2>
                  <h4>
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
            <h1 className="left">強調程式教學的Z-Code</h1>
            <div className="col-xs-8 home-product-detail">
              <div className="header-polgan-left">
                <h2 className="left">美式 PBL 教學、1 : 15 高師生比</h2>
              </div>
                <h2 className="left">
                  讓孩子提早掌握 Z 世代的必備工具，<br/>
                  並藉由 Z 世代的思維讓他們有能力創造出<br/>
                  下一個改變世界大生態的服務及產品。<br/>

                </h2>
                <br/>
                <div className="col-xs-4 home-product-spec" >
                  <img src="/images/takenote.png" alt=""/>
                  <h3>Project based learning</h3>
                </div>
                <div className="col-xs-4 home-product-spec">
                  <img src="/images/brain.png" alt=""/>
                  <h3>培養邏輯思維</h3>
                </div>
                <div className="col-xs-4 home-product-spec">
                  <img src="/images/theremen.png" alt=""/>
                  <h3>Peer learning<br />同儕間的學習交流
                  </h3>
                </div>
            </div>
            <img className="col-xs-4" src="/images/pic5.png" alt=""/>
          </div>
          <div className=" row home-product-block ">
          <h1 className="right">強調動手做的Z-Create</h1>
            <img className="col-xs-4" src="/images/pic6.png" alt=""/>
            <div className="col-xs-8 home-product-detail">
              <div className="header-polgan-right ">
                <h2 className="right">
                全台首創程式實境教學，
                科學結合程式邏輯應用
                </h2>
                </div>
                <h2 className="right">
                    幫助孩子們發覺自己的興趣，<br/>
                    增強未來學習的動機以及培養自發。<br/>

                </h2>
                <br/>
                <div className="col-xs-4 home-product-spec">
                  <img src="/images/threeRoad.png" alt=""/>
                  <h3>廣泛接觸不同的事情</h3>
                </div>
                <div className="col-xs-4 home-product-spec">
                  <img src="/images/chart.png" alt=""/>
                  <h3>藉由興趣統計量表分析</h3>
                </div>
                <div className="col-xs-4 home-product-spec">
                  <img src="/images/maker.png" alt=""/>
                  <h3>實際動手參與</h3>
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